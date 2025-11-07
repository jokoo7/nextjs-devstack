'use client';

import { loginCredential } from '@/lib/actions/auth.action';
import { cn } from '@/lib/utils';
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

export type LoginFormState =
  | {
      success?: boolean | null;
      error?: string;
    }
  | undefined;

export function LoginCredentialForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [state, formAction, isPending] = useActionState(loginCredential, {} as LoginFormState);

  return (
    <form action={formAction} className={cn(className)} {...props}>
      {state?.error && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">
            {state.error || 'Terjadi kesalahan. Silakan coba lagi.'}
          </p>
        </div>
      )}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input name="email" id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input name="password" id="password" type="password" placeholder="********" required />
        </Field>
        <Field>
          <Button type="submit">{isPending ? 'Loading' : 'Login Credential'}</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
