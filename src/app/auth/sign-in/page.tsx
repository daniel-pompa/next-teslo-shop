import { titleFont } from '@/config/fonts';
import { SignInForm } from './ui/SignInForm';

export default function SignInPage() {
  return (
    <div className='flex flex-col'>
      <h1 className={`${titleFont.className} text-center mb-5`}>Sign in</h1>
      <SignInForm />
    </div>
  );
}
