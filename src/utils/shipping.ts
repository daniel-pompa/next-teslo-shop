// Constants for shipping thresholds and costs
const FREE_SHIPPING_THRESHOLD = 100;
const REDUCED_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_COST = 5;
const REDUCED_SHIPPING_COST = 2.5;

/**
 * Calculates the shipping cost based on the total order amount.
 * @param orderTotal - Total amount of the order before shipping
 * @returns Shipping cost
 */
export const calculateShippingCost = (orderTotal: number): number => {
  if (orderTotal < REDUCED_SHIPPING_THRESHOLD) return STANDARD_SHIPPING_COST;
  if (orderTotal < FREE_SHIPPING_THRESHOLD) return REDUCED_SHIPPING_COST;
  return 0; // Free shipping for orders >= 100
};
