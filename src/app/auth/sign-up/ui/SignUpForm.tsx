'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { MdError } from 'react-icons/md';
import { signUp, logIn } from '@/actions';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // Automatically clears error messages after 4 seconds
  useEffect(() => {
    if (!errorMessage) return;
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 4000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  /**
   * Handles the sign-up and auto login process.
   * On success, redirects the user to the homepage.
   */
  const onSubmit: SubmitHandler<FormInputs> = async data => {
    setErrorMessage('');
    const { name, email, password } = data;
    const response = await signUp(name, email, password);
    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }
    await logIn(email.toLowerCase(), password);
    router.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <div className='flex flex-col space-y-3'>
        {/* Full name field */}
        <label htmlFor='name'>Full name</label>
        <input
          type='text'
          id='name'
          className={clsx('p-2 border rounded bg-slate-50 focus:outline-none', {
            'border-red-500 focus:ring-1 ring-red-500 focus:ring-red-500': errors.name,
            'border-slate-300 focus:ring-1 focus:ring-slate-400': !errors.name,
          })}
          placeholder='Enter your full name'
          aria-label='Enter your full name'
          aria-required='true'
          {...register('name', { required: 'Full name is required.' })}
        />

        {errors.name && (
          <div className='flex items-center gap-1 text-red-600' aria-live='polite'>
            <MdError className='h-5 w-5' />
            <p>{errors.name.message}</p>
          </div>
        )}

        {/* Email field */}
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          className={clsx('p-2 border rounded bg-slate-50 focus:outline-none', {
            'border-red-500 focus:ring-1 ring-red-500 focus:ring-red-500': errors.email,
            'border-slate-300 focus:ring-1 focus:ring-slate-400': !errors.email,
          })}
          placeholder='Enter your email'
          aria-label='Enter your email address'
          aria-required='true'
          {...register('email', {
            required: 'Email is required',
            validate: value =>
              /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ||
              'Enter a valid email address',
          })}
        />

        {errors.email && (
          <div className='flex items-center gap-1 text-red-600' aria-live='polite'>
            <MdError className='h-5 w-5' />
            <p>{errors.email.message}</p>
          </div>
        )}

        {/* Password field */}
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          className={clsx('p-2 border rounded bg-slate-50 focus:outline-none', {
            'border-red-500 focus:ring-1 ring-red-500 focus:ring-red-500':
              errors.password,
            'border-slate-300 focus:ring-1 focus:ring-slate-400': !errors.password,
          })}
          placeholder='Enter your password'
          aria-label='Enter your password'
          aria-required='true'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        {errors.password && (
          <div className='flex items-center gap-1 text-red-600' aria-live='polite'>
            <MdError className='h-5 w-5' />
            <p>{errors.password.message}</p>
          </div>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className='flex items-center gap-1 text-red-600 mt-4' aria-live='polite'>
          <MdError className='h-5 w-5' />
          <p>{errorMessage}</p>
        </div>
      )}

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
          className='text-blue-600 hover:text-blue-800 hover:underline'
          aria-label='Sign in to your existing account'
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};
