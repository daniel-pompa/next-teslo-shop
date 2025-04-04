import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user) redirect('/');

  return (
    <main className='min-h-screen flex items-center justify-center px-2 sm:px-0 bg-slate-50'>
      <div className='w-full max-w-md p-6 border rounded-md shadow-md'>{children}</div>
    </main>
  );
}
