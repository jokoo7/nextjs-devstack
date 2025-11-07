import { LoginCredentialForm } from '@/components/form/login-credential';
import { LoginMagicLinkForm } from '@/components/form/login-magic-link';
import { LoginOAuthForm } from '@/components/form/login-oauth';
import { FieldDescription, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
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
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
              </FieldDescription>
            </div>

            <FieldSeparator>With Credential 👇</FieldSeparator>

            {/* {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {errorMessages[error as keyof typeof errorMessages] ||
                    'Terjadi kesalahan. Silakan coba lagi.'}
                </p>
              </div>
            )} */}

            <LoginCredentialForm />

            <FieldSeparator>With Magic Link 👇</FieldSeparator>

            <LoginMagicLinkForm />

            <FieldSeparator>With OAuth 👇</FieldSeparator>

            <LoginOAuthForm />
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
