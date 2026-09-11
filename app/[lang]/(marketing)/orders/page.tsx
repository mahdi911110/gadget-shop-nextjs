import styles from './page.module.css';
import { getUserOrders } from '@/lib/shopdb';
import { getCurrentUser } from '@/lib/auth';
import OrdersContainer from './OrdersContainer';
import Translation from '@/components/translation/Translation';

type UserOrders = {
  id: number,
  status: string,
  created_at: string
};

export default async function OrdersPage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  const user = await getCurrentUser();
  let userOrders;
  if (user) {
    userOrders = getUserOrders(user.id) as UserOrders[];
  }
  return (
    <main className={styles.main}>
      <div className={styles['main-text-container']}>
        <div className={styles['main-title']}><Translation translationKey='order.myOrders' /></div>
        <div className={styles['main-text']}><Translation translationKey='order.viewOrder' /></div>
      </div>
      {!userOrders || userOrders.length === 0 ?
        <div className={styles['not-found']}>
          <Translation translationKey='order.noOrders' />
        </div>
      :
        userOrders.map(orders => (
          <OrdersContainer lang={lang} key={orders.id} orders={orders} />
        ))
      }
    </main>
  );
}