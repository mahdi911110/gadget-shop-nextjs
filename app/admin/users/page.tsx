import { getUsers } from '@/lib/shopdb';
import styles from './page.module.css';
import Link from 'next/link';
import handleUserStatus from './handleUserStatus';
import SearchComponent from './SearchComponent';

type UsersType = {
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
};

export default async function UsersPage({
  searchParams
}: {
  searchParams: Promise<{
    search?: string
  }>
}) {
  const { search } = await searchParams; 
  let newSearch = '';
  if (search !== undefined) {
    newSearch = String(search);
  }
  const users = getUsers(newSearch) as UsersType[];

  return (
    <main className={styles.main}>
      <SearchComponent />
      <div className={styles['table-container']}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  User Id
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Username
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Email
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Joined
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Actions
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
                    <Link className={styles.view} href={`/admin/users/${user.id}`}>
                      View
                    </Link>
                    <form action={handleUserStatus.bind(null, user.id)}>
                      <button className={user.is_active ? styles.inactive : `${styles.inactive} ${styles.active}`}>
                        {user.is_active ? 'Inactive' : 'active'}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}