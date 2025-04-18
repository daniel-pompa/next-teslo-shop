import NextAuth, { Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import prisma from './lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { data?: unknown };
    }) {
      if (token?.data) {
        session.user = {
          ...session.user,
          ...token.data,
        };
      }
      return session;
    },
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
          where: { email: email.toLowerCase() },
        });

        if (!user) return null;

        // Check if password is correct
        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

        if (!isPasswordCorrect) return null;

        // Return user without password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
});
