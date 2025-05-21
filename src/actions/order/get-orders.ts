'use server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getOrders = async (page: number = 1, perPage: number = 3) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Access restricted: Administrator privileges required to view orders',
    };
  }

  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
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
    prisma.order.count(),
  ]);

  return {
    ok: true,
    orders,
    totalPages: Math.ceil(totalCount / perPage),
    totalCount,
  };
};
