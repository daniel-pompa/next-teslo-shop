'use server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Access restricted: Administrator privileges required to change user role',
    };
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user';
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath('/admin/users');
    return { ok: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[CHANGE_USER_ROLE_ERROR]', error);
    }
    return { ok: false, message: 'Unable to change user role. Please try again later.' };
  }
};
