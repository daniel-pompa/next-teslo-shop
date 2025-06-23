import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { getCategories, getProductBySlug } from '@/actions';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const resolvedSearchParams = await params;

  const { slug } = resolvedSearchParams;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== 'new-product') redirect('/admin/products');

  const title = slug === 'new-product' ? 'Create Product' : `Editing: ${product?.title}`;

  const subtitle =
    slug === 'new-product'
      ? 'Complete all fields to add a new product'
      : 'Modify the product details below';

  return (
    <div className='w-full max-w-5xl mx-auto'>
      <Title title={title} subtitle={subtitle} />
      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}
