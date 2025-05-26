'use client';
import type { User } from '@/interfaces';
import { changeUserRole } from '@/actions';

interface Props {
  users: User[];
}

export const UsersGrid = ({ users }: Props) => {
  return (
    <>
      {users.length === 0 ? (
        <p>
          There are currently no users in the system. Users will appear here once
          registered.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          {users.map(user => (
            <div
              key={user.id}
              className='rounded-md border shadow-sm hover:shadow-md transition p-6'
            >
              <div className='mb-4'>
                <h3 className='font-semibold mb-1'>{user.name ?? 'Not available'}</h3>
                <p className='text-slate-500'>{user.email}</p>
              </div>

              <div className='flex items-center gap-2'>
                <div className='flex-1 min-w-48'>
                  <p>
                    Role:
                    <span
                      className={`ml-1 px-2 py-1 text-xs rounded-full capitalize ${
                        user.role === 'admin'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {user.role}
                    </span>
                  </p>
                </div>

                <select
                  value={user.role}
                  onChange={e => changeUserRole(user.id, e.target.value)}
                  className='w-auto px-2 py-1 text-xs sm:text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition bg-white hover:border-slate-400'
                >
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
