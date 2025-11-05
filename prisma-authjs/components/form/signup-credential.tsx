'use client';

import { signUpCredential } from '@/app/signup/action';
import { cn } from '@/lib/utils';
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

export type SignUpFormState = {
  success: boolean | null;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  data?: unknown;
};

export function SignupCredentialForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [state, formAction, isPending] = useActionState(signUpCredential, {} as SignUpFormState);

  return (
    <form action={formAction} className={cn(className)} {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input name="name" id="name" type="text" placeholder="John Doe" required />
          {state.errors?.name && (
            <FieldDescription className="text-red-500">{state.errors.name}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input name="email" id="email" type="email" placeholder="m@example.com" required />
          {state.errors?.email && (
            <FieldDescription className="text-red-500">{state.errors.email}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input name="password" id="password" type="password" placeholder="********" required />
          {state.errors?.password && (
            <FieldDescription className="text-red-500">{state.errors.password}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            name="confirmPassword"
            id="confirm-password"
            type="password"
            placeholder="********"
            required
          />
          {state.errors?.confirmPassword && (
            <FieldDescription className="text-red-500">
              {state.errors.confirmPassword}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button type="submit">{isPending ? 'Loading...' : 'Create Account'}</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
