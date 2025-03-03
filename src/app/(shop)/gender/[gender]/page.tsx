export const revalidate = 60; // 60 seconds

import { notFound, redirect } from 'next/navigation';
import { Gender } from '@prisma/client';
import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';
import { categoryData } from '@/constants';

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page: string }>;
}

// Generates the static parameters for the dynamic routes.
export async function generateStaticParams() {
  return Object.keys(categoryData).map(gender => ({
    gender,
  }));
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;

  // Await searchParams to resolve the promise
  const resolvedSearchParams = await searchParams;

  // Validate and parse page number
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;

  // Check if the gender is valid
  if (!categoryData[gender as keyof typeof categoryData]) {
    notFound(); // Redirect to the not-found page
  }

  // Fetch products for the valid gender
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  // Get title and subtitle for the current gender
  const { title, subtitle } = categoryData[gender as keyof typeof categoryData];

  return (
    <>
      <Title title={title} subtitle={subtitle} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
