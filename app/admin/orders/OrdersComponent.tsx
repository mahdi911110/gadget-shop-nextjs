import Link from "next/link";
import SearchComponent from "@/app/admin/orders/SearchComponent";

import styles from "./OrdersComponent.module.css";

type RecentOrders = {
  id: number;
  username: string;
  totalAmount: number;
  status: string;
  created_at: string;
};

export default function OrdersComponent({ orders }: { orders: RecentOrders[] }) {
  return (
    <main className={styles.main}>
      {orders.length === 0 ? (
        <>
          <SearchComponent />
          <div className={styles["orders-not-found"]}>
            No recent orders have been found.
          </div>
        </>
      ) : (
        <>
          <SearchComponent />
          <div className={styles["table-container"]}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Order Id</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Customer</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Date</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Amount</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className={styles["product-table-td"]}>{order.id}</td>
                    <td className={styles["product-table-td"]}>
                      {order.username}
                    </td>
                    <td className={styles["product-table-td"]}>
                      {order.created_at}
                    </td>
                    <td className={styles["product-table-td"]}>
                      ${order.totalAmount / 100}
                    </td>
                    <td
                      className={`${styles["product-table-td"]} ${styles["product-table-actions"]}`}
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
          </div>
        </>
      )}
    </main>
  );
}