import { getUsers } from '@/lib/shopdb';
import styles from './page.module.css';
import Link from 'next/link';

type UserType = {
  id: number,
  username: string,
  email: string,
  phone_number: string,
  country: string,
  city: string,
  birthday: string,
  created_at: string,
  totalQuantity: number,
  totalSpent: number
};

export default function UsersPage() {
  const users = getUsers() as UserType[];
  
  return (
    <main className={styles.main}>
      <input className={styles['input-search']} type="text" placeholder='Search users...' />
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
                <td className={`${styles['product-table-td']} ${styles['product-table-actions']}`}>
                  <Link className={styles.view} href="/admin/users/100">
                    View
                  </Link>
                  <span className={styles.delete}>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}