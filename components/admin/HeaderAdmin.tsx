import Link from 'next/link';

import styles from './HeaderAdmin.module.css';
import logoutAction from '@/action/logoutAction';

export default function HeaderAdmin() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles['main-logo-link']}>
        <span className={styles['text-gadget']}>GADGET</span>
        <span className={styles['text-shop']}>SHOP</span>
      </Link>
      <div className={styles['admin-logout']}>
        <div className={styles['text-admin']}>Admin 👤</div>
        <form action={logoutAction}>
					<button className={styles['button-logout']}>
						Logout
					</button>
        </form>
      </div>
    </header>
  );
}