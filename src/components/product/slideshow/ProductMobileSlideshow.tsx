'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';
import { ProductImage } from '@/components';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  const validImages = images.length > 0 ? images : [''];

  return (
    <div className={className}>
      <Swiper
        style={{ height: '400px' }}
        pagination={true}
        autoplay={{ delay: 3000 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {validImages.map((image, index) => (
          <SwiperSlide key={image + index}>
            <ProductImage
              src={image}
              alt={title}
              width={500}
              height={500}
              className='object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
