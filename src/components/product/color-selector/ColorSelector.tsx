'use client';
import clsx from 'clsx';

interface Props {
  selectedColor?: string;
  availableColors: string[];
  onColorSelected: (color: string) => void;
}

export const ColorSelector = ({
  selectedColor,
  availableColors,
  onColorSelected,
}: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {availableColors.map(color => (
        <button
          key={color}
          onClick={() => onColorSelected(color)}
          className={clsx(
            'w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
            {
              'border-slate-400': color === selectedColor, // Darker edge color pass selector
              'border-slate-200': color !== selectedColor, // Clear border for those not selected
            }
          )}
          style={{ backgroundColor: color }} // Use the direct value of the color
          aria-label={`Select color ${color}`}
        >
          {color === selectedColor && ( // Check icon for the selected color
            <svg
              className={clsx('w-5 h-5', {
                'text-black': color === '#ffffff' || color === 'white', // Check black for white
                'text-white': color !== '#ffffff' && color !== 'white', // Check white for other colors
              })}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};
