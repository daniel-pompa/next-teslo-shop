import { Montserrat, Roboto } from 'next/font/google';

export const font = Roboto({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  preload: false,
});

export const titleFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  preload: false,
});
