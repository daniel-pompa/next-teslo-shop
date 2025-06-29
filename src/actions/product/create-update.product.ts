'use server';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Color } from '@/interfaces';
import { revalidatePath } from 'next/cache';

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(value => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(value => Number(value.toFixed(0))),
  sizes: z.coerce.string().transform(value => value.split(',')),
  colors: z.coerce.string().transform(value => value.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
  categoryId: z.string().uuid(),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false, message: productParsed.error.message };
  }

  const product = productParsed.data;

  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async tx => {
      let product: Product;
      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

      if (id) {
        // Update product
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            colors: rest.colors as Color[],
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // Create product
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            colors: rest.colors as Color[],
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      return { product };
    });

    // Revalidate paths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return { ok: true, product: prismaTx.product };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[CREATE_UPDATE_PRODUCT_ERROR]', error);
    }
    return { ok: false, message: 'Error creating/updating product' };
  }
};
