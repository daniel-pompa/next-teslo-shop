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
  // Read route params
  const { slug } = await params;

  // Fetch data
  const product = await getProductBySlug(slug);
  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL('http://localhost:3000'),
    title: product?.title || 'Product not found',
    description: product?.description || '',
    openGraph: {
      title: product?.title || 'Product not found',
      description: product?.description || '',
      images: [`/products/${product?.images[1]}`, ...previousImages],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const formattedPrice = formatCurrency(product.price);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-28'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2 border rounded-md shadow-md'>
        {/* Desktop slideshow */}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className='hidden md:block'
        />
        {/* Mobile slideshow */}
        <ProductMobileSlideshow
          images={product.images}
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
        {/* Description */}
        <h3 className='font-bold'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
