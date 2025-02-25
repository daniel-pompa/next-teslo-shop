import type { Metadata } from 'next';
import { font } from '@/config/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Teslo Shop',
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
      <body className={`flex flex-col min-h-screen${font.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
