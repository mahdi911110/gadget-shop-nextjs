import { getRecentOrders } from "@/lib/shopdb";
import SearchComponent from "./SearchComponent";
import styles from './page.module.css';
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";

type RecentOrders = {
  orders: {
    id: number;
    username: string;
    totalAmount: number;
    status: string;
    created_at: string;
  } [],
  totalPages: number;
};

export default async function OrdersPage({
  searchParams
}: {
  searchParams: Promise<{
    search?: string,
    page?: string
  }>
}) {
  const { search, page } = await searchParams;
  let newSearch = '';
  let newPage = 1;
  if (search !== undefined) {
    newSearch = search.trim();
  }
  if (page !== undefined) {
    newPage = Number(page.trim());
  }
  const { orders, totalPages } = getRecentOrders(newSearch, newPage) as RecentOrders;
  return (
    <main className={styles.main}>
      {orders.length === 0 ? (
        <>
          <SearchComponent />
          {search &&
            <div className={styles['text-result']}>
              Search reslut for: &quot;{newSearch}&quot;
            </div>
          }
          <div className={styles["orders-not-found"]}>
            {newSearch === '' ? '📭' : '🔍'} No recent orders have been found.
          </div>
        </>
      ) : (
        <>
          <SearchComponent />
          {search &&
            <div className={styles['text-result']}>
              Search reslut for: &quot;{newSearch}&quot;
            </div>
          }
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
      <Pagination
        url="/admin/orders"
        search={newSearch}
        page={newPage}
        totalPages={totalPages}
      />
    </main>  
  );
}