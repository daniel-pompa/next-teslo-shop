'use server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getUsers = async (page: number = 1, perPage: number = 3) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Access restricted: Administrator privileges required to view users',
    };
  }

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { name: 'asc' },
    }),
    prisma.user.count(),
  ]);

  return {
    ok: true,
    users,
    totalPages: Math.ceil(totalCount / perPage),
    totalCount,
  };
};
