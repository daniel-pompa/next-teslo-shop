import { redirect } from 'next/navigation';
import { getUsers } from '@/actions';
import { Title, Pagination } from '@/components';
import { UsersGrid } from './ui/UsersGrid';

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;

  const { ok, users = [], totalPages = 1, totalCount = 0 } = await getUsers(currentPage);

  if (!ok) redirect('/auth/sign-in');

  const subtitle =
    totalCount === 0
      ? 'No registered users.'
      : `Currently ${totalCount.toLocaleString()} active user${
          totalCount !== 1 ? 's' : ''
        }`;

  return (
    <div className='container mx-auto'>
      <Title title='User management' subtitle={subtitle} />
      <UsersGrid users={users} />
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
