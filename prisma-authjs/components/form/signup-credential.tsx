import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

export function SignupCredentialForm({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form action="" className={cn(className)} {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" placeholder="********" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" placeholder="********" required />
        </Field>

        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
