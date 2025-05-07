import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartProduct } from '@/interfaces';
import { calculateShippingCost } from '@/utils';

const TAX_RATE = 0.09; // Tax rate (9%)

/**
 * Utility to compare two CartProduct items based on ID, size, and color.
 */
const isSameProduct = (a: CartProduct, b: CartProduct): boolean =>
  a.id === b.id && a.size === b.size && a.color === b.color;

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    shippingCost: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        getTotalItems: () => {
          return get().cart.reduce((total, item) => total + item.quantity, 0);
        },
        getSummaryInformation: () => {
          const cart = get().cart;
          const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
          const subTotal = cart.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          );
          const tax = Number((subTotal * TAX_RATE).toFixed(2));
          const shippingCost = itemsInCart === 0 ? 0 : calculateShippingCost(subTotal);
          const total = subTotal + tax + shippingCost;
          return { itemsInCart, subTotal, tax, shippingCost, total };
        },

        addProductToCart: (product: CartProduct) => {
          const { cart } = get();
          const existingProduct = cart.find(item => isSameProduct(item, product));
          if (!existingProduct) {
            set({ cart: [...cart, product] });
            return;
          }
          const updatedCart = cart.map(item =>
            isSameProduct(item, product)
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
          set({ cart: updatedCart });
        },

        updateProductQuantity: (product: CartProduct, quantity: number) => {
          const { cart } = get();
          const updatedCart = cart.map(item =>
            isSameProduct(item, product) ? { ...item, quantity } : item
          );
          set({ cart: updatedCart });
        },

        removeProductFromCart: (product: CartProduct) => {
          const { cart } = get();
          const updatedCart = cart.filter(item => !isSameProduct(item, product));
          set({ cart: updatedCart });
        },

        clearCart: () => {
          set({ cart: [] });
        },
      }),
      {
        name: 'shopping-cart', // Storage key for persist
      }
    ),
    {
      name: 'cart-store', // Zustand devtools label
      enabled: process.env.NODE_ENV !== 'production',
    }
  )
);
