'use client';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

export const PaypalButton = () => {
  const [{ isResolved }] = usePayPalScriptReducer();

  if (!isResolved) {
    return (
      <div className='animate-pulse mb-14'>
        <div className='h-12 bg-slate-200 rounded'></div>
        <div className='h-12 bg-slate-200 rounded mt-3'></div>
      </div>
    );
  }

  return <PayPalButtons />;
};
