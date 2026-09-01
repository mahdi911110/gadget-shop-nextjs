import { getOrdersCount, getProductCount, getRecentOrders } from '@/lib/shopdb';
import styles from './page.module.css';

type RecentOrders = {
  id: number,
  username: string,
  price_cents: number,
  status: string,
  created_at: string
};

export default function AdminPage() {
  const recentOrders = getRecentOrders() as RecentOrders[];
  
  const productCount = getProductCount();

  const ordersCount = getOrdersCount();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>Dashboard</div>
        <div className={styles['dashboard-detail']}>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}>Products</div>
            <div className={styles['box-number']}>{productCount}</div>
          </div>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}>Orders</div>
            <div className={styles['box-number']}>{ordersCount}</div>
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
          {recentOrders.length === 0 ?
            <div className={styles['orders-not-found']}>
              No recent orders have been found.
            </div>
          :
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
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td className={styles['order-table-td']}>{order.id}</td>
                    <td className={styles['order-table-td']}>{order.username}</td>
                    <td className={styles['order-table-td']}>${order.price_cents / 100}</td>
                    <td className={styles['order-table-td']}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </main>
  );
}