'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';

export const OrderSummary = () => {
  const router = useRouter();

  // State to handle hydration
  const [loaded, setLoaded] = useState(false);

  const { getSummaryInformation } = useCartStore();

  // Get the summary information from the store
  const { itemsInCart, subTotal, tax, shippingCost, total } = getSummaryInformation();

  // Hydration: Delay initialization until the component is mounted
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Redirect to empty cart page if no items
    if (itemsInCart === 0 && loaded === true) {
      router.replace('/empty');
    }
  }, [itemsInCart, loaded, router]);

  // If not loaded yet, show loading message
  if (!loaded) return <p className='text-center my-3'>Loading...</p>;

  return (
    <>
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
      {/* Shipping cost */}
      <div className='flex justify-between mb-4'>
        <p>Shipping</p>
        <div className='text-right'>
          <p className='font-semibold'>{formatCurrency(shippingCost)}</p>
          {shippingCost === 0 && (
            <p className='text-green-700 text-sm'>You qualify for free shipping!</p>
          )}
        </div>
      </div>
      {/* Total */}
      <div className='flex justify-between border-t border-slate-300 pt-4 mb-6'>
        <p className='text-lg font-bold'>Total</p>
        <p className='text-xl font-bold text-slate-800'>{formatCurrency(total)}</p>
      </div>
    </>
  );
};
