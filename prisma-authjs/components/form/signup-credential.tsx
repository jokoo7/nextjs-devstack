import { LoginState, signUpCredential } from '@/app/signup/action';
import { cn } from '@/lib/utils';
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

export function SignupCredentialForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [state, formAction, isPending] = useActionState(signUpCredential, {} as LoginState);

  console.log(state);

  return (
    <form action={formAction} className={cn(className)} {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input name="name" id="name" type="text" placeholder="John Doe" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input name="email" id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input name="password" id="password" type="password" placeholder="********" required />
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
        </Field>

        <Field>
          <Button type="submit">{isPending ? 'Loading...' : 'Create Account'}</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
