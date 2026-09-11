import logoutAction from '@/action/logoutAction';
import styles from './HeaderProfile.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { getQuantity } from '@/lib/shopdb';
import { getCurrentUser } from '@/lib/auth';
import Translation from '../translation/Translation';
import DarkButton from '../darkButton/DarkButton';

export default async function HeaderProfile({ lang }: { lang: 'fa' | 'en' }) {
  const user = await getCurrentUser();
  const widthHeight = 50;
  const quantity = user ? getQuantity(user.id) ?? 0 : 0;

  return (
    <header className={styles.header}>
      <div className={styles["left-section"]}>
        <div className={styles["logo-container"]}>
          <Link href={`/${lang}`} className={styles["main-logo-link"]}>
            <span className={styles["text-gadget"]}><Translation translationKey='mainLogo.gadgetText'/></span>
            <span className={styles["text-shop"]}><Translation translationKey='mainLogo.shopText'/></span>
          </Link>
        </div>
      </div>
      <div className={styles["right-section"]}>
        <DarkButton widthHeight={widthHeight} />
        <Link href={`/${lang}/orders`} className={styles["header-link"]}>
          <Image
            className={styles["order-link-img"]}
            width={widthHeight}
            height={widthHeight}
            src="/icons/order.svg"
            alt="Order"
          />
        </Link>
        <Link href={`/${lang}/cart`} className={styles["header-link"]}>
          <div className={styles.cart}>
            <Image
              className={styles["cart-link-img"]}
              width={widthHeight}
              height={widthHeight}
              src="/icons/cart.svg"
              alt="Cart"
            />
            <span className={styles["cart-count"]}>{quantity}</span>
          </div>
        </Link>
        <form action={logoutAction.bind(null, lang)}>
					<button className={styles['header-link']} type='submit'>
						<Image
              className={styles["cart-link-img"]}
              width={widthHeight}
              height={widthHeight}
              src="/icons/logout.svg"
              alt="Cart"
            />
					</button>
        </form>
      </div>
    </header>
  );
}