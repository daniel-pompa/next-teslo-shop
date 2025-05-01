import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';

export default function CheckoutPage() {
  return (
    <>
      {/* Title and Edit Cart Button */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        {/* Title */}
        <Title title='Verify your order' subtitle='Review your selected products' />
        {/* Edit Cart Button */}
        <Link
          href='/cart'
          className='btn-primary w-full sm:w-2/6 md:w-1/6 flex items-center justify-center mb-6'
        >
          Edit cart
        </Link>
      </div>
      {/* Grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Shopping Cart */}
        <div className='lg:col-span-2'>
          {/* Items */}
          <ProductsInCart />
        </div>
        {/* Order summary and delivery address */}
        <PlaceOrder />
      </div>
    </>
  );
}
