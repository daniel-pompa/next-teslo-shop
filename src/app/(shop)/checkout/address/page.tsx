import { Title } from '@/components';
import { getCountries } from '@/actions';
import { AddressForm } from './ui/AddressForm';

export default async function AddressPage() {
  const countries = await getCountries();

  return (
    <div className='flex flex-col items-center mb-20 px-4'>
      <div className='w-full max-w-[1024px]'>
        {/* Title */}
        <Title title='Address' subtitle='Delivery address' />
        {/* Form */}
        <AddressForm countries={countries} />
      </div>
    </div>
  );
}
