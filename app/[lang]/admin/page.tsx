import { getOrdersCount, getProductCount, getRecentOrders, getRevenue } from '@/lib/shopdb';
import styles from './page.module.css';
import Link from 'next/link';
import Translation from '@/components/translation/Translation';

type RecentOrders = {
  orders: {
    id: number,
    username: string,
    totalAmount: number,
    status: string,
    created_at: string
  } []
};

export default async function AdminPage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  const { orders } = getRecentOrders() as RecentOrders;
  
  const productCount = getProductCount();

  const ordersCount = getOrdersCount();

  const revenue = ((getRevenue() ?? 0) / 100);

  return (
    <main className={`${styles.main} ${styles['main-fa']}`}>
      <div className={styles.container}>
        <div className={styles.header}><Translation translationKey='admin.dashboard.dashboard' /></div>
        <div className={styles['dashboard-detail']}>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}><Translation translationKey='admin.dashboard.products' /></div>
            <div className={styles['box-number']}>{productCount}</div>
          </div>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}><Translation translationKey='admin.dashboard.orders' /></div>
            <div className={styles['box-number']}>{ordersCount}</div>
          </div>
          <div className={styles['box-container']}>
            <div className={styles['box-header']}><Translation translationKey='admin.dashboard.revenue' /></div>
            <div className={styles['box-number']}>${revenue.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.header}><Translation translationKey='admin.dashboard.recentOrders' /></div>
        <div className={styles['table-container']}>
          {orders.length === 0 ? (
            <div className={styles["orders-not-found"]}>
              <Translation translationKey='admin.dashboard.recentOrdersNotFound' />
            </div>
          ) : (
            <table className={styles['order-table']}>
              <thead>
                <tr>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey='order.orderId' /></div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey='admin.dashboard.customer' /></div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey='admin.dashboard.date' /></div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey='admin.dashboard.amount' /></div>
                  </th>
                  <th className={styles["order-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey='admin.dashboard.action' /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
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
                        href={`/${lang}/admin/orders/${order.id}`}
                        className={styles["button-view"]}
                      >
                        <Translation translationKey='admin.dashboard.view' />
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