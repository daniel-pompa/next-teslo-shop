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
  const removeProductFromCart = useCartStore(state => state.removeProductFromCart);

  return (
    <>
      {productsInCart.map(product => (
        <div
          key={`${product.slug}-${product.size}`}
          className='relative flex flex-col sm:flex-row items-center gap-5 p-4 mb-4 border border-slate-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300'
        >
          {/* Remove button */}
          <button
            onClick={() => removeProductFromCart(product)}
            className='absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200'
            aria-label='Remove product'
          >
            <FaTrash size={16} />
          </button>
          {/* Product image */}
          <div className='flex-shrink-0'>
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={176}
              height={176}
              priority
              className='rounded-lg w-44 h-44 object-cover'
            />
          </div>
          {/* Product details */}
          <div className='w-full flex-1'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1'>
              {/* Product size and title */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                <div className='bg-slate-100 border rounded-full text-sm w-8 h-8 flex items-center justify-center font-medium text-gray-700 self-start sm:self-auto'>
                  {product.size}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  className='text-lg sm:text-xl font-semibold hover:underline'
                >
                  {product.title}
                </Link>
              </div>
              {/* Price */}
              <p className='font-bold'>{formatCurrency(product.price)}</p>
            </div>
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
