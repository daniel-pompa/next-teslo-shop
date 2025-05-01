'use client';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';

export const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart);

  return (
    <>
      {productsInCart.map(product => (
        <div
          key={`${product.slug}-${product.size}`}
          className='flex flex-col sm:flex-row items-center gap-4 p-4 mb-4 border rounded-md bg-white shadow-sm hover:shadow-md transition duration-300'
        >
          {/* Product image */}
          <div className='flex-shrink-0'>
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={160}
              height={160}
              priority
              className='rounded-lg w-40 h-40 object-cover'
            />
          </div>
          {/* Product details */}
          <div className='w-full flex-1'>
            {/* Title with size badge and quantity */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-1'>
              {/* Title with size badge */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1'>
                <div className='bg-slate-100 border rounded-full text-sm w-8 h-8 flex items-center justify-center font-medium text-slate-700'>
                  {product.size}
                </div>
                <h3 className='font-semibol break-words leading-snug'>{product.title}</h3>
              </div>
              {/* Quantity */}
              <p className='text-slate-500 whitespace-nowrap'>
                Quantity: <span className='font-medium'>{product.quantity}</span>
              </p>
            </div>
            {/* Price */}
            <p className='font-bold mt-3'>
              {formatCurrency(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
