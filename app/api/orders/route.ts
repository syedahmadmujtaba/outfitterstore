import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmation, sendNewOrderNotification } from '@/lib/email/index';
import { orderSchema } from '@/lib/validators';

function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 900 + 100);
  return `ORD-${dateStr}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid order data', details: validation.error.issues }, { status: 400 });
    }

    const { email, items, shippingAddress, paymentMethod, userId } = validation.data;

    // Get shipping settings
    const settingsResult = await query(`SELECT key, value FROM settings WHERE key IN ('shipping_threshold', 'shipping_cost')`);
    const settings: Record<string, number> = {};
    for (const row of settingsResult) {
      settings[row.key] = parseFloat(row.value);
    }
    const shippingThreshold = settings.shipping_threshold || 15000;
    const shippingCost = settings.shipping_cost || 250;

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.price * item.quantity;
    }

    const shipping = subtotal >= shippingThreshold ? 0 : shippingCost;
    const tax = subtotal * 0.18;
    const total = subtotal + tax + shipping;

    const orderNumber = generateOrderNumber();

    // Create order
    const orderResult = await query(
      `INSERT INTO orders (order_number, user_id, email, status, subtotal, tax, shipping, total, payment_method, shipping_address)
       VALUES ($1, $2, $3, 'pending', $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [orderNumber, userId || null, email, subtotal, tax, shipping, total, paymentMethod || 'cod', JSON.stringify(shippingAddress)]
    );

    const orderId = orderResult[0].id;

    // Create order items and reserve stock
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, size, color, quantity, price)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [orderId, item.productId, item.size, item.color, item.quantity, item.price]
      );

      // Reserve stock (deduct immediately but will be restored if cancelled)
      await query(
        `UPDATE product_variants SET stock = stock - $1
         WHERE product_id = $2 AND size = $3 AND color = $4 AND stock >= $1`,
        [item.quantity, item.productId, item.size, item.color]
      );
    }

    // Send confirmation emails (non-blocking)
    try {
      const emailItems = items.map((item: any) => ({
        name: item.productName || 'Product',
        quantity: item.quantity,
        price: item.price,
      }));

      await Promise.all([
        sendOrderConfirmation({
          to: email,
          name: shippingAddress.firstName || 'Customer',
          orderNumber,
          items: emailItems,
          total,
          orderId,
        }),
        sendNewOrderNotification({
          orderNumber,
          email,
          items: emailItems,
          total,
          orderId,
        }),
      ]);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({
      message: 'Order created',
      orderNumber,
      orderId,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
