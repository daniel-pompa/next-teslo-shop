'use client';
import { paypalCheckPayment, setTransactionId } from '@/actions';
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isResolved }] = usePayPalScriptReducer();

  const roundedAmount = Number(amount.toFixed(2));

  if (!isResolved) {
    return (
      <div className='animate-pulse mb-14'>
        <div className='h-12 bg-slate-200 rounded'></div>
        <div className='h-12 bg-slate-200 rounded mt-3'></div>
      </div>
    );
  }

  /**
   * Create a new PayPal order when the button is clicked.
   * It also saves the PayPal transaction ID to the database.
   */
  const createOrder: PayPalButtonsComponentProps['createOrder'] = async (
    data,
    actions
  ) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: `${roundedAmount}`,
          },
        },
      ],
      intent: 'CAPTURE',
    });
    // Save the transaction ID to the database
    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error('Failed to set transaction ID.');
    }
    return transactionId;
  };

  /**
   * Capture the PayPal payment when the user approves the transaction.
   * It also updates the order status in the database.
   */
  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data, actions) => {
    try {
      const details = await actions.order?.capture();
      const paypalTransactionId = details?.id;

      if (!paypalTransactionId) {
        throw new Error('No PayPal transaction ID returned.');
      }

      await paypalCheckPayment(paypalTransactionId);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Payment approval failed:', error);
      }
    }
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
