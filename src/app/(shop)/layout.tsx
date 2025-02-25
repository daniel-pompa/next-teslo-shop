import { Footer, SideMenu, TopMenu } from '@/components';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      <SideMenu />
      {/* Main content*/}
      <main className='container mx-auto flex-1'>
        <div className='my-28 p-4 md:p-0'>{children}</div>
      </main>
      <Footer />
    </>
  );
}
