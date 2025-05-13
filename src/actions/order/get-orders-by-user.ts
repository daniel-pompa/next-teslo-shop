'use server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async (page: number = 1, perPage: number = 3) => {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, message: 'You are not logged in.' };
  }

  const [orders, count] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.order.count({
      where: { userId: session.user.id },
    }),
  ]);

  return {
    ok: true,
    orders,
    totalPages: Math.ceil(count / perPage),
  };
};
