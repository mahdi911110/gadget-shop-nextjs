import logoutAction from '@/action/logoutAction';
import styles from './HeaderProfile.module.css';

import Link from 'next/link';

export default function HeaderProfile() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles['main-logo-link']}>
        <span className={styles['text-gadget']}>GADGET</span>
        <span className={styles['text-shop']}>SHOP</span>
      </Link>
      <div className={styles['admin-logout']}>
        <div className={styles['text-admin']}>Profile 👤</div>
        <form action={logoutAction}>
					<button className={styles['button-logout']} type='submit'>
						Logout
					</button>
        </form>
      </div>
    </header>
  );
}