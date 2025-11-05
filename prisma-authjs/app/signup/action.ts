import prisma from '@/lib/prisma';
import { signUpCredentialSchema } from '@/lib/zod';
import bcrypt from 'bcryptjs';

export type LoginState = {
  success: boolean | null;
  message: string;
  data?: unknown;
};

export const signUpCredential = async (_: unknown, formData: FormData): Promise<LoginState> => {
  const { name, email, password } = await signUpCredentialSchema.parseAsync(formData);

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

  return { success: true, message: 'Success buat user', data: newUser };
};
