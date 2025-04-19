'use server';
import prisma from '@/lib/prisma';
import brcyptjs from 'bcryptjs';

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        ok: false,
        message: 'User with this email already exists.',
      };
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: brcyptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      ok: true,
      user: user,
      message: 'User created successfully',
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[SIGN_UP_ERROR]', error);
    }
    return {
      ok: false,
      message: 'Something went wrong. Please try again.',
    };
  }
};
