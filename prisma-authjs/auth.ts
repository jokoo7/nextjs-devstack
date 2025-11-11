import bcrypt from 'bcryptjs';
import NextAuth, { DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { InvalidCredentials } from './lib/auth-error';
import prisma from './lib/prisma';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    role?: string;
  }
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role?: string;
      provider?: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: string;
    provider?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string };

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // Jika user tidak ditemukan
        if (!user) {
          throw new InvalidCredentials('User tidak ditemukan.');
        }

        // Jika user tidak punya password, berarti user OAuth (misalnya Google)
        if (user.provider !== 'credentials') {
          throw new InvalidCredentials(
            'Akun ini terdaftar menggunakan Google. Silakan login dengan tombol Google.'
          );
        }

        // Pastikan password tersimpan di database (non-null)
        if (user.password == null) {
          throw new InvalidCredentials('Password tidak tersedia untuk akun ini.');
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new InvalidCredentials('Email atau password salah.');
        }

        // Jika semuanya valid, return user
        return user;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        const dbUser = await prisma.user.findFirst({
          where: { email: user.email!, provider: 'google' },
        });

        if (!dbUser) {
          const newUser = await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              provider: 'google',
            },
          });

          user.id = newUser.id;
          user.role = newUser.role;
        } else {
          user.id = dbUser.id;
          user.role = dbUser.role;
        }
      }

      return true;
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      if (account) {
        token.provider = account.provider;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.provider = token.provider as string;
      }

      return session;
    },
  },
});
