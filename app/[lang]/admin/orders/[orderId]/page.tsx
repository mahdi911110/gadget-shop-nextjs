import { getCreatedAt, getOrderItems } from "@/lib/shopdb";
import styles from './page.module.css';
import dayjs from "dayjs";
import SearchComponent from "../SearchComponent";
import Translation from "@/components/translation/Translation";

type OrderItem = {
  id: number,
  order_id: number,
  product_id: number,
  quantity: number,
  price_cents: number,
  delivery_option: number
};

function orderStatus(delivery_option: number, createdAt: string) {
  let dayToDeliver;
  switch (delivery_option) {
    case 0:
      dayToDeliver = 7;
      break;
    case 1:
      dayToDeliver = 3;
      break;
    case 2:
      dayToDeliver = 1;
      break;
    default:
      dayToDeliver = 1;
      break;
  }

  let statusText = <Translation translationKey="admin.orderItems.statusNotFound" />;
  const createdDate = dayjs(createdAt, 'D MMMM YYYY');
  const deliveryDate  = dayjs(createdAt, 'D MMMM YYYY').add(dayToDeliver, 'day');
  const shippingDate = createdDate.add(Math.round(dayToDeliver / 2), 'day');
  const today = dayjs();
  
  if (today.isBefore(shippingDate)) {
    statusText = <Translation translationKey="admin.orderItems.statusPreparing" />;
  } else if (today.isBefore(deliveryDate)) {
    statusText = <Translation translationKey="admin.orderItems.statusShipped" />;
  } else {
    statusText = <Translation translationKey="admin.orderItems.statusDeliverd" />;
  }

  return statusText;
}

export default async function OrderPage({ params }: { params: Promise<{orderId: string, lang: 'fa' | 'en'}> }) {
  const { orderId, lang } = await params;
  const order = getOrderItems(Number(orderId)) as OrderItem[];

  const createdAt = getCreatedAt(Number(orderId));

  return (
    <main className={`${styles.main} ${lang === 'fa' ? styles['main-fa'] : ''}`}>
      {order.length === 0 || order === undefined || !createdAt ? (
        <div className={styles["orders-not-found"]}>
          <Translation translationKey="admin.orderItems.orderItemsNotFound" />
        </div>
      ) : (
        <>
          <SearchComponent lang={lang} />
          <div className={styles["table-container"]}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="order.orderId" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.orderItems.orderItemId" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.orderItems.productId" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.orderItems.quantity" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.dashboard.amount" /></div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}><Translation translationKey="admin.orderItems.status" /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr key={order.id}>
                    <td className={styles["product-table-td"]}>{order.id}</td>
                    <td className={styles["product-table-td"]}>
                      {order.order_id}
                    </td>
                    <td className={styles["product-table-td"]}>
                      {order.product_id}
                    </td>
                    <td className={styles["product-table-td"]}>
                      {order.quantity}
                    </td>
                    <td className={styles["product-table-td"]}>
                      ${(order.price_cents / 100) * order.quantity}
                    </td>
                    <td
                      className={`${styles["product-table-td"]} ${styles["product-table-actions"]}`}
                    >
                      {orderStatus(order.delivery_option, createdAt)}
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