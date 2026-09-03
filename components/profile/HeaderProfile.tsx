import logoutAction from '@/action/logoutAction';
import styles from './HeaderProfile.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { getQuantity } from '@/lib/shopdb';
import { getCurrentUser } from '@/lib/auth';

export default async function HeaderProfile() {
  const user = await getCurrentUser();
  const widthHeight = 50;
  const quantity = user ? getQuantity(user.id) ?? 0 : 0;

  return (
    <header className={styles.header}>
      <div className={styles["left-section"]}>
        <div className={styles["logo-container"]}>
          <Link href="/" className={styles["main-logo-link"]}>
            <span className={styles["text-gadget"]}>GADGET</span>
            <span className={styles["text-shop"]}>SHOP</span>
          </Link>
        </div>
      </div>
      <div className={styles["right-section"]}>
        <Link href="/orders" className={styles["order-link"]}>
          <Image
            className={styles["order-link-img"]}
            width={widthHeight}
            height={widthHeight}
            src="/icons/order.svg"
            alt="Order"
          />
        </Link>
        <Link href="/cart" className={styles["cart-link"]}>
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
        <form action={logoutAction}>
					<button className={styles['button-logout']} type='submit'>
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