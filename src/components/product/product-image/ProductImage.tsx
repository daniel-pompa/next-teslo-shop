import Image from 'next/image';

interface ProductImageProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
}

export const ProductImage = ({
  src,
  alt,
  width,
  height,
  className,
}: ProductImageProps) => {
  const localSrc =
    src && src.trim() !== ''
      ? src.startsWith('http')
        ? src
        : `/products/${src}`
      : '/no-image.jpeg';

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};
