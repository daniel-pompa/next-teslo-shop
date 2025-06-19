'use client';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FaImage, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';
import { Category, Product, ProductImage } from '@/interfaces';
import { createUpdateProduct } from '@/actions';

interface Props {
  product: Product & { ProductImage?: ProductImage[] };
  categories: Category[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const ProductForm = ({ product, categories }: Props) => {
  const {
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
    },
  });

  watch('sizes');

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { ...productToSave } = data;

    formData.append('id', product.id ?? '');
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('gender', productToSave.gender);
    formData.append('categoryId', productToSave.categoryId);

    const { ok } = await createUpdateProduct(formData);

    if (ok) {
      alert('Product saved successfully');
    }

    console.log({ ok });
  };

  function handleSizeClick(size: string): void {
    const sizes = new Set(getValues('sizes'));
    if (sizes.has(size)) {
      sizes.delete(size);
    } else {
      sizes.add(size);
    }
    setValue('sizes', Array.from(sizes));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Left Column - Text Fields */}
        <div className='space-y-4'>
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

          <div className='flex flex-col'>
            <label htmlFor='slug' className='font-medium text-slate-700 mb-1'>
              Slug
            </label>
            <input
              id='slug'
              type='text'
              className='p-2 border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
              placeholder='product-name'
              aria-label='Product slug (URL identifier)'
              {...register('slug', { required: true })}
            />
          </div>

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
                aria-label='Product price'
                {...register('price', { required: true, min: 0 })}
              />
            </div>
          </div>

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
        <div className='space-y-4'>
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

          <div className='flex flex-col'>
            <label className='font-medium text-slate-700 mb-1'>Sizes</label>
            <div className='flex flex-wrap gap-2'>
              {sizes.map(size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={clsx(
                    'flex items-center justify-center w-10 h-10 rounded-full border transition-all cursor-pointer',
                    {
                      'bg-blue-600 text-white': getValues('sizes').includes(size),
                    }
                  )}
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='product-images' className='font-medium text-slate-700 mb-2'>
              Images
            </label>
            <div className='border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors'>
              <input
                type='file'
                multiple
                className='hidden'
                id='product-images'
                accept='image/png, image/jpeg, image/webp'
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
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
              {product.ProductImage?.map(image => (
                <div
                  key={image.id}
                  className='bg-white rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
                >
                  <Image
                    src={`/products/${image.url}`}
                    alt={product.title}
                    width={300}
                    height={300}
                    className='w-full object-cover rounded-t'
                  />
                  <button
                    type='button'
                    className='btn-danger w-full text-sm font-medium py-2 flex items-center justify-center gap-2 rounded-t-none rounded-b'
                  >
                    <FaTrash />
                    Delete image
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='pt-4'>
            <button
              type='submit'
              className='btn-primary flex items-center justify-center gap-2 w-full'
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
