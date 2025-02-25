import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 fade-in'>
      {products.map(product => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
