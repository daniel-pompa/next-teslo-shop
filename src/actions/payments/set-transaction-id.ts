'use server';
import prisma from '@/lib/prisma';

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    // Updates the transaction ID of the specified order
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId },
    });
    if (!order) {
      return {
        ok: false,
        message: `Order with ID ${orderId} not found.`,
      };
    }
    return { ok: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error setting transaction ID:', error);
    }
    return {
      ok: false,
      message: 'Failed to set transaction ID.',
    };
  }
};
