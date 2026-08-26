import Image from 'next/image';
import Link from 'next/link';

import NavLink from './NavLink';
import styles from './Header.module.css';

export default function Header() {
  const widthHeight: number = 50;
  return (
    <header className={styles.header}>
      <div className={styles['left-section']}>
        <Link href="/" className={styles['main-logo-link']}>
          <span className={styles['text-gadget']}>GADGET</span>
          <span className={styles['text-shop']}>SHOP</span>
        </Link>
      </div>
      <div className={styles['middle-section']}>
        <div className='search-box'></div>
        <input className={styles['search-input']} type="text" placeholder='Search a product' />
        <button className={styles['search-button']}>
          <Image className={styles['search-button-img']} width={35} height={35} src="/icons/search.svg" alt="Search" />
        </button>
      </div>
      <div className={styles['right-section']}>
        <NavLink href="/orders" classCss={styles['order-link']}>
          <Image className={styles['order-link-img']} width={widthHeight} height={widthHeight} src="/icons/order.svg" alt="Order" />
        </NavLink>
        <NavLink href="/cart" classCss={styles['cart-link']}>
          <Image className={styles['cart-link-img']} width={widthHeight} height={widthHeight} src="/icons/cart.svg" alt="Cart" />
        </NavLink>
        <NavLink href="/login" classCss={styles['login']}>
          <Image className={styles['login-img']} width={widthHeight} height={widthHeight} src="/icons/login.svg" alt="Login" />
        </NavLink>
      </div>
    </header>
  );
}