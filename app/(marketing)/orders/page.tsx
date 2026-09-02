import styles from './page.module.css';
import { getUserOrders } from '@/lib/shopdb';
import { getCurrentUser } from '@/lib/auth';
import OrdersContainer from './OrdersContainer';

type UserOrders = {
  id: number,
  status: string,
  created_at: string
};

export default async function OrdersPage() {
  const user = await getCurrentUser();
  let userOrders;
  if (user) {
    userOrders = getUserOrders(user.id) as UserOrders[];
  }
  return (
    <main className={styles.main}>
      <div className={styles['main-text-container']}>
        <div className={styles['main-title']}>My Orders</div>
        <div className={styles['main-text']}>view your order history and tracking details</div>
      </div>
      {userOrders && userOrders.map(orders => (
        <OrdersContainer key={orders.id} orders={orders} />
      ))}
    </main>
  );
}