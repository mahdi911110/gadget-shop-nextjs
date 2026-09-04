import { getOrdersCount, getProductCount, getRecentOrders, getRevenue } from '@/lib/shopdb';
import styles from './page.module.css';
import Link from 'next/link';

type RecentOrders = {
  id: number,
  username: string,
  totalAmount: number,
  status: string,
  created_at: string
};

export default function AdminPage() {
  const recentOrders = getRecentOrders() as RecentOrders[];
  
  const productCount = getProductCount();

  const ordersCount = getOrdersCount();

  const revenue = ((getRevenue() ?? 0) / 100);

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
            <div className={styles['box-number']}>${revenue.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>Recent Orders</div>
        <div className={styles['table-container']}>
          {recentOrders.length === 0 ? (
            <div className={styles["orders-not-found"]}>
              No recent orders have been found.
            </div>
          ) : (
            <table className={styles['order-table']}>
              <thead>
                <tr>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}>Order Id</div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}>Customer</div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}>Date</div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}>Amount</div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}>Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className={styles["order-table-td"]}>{order.id}</td>
                    <td className={styles["order-table-td"]}>
                      {order.username}
                    </td>
                    <td className={styles["order-table-td"]}>
                      {order.created_at}
                    </td>
                    <td className={styles["order-table-td"]}>
                      ${order.totalAmount / 100}
                    </td>
                    <td
                      className={`${styles["order-table-td"]} ${styles["product-table-actions"]}`}
                    >
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className={styles["button-view"]}
                      >
                        👁 View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}