'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import clsx from 'clsx';
import { MdError } from 'react-icons/md';
import { authenticate } from '@/actions';

export const SignInForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        {/* Email field */}
        <label htmlFor='email' className='text-gray-700'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
          placeholder='Enter your email'
          required
        />

        {/* Password field */}
        <label htmlFor='password' className='text-gray-700'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
          placeholder='Enter your password'
          required
          minLength={6}
        />
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className='flex items-center gap-1 text-sm text-red-600' aria-live='polite'>
          <MdError className='h-5 w-5' />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Sign in button */}
      <button
        type='submit'
        className={clsx('mt-2 py-2 px-4 rounded-md text-white font-medium', {
          'btn-primary': !isPending,
          'btn-disabled': isPending,
        })}
        disabled={isPending}
        aria-disabled={isPending}
        aria-label='Sign in to your account'
      >
        Sign in
      </button>

      {/* Divider */}
      <div className='my-4 border-t border-gray-300'></div>

      {/* Sign up link */}
      <p className='text-center text-sm text-gray-600'>
        Don&#39;t have an account?{' '}
        <Link
          href='/auth/sign-up'
          className='text-blue-600 hover:text-blue-800 hover:underline'
        >
          Create new account
        </Link>
      </p>
    </form>
  );
};
