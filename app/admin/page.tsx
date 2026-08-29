import styles from './page.module.css';

export default function AdminPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>Dashboard</div>
        <div className={styles['dashboard-detail']}>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}>Products</div>
            <div className={styles['box-number']}>24</div>
          </div>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}>Orders</div>
            <div className={styles['box-number']}>18</div>
          </div>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}>Revenue</div>
            <div className={styles['box-number']}>$12450</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>Recent Orders</div>
        <div className={styles['table-container']}>
          <table className={styles['order-table']}>
            <thead>
              <tr>
                <th className={styles['order-table-th']}>Order Id</th>
                <th className={styles['order-table-th']}>Customer</th>
                <th className={styles['order-table-th']}>Amount</th>
                <th className={styles['order-table-th']}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles['order-table-td']}>#47582</td>
                <td className={styles['order-table-td']}>John</td>
                <td className={styles['order-table-td']}>$487</td>
                <td className={styles['order-table-td']}>Delivered</td>
              </tr>
              <tr>
                <td className={styles['order-table-td']}>#47581</td>
                <td className={styles['order-table-td']}>Alex</td>
                <td className={styles['order-table-td']}>$249</td>
                <td className={styles['order-table-td']}>Processing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}