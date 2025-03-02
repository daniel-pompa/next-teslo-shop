'use client';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { generatePaginationNumbers } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page') ?? '1';
  const currentPage = isNaN(Number(pageString)) ? 1 : Math.max(1, Number(pageString));

  // Redirect if current page is invalid
  if (currentPage < 1 || currentPage > totalPages) {
    redirect(pathname);
  }

  // Generate pagination numbers
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  // Create URL for a specific page
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...' || Number(pageNumber) > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      params.delete('page');
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex items-center justify-center mt-16'>
      <nav aria-label='Page navigation'>
        <ul className='flex list-none gap-1'>
          {/* Previous Page Button */}
          <li>
            <Link
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200',
                {
                  'bg-slate-100 hover:bg-slate-200': currentPage > 1,
                  'bg-slate-100 cursor-not-allowed': currentPage === 1,
                }
              )}
              href={createPageUrl(currentPage - 1)}
              aria-disabled={currentPage === 1}
              onClick={e => currentPage === 1 && e.preventDefault()}
            >
              <IoChevronBackOutline size={20} />
            </Link>
          </li>
          {/* Page Numbers */}
          {allPages.map((page, index) => (
            <li key={`${page}-${index}`}>
              <Link
                className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200',
                  {
                    'bg-blue-600 text-white hover:bg-blue-700': page === currentPage,
                    'bg-slate-100 hover:bg-slate-200':
                      page !== currentPage && page !== '...',
                    'cursor-default bg-slate-100 text-2xl': page === '...',
                  }
                )}
                href={createPageUrl(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            </li>
          ))}
          {/* Next Page Button */}
          <li>
            <Link
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200',
                {
                  'bg-slate-100 hover:bg-slate-200': currentPage < totalPages,
                  'bg-slate-100 cursor-not-allowed': currentPage === totalPages,
                }
              )}
              href={createPageUrl(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              onClick={e => currentPage === totalPages && e.preventDefault()}
            >
              <IoChevronForwardOutline size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
