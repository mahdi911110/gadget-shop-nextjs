import styles from './page.module.css';

export default function UserDetailPage() {
  return (
    <main className={styles.main}>
      <div className={styles['container']}>
        <div className={styles.header}>Username:</div>
        <div className={styles.text}>John</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Email:</div>
        <div className={styles.text}>John@gmail.com</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Joined:</div>
        <div className={styles.text}>January 15, 2025</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Orders:</div>
        <div className={styles.text}>5</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Total Spent:</div>
        <div className={styles.text}>$2849</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Recent Orders</div>
        <div className={styles['table-container']}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles['table-th']}>Order Id</th>
                <th className={styles['table-th']}>Amount</th>
                <th className={styles['table-th']}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles['table-td']}>#47582</td>
                <td className={styles['table-td']}>$487</td>
                <td className={styles['table-td']}>Delivered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}