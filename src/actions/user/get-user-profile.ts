'use server';
import prisma from '@/lib/prisma';

export const getUserProfile = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        address: {
          include: {
            country: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[GET_USER_PROFILE_ERROR]', error);
    }
    return null;
  }
};
