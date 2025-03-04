'use client';
import { useEffect, useState, useCallback } from 'react';
import { getStockBySlug } from '@/actions';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  return (
    <>
      {isLoading ? (
        <div className='p-2 rounded animate-pulse bg-slate-200'>&nbsp;</div>
      ) : (
        <h3 className={`font-semibold ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock > 0 ? `Only ${stock} left!` : 'Temporarily out of stock'}
        </h3>
      )}
    </>
  );
};
