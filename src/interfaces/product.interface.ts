/**
 * Valid hex colors for products (as literal values).
 * - `as const` enables exact type inference (#0f172a, #334155, ...).
 */
export const VALID_COLORS = [
  '#0f172a',
  '#334155',
  '#64748b',
  '#ffffff',
  '#1e3a8a',
  '#b91c1c',
  '#15803d',
  '#ea580c',
  '#1d4ed8',
] as const;

export type Gender = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ProductType = 'shirts' | 'pants' | 'hoodies' | 'hats';

/**
 * Color type: Union of valid hex values.
 * - Derived automatically from VALID_COLORS.
 */
export type Color = (typeof VALID_COLORS)[number];

// Set for efficient validation O(1)
const VALID_COLORS_SET = new Set(VALID_COLORS);

export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  colors: Color[];
  slug: string;
  tags: string[];
  title: string;
  gender: Gender;
  categoryId: string;
}

export interface CartProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  color: Color;
  size: Size;
  quantity: number;
  image: string;
}

/**
 * Type guard: Validates if a given string is a valid Color.
 * - The `as Color` cast is safe because VALID_COLORS_SET only contains valid colors.
 */
export function isColor(color: string): color is Color {
  return VALID_COLORS_SET.has(color as Color);
}
