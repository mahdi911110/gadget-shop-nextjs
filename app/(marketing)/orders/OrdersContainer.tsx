import styles from './page.module.css';
import { getTotalOrderPriceCents, getUserOrderItems } from '@/lib/shopdb';
import { getCurrentUser } from '@/lib/auth';
import OrderContainer from './OrderContainer';

type UserOrders = {
  id: number,
  status: string,
  created_at: string
};

type UserOrderItems = {
  id: number,
  product_id: number,
  quantity: string,
  delivery_option: number,
  product_name: string,
  image_url: string
};

export default async function OrdersContainer({ orders }: { orders: UserOrders }) {
  const user = await getCurrentUser();
  let orderItems;
  if (user) {
    orderItems = getUserOrderItems(user.id, orders.id) as UserOrderItems[];
  }
  const totalOrderAmount = (getTotalOrderPriceCents(orders.id) ?? 0) / 100;
  return (
    <div className={styles['orders-container']}>
      {orderItems === undefined || orderItems.length === 0 ?
        <div className={styles['not-found']}>
          📭 No order have been found.
        </div>
      :
        <div  className={styles['order-container']}>
          <div className={styles['order-title-container']}>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Order Id</div>
              <div className={styles['order-detail-text']}>{orders.id}</div>
            </div>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Order Date</div>
              <div className={styles['order-detail-text']}>{orders.created_at}</div>
            </div>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Total Amount</div>
              <div className={styles['order-detail-text']}>${totalOrderAmount.toFixed(2)}</div>
            </div>
          </div>
          {orderItems?.map(orderItem => (
            <OrderContainer
              key={orderItem.id}
              orderItem={orderItem}
              createdAt={orders.created_at}
            />
          ))}
        </div>
      }
    </div>
  );
}