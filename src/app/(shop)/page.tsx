import { redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  // Await searchParams to resolve the promise
  const resolvedSearchParams = await searchParams;

  // Validate and parse page number
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  console.log({ currentPage, totalPages });

  if (products.length === 0) redirect('/');

  return (
    <>
      <Title
        title='Welcome to Teslo Shop'
        subtitle='Discover premium products designed for your lifestyle.'
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
