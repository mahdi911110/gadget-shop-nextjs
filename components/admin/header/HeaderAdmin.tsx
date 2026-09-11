import Link from 'next/link';

import styles from './HeaderAdmin.module.css';
import logoutAction from '@/action/logoutAction';
import Translation from '@/components/translation/Translation';

export default async function HeaderAdmin({ 
  lang
}: {
  lang: 'fa' | 'en'
}) {
  return (
    <header className={styles.header}>
      <Link href={`/${lang}`} className={styles['main-logo-link']}>
        <span className={styles['text-gadget']}><Translation translationKey='mainLogo.gadgetText' /></span>
        <span className={styles['text-shop']}><Translation translationKey='mainLogo.shopText' /></span>
      </Link>
      <div className={styles['admin-logout']}>
        <div className={styles['text-admin']}><Translation translationKey='admin.adminHeader.admin' /></div>
        <form action={logoutAction.bind(null, lang)}>
					<button className={styles['button-logout']} type='submit'>
						<Translation translationKey='admin.adminHeader.logout' />
					</button>
        </form>
      </div>
    </header>
  );
}