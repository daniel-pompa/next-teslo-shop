import { Title } from '@/components';
import Link from 'next/link';
import { IoCard } from 'react-icons/io5';

export default function OrdersPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Title */}
      <Title title='Orders' subtitle='Manage and review your orders' />
      {/* Orders Table */}
      <div className='mb-10 overflow-x-auto'>
        <table className='min-w-full bg-white border border-slate-200 rounded-md overflow-hidden text-sm sm:text-base text-slate-600 text-center'>
          {/* Table Header */}
          <thead className='bg-slate-100 font-medium text-slate-700'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                #ID
              </th>
              <th scope='col' className='px-6 py-4'>
                Name
              </th>
              <th scope='col' className='px-6 py-4'>
                Status
              </th>
              <th scope='col' className='px-6 py-4'>
                Options
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {/* Order 1: Paid */}
            <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-slate-50'>
              <td className='px-6 py-4 whitespace-nowrap font-medium text-slate-900'>
                1
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>Mark</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center justify-center text-green-600'>
                  <IoCard />
                  <span className='ml-2'>Paid</span>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <Link href='/orders/123' className='text-blue-600 hover:underline'>
                  View order
                </Link>
              </td>
            </tr>
            {/* Order 2: Not Paid */}
            <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-slate-50'>
              <td className='px-6 py-4 whitespace-nowrap font-medium text-slate-900'>
                2
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>John</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center justify-center text-red-600'>
                  <IoCard />
                  <span className='ml-2'>Not paid</span>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <Link
                  href='/orders/019525a5-6653-7038-a0a3-7526023e25c5'
                  className='text-blue-600 hover:underline'
                >
                  View order
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
