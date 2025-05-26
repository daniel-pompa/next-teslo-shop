import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { getOrders } from '@/actions';
import { Title, Pagination } from '@/components';
import { formatCurrency, formatDate } from '@/utils';

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;

  const {
    ok,
    orders = [],
    totalPages = 1,
    totalCount = 0,
  } = await getOrders(currentPage);

  if (!ok) redirect('/auth/sign-in');

  const subtitle =
    totalCount === 0
      ? 'No orders recorded in the system'
      : `System order volume: ${totalCount.toLocaleString()}`;

  return (
    <div className='container mx-auto'>
      <Title title='All orders' subtitle={subtitle} />

      {orders.length === 0 ? (
        <p>
          There are currently no orders in the system. Once users place orders,
          they&#39;ll appear here.
        </p>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
            {orders.map(order => (
              <div key={order.id} className='rounded-md shadow p-5 border'>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='text-lg font-semibold'>#{order.id.split('-').at(-1)}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center 
                    ${
                      order.isPaid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <IoCardOutline className='mr-1 size-4' />
                    {order.isPaid ? 'Paid' : 'Not paid'}
                  </span>
                </div>

                <div className='flex flex-col gap-2 mb-4 text-sm'>
                  <p>
                    <span className='font-bold'>Name:</span>{' '}
                    <span>
                      {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                    </span>
                  </p>
                  <p>
                    <span className='font-bold'>Items:</span>{' '}
                    <span>{order.itemsInOrder}</span>
                  </p>
                  <p>
                    <span className='font-bold'>Total:</span>{' '}
                    <span>{formatCurrency(order.total)}</span>
                  </p>
                  <p>
                    <span className='font-bold'>Shipping:</span>{' '}
                    <span>
                      {order.shippingCost === 0
                        ? 'Free'
                        : `${formatCurrency(order.shippingCost)}`}
                    </span>
                  </p>
                  <p>
                    <span className='font-bold'>Date:</span>{' '}
                    <span>{formatDate(order.createdAt, 'en-US', 'long', true)}</span>
                  </p>
                </div>

                <Link
                  href={`/orders/${order.id}`}
                  className='btn-primary block w-full sm:w-fit text-center text-sm'
                >
                  View order
                </Link>
              </div>
            ))}
          </div>

          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </>
      )}
    </div>
  );
}
