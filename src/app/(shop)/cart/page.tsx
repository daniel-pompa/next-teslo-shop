import Link from 'next/link';
import { Title } from '@/components';
import { formatCurrency } from '@/utils';
import { FaShoppingCart } from 'react-icons/fa';
import { ProductsInCart } from './ui/ProductsInCart';

export default function CartPage() {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        {/* Title */}
        <Title title='Cart' subtitle='Your selected products' />
        {/* Continue shopping link */}
        <Link
          href='/'
          className='btn-primary w-full sm:w-2/6 lg:w-1/6 flex items-center justify-center mb-6'
        >
          Continue shopping
        </Link>
      </div>
      {/* Grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Shopping cart */}
        <div className='lg:col-span-2'>
          {/* Items */}
          <ProductsInCart />
        </div>
        {/* Checkout - Order summary */}
        <div className='bg-slate-50 p-6 rounded-lg shadow-md h-fit'>
          <h2 className='font-bold text-xl mb-6 flex items-center gap-2'>
            <FaShoppingCart /> Order summary
          </h2>
          {/* Items in cart */}
          <div className='flex justify-between mb-4'>
            <p>Items</p>
            <p className='font-semibold'>{3}</p>
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
