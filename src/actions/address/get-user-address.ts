'use server';
import prisma from '@/lib/prisma';

export const getUserAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!userAddress) return null;

    const { countryId, address2, ...rest } = userAddress;

    return {
      ...rest,
      address2: address2 ?? '',
      country: countryId,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[GET_USER_ADDRESS_ERROR]', error);
    }
    return null;
  }
};
