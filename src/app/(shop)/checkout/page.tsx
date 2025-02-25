import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/components';
import { initialData } from '@/data/seed';
import { formatCurrency } from '@/utils';
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';

// Example data for delivery address
const deliveryAddress = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main Street',
  address2: 'Apartament 6', // Optional
  zipCode: '12345',
  city: 'New York',
  country: 'USA',
  phone: '555-123-4567',
};

const productsInCart = [initialData.products[0], initialData.products[1]];

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
          {productsInCart.map(product => (
            <div
              key={product.slug}
              className='flex flex-col sm:flex-row items-center gap-6 p-4 mb-4 border rounded-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
            >
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
                  {formatCurrency(product.price)} x 1
                </p>
                {/* Subtotal price */}
                <div className='mt-4'>
                  <h3 className='font-bold text-base sm:text-lg'>
                    Subtotal: {formatCurrency(product.price)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Order summary and delivery address */}
        <div className='bg-slate-50 p-6 rounded-lg shadow-md h-fit'>
          {/* Delivery Address */}
          <h2 className='font-bold text-xl mb-6 flex items-center gap-2'>
            <FaMapMarkerAlt /> Delivery address
          </h2>
          {/* Display delivery address */}
          <div className='space-y-4'>
            <p>
              <span className='font-bold'>Name:</span> {deliveryAddress.firstName}{' '}
              {deliveryAddress.lastName}
            </p>
            <p>
              <span className='font-bold'>Address:</span> {deliveryAddress.address}
            </p>
            {deliveryAddress.address2 && (
              <p>
                <span className='font-bold'>Address 2:</span> {deliveryAddress.address2}
              </p>
            )}
            <p>
              <span className='font-bold'>Zip Code:</span> {deliveryAddress.zipCode}
            </p>
            <p>
              <span className='font-bold'>City:</span> {deliveryAddress.city}
            </p>
            <p>
              <span className='font-bold'>Country:</span> {deliveryAddress.country}
            </p>
            <p>
              <span className='font-bold'>Phone:</span> {deliveryAddress.phone}
            </p>
          </div>
          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-300 my-5'></div>

          {/* Order Summary */}
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
          {/* Terms and conditions */}
          <p className='text-sm text-slate-600 mb-5'>
            By clicking the button below, you agree to our{' '}
            <Link
              href='#'
              className='text-sm text-blue-600 hover:text-blue-800 underline transition-colors duration-200'
            >
              terms and conditions
            </Link>
            .
          </p>
          {/* Order button */}
          <div>
            <Link
              href='/orders/019525a5-6653-7038-a0a3-7526023e25c5'
              className='btn-primary flex items-center justify-center'
            >
              Place order
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
