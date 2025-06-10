'use client';
import { FaUpload, FaImage } from 'react-icons/fa';
import { SizeSelector } from '@/components';
import { Category, Product } from '@/interfaces';

interface Props {
  product: Product;
  categories: Category[];
}

export const ProductForm = ({ product, categories }: Props) => {
  return (
    <form className='space-y-6'>
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
                className='pl-8 pr-4 py-2 w-full border rounded border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400'
                placeholder='0.00'
                step='0.01'
                aria-label='Product price'
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
            <SizeSelector
              selectedSize={product.sizes[0]}
              availableSizes={product.sizes}
              onSizeChanged={() => {}}
              aria-label='Available product sizes'
            />
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
          </div>

          <div className='pt-7'>
            <button
              type='submit'
              className='btn-primary flex items-center justify-center gap-2 w-full'
              aria-label='Save product information'
            >
              <FaUpload aria-hidden='true' />
              Save product
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
