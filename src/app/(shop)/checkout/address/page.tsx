import { auth } from '@/auth';
import { Title } from '@/components';
import { getCountries, getUserAddress } from '@/actions';
import { AddressForm } from './ui/AddressForm';

export default async function AddressPage() {
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user) return <h3 className='text-center mt-10'>You are not logged in</h3>;

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <div className='flex flex-col items-center mb-20 px-4'>
      <div className='w-full max-w-[1024px]'>
        {/* Title */}
        <Title title='Address' subtitle='Delivery address' />
        {/* Form */}
        <AddressForm countries={countries} userStoredAddress={userAddress} />
      </div>
    </div>
  );
}
