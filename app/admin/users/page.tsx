import styles from './page.module.css';
import Link from 'next/link';

export default function UsersPage() {
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
            <tr>
              <td className={styles['product-table-td']}>#47582</td>
              <td className={styles['product-table-td']}>John</td>
              <td className={styles['product-table-td']}>John@gmail.com</td>
              <td className={styles['product-table-td']}>Jan 15</td>
              <td className={`${styles['product-table-td']} ${styles['product-table-actions']}`}>
                <Link className={styles.view} href="/admin/users/100">
                  View
                </Link>
                <span className={styles.delete}>Delete</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}