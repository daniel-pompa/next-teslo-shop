import Link from 'next/link';
import { titleFont } from '@/config/fonts';

export const PageNotFound = () => {
  return (
    <div className='max-w-6xl mx-auto md:mt-52'>
      <div className='text-center space-y-6'>
        <h1
          className={`${titleFont.className} text-9xl font-extrabold text-slate-950 animate-pulse`}
        >
          404
        </h1>
        <p className='text-2xl font-semibold'>Oops! Page not found</p>
        <p className='text-slate-600 font-light'>
          The page you are looking for might have been removed, had its name changed, or
          is temporarily unavailable. Please check the URL or return to the homepage.
        </p>
        <div className='mt-8'>
          <Link href='/' className='btn-primary'>
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};
