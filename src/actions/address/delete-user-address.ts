'use server';
import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({ where: { userId } });
    return { ok: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[DELETE_USER_ADDRESS_ERROR]', error);
    }
    return {
      ok: false,
      message: 'Unable to delete user address. Please try again later.',
    };
  }
};
