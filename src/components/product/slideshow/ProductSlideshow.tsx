'use client';
import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';
import { ProductImage } from '@/components';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  const validImages = images.length > 0 ? images : [''];

  return (
    <div className={className}>
      {/* Main slideshow */}
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#e2e8f0',
            '--swiper-pagination-color': '#e2e8f0',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 3000 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2'
      >
        {validImages.map((image, index) => (
          <SwiperSlide key={image + index}>
            <ProductImage src={image} alt={title} width={1024} height={800} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {validImages.map((image, index) => (
          <SwiperSlide key={image + index}>
            <ProductImage
              src={image}
              alt={title}
              width={300}
              height={300}
              className='cursor-pointer'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
