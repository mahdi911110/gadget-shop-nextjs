import styles from './page.module.css';

export default function OrdersPage() {
  return (
    <main className={styles.main}>
      <input className={styles['input-search']} type="text" placeholder='Search orders...' />
      <div className={styles['table-container']}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Order Id
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Customer
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Date
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Amount
                </div>
              </th>
              <th className={styles['product-table-th']}>
                <div className={styles['th-container']}>
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles['product-table-td']}>#47582</td>
              <td className={styles['product-table-td']}>John</td>
              <td className={styles['product-table-td']}>Jan 15</td>
              <td className={styles['product-table-td']}>$487</td>
              <td className={`${styles['product-table-td']} ${styles['product-table-actions']}`}>
                🟢 Delivered
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}