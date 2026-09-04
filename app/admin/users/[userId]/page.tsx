import { getRecentOrders, getUser } from "@/lib/shopdb";
import styles from "./page.module.css";
import Link from "next/link";

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
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = getUser(Number(userId)) as UserType;
  
  const orders = getRecentOrders(String(userId), true) as RecentOrders[];
  
  return (
    <main className={styles.main}>
      {user ?
        <>
          <div className={styles["container"]}>
            <div className={styles.header}>Username:</div>
            <div className={styles.text}>{user.username}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}>Email:</div>
            <div className={styles.text}>{user.email}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}>Joined:</div>
            <div className={styles.text}>{user.created_at}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}>Orders:</div>
            <div className={styles.text}>{user.totalQuantity}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}>Total Spent:</div>
            <div className={styles.text}>${(user.totalSpent / 100).toFixed(2)}</div>
          </div>
          <div className={styles["container"]}>
            <div className={styles.header}>Recent Orders</div>
            <div className={styles["table-container"]}>
              {orders.length === 0 ? (
                <div className={styles["orders-not-found"]}>
                  📭 No recent orders have been found.
                </div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles["table-th"]}>Order Id</th>
                      <th className={styles["table-th"]}>Date</th>
                      <th className={styles["table-th"]}>Amount</th>
                      <th className={styles["table-th"]}>Action</th>
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
                            href={`/admin/orders/${order.id}`}
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
        </>
      :
        <div className={styles["orders-not-found"]}>
          ⚠️ No user have been found.
        </div>
      }
    </main>
  );
}
