'use client';
import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleQuantityChange = (value: number) => {
    const newCount = count + value;
    if (newCount < 1 || newCount > 5) return; // Quantity limits
    setCount(newCount);
  };

  return (
    <div className='flex items-center justify-center sm:justify-start space-x-3'>
      <button onClick={() => handleQuantityChange(-1)} aria-label='Decrease quantity'>
        <IoRemoveCircleOutline size={35} />
      </button>
      <span className='flex items-center justify-center w-8 h-8 border bg-slate-100 rounded-full text-center text-base'>
        {count}
      </span>
      <button onClick={() => handleQuantityChange(1)} aria-label='Increase quantity'>
        <IoAddCircleOutline size={35} />
      </button>
    </div>
  );
};
