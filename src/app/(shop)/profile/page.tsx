import { redirect } from 'next/navigation';
import Image from 'next/image';
import { IoMail, IoPerson, IoLocationSharp, IoCall, IoEarth } from 'react-icons/io5';
import { auth } from '@/auth';
import { Title } from '@/components';
import { getUserProfile } from '@/actions';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect('/');

  const user = await getUserProfile(session.user.id);

  if (!user) redirect('/');

  return (
    <div className='fade-in max-w-6xl mx-auto sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <Title title='Profile' subtitle='Manage your account information' />
      </div>

      <div className='grid gap-6 lg:grid-cols-4'>
        {/* Profile Card */}
        <div className='lg:col-span-1'>
          <div className='rounded-md border border-slate-200 shadow-sm overflow-hidden h-full'>
            <div className='p-6 flex flex-col items-center gap-4'>
              {/* Avatar */}
              <div className='relative h-32 w-32 rounded-full border-4 border-blue-100'>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User avatar'}
                    width={128}
                    height={128}
                    className='h-full w-full rounded-full object-cover'
                    priority
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-4xl font-medium text-white'>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>

              <div className='text-center space-y-1'>
                <h3>{user.name}</h3>
                <span className='inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>
            {/* Static buttons for layout purposes only */}
            <div className='p-6 space-y-3 border-t border-slate-200'>
              <button className='btn-primary w-full flex items-center justify-center text-sm'>
                Edit profile
              </button>
              <button className='btn-secondary w-full flex items-center justify-center text-sm'>
                Security settings
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className='lg:col-span-3'>
          <div className='rounded-md border border-slate-200 shadow-sm overflow-hidden h-full'>
            <div className='border-b border-slate-200 p-6'>
              <h3>Account details</h3>
            </div>

            <div className='p-6 space-y-8'>
              {/* Personal Info */}
              <div>
                <h4 className='font-medium mb-6'>Personal information</h4>
                <div className='flex flex-col md:flex-row gap-6'>
                  <InfoField
                    icon={<IoPerson className='h-5 w-5 text-blue-600' />}
                    label='Name'
                    value={user.name || 'Not provided'}
                  />
                  <InfoField
                    icon={<IoMail className='h-5 w-5 text-blue-600' />}
                    label='Email'
                    value={user.email}
                  />
                  <InfoField
                    icon={<IoCall className='h-5 w-5 text-blue-600' />}
                    label='Phone'
                    value={user.address ? user.address.phone : 'Not provided'}
                  />
                </div>
              </div>

              {/* Address Info */}
              <div>
                <h4 className='text-md font-medium text-slate-700 mb-6'>
                  Address information
                </h4>
                {user.address ? (
                  <div className='flex flex-col md:flex-row gap-6'>
                    <div>
                      <InfoField
                        icon={<IoEarth className='h-5 w-5 text-blue-600' />}
                        label='Country'
                        value={user.address?.country?.name ?? 'Not provided'}
                      />
                    </div>
                    <div>
                      <InfoField
                        icon={<IoLocationSharp className='h-5 w-5 text-blue-600' />}
                        label='Full address'
                        value={formatAddress(user.address)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='text-center p-6 bg-slate-50 rounded-md'>
                    <p>No address information available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Format full address
function formatAddress(address: {
  address: string;
  address2?: string | null;
  city: string;
  zipCode: string;
}) {
  return (
    <>
      {address.address}
      {address.address2 && <>, {address.address2}</>}
      {', '}
      {address.city}, {address.zipCode}
    </>
  );
}

// Info field display component
function InfoField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className='flex items-start gap-4'>
      <div className='rounded-lg bg-blue-50 p-3 flex-shrink-0'>{icon}</div>
      <div className='min-w-0'>
        <p className='text-sm text-slate-500 mb-1'>{label}</p>
        <p className='font-medium text-slate-800 break-words'>{value}</p>
      </div>
    </div>
  );
}
