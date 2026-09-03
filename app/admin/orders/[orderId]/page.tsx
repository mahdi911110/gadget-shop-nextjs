import { getCreatedAt, getOrderItems } from "@/lib/shopdb";
import styles from './page.module.css';
import dayjs from "dayjs";

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

  let statusText = '🔴 Not Found';
  const createdDate = dayjs(createdAt, 'D MMMM YYYY');
  const deliveryDate  = dayjs(createdAt, 'D MMMM YYYY').add(dayToDeliver, 'day');
  const shippingDate = createdDate.add(Math.round(dayToDeliver / 2), 'day');
  const today = dayjs();
  
  if (today.isBefore(shippingDate)) {
    statusText = '🟣 Preparing';
  } else if (today.isBefore(deliveryDate)) {
    statusText = '🟡 Shipped';
  } else {
    statusText = '🟢 Deliverd';
  }

  return statusText;
}

export default async function OrderPage({ params }: { params: Promise<{orderId: string}> }) {
  const { orderId } = await params;
  const order = getOrderItems(Number(orderId)) as OrderItem[];

  const createdAt = getCreatedAt(Number(orderId));

  if (!createdAt) {
    return <div>Order not found</div>
  }

  return (
    <main className={styles.main}>
      {order.length === 0 ? (
        <div className={styles["orders-not-found"]}>
          No recent orders have been found.
        </div>
      ) : (
        <>
          <input
            className={styles["input-search"]}
            type="text"
            placeholder="Search orders..."
          />
          <div className={styles["table-container"]}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Order ID</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Order Item ID</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Product ID</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Quantity</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Amount</div>
                  </th>
                  <th className={styles["product-table-th"]}>
                    <div className={styles["th-container"]}>Status</div>
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