'use client';
import { useState } from 'react';
import { useCartStore } from '@/store';
import type { CartProduct, Color, Product, Size } from '@/interfaces';
import { ColorSelector, QuantitySelector, SizeSelector } from '@/components';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addproductToCart = useCartStore(state => state.addProductToCart);

  const [selectedColor, setSelectedColor] = useState<Color | undefined>();
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const handleAddToCart = () => {
    setPosted(true);
    if (!selectedColor || !selectedSize) return;
    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: product.images[0],
    };
    addproductToCart(cartProduct);
    setPosted(false);
    setSelectedColor(undefined);
    setSelectedSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {posted && (!selectedColor || !selectedSize) && (
        <div className='bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded fade-in'>
          <p>You must select a color and a size</p>
        </div>
      )}
      {/* Color selector */}
      <h3 className='font-bold'>Select a color</h3>
      <ColorSelector
        selectedColor={selectedColor}
        availableColors={product.colors}
        onColorSelected={setSelectedColor}
      />
      {/* Size selector */}
      <h3 className='font-bold'>Select a size</h3>
      <SizeSelector
        selectedSize={selectedSize}
        availableSizes={product.sizes}
        onSizeChanged={setSelectedSize}
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
