'use server';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Color } from '@/interfaces';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

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

      // Image loading and saving process
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);
        if (!images) {
          throw new Error('Error uploading images');
        }

        await tx.productImage.createMany({
          data: images.map(image => ({
            productId: product.id,
            url: image,
          })),
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

const uploadImages = async (images: File[]) => {
  try {
    const uploadImages = images.map(async image => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const response = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64Image}`,
          {
            folder: 'teslo-shop',
          }
        );
        return response.secure_url;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[UPLOAD_IMAGES_ERROR]', error);
        }
        return null;
      }
    });
    const uploadedImages = await Promise.all(uploadImages);
    // Return only valid URLs
    return uploadedImages.filter((url): url is string => url !== null);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[UPLOAD_IMAGES_ERROR]', error);
    }
    return null;
  }
};
