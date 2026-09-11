import Link from 'next/link';

import styles from './HeaderAuth.module.css';
import Translation from '../translation/Translation';

export default function HeaderAuth({ lang }: { lang: 'fa' | 'en' }) {
  return (
    <header className={styles.header}>
      <Link href={`/${lang}`} className={styles['main-logo-link']}>
        <span className={styles['text-gadget']}>
          <Translation translationKey='mainLogo.gadgetText' />
        </span>
        <span className={styles['text-shop']}>
          <Translation translationKey='mainLogo.shopText' />
        </span>
      </Link>
    </header>
  );
}