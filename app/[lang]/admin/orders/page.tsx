import { getRecentOrders } from "@/lib/shopdb";
import SearchComponent from "./SearchComponent";
import styles from './page.module.css';
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import Translation from "@/components/translation/Translation";

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
  searchParams,
  params
}: {
  searchParams: Promise<{
    search?: string,
    page?: string
  }>,
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { search, page } = await searchParams;
  const { lang } = await params;
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
    <main className={`${styles.main} ${lang === 'fa' ? styles['main-fa'] : ''}`}>
      {orders.length === 0 ? (
        <>
          <SearchComponent lang={lang} />
          {search &&
            <div className={styles['text-result']}>
              <Translation translationKey="mainSearch.searchResult" /> &quot;{newSearch}&quot;
            </div>
          }
          <div className={styles["orders-not-found"]}>
            {newSearch === '' ? '📭' : '🔍'} <Translation translationKey="admin.orders.noOrdersFound" />
          </div>
        </>
      ) : (
        <>
          <SearchComponent lang={lang} />
          {search &&
            <div className={styles['text-result']}>
              <Translation translationKey="admin.orders.searchResult" /> &quot;{newSearch}&quot;
            </div>
          }
          <div className={styles["table-container"]}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="order.orderId" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.dashboard.customer" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.dashboard.date" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.dashboard.amount" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.dashboard.action" /></div>
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
                        href={`/${lang}/admin/orders/${order.id}`}
                        className={styles["button-view"]}
                      >
                        <Translation translationKey="admin.dashboard.view" />
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
        url={`/${lang.trim()}/admin/orders`}
        search={newSearch}
        page={newPage}
        totalPages={totalPages}
      />
    </main>  
  );
}