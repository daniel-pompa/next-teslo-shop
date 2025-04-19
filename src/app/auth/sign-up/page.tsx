import { titleFont } from '@/config/fonts';
import { SignUpForm } from './ui/SignUpForm';

export default function SignUpPage() {
  return (
    <div className='flex flex-col'>
      <h1 className={`${titleFont.className} text-center mb-5`}>Sign up</h1>
      <SignUpForm />
    </div>
  );
}
