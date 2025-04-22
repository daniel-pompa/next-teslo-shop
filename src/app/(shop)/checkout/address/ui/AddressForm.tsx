'use client';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
  saveAddress: boolean;
};

export const AddressForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      // TODO: Set default values from database
    },
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6'
    >
      {/* First name */}
      <div className='flex flex-col'>
        <label htmlFor='firstName' className='font-medium mb-1'>
          First name
        </label>
        <input
          id='firstName'
          type='text'
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('firstName', { required: true })}
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
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('lastName', { required: true })}
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
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('address', { required: true })}
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
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('address2')}
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
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('zipCode', { required: true })}
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
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('city', { required: true })}
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
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('country', { required: true })}
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
          className='p-2 border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
          {...register('phone', { required: true })}
          placeholder='Enter your phone number'
        />
      </div>

      {/* Next Button */}
      <div className='flex flex-col sm:col-span-2 mt-1'>
        <div className='inline-flex items-center'>
          <label
            className='relative flex cursor-pointer items-center rounded-full'
            htmlFor='checkbox'
          >
            <input
              id='checkbox'
              type='checkbox'
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              {...register('saveAddress')}
            />
            <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </label>
          <p className='text-slate-700 ml-3'>Save this address for next time?</p>
        </div>

        <button
          type='submit'
          className={clsx(
            'flex justify-center w-full sm:w-1/3 mx-auto mt-6',
            isValid ? 'btn-primary' : 'btn-disabled'
          )}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </form>
  );
};
