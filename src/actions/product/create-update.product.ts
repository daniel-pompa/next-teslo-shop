'use server';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Color } from '@/interfaces';

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

  const prismaTx = await prisma.$transaction(async tx => {
    let product: Product;
    const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

    if (id) {
      // Update product
      product = await prisma.product.update({
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
      product = await prisma.product.create({
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

    console.log({ product });

    return product;
  });

  // TODO: Revalidate paths

  return { ok: true };
};
