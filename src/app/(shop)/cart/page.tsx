import Link from 'next/link';
import { Title } from '@/components';
import { FaShoppingCart } from 'react-icons/fa';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

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
          <OrderSummary />
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
