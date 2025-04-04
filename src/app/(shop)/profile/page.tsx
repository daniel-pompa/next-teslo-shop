import Image from 'next/image';
import { redirect } from 'next/navigation';
import { IoMail, IoShieldCheckmark, IoPerson } from 'react-icons/io5';
import { auth } from '@/auth';
import { logOut } from '@/actions';
import { Title } from '@/components';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect('/');

  const user = session.user;

  return (
    <div className='fade-in'>
      <div className='mb-8'>
        <Title title='Profile' subtitle='Your personal information' />
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* Profile Card */}
        <div className='rounded-md border border-slate-200 bg-white shadow-sm md:col-span-1'>
          <div className='p-6'>
            <div className='flex flex-col items-center gap-4'>
              {/* Avatar */}
              <div className='relative h-24 w-24 rounded-full border-4 border-blue-100'>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={96}
                    height={96}
                    className='h-full w-full rounded-full object-cover'
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-4xl font-medium text-white'>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>

              <div className='text-center'>
                <h3 className='font-semibold'>{user.name}</h3>
                <p className='text-slate-500'>{user.email}</p>
              </div>
            </div>
          </div>

          <div className='space-y-3 border-t p-6'>
            <div className='flex flex-col gap-3 md:flex-row'>
              <button className='flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 md:w-1/2'>
                Edit profile
              </button>
              <button
                className='flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 md:w-1/2'
                onClick={logOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Information card */}
        <div className='rounded-md border border-slate-200 bg-white shadow-sm md:col-span-2'>
          <div className='border-b p-6'>
            <h3>Personal information</h3>
          </div>

          <div className='grid gap-6 p-6'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* Name field */}
              <div className='flex items-center gap-4'>
                <div className='rounded-md bg-blue-100 p-3'>
                  <IoPerson className='h-5 w-5 text-blue-600' />
                </div>
                <div>
                  <p className='text-slate-500'>Full name</p>
                  <p>{user.name || 'Not provided'}</p>
                </div>
              </div>

              {/* Email field */}
              <div className='flex items-center gap-4'>
                <div className='rounded-md bg-blue-100 p-3'>
                  <IoMail className='h-5 w-5 text-blue-600' />
                </div>
                <div>
                  <p className='text-slate-500'>Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>

            {/* Security section */}
            <div className='border-t pt-6'>
              <h4 className='mb-3 font-medium'>Account security</h4>
              <div className='flex flex-col gap-3 sm:flex-row'>
                <button className='flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50'>
                  <IoShieldCheckmark className='h-5 w-5' />
                  2FA
                </button>
                <button className='flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50'>
                  <IoShieldCheckmark className='h-5 w-5' />
                  Change password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
