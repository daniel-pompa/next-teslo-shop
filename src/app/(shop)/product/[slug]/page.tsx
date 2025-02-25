import { notFound } from 'next/navigation';
import {
  ColorSelector,
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from '@/components';
import { initialData } from '@/data/seed';
import { formatCurrency } from '@/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = initialData.products.find(product => product.slug === slug);

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
        <p className='text-xl md:text-2xl font-extrabold'>{formattedPrice}</p>
        {/* Color selector */}
        <h3 className='font-bold'>Select a color</h3>
        <ColorSelector
          selectedColor={product.colors[0]}
          availableColors={product.colors}
        />
        {/* Size selector */}
        <h3 className='font-bold'>Select a size</h3>
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
        {/* Quantity selector */}
        <h3 className='font-bold'>Select quantity</h3>
        <QuantitySelector quantity={1} />
        {/* Add to cart button */}
        <button className='btn-primary mt-5 w-full'>Add to cart</button>
        {/* Description */}
        <h3 className='font-bold'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
