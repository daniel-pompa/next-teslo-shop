'use server';
import prisma from '@/lib/prisma';
import { isColor } from '@/interfaces';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
          },
        },
      },
      where: {
        slug,
      },
    });

    if (!product) return null;

    // Defensive validation: images can be null/undefined
    const images = (product.ProductImage || []).map(image => image.url).filter(Boolean);

    // Filter out invalid colors
    const validColors = (product.colors || []).filter(isColor);

    return {
      ...product,
      images,
      colors: validColors,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to fetch product:', error);
    }
    throw new Error('Failed to fetch product', { cause: error });
  }
};
