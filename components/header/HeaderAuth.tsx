import Link from 'next/link';

import styles from './HeaderAuth.module.css';

export default function HeaderAuth() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles['main-logo-link']}>
        <span className={styles['text-gadget']}>GADGET</span>
        <span className={styles['text-shop']}>SHOP</span>
      </Link>
    </header>
  );
}