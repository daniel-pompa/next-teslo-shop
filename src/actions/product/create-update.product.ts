'use server';
import { Gender } from '@prisma/client';
import { z } from 'zod';

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

  console.log(productParsed.data);

  return { ok: true };
};
