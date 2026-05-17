import { Resend } from 'resend';
import { render } from '@react-email/render';
import { OrderConfirmationEmail } from './templates/OrderConfirmationEmail';
import { OrderStatusEmail } from './templates/OrderStatusEmail';
import { NewOrderEmail } from './templates/NewOrderEmail';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@yourdomain.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

interface SendOrderConfirmationParams {
  to: string;
  name: string;
  orderNumber: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  orderId: string;
}

export async function sendOrderConfirmation({ to, name, orderNumber, items, total, orderId }: SendOrderConfirmationParams) {
  const html = await render(
    <OrderConfirmationEmail
      orderNumber={orderNumber}
      customerName={name}
      items={items}
      total={total}
      trackingUrl={`${APP_URL}/order/${orderId}`}
    />
  );

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Confirmed #${orderNumber}`,
    html,
  });
}

interface SendOrderStatusParams {
  to: string;
  name: string;
  orderNumber: string;
  oldStatus: string;
  newStatus: string;
  orderId: string;
}

export async function sendOrderStatus({ to, name, orderNumber, oldStatus, newStatus, orderId }: SendOrderStatusParams) {
  const html = await render(
    <OrderStatusEmail
      orderNumber={orderNumber}
      customerName={name}
      oldStatus={oldStatus}
      newStatus={newStatus}
      trackingUrl={`${APP_URL}/order/${orderId}`}
    />
  );

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order #${orderNumber} Status Updated`,
    html,
  });
}

interface SendNewOrderParams {
  orderNumber: string;
  email: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  orderId: string;
}

export async function sendNewOrderNotification({ orderNumber, email, items, total, orderId }: SendNewOrderParams) {
  const html = await render(
    <NewOrderEmail
      orderNumber={orderNumber}
      email={email}
      items={items}
      total={total}
      adminUrl={`${APP_URL}/admin/orders/${orderId}`}
    />
  );

  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Order #${orderNumber}`,
    html,
  });
}
