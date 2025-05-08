// Constants for shipping thresholds and costs
const FREE_SHIPPING_THRESHOLD = 100;
const REDUCED_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_COST = 5;
const REDUCED_SHIPPING_COST = 2.5;

/**
 * Calculates the shipping cost based on the subtotal of the order.
 * @param orderSubtotal - Subtotal amount of the order before shipping and tax.
 * @returns Shipping cost
 */
export const calculateShippingCost = (orderSubtotal: number): number => {
  if (orderSubtotal >= FREE_SHIPPING_THRESHOLD) return 0; // Free shipping for orders >= 100
  if (orderSubtotal >= REDUCED_SHIPPING_THRESHOLD) return REDUCED_SHIPPING_COST; // Reduced shipping for orders between 50 and 99.99
  return STANDARD_SHIPPING_COST; // Standard shipping for orders below 50
};
