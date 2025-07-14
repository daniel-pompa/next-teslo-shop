import { Gender } from '@/interfaces/product.interface';

// Define titles and subtitles for each category
export const categoryData: Record<Gender, { title: string; subtitle: string }> = {
  men: {
    title: "Men's",
    subtitle: 'Explore our collection for men.',
  },
  women: {
    title: "Women's",
    subtitle: 'Discover stylish products for women.',
  },
  kid: {
    title: 'Kids',
    subtitle: 'Find fun and comfortable products for kids.',
  },
  unisex: {
    title: 'Unisex',
    subtitle: 'Versatile and stylish products for all genders.',
  },
};
