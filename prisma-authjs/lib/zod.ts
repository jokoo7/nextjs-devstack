import { email, object, string } from 'zod';

export const signUpCredentialSchema = object({
  name: string().min(2, { message: 'Min 2 karakter' }).max(50, { message: 'Max 50 karakter' }),
  email: email(),
  password: string({ error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password not match',
  path: ['confirmPassword'],
});

export const loginCredentialSchema = object({
  email: email(),
  password: string({ error: 'Password required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});
