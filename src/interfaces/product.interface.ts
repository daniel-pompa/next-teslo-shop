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
  gender: Category;
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

export type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type Color =
  | '#0f172a'
  | '#334155'
  | '#64748b'
  | '#ffffff'
  | '#1e3a8a'
  | '#b91c1c'
  | '#15803d'
  | '#ea580c'
  | '#1d4ed8';
