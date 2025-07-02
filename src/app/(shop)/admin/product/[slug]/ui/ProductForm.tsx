'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import { FaImage, FaTrash } from 'react-icons/fa';
import { Category, Product, ProductImage as IProductImage } from '@/interfaces';
import { createUpdateProduct, deleteProductImage } from '@/actions';
import { ProductImage } from '@/components';
import { useEffect } from 'react';

interface Props {
  product: Partial<Product> & { ProductImage?: IProductImage[] };
  categories: Category[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  colors: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
  images?: FileList;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colors = [
  '#0f172a',
  '#334155',
  '#64748b',
  '#ffffff',
  '#1e3a8a',
  '#b91c1c',
  '#15803d',
  '#ea580c',
  '#1d4ed8',
];

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
    handleSubmit,
    trigger,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],
      colors: product.colors ?? [],
      images: undefined,
    },
    mode: 'onChange',
  });

  // Watch selected sizes and colors for validation
  const selectedSizes = watch('sizes');
  const selectedColors = watch('colors');
  const watchedImages = watch('images');

  // Check if form is fully valid (all fields and at least one size and one color)
  const isFormReady = isValid && selectedSizes.length > 0 && selectedColors.length > 0;

  // Revalidate form when sizes or colors change
  useEffect(() => {
    trigger();
  }, [selectedSizes, selectedColors, trigger]);

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append('id', product.id ?? '');
    }

    // Append required fields
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('colors', productToSave.colors.toString());
    formData.append('tags', productToSave.tags);
    formData.append('gender', productToSave.gender);
    formData.append('categoryId', productToSave.categoryId);

    // Append images if they exist (optional)
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const savingToast = toast.loading('Saving product...');

    try {
      const { ok, product: updatedProduct } = await createUpdateProduct(formData);

      if (ok) {
        toast.success('Product saved successfully', { id: savingToast, duration: 2000 });
        router.replace(`/admin/product/${updatedProduct?.slug}`);
      } else {
        toast.error('Error saving product', { id: savingToast, duration: 2000 });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[CREATE_UPDATE_PRODUCT_ERROR]', error);
      }
      toast.error('Unexpected error', { id: savingToast, duration: 2000 });
    }
  };

  /**
   * Toggle size selection
   * Adds or removes the clicked size from the current selection
   */
  function handleSizeClick(size: string): void {
    const currentSizes = getValues('sizes');
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];

    setValue('sizes', updatedSizes, { shouldValidate: true });
  }

  /**
   * Toggle color selection
   * Adds or removes the clicked color from the current selection
   */
  function handleColorClick(color: string): void {
    const currentColors = getValues('colors');
    const updatedColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];

    setValue('colors', updatedColors, { shouldValidate: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Left Column - Text Fields */}
        <div className='space-y-4'>
          {/* Title */}
          <div className='flex flex-col'>
            <label htmlFor='title' className='font-medium text-slate-700 mb-1'>
              Title
            </label>
            <input
              id='title'
              type='text'
              className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              placeholder='Product name'
              aria-label='Product title'
              {...register('title', { required: true })}
            />
          </div>

          {/* Slug */}
          <div className='flex flex-col'>
            <label htmlFor='slug' className='font-medium text-slate-700 mb-1'>
              Slug
            </label>
            <input
              id='slug'
              type='text'
              className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              placeholder='product_slug'
              aria-label='Product slug (URL identifier)'
              {...register('slug', { required: true })}
            />
          </div>

          {/* Description */}
          <div className='flex flex-col'>
            <label htmlFor='description' className='font-medium text-slate-700 mb-1'>
              Description
            </label>
            <textarea
              id='description'
              rows={4}
              className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              placeholder='Detailed product description'
              aria-label='Product description'
              {...register('description', { required: true })}
            />
          </div>

          {/* Price */}
          <div className='flex flex-col'>
            <label htmlFor='price' className='font-medium text-slate-700 mb-1'>
              Price
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500'>
                $
              </span>
              <input
                id='price'
                type='number'
                className='pl-6 pr-4 py-2 w-full border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
                placeholder='0.00'
                step='0.01'
                min='0'
                aria-label='Product price'
                {...register('price', { required: true, min: 0 })}
              />
            </div>
          </div>

          {/* Tags */}
          <div className='flex flex-col'>
            <label htmlFor='tags' className='font-medium text-slate-700 mb-1'>
              Tags
            </label>
            <input
              id='tags'
              type='text'
              className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              placeholder='tag1, tag2, tag3'
              aria-label='Product tags (comma separated)'
              {...register('tags', { required: true })}
            />
          </div>
        </div>

        {/* Right Column - Selectors */}
        <div className='space-y-5'>
          {/* Gender */}
          <div className='flex flex-col'>
            <label htmlFor='gender' className='font-medium text-slate-700 mb-1'>
              Gender
            </label>
            <select
              id='gender'
              className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              aria-label='Select product gender'
              {...register('gender', { required: true })}
            >
              <option value=''>Select gender</option>
              <option value='men'>Men</option>
              <option value='women'>Women</option>
              <option value='kid'>Kid</option>
              <option value='unisex'>Unisex</option>
            </select>
          </div>

          {/* Category */}
          <div className='flex flex-col'>
            <label htmlFor='category' className='font-medium text-slate-700 mb-1'>
              Category
            </label>
            <select
              id='category'
              className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              aria-label='Select product category'
              {...register('categoryId', { required: true })}
            >
              <option value=''>Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor='inStock' className='font-medium text-slate-700 mb-1'>
              Stock
            </label>
            <input
              id='inStock'
              type='number'
              className='p-2 w-full border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              placeholder='0'
              min='0'
              aria-label='Stock quantity'
              {...register('inStock', { required: true, min: 0 })}
            />
          </div>

          {/* Sizes */}
          <div className='flex flex-col'>
            <label className='font-medium text-slate-700 mb-1'>Sizes</label>
            <div className='flex flex-wrap gap-2'>
              {sizes.map(size => (
                <div
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={clsx(
                    'flex items-center justify-center w-10 h-10 rounded-full border transition-all cursor-pointer',
                    {
                      'bg-blue-600 text-white': selectedSizes.includes(size),
                    }
                  )}
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className='flex flex-col'>
            <label className='font-medium text-slate-700 mb-1'>Colors</label>
            <div className='flex flex-wrap gap-2'>
              {colors.map(color => (
                <div
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={clsx(
                    'w-10 h-10 rounded-full border cursor-pointer transition-all',
                    {
                      'ring-2 ring-offset-2 ring-blue-600':
                        selectedColors.includes(color),
                    }
                  )}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Images (Optional) */}
          <div className='flex flex-col'>
            <label htmlFor='product-images' className='font-medium text-slate-700 mb-2'>
              Images
            </label>
            <div className='border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors'>
              <input
                type='file'
                {...register('images')}
                multiple
                className='hidden'
                id='product-images'
                accept='image/png, image/jpeg, image/jpg, image/webp, image/avif'
                aria-label='Upload product images'
              />
              <label
                htmlFor='product-images'
                className='cursor-pointer flex flex-col items-center justify-center space-y-2'
                aria-labelledby='image-upload-label'
              >
                <FaImage className='w-8 h-8 text-slate-400' aria-hidden='true' />
                <span id='image-upload-label' className='text-sm text-slate-600'>
                  Click to upload images
                </span>
                <span className='text-xs text-slate-500'>PNG, JPG up to 5MB</span>
              </label>

              {watchedImages && watchedImages.length > 0 && (
                <span className='text-sm text-slate-600'>
                  {watchedImages.length} image(s) selected
                </span>
              )}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
              {product.ProductImage?.map(image => (
                <div
                  key={image.id}
                  className='bg-white rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
                >
                  <ProductImage
                    src={image.url}
                    alt={product.title ?? 'Product image'}
                    width={300}
                    height={300}
                    className='w-full object-cover rounded-t'
                  />
                  <button
                    type='button'
                    onClick={() => deleteProductImage(image.id, image.url)}
                    className='btn-danger w-full text-sm font-medium py-2 flex items-center justify-center gap-2 rounded-t-none rounded-b'
                  >
                    <FaTrash />
                    Delete image
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className={product.ProductImage?.length ? 'pt-4' : 'pt-1'}>
            <button
              type='submit'
              disabled={!isFormReady}
              className={clsx(
                'btn-primary flex items-center justify-center gap-2 w-full',
                {
                  'opacity-50 cursor-not-allowed': !isFormReady,
                }
              )}
              aria-label='Save product information'
            >
              Save product
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
