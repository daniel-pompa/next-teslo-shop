'use client';
import Image from 'next/image';
import { Product } from '@/interfaces';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className='rounded-md overflow-hidden bg-white border border-slate-200 shadow-md'>
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className='w-full object-cover'
          width={300}
          height={300}
          priority
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className='flex flex-col p-4'>
        <Link href={`/product/${product.slug}`} className='hover:text-blue-600'>
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </div>
  );
};
