'use client';
import clsx from 'clsx';
import type { Size } from '@/interfaces';

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {availableSizes.map(size => (
        <button
          key={size}
          onClick={() => onSizeChanged(size)}
          className={clsx(
            'flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200',
            {
              'border-blue-600 bg-blue-600 text-white': size === selectedSize,
              'border-slate-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white':
                size !== selectedSize, // Style for unselected sizes
            }
          )}
          aria-label={`Select size ${size}`}
        >
          <span className='text-sm font-medium'>{size}</span>
        </button>
      ))}
    </div>
  );
};
