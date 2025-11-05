'use server';

import { SignUpFormState } from '@/components/form/signup-credential';
import prisma from '@/lib/prisma';
import { signUpCredentialSchema } from '@/lib/zod';
import bcrypt from 'bcryptjs';
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
