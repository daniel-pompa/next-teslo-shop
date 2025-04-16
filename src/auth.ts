import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import prisma from './lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up',
    error: '/auth/error',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Check if user exists
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        // Check if password is correct
         const isPasswordValid = await bcryptjs.compare(password, user.password);
         
         if (!isPasswordValid) return null;

        // Return user without password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
});
