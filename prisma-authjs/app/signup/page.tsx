import { GalleryVerticalEnd } from 'lucide-react';

import { SignupCredentialForm } from '@/components/form/signup-credential';
import { SignupMagicLinkForm } from '@/components/form/signup-magic-link';
import { SignupOAuthForm } from '@/components/form/signup-oauth';
import { FieldDescription, FieldGroup, FieldSeparator } from '@/components/ui/field';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a href="#" className="flex flex-col items-center gap-2 font-medium">
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
              <FieldDescription>
                Already have an account? <Link href="/login">Login</Link>
              </FieldDescription>
            </div>

            <FieldSeparator>With Credential 👇</FieldSeparator>

            <SignupCredentialForm />

            <FieldSeparator>With Magic Link 👇</FieldSeparator>

            <SignupMagicLinkForm />

            <FieldSeparator>With OAuth 👇</FieldSeparator>

            <SignupOAuthForm />
          </FieldGroup>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
