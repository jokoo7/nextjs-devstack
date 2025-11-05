import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

export function LoginMagicLinkForm({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form action="" className={cn(className)} {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>

        <Field>
          <Button type="submit">Login Magic Link</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
