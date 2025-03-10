import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartProduct } from '@/interfaces';

// Define the state structure
interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
}

// Create the store with Zustand, DevTools, and Persist middleware
export const useCartStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [], // Initial state: empty cart

        // Function to get the total number of items in the cart
        getTotalItems: () => {
          const { cart } = get(); // Get current cart state
          return cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items in the cart
        },
        // Function to add a product to the cart
        addProductToCart: (product: CartProduct) => {
          const { cart } = get();

          // Check if the product already exists in the cart with the same size and color
          const productInCart = cart.some(
            item =>
              item.id === product.id &&
              item.size === product.size &&
              item.color === product.color
          );

          // If the product is not in the cart, add it and exit the function
          if (!productInCart) {
            set({ cart: [...cart, product] }, false, 'addProductToCart'); // Update state
            return; // Exit to avoid unnecessary updates
          }

          // If the product is already in the cart, update its quantity
          const updatedCartProducts = cart.map(item => {
            if (
              item.id === product.id &&
              item.size === product.size &&
              item.color === product.color
            ) {
              return {
                ...item,
                quantity: item.quantity + product.quantity, // Increase quantity
              };
            }
            return item; // Return unchanged items
          });

          // Update the cart with the new quantities
          set({ cart: updatedCartProducts }, false, 'updateProductQuantity');
        },
      }),
      {
        name: 'shopping-cart', // Name for the persisted store in localStorage
      }
    ),
    {
      name: 'cart-store', // Name for the store in DevTools
      enabled: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
    }
  )
);
