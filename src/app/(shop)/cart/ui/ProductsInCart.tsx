'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';
import { QuantitySelector } from '@/components';

export const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart);
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);

  return (
    <>
      {productsInCart.map(product => (
        <div
          key={`${product.slug}-${product.size}`}
          className='flex flex-col sm:flex-row items-center gap-6 p-4 mb-4 border rounded-md hover:shadow-lg transition-shadow duration-300 ease-in-out relative'
        >
          {/* Remove button */}
          <button className='absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200'>
            <FaTrash size={20} />
          </button>
          {/* Product image */}
          <div className='flex-shrink-0'>
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={220}
              height={220}
              priority
              className='rounded-md w-44 h-44 object-cover'
            />
          </div>
          {/* Product details */}
          <div className='w-full flex-1 text-center sm:text-left'>
            <div className='flex items-center'>
              <div className='bg-slate-100 border rounded-full text-sm w-8 h-8 flex items-center justify-center mr-2'>
                {product.size}
              </div>
              <Link
                href={`/product/${product.slug}`}
                className='text-xl font-semibold hover:underline'
              >
                {product.title}
              </Link>
            </div>
            <p className='text-lg font-bold mt-2 text-slate-700'>
              {formatCurrency(product.price)}
            </p>
            {/* Quantity selector */}
            <div className='mt-4'>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={quantity => updateProductQuantity(product, quantity)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
