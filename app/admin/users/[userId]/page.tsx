import { getRecentOrder, getUser } from '@/lib/shopdb';
import styles from './page.module.css';

type UserType = {
	username: string,
	email: string,
	created_at: string,
	totalQuantity: number,
	totalSpent: number,
	ordersId: number | null
}

type RecentOrder = {
  id: number,
  price_cents: number,
  status: string
}

export default async function UserDetailPage({ params }: { params: Promise<{userId: string}> }) {
	const { userId } = await params;
	const user = getUser(Number(userId)) as UserType;

  const recentOrder = getRecentOrder(Number(userId)) as RecentOrder[];

	return (
    <main className={styles.main}>
      <div className={styles['container']}>
        <div className={styles.header}>Username:</div>
        <div className={styles.text}>{user.username}</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Email:</div>
        <div className={styles.text}>{user.email}</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Joined:</div>
        <div className={styles.text}>{user.created_at}</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Orders:</div>
        <div className={styles.text}>{user.totalQuantity}</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Total Spent:</div>
        <div className={styles.text}>${user.totalSpent}</div>
      </div>
      <div className={styles['container']}>
        <div className={styles.header}>Recent Orders</div>
        <div className={styles['table-container']}>
					{recentOrder.length === 0 ?
            <div className={styles['orders-not-found']}>No recent orders have been found.</div>
					:
						<table className={styles.table}>
							<thead>
								<tr>
									<th className={styles['table-th']}>Order Id</th>
									<th className={styles['table-th']}>Amount</th>
									<th className={styles['table-th']}>Status</th>
								</tr>
							</thead>
							<tbody>
                {recentOrder.map(order => (
                  <tr key={order.id}>
                    <td className={styles['table-td']}>{order.id}</td>
                    <td className={styles['table-td']}>${order.price_cents / 100}</td>
                    <td className={styles['table-td']}>{order.status}</td>
                  </tr>
                ))}
							</tbody>
						</table>
					}
        </div>
      </div>
    </main>
  );
}