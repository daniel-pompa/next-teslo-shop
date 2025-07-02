'use server';
import prisma from '@/lib/prisma';
import { isColor } from '@/interfaces';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    // Filter only valid hex colors
    const validColors = (product.colors || []).filter(isColor);

    return {
      ...product,
      images: product.ProductImage.map(image => image.url),
      colors: validColors,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Failed to fetch product by slug:', error);
    }
    throw new Error('Failed to fetch product', { cause: error });
  }
};
