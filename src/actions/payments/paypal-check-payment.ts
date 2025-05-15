'use server';
import prisma from '@/lib/prisma';
import { PaypalOrderStatusResponse } from '@/interfaces';
import { revalidatePath } from 'next/cache';

// Checks the PayPal payment status and updates the order if valid
export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'Failed to fetch PayPal bearer token. Please try again later.',
    };
  }

  const response = await verifyPaypalPayment(paypalTransactionId, authToken);

  if (!response) {
    return {
      ok: false,
      message: 'Failed to verify PayPal payment. Please try again later.',
    };
  }

  const { status, purchase_units } = response;

  // Ensures the payment has completed and invoice ID is present before updating DB
  const orderId = purchase_units?.[0]?.invoice_id;
  if (!orderId || status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Payment not completed. Please try again later.',
    };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date() },
    });

    // Triggers revalidation of order page after payment success
    revalidatePath(`/orders/${orderId}`);

    return { ok: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error verifying PayPal payment:', error);
    }

    return {
      ok: false,
      message: 'Failed to verify PayPal payment. Please try again later.',
    };
  }
};

// Retrieves PayPal bearer token using client credentials grant
const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? '';

  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET_KEY || !PAYPAL_OAUTH_URL) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Missing PayPal credentials or OAuth URL');
    }
    return null;
  }

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL, requestOptions).then(res => res.json());

    if (!result.access_token) {
      throw new Error('No access token in PayPal response');
    }

    return result.access_token;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching PayPal bearer token:', error);
    }
    return null;
  }
};

// Validates PayPal payment status using transaction ID
const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${bearerToken}`); // ⚠️ Fixed unwanted tab character

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    const response = await fetch(paypalOrderUrl, requestOptions).then(res => res.json());
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error verifying PayPal payment:', error);
    }
    return null;
  }
};
