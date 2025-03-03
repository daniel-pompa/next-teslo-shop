'use server';
import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  // Validate and normalize page number
  const normalizedPage = Math.max(1, Number(page) || 1);

  try {
    // Use Promise.all to run queries in parallel
    const [products, totalCount] = await Promise.all([
      // Fetch products with their images
      prisma.product.findMany({
        take,
        skip: (normalizedPage - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        where: {
          gender: gender,
        },
      }),
      // Fetch total count of products for pagination
      prisma.product.count({
        where: {
          gender: gender,
        },
      }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / take);

    // Transform products to include only image URLs
    const transformedProducts = products.map(product => ({
      ...product,
      images: product.ProductImage.map(image => image.url),
    }));

    return {
      currentPage: normalizedPage,
      totalPages,
      products: transformedProducts,
    };
  } catch (error) {
    throw new Error('Failed to fetch products', { cause: error });
  }
};
