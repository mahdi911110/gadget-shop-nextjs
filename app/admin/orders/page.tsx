import { getRecentOrders } from '@/lib/shopdb';
import styles from './page.module.css';

type RecentOrders = {
  id: number,
  username: string,
  price_cents: number,
  status: string,
  created_at: string
};

export default function OrdersPage() {
  const orders = getRecentOrders() as RecentOrders[];

  return (
    <main className={styles.main}>
      {orders.length === 0 ?
          <div className={styles['orders-not-found']}>
            No recent orders have been found.
          </div>
        :
          <>
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
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className={styles['product-table-td']}>{order.id}</td>
                      <td className={styles['product-table-td']}>{order.username}</td>
                      <td className={styles['product-table-td']}>{order.created_at}</td>
                      <td className={styles['product-table-td']}>${order.price_cents / 100}</td>
                      <td className={`${styles['product-table-td']} ${styles['product-table-actions']}`}>
                        🟢 {order.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        }
    </main>
  );
}