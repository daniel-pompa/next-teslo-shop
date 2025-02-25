import Link from 'next/link';
import Image from 'next/image';
import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/data/seed';
import { formatCurrency } from '@/utils';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const productsInCart = [initialData.products[0], initialData.products[1]];

export default function CartPage() {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        {/* Title */}
        <Title title='Cart' subtitle='Your selected products' />
        {/* Continue shopping link */}
        <Link
          href='/'
          className='btn-primary w-full sm:w-2/6 md:w-1/6 flex items-center justify-center mb-6'
        >
          Continue shopping
        </Link>
      </div>
      {/* Grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Shopping cart */}
        <div className='lg:col-span-2'>
          {/* Items */}
          {productsInCart.map(product => (
            <div
              key={product.slug}
              className='flex flex-col sm:flex-row items-center gap-6 p-4 mb-4 border rounded-md hover:shadow-lg transition-shadow duration-300 ease-in-out relative'
            >
              {/* Remove button */}
              <button className='absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200'>
                <FaTrash size={20} />
              </button>
              {/* Product image */}
              <div className='flex-shrink-0'>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={220}
                  height={220}
                  priority
                  className='rounded-md w-44 h-44 object-cover'
                />
              </div>
              {/* Product details */}
              <div className='w-full flex-1 text-center sm:text-left'>
                <h2 className='font-bold text-xl'>{product.title}</h2>
                <p className='text-lg font-bold mt-2 text-slate-700'>
                  {formatCurrency(product.price)}
                </p>
                {/* Quantity selector */}
                <div className='mt-4'>
                  <QuantitySelector quantity={1} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Checkout - Order summary */}
        <div className='bg-slate-50 p-6 rounded-lg shadow-md h-fit'>
          <h2 className='font-bold text-xl mb-6 flex items-center gap-2'>
            <FaShoppingCart /> Order summary
          </h2>
          {/* Items in cart */}
          <div className='flex justify-between mb-4'>
            <p>Items</p>
            <p className='font-semibold'>{productsInCart.length}</p>
          </div>
          {/* Subtotal */}
          <div className='flex justify-between mb-4'>
            <p>Subtotal</p>
            <p className='font-semibold'>{formatCurrency(275)}</p>
          </div>
          {/* Sale Tax */}
          <div className='flex justify-between mb-4'>
            <p>Sale Tax (9%)</p>
            <p className='font-semibold'>{formatCurrency(24.75)}</p>
          </div>
          {/* Shipping */}
          <div className='flex justify-between mb-4'>
            <p>Shipping</p>
            <p className='font-semibold'>{formatCurrency(0)}</p>
          </div>
          {/* Total */}
          <div className='flex justify-between border-t border-slate-300 pt-4 mb-6'>
            <p className='text-lg font-bold'>Total</p>
            <p className='text-xl font-bold text-slate-800'>{formatCurrency(299.75)}</p>
          </div>
          {/* Checkout button */}
          <div>
            <Link
              href='/checkout/address'
              className='btn-primary flex items-center justify-center'
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
