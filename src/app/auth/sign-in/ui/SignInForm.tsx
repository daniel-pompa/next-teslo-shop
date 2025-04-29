'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { MdError } from 'react-icons/md';
import { authenticate } from '@/actions';

type Props = {
  callbackUrl: string;
};

export const SignInForm = ({ callbackUrl }: Props) => {
  const [errorMessage, formAction, isPending] = useActionState(
    async (_prevState: string | undefined, formData: FormData) => {
      const error = await authenticate(formData);
      if (!error) window.location.href = callbackUrl;
      return error;
    },
    undefined
  );

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />

      <div className='flex flex-col gap-3'>
        <label htmlFor='email' className='text-slate-700'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          required
          className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          placeholder='Enter your email'
        />

        <label htmlFor='password' className='text-slate-700'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          required
          minLength={6}
          className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          placeholder='Enter your password'
        />
      </div>

      {errorMessage && (
        <div className='flex items-center gap-1 text-sm text-red-600' aria-live='polite'>
          <MdError className='h-5 w-5' />
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        type='submit'
        disabled={isPending}
        className={clsx('mt-2 py-2 px-4 rounded-md text-white font-medium', {
          'btn-primary': !isPending,
          'btn-disabled': isPending,
        })}
        aria-label='Sign in to your account'
      >
        Sign in
      </button>

      <div className='my-4 border-t border-slate-300' />

      <p className='text-center text-sm text-slate-600'>
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
