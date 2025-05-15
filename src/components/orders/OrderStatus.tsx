import clsx from 'clsx';
import React from 'react';
import { IoCard } from 'react-icons/io5';

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div className='mb-8'>
      <div
        className={clsx(
          'flex w-full justify-center items-center gap-2 mt-2 py-3 px-4 font-bold rounded',
          {
            'bg-green-200 text-green-700': isPaid,
            'bg-red-200 text-red-700': !isPaid,
          }
        )}
      >
        <IoCard size={20} />
        <span>Payment Status: {isPaid ? 'Paid' : 'Not paid'}</span>
      </div>
    </div>
  );
};
