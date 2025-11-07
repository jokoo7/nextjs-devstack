import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { InvalidCredentials } from './lib/auth-error';
import prisma from './lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const data = {
          email: credentials.email as string,
          password: credentials.password as string,
        };

        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (!user) throw new InvalidCredentials('User tidak ditemukan.');

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) throw new InvalidCredentials('User tidak ditemukan.');

        return user;
      },
    }),
  ],
});
