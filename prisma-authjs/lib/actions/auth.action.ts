'use server';

import { signIn } from '@/auth';
import { LoginFormState } from '@/components/form/login-credential';
import { SignUpFormState } from '@/components/form/signup-credential';
import prisma from '@/lib/prisma';
import { loginCredentialSchema, signUpCredentialSchema } from '@/lib/zod';
import bcrypt from 'bcryptjs';
import { CredentialsSignin } from 'next-auth';
import { redirect } from 'next/navigation';

export async function signUpCredential(
  _: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validateFields = signUpCredentialSchema.safeParse(Object.fromEntries(formData));

  if (!validateFields.success) {
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, name, password } = validateFields.data;

  const hashPassword = bcrypt.hashSync(password, 10);

  const existsUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existsUser) {
    return { success: false, message: 'Email user sudah ada!' };
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      provider: 'credentials',
    },
  });

  if (!newUser) {
    return {
      success: false,
      message: 'An error occurred while creating your account.',
    };
  }

  redirect('/login');
}

export async function loginCredential(_: unknown, formData: FormData): Promise<LoginFormState> {
  const validateFields = loginCredentialSchema.safeParse(Object.fromEntries(formData));

  if (!validateFields.success) {
    return { error: 'Cek kembali penulisan email dan password.' };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.log('Login error: ', error);

    if (error instanceof CredentialsSignin) {
      const errMessage = error.code;
      if (errMessage) {
        return { error: errMessage };
      }
    }

    // Tangani error lain (server down, dsb.)
    return { error: 'Terjadi kesalahan server. Coba lagi nanti.' };
  }

  redirect('/');
}
