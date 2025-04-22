'use server';
import prisma from '@/lib/prisma';

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({ orderBy: { name: 'asc' } });
    return countries;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[GET_COUNTRIES_ERROR]', error);
    }
    return [];
  }
};
