'use server';
import prisma from '@/lib/prisma';

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return categories;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[GET_CATEGORIES_ERROR]', error);
    }
    return [];
  }
};
