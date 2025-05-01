'use client';
import Link from 'next/link';
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { formatCurrency } from '@/utils';
import { useEffect, useState } from 'react';
import { useAddressStore, useCartStore } from '@/store';
import clsx from 'clsx';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const deliveryAddress = useAddressStore(state => state.address);

  const { getSummaryInformation } = useCartStore();

  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  const cart = useCartStore(state => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToBuy = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    console.log(deliveryAddress, productsToBuy);
    setIsPlacingOrder(false);
  };

  if (!loaded) return <p className='text-center my-3'>Loading...</p>;

  return (
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
        <p className='font-semibold'>
          {itemsInCart === 1 ? `${itemsInCart} item` : `${itemsInCart} items`}
        </p>
      </div>
      {/* Subtotal */}
      <div className='flex justify-between mb-4'>
        <p>Subtotal</p>
        <p className='font-semibold'>{formatCurrency(subTotal)}</p>
      </div>
      {/* Sale Tax */}
      <div className='flex justify-between mb-4'>
        <p>Sale Tax (9%)</p>
        <p className='font-semibold'>{formatCurrency(tax)}</p>
      </div>
      {/* Shipping */}
      <div className='flex justify-between mb-4'>
        <p>Shipping</p>
        <p className='font-semibold'>{formatCurrency(0)}</p>
      </div>
      {/* Total */}
      <div className='flex justify-between border-t border-slate-300 pt-4 mb-6'>
        <p className='text-lg font-bold'>Total</p>
        <p className='text-xl font-bold text-slate-800'>{formatCurrency(total)}</p>
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
        <button
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary w-full': !isPlacingOrder,
            'btn-disabled w-full': isPlacingOrder,
          })}
          disabled={isPlacingOrder}
        >
          Place order
        </button>
      </div>
    </div>
  );
};
