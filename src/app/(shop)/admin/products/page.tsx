import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { getPaginatedProductsWithImages } from '@/actions';
import { Title, Pagination, ProductImage } from '@/components';
import { formatCurrency } from '@/utils';

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) redirect('/');

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 sm:mb-0'>
        <div>
          <Title title='Product catalog' subtitle='Manage your inventory' />
        </div>
        <Link
          href='/admin/product/new-product'
          className='btn-primary flex items-center justify-center gap-2 transition-all'
        >
          <FiPlus className='text-lg' />
          <span>Add product</span>
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {products.map(product => (
          <div
            key={product.id}
            className='relative rounded-md border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300'
          >
            <div className='absolute top-3 right-3 rounded-full p-1'>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  product.inStock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.inStock} in stock
              </span>
            </div>

            <Link href={`/product/${product.slug}`} className='block'>
              <ProductImage
                src={product.ProductImage[0]?.url}
                alt={product.title}
                width={300}
                height={300}
                className='w-full aspect-square object-cover border-b'
              />
            </Link>

            <div className='p-4 space-y-3'>
              <h3 className='font-medium line-clamp-1'>
                <Link
                  href={`/admin/product/${product.slug}`}
                  className='hover:underline hover:text-blue-500 transition-colors'
                >
                  {product.title}
                </Link>
              </h3>

              <div className='flex justify-between items-center'>
                <span className='font-semibold'>{formatCurrency(product.price)}</span>
                <span className='text-xs bg-gray-100 px-2 py-1 rounded capitalize'>
                  {product.gender}
                </span>
              </div>

              <div className='flex flex-wrap gap-1 mt-2'>
                {product.sizes.map(size => (
                  <span
                    key={size}
                    className='text-xs border rounded-full px-2 py-1 w-8 flex items-center justify-center'
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
