export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen flex items-center justify-center px-2 sm:px-0 bg-slate-50'>
      <div className='w-full max-w-md p-6 border rounded-md shadow-md'>{children}</div>
    </main>
  );
}
