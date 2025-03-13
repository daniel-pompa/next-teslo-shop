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
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setShowError(true); // Displays the error if no color or size is selected.
      setTimeout(() => setShowError(false), 3000); // Hides the error message
      return;
    }

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
    setSelectedColor(undefined);
    setSelectedSize(undefined);
    setQuantity(1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hides success message
  };

  return (
    <>
      {/* Error message for missing color or size */}
      {showError && (!selectedColor || !selectedSize) && (
        <div className='bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded fade-in'>
          <p>You must select a color and a size</p>
        </div>
      )}
      {/* Success message for added to cart */}
      {showSuccess && (
        <div className='bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded fade-in'>
          <p>Product added to cart successfully!</p>
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
