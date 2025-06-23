'use server';
import prisma from '@/lib/prisma';
import { isColor } from '@/interfaces';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        ProductImage: true,
      },
    });

    if (!product) return null;

    // Normalize image IDs (convert to string to avoid type mismatches)
    const productImages = (product.ProductImage || []).map(image => ({
      ...image,
      id: String(image.id),
    }));

    // Extract valid image URLs (defensive in case of null/undefined)
    const images = productImages.map(image => image.url).filter(Boolean);

    // Filter only valid hex colors
    const validColors = (product.colors || []).filter(isColor);

    return {
      ...product,
      ProductImage: productImages,
      images,
      colors: validColors,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Failed to fetch product by slug:', error);
    }
    throw new Error('Failed to fetch product', { cause: error });
  }
};
