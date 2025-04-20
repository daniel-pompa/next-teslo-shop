import { titleFont } from '@/config/fonts';
import { SignInForm } from './ui/SignInForm';

interface Props {
  searchParams?: Promise<{ redirectTo?: string }>;
}

export default async function SignInPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const redirectTo = resolvedParams?.redirectTo || '/';

  return (
    <div className='flex flex-col'>
      <h1 className={`${titleFont.className} text-center mb-5`}>Sign in</h1>
      <SignInForm redirectTo={redirectTo} />
    </div>
  );
}
