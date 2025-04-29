'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

/**
 * Used in a server action to authenticate a user from FormData.
 * Returns an error message string on failure, or undefined on success.
 */
export async function authenticate(formData: FormData): Promise<string | undefined> {
  const { email, password } = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return undefined;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

/**
 * Automatically logs in the user after successful registration.
 * Called in the SignUpForm component to sign in the user immediately after account creation.
 * Returns an object with a success flag and an optional error message.
 */
export const logIn = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[SIGN_IN_ERROR]', error);
    }
    return {
      ok: false,
      message: 'Unable to sign in. Please check your credentials or try again later.',
    };
  }
};
