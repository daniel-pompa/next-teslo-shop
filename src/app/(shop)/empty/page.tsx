import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export default function EmptyPage() {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='mb-6'>
        <IoCartOutline size={120} className='text-slate-500' />
      </div>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Your cart is empty</h1>
      <p className='text-gray-600 mb-8'>
        It looks like you haven&#39;t added any products to your cart yet, explore our
        products and find something you like!
      </p>
      <Link href='/' className='btn-primary'>
        Continue shopping
      </Link>
    </div>
  );
}
