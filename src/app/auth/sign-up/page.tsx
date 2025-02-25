import Link from 'next/link';
import { titleFont } from '@/config/fonts';

export default function SignUpPage() {
  return (
    <div className='flex flex-col'>
      <h1 className={`${titleFont.className} text-center mb-5`}>Sign up</h1>
      <div className='flex flex-col'>
        <div className='flex flex-col space-y-3'>
          {/* Full name field */}
          <label htmlFor='name'>Full name</label>
          <input
            type='text'
            id='name'
            className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
            placeholder='Enter your full name'
            aria-label='Enter your full name'
            aria-required='true'
          />
          {/* Email field */}
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
            placeholder='Enter your email'
            aria-label='Enter your email address'
            aria-required='true'
          />
          {/* Password field */}
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
            placeholder='Enter your password'
            aria-label='Enter your password'
            aria-required='true'
          />
        </div>
        {/* Sign up button */}
        <button className='btn-primary mt-6' aria-label='Sign up to create a new account'>
          Sign up
        </button>
        {/* Divisor */}
        <div className='flex-1 border-t my-6 border-slate-300'></div>
        {/* Sign in link */}
        <p className='text-center text-slate-600'>
          You already have an account?{' '}
          <Link
            href='/auth/sign-in'
            className='text-blue-600 hover:text-blue-800'
            aria-label='Sign in to your existing account'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
