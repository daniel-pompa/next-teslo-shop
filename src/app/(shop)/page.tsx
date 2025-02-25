import { ProductGrid, Title } from '@/components';
import { initialData } from '@/data/seed';

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title
        title='Welcome to Teslo Shop'
        subtitle='Discover premium products designed for your lifestyle.'
      />
      <ProductGrid products={products} />
    </>
  );
}
