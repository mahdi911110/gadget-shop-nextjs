import { getRecentOrders, getUser } from "@/lib/shopdb";
import styles from "./page.module.css";
import Link from "next/link";
import Translation from "@/components/translation/Translation";

type UserType = {
  username: string;
  email: string;
  created_at: string;
  totalQuantity: number;
  totalSpent: number;
  ordersId: number | null;
};

type RecentOrders = {
  id: number;
  username: string;
  totalAmount: number;
  status: string;
  created_at: string;
};

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string, lang: 'fa' | 'en' }>;
}) {
  const { userId, lang } = await params;
  const user = getUser(Number(userId)) as UserType;
  
  const orders = getRecentOrders(String(userId), 1, true) as RecentOrders[];
  
  return (
    <main className={`${styles.main} ${lang === 'fa' ? styles['main-fa'] : ''}`}>
      {user ?
        <>
          <div className={styles["container"]}>
            <div className={styles.header}><Translation translationKey="auth.username" /></div>
            <div className={styles.text}>{user.username}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}><Translation translationKey="auth.email" /></div>
            <div className={styles.text}>{user.email}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}><Translation translationKey="admin.user.joined" /></div>
            <div className={styles.text}>{user.created_at}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}><Translation translationKey="admin.user.orders" /></div>
            <div className={styles.text}>{user.totalQuantity}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}><Translation translationKey="admin.user.totalSpent" /></div>
            <div className={styles.text}>${(user.totalSpent / 100).toFixed(2)}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}><Translation translationKey="admin.dashboard.recentOrders" /></div>
            <div className={styles["table-container"]}>
              {orders.length === 0 ? (
                <div className={styles["orders-not-found"]}>
                  <Translation translationKey="admin.dashboard.recentOrdersNotFound" />
                </div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles["table-th"]}><Translation translationKey="order.orderId" /></th>
                      <th className={styles["table-th"]}><Translation translationKey="admin.dashboard.date" /></th>
                      <th className={styles["table-th"]}><Translation translationKey="admin.dashboard.amount" /></th>
                      <th className={styles["table-th"]}><Translation translationKey="admin.dashboard.action" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className={styles["table-td"]}>{order.id}</td>
                        <td className={styles["table-td"]}>{order.created_at}</td>
                        <td className={styles["table-td"]}>
                          ${order.totalAmount / 100}
                        </td>
                        <td className={styles["table-td"]}>
                          <Link
                            className={styles["button-view"]}
                            href={`/${lang}/admin/orders/${order.id}`}
                          >
                            <Translation translationKey="admin.dashboard.view" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      :
        <div className={styles["orders-not-found"]}>
          ⚠️ No user have been found.
        </div>
      }
    </main>
  );
}
