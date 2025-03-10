'use client';
import Link from 'next/link';
import { IoSearch, IoCart } from 'react-icons/io5';
import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import { useEffect, useState } from 'react';

export const TopMenu = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu);
  const totalItemsInCart = useCartStore(state => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <header>
      <nav className='fixed top-0 z-10 w-full bg-white border-b-2 border-slate-200 shadow-sm px-5 py-4'>
        <div className='flex justify-between items-center space-x-4 container mx-auto'>
          {/* Logo */}
          <div>
            <Link href='/'>
              <span
                className={`${titleFont.className} text-2xl md:text-3xl font-extrabold`}
              >
                Teslo
              </span>
              <span className='text-2xl md:text-3xl text-slate-500 hover:text-slate-700 transition-colors'>
                {' '}
                Shop
              </span>
            </Link>
          </div>
          {/* Center menu links */}
          <div className='hidden sm:flex space-x-4'>
            <Link
              href='/gender/men'
              className='px-4 py-2 hover:bg-slate-50 rounded-md transition-all duration-300'
            >
              Men
            </Link>
            <Link
              href='/gender/women'
              className='px-4 py-2 hover:bg-slate-50 rounded-md transition-all duration-300'
            >
              Women
            </Link>
            <Link
              href='/gender/kid'
              className='px-4 py-2 hover:bg-slate-50 rounded-md transition-all duration-300'
            >
              Kids
            </Link>
          </div>
          {/* Search, cart, menu */}
          <div className='flex items-center space-x-4'>
            <Link href='/search'>
              <IoSearch
                size={24}
                className='text-slate-700 hover:text-slate-900 transition-colors duration-300'
              />
            </Link>
            <Link href='/cart'>
              <div className='relative'>
                {
                  // Show badge if there are items in the cart
                  loaded && totalItemsInCart > 0 && (
                    <span className='absolute -top-2 -right-2 bg-blue-600 w-4 h-4 text-xs text-white rounded-full flex items-center justify-center'>
                      {totalItemsInCart}
                    </span>
                  )
                }
                <IoCart
                  size={24}
                  className='text-slate-700 hover:text-slate-900 transition-colors duration-300'
                />
              </div>
            </Link>
            <button
              className='px-4 py-2 hover:bg-slate-50 rounded-md transition-all duration-300'
              onClick={openSideMenu}
            >
              Menu
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
