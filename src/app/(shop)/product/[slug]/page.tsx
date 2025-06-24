export const revalidate = 604800; // 7 days

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui/AddToCart';
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from '@/components';
import { formatCurrency } from '@/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const previousImages = (await parent).openGraph?.images || [];

  const openGraphImage =
    product?.images && product.images.length > 0
      ? `/products/${product.images[0]}`
      : '/no-image.jpeg';

  return {
    metadataBase: new URL('http://localhost:3000'),
    title: product?.title || 'Product not found',
    description: product?.description || '',
    openGraph: {
      title: product?.title || 'Product not found',
      description: product?.description || '',
      images: [openGraphImage, ...previousImages],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const formattedPrice = formatCurrency(product.price);
  const productImages = product.images.length > 0 ? product.images : [''];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-28'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2 border rounded-md shadow-md'>
        <ProductSlideshow
          images={productImages}
          title={product.title}
          className='hidden md:block'
        />
        <ProductMobileSlideshow
          images={productImages}
          title={product.title}
          className='md:hidden'
        />
      </div>

      {/* Details */}
      <div className='col-span-1 p-5 space-y-5 h-fit border rounded-md shadow-md'>
        <h1 className='font-bold'>{product.title}</h1>
        <h2 className='font-bold'>{formattedPrice}</h2>
        <StockLabel slug={product.slug} />
        <AddToCart product={product} />
        <h3 className='font-bold'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
