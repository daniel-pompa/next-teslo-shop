'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';

export const OrderSummary = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  const { getSummaryInformation } = useCartStore();

  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  // Delay initialization until the component is mounted
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace('/empty');
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) return <p>Loading...</p>;

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
    </>
  );
};
