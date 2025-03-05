'use client';
import { useState } from 'react';
import { Product, Size } from '@/interfaces';
import { ColorSelector, QuantitySelector, SizeSelector } from '@/components';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [color, setColor] = useState<string | undefined>();
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const handleAddToCart = () => {
    setPosted(true);
    if (!color || !size) return;
    console.log({ color, size, quantity });
  };

  return (
    <>
      {posted && (!color || !size) && (
        <div className='bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded fade-in'>
          <p>You must select a color and a size</p>
        </div>
      )}
      {/* Color selector */}
      <h3 className='font-bold'>Select a color</h3>
      <ColorSelector
        selectedColor={color}
        availableColors={product.colors}
        onColorSelected={setColor}
      />
      {/* Size selector */}
      <h3 className='font-bold'>Select a size</h3>
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Quantity selector */}
      <h3 className='font-bold'>Select quantity</h3>
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        className={`btn-primary mt-5 w-full ${
          product.inStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={product.inStock === 0}
      >
        Add to cart
      </button>
    </>
  );
};
