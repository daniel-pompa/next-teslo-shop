import { redirect } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { IoCard } from 'react-icons/io5';
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { Title } from '@/components';
import { getOrderById } from '@/actions';
import { calculateShippingCost, formatCurrency } from '@/utils';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  // Extract the order ID from the URL params
  const { id } = await params;

  // Attempt to fetch the order by its ID
  const { ok, order } = await getOrderById(id);

  // If the order fetch fails or the order is missing its address, redirect the user
  if (!ok || !order || !order.OrderAddress) {
    redirect('/');
  }

  const deliveryAddress = order.OrderAddress;

  // Calculate shipping cost based on subtotal
  const shippingCost = calculateShippingCost(order.subtotal);

  return (
    <>
      {/* Order title and description */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <Title
          title={`Order #${id.split('-').at(-1)}`}
          subtitle='Review your order details and delivery information'
        />
      </div>
      {/* Main content grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Order items section */}
        <div className='lg:col-span-2'>
          {order.OrderItem.map(item => (
            <div
              key={`${item.product.slug}-${item.size}`}
              className='flex flex-col sm:flex-row items-center gap-6 p-4 mb-4 border rounded-md hover:shadow-lg transition-shadow duration-300'
            >
              <div className='flex-shrink-0'>
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={`"Product image for ${item.product.title}`}
                  width={220}
                  height={220}
                  priority
                  className='rounded-md w-44 h-44 object-cover'
                />
              </div>

              <div className='w-full flex-1 text-center sm:text-left'>
                <h2 className='font-bold text-xl'>{item.product.title}</h2>
                <p className='text-lg font-bold mt-2 text-slate-700'>
                  {formatCurrency(item.price)} x {item.quantity}
                </p>
                <div className='mt-4'>
                  <h3 className='font-bold text-base sm:text-lg'>
                    Subtotal: {formatCurrency(item.price * item.quantity)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Summary and delivery address section */}
        <div className='bg-slate-50 p-6 rounded-lg shadow-md h-fit'>
          <h2 className='font-bold text-xl mb-6 flex items-center gap-2'>
            <FaMapMarkerAlt /> Delivery address
          </h2>
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
              <span className='font-bold'>Country:</span>{' '}
              {deliveryAddress.country?.name ?? 'N/A'}
            </p>
            <p>
              <span className='font-bold'>Phone:</span> {deliveryAddress.phone}
            </p>
          </div>

          <div className='w-full h-[1px] bg-slate-300 my-5' />

          <h2 className='font-bold text-xl mb-6 flex items-center gap-2'>
            <FaShoppingCart /> Order summary
          </h2>

          <div className='flex justify-between mb-4'>
            <p>Items</p>
            <p className='font-semibold'>{order.itemsInOrder}</p>
          </div>

          <div className='flex justify-between mb-4'>
            <p>Subtotal</p>
            <p className='font-semibold'>{formatCurrency(order.subtotal)}</p>
          </div>

          <div className='flex justify-between mb-4'>
            <p>Sale Tax (9%)</p>
            <p className='font-semibold'>{formatCurrency(order.tax)}</p>
          </div>

          <div className='flex justify-between mb-4'>
            <p>Shipping</p>
            <div className='text-right'>
              <p className='font-semibold'>{formatCurrency(shippingCost)}</p>
              {shippingCost === 0 && (
                <p className='text-green-700 text-sm'>You qualify for free shipping!</p>
              )}
            </div>
          </div>

          <div className='flex justify-between border-t border-slate-300 pt-4 mb-6'>
            <p className='text-lg font-bold'>Total</p>
            <p className='text-xl font-bold text-slate-800'>
              {formatCurrency(order.total)}
            </p>
          </div>

          {/* Payment status */}
          <div className='flex items-center justify-center sm:justify-start mb-8'>
            <div
              className={clsx(
                'flex w-full items-center gap-2 py-2 px-4 text-sm font-bold text-white rounded',
                {
                  'bg-green-600': order.isPaid,
                  'bg-red-600': !order.isPaid,
                }
              )}
            >
              <IoCard size={20} />
              <span>Payment Status: {order.isPaid ? 'Paid' : 'Not paid'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
