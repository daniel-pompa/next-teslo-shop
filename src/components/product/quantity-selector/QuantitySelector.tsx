'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity < 1 || newQuantity > 5) return; // Quantity limits
    onQuantityChange(newQuantity);
  };

  return (
    <div className='flex items-center justify-center sm:justify-start space-x-3'>
      <button onClick={() => handleQuantityChange(-1)} aria-label='Decrease quantity'>
        <IoRemoveCircleOutline size={35} />
      </button>
      <span className='flex items-center justify-center w-8 h-8 border bg-slate-100 rounded-full text-center text-base'>
        {quantity}
      </span>
      <button onClick={() => handleQuantityChange(1)} aria-label='Increase quantity'>
        <IoAddCircleOutline size={35} />
      </button>
    </div>
  );
};
