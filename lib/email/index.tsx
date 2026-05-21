import { Resend } from 'resend';
import { OrderConfirmationEmail } from './templates/OrderConfirmationEmail';
import { OrderStatusEmail } from './templates/OrderStatusEmail';
import { NewOrderEmail } from './templates/NewOrderEmail';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = `Menace <${process.env.EMAIL_FROM || 'onboarding@resend.dev'}>`;
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
  if (!resend) {
    console.warn('Email service not configured - RESEND_API_KEY missing');
    return;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Confirmed #${orderNumber}`,
    react: OrderConfirmationEmail({
      orderNumber,
      customerName: name,
      items,
      total,
      trackingUrl: `${APP_URL}/order/${orderId}`,
    }),
  });

  if (error) {
    console.error('Resend error (sendOrderConfirmation):', error);
    throw new Error(error.message);
  }

  return data;
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
  if (!resend) {
    console.warn('Email service not configured - RESEND_API_KEY missing');
    return;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order #${orderNumber} Status Updated`,
    react: OrderStatusEmail({
      orderNumber,
      customerName: name,
      oldStatus,
      newStatus,
      trackingUrl: `${APP_URL}/order/${orderId}`,
    }),
  });

  if (error) {
    console.error('Resend error (sendOrderStatus):', error);
    throw new Error(error.message);
  }

  return data;
}

interface SendNewOrderParams {
  orderNumber: string;
  email: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  orderId: string;
}

export async function sendNewOrderNotification({ orderNumber, email, items, total, orderId }: SendNewOrderParams) {
  if (!resend) {
    console.warn('Email service not configured - RESEND_API_KEY missing');
    return;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Order #${orderNumber}`,
    react: NewOrderEmail({
      orderNumber,
      email,
      items,
      total,
      adminUrl: `${APP_URL}/admin/orders/${orderId}`,
    }),
  });

  if (error) {
    console.error('Resend error (sendNewOrderNotification):', error);
    throw new Error(error.message);
  }

  return data;
}
