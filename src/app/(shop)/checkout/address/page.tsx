import { Title } from '@/components';
import Link from 'next/link';

export default function AddressPage() {
  return (
    <div className='flex flex-col items-center mb-20 px-4'>
      <div className='w-full max-w-[1024px]'>
        {/* Title */}
        <Title title='Address' subtitle='Delivery address' />

        {/* Form */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6'>
          {/* First name */}
          <div className='flex flex-col'>
            <label htmlFor='firstName' className='font-medium mb-1'>
              First name
            </label>
            <input
              id='firstName'
              type='text'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
              placeholder='Enter your first name'
            />
          </div>

          {/* Last name */}
          <div className='flex flex-col'>
            <label htmlFor='lastName' className='font-medium mb-1'>
              Last name
            </label>
            <input
              id='lastName'
              type='text'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
              placeholder='Enter your last name'
            />
          </div>

          {/* Address */}
          <div className='flex flex-col'>
            <label htmlFor='address' className='font-medium mb-1'>
              Address
            </label>
            <input
              id='address'
              type='text'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
              placeholder='Enter your address'
            />
          </div>

          {/* Address 2 (optional) */}
          <div className='flex flex-col'>
            <label htmlFor='address2' className='font-medium mb-1'>
              Address 2 <span className='text-slate-500'>(optional)</span>
            </label>
            <input
              id='address2'
              type='text'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
              placeholder='Enter apartment, suite, building, floor, etc.'
            />
          </div>

          {/* Zip Code */}
          <div className='flex flex-col'>
            <label htmlFor='zipCode' className='font-medium mb-1'>
              Zip Code
            </label>
            <input
              id='zipCode'
              type='text'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
              placeholder='Enter your zip code'
            />
          </div>

          {/* City */}
          <div className='flex flex-col'>
            <label htmlFor='city' className='font-medium mb-1'>
              City
            </label>
            <input
              id='city'
              type='text'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
              placeholder='Enter your city'
            />
          </div>

          {/* Country */}
          <div className='flex flex-col'>
            <label htmlFor='country' className='font-medium mb-1'>
              Country
            </label>
            <select
              id='country'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
            >
              <option value=''>Select your country</option>
              <option value='USA'>United States</option>
              <option value='ESP'>Spain</option>
              {/* Add more countries as needed */}
            </select>
          </div>

          {/* Phone */}
          <div className='flex flex-col'>
            <label htmlFor='phone' className='font-medium mb-1'>
              Phone
            </label>
            <input
              id='phone'
              type='text'
              className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
              placeholder='Enter your phone number'
            />
          </div>

          {/* Next Button */}
          <div className='flex flex-col sm:col-span-2 mt-6'>
            <Link
              href='/checkout'
              className='btn-primary flex justify-center w-full sm:w-1/3 mx-auto'
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
