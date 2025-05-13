import type { Metadata } from 'next';
import { font } from '@/config/fonts';
import './globals.css';
import { Providers } from '@/components';

export const metadata: Metadata = {
  title: {
    template: '%s | Teslo Shop',
    default: 'Teslo Shop',
  },
  description:
    'Teslo Shop is an e-commerce build with Next.js, TypeScript, TailwindCSS, Zustand, Prisma, and PostgreSQL.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`flex flex-col min-h-screen ${font.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
