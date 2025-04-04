'use client';
import Link from 'next/link';
import clsx from 'clsx';
import {
  IoCart,
  IoClose,
  IoPeople,
  IoPersonCircle,
  IoSearch,
  IoShirt,
} from 'react-icons/io5';
import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
import { useUIStore } from '@/store';
import { logOut } from '@/actions';

export const SideMenu = () => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUIStore(state => state.closeSideMenu);

  const handleSignOut = () => {
    logOut();
    closeSideMenu();
  };

  return (
    <div>
      {/* Background */}
      {isSideMenuOpen && (
        <div
          className='fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-20'
          onClick={closeSideMenu}
        />
      )}
      {/* SideMenu */}
      <aside
        className={clsx(
          'fixed top-0 right-0 w-[360px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 ease-in-out',
          {
            'translate-x-0': isSideMenuOpen,
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        {/* Close button */}
        <IoClose
          size={30}
          className='absolute top-5 right-5 cursor-pointer text-slate-700 hover:text-slate-900 font-extrabold'
          onClick={closeSideMenu}
        />
        {/* SideMenu content */}
        <div className='relative mt-16 px-4'>
          {/* Search input */}
          <div className='relative'>
            <IoSearch size={24} className='absolute top-2 left-2 text-slate-400' />
            <input
              type='text'
              placeholder='Search'
              className='w-full bg-slate-50 px-10 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 '
            />
          </div>
        </div>
        {/* Menu */}
        <nav className='relative mt-10 px-4'>
          {/* Menu items */}
          <Link
            href='/profile'
            onClick={closeSideMenu}
            className='flex items-center p-2 hover:bg-slate-50 rounded transition-all'
          >
            <IoPersonCircle size={24} className='text-slate-700 mr-2' />
            <span>Profile</span>
          </Link>
          <Link
            href='/'
            className='flex items-center p-2 hover:bg-slate-50 rounded transition-all'
          >
            <IoCart size={24} className='text-slate-700 mr-2' />
            <span>Orders</span>
          </Link>
          <Link
            href='/auth/sign-in'
            onClick={closeSideMenu}
            className='flex items-center p-2 hover:bg-slate-50 rounded transition-all'
          >
            <RiLoginCircleFill size={24} className='text-slate-700 mr-2' />
            <span>Sign in</span>
          </Link>
          <Link
            href='/'
            onClick={handleSignOut}
            className='flex items-center p-2 hover:bg-slate-50 rounded transition-all'
          >
            <RiLogoutCircleFill size={24} className='text-slate-700 mr-2' />
            <span>Sign out</span>
          </Link>
          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-200 my-5'></div>
          <Link
            href='/'
            className='flex items-center p-2 hover:bg-slate-50 rounded transition-all'
          >
            <IoShirt size={24} className='text-slate-700 mr-2' />
            <span>Products</span>
          </Link>
          <Link
            href='/'
            className='flex items-center p-2 hover:bg-slate-50 rounded transition-all'
          >
            <IoCart size={24} className='text-slate-700 mr-2' />
            <span>Orders</span>
          </Link>
          <Link
            href='/'
            className='flex items-center p-2 hover:bg-slate-50 rounded transition-all'
          >
            <IoPeople size={24} className='text-slate-700 mr-2' />
            <span>Customers</span>
          </Link>
        </nav>
      </aside>
    </div>
  );
};
