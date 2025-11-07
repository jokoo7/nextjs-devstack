import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {session ? (
        <div className="space-y-2">
          <div>Name: {session.user?.name}</div>
          <div>Email: {session.user?.email}</div>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
