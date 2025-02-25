import { notFound } from 'next/navigation';
import { ProductGrid, Title } from '@/components';
import { initialData } from '@/data/seed';
import { Category } from '@/interfaces';
import { categoryData } from '@/constants';

interface Props {
  params: Promise<{ id: Category }>;
}

const seedProducts = initialData.products;

// Generates the static parameters for the dynamic routes.
export async function generateStaticParams() {
  return Object.keys(categoryData).map(id => ({
    id: id as Category,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  const products = seedProducts.filter(product => product.gender === id);

  if (!categoryData[id]) notFound();

  const { title, subtitle } = categoryData[id];

  return (
    <>
      <Title title={title} subtitle={subtitle} />
      <ProductGrid products={products} />
    </>
  );
}
