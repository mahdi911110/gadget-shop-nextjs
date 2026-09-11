import { getUsers } from '@/lib/shopdb';
import styles from './page.module.css';
import Link from 'next/link';
import handleUserStatus from './handleUserStatus';
import SearchComponent from './SearchComponent';
import Pagination from '@/components/pagination/Pagination';
import Translation from '@/components/translation/Translation';

type UsersType = {
  users: {
    id: number,
    username: string,
    email: string,
    phone_number: string,
    country: string,
    city: string,
    birthday: string,
    created_at: string,
    totalQuantity: number,
    totalSpent: number,
    is_active: number
  } [],
  totalPages: number
};

export default async function UsersPage({
  searchParams,
  params
}: {
  searchParams: Promise<{
    search?: string,
    page?: string
  }>,
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { search, page } = await searchParams;
  const { lang } = await params; 
  let newSearch = '';
  let newPage = 1;
  if (search !== undefined) {
    newSearch = search.trim();
  }
  if (page !== undefined) {
    newPage = Number(page.trim());
  }
  const { users, totalPages } = getUsers(newSearch) as UsersType;

  return (
    <main className={`${styles.main} ${styles['main-fa']}`}>
      <SearchComponent lang={lang} />
      {search &&
        <div className={styles['text-result']}>
          <Translation translationKey='mainSearch.searchResult' /> &quot;{newSearch}&quot;
        </div>
      }
      <div className={styles['table-container']}>
        {users.length > 0 ?
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.users.userId' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.users.username' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.users.email' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.users.joined' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.dashboard.action' />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className={styles['product-table-td']}>{user.id}</td>
                  <td className={styles['product-table-td']}>{user.username}</td>
                  <td className={styles['product-table-td']}>{user.email}</td>
                  <td className={styles['product-table-td']}>{user.created_at}</td>
                  <td className={styles['product-table-td']}>
                    <div className={styles['product-table-actions']}>
                      <Link className={styles.view} href={`/${lang}/admin/users/${user.id}`}>
                        <Translation translationKey='admin.dashboard.view' />
                      </Link>
                      <form action={handleUserStatus.bind(null, lang, user.id)}>
                        <button className={user.is_active ? styles.inactive : `${styles.inactive} ${styles.active}`}>
                          {user.is_active ? <Translation translationKey='admin.users.inActive' /> : <Translation translationKey='admin.users.active' />}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        :
          <div className={styles['not-found']}>
            {newSearch === '' ? '📭' : '🔍'} <Translation translationKey='admin.users.usersNotFound' />
          </div>
        }
      </div>
      <Pagination
        url={`/${lang.trim()}/admin/users`}
        search={newSearch}
        page={newPage}
        totalPages={totalPages}
      />
    </main>
  );
}