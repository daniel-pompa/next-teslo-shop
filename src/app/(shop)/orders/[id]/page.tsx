import Image from 'next/image';
import clsx from 'clsx';
import { IoCard } from 'react-icons/io5';
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { Title } from '@/components';
import { initialData } from '@/data/seed';
import { formatCurrency } from '@/utils';

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

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      {/* Title and Edit Cart Button */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        {/* Title */}
        <Title
          title={`Order #${id}`}
          subtitle='Review your order details and delivery information'
        />
      </div>
      {/* Grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Shopping Cart */}
        <div className='lg:col-span-2'>
          {/* Items */}
          {productsInCart.map(product => (
            <div
              key={product.slug}
              className='flex flex-col sm:flex-row items-center gap-6 p-4 mb-4 border rounded-md hover:shadow-lg transition-shadow duration-300'
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
          {/* Delivery address */}
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
          {/* Payment Status */}
          <div className='flex items-center justify-center sm:justify-start mb-8'>
            <div
              className={clsx(
                'flex w-full items-center gap-2 py-2 px-4 text-sm font-bold text-white rounded',
                {
                  'bg-red-600': true,
                  'bg-green-600': false,
                }
              )}
            >
              <IoCard size={20} />
              <span>Payment Status: Pending</span>
              {/* <span>Payment status: Paid</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
