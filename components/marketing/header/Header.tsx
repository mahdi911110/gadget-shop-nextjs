import Image from "next/image";
import Link from "next/link";

import NavLink from "./NavLink";
import styles from "./Header.module.css";
import { getCurrentUser } from "@/lib/auth";
import { getQuantity } from "@/lib/shopdb";
import SearchComponent from "./SearchComponent";
import Translation from "@/components/translation/Translation";

export default async function Header({ lang }: { lang: 'fa' | 'en' }) {
  const user = await getCurrentUser();
  const widthHeight = 50;
  const quantity = user ? getQuantity(user.id) ?? 0 : 0;
  return (
    <header className={styles.header}>
      <div className={styles["left-section"]}>
        <div className={styles["logo-container"]}>
          <Link href={`/${lang}`} className={styles["main-logo-link"]}>
            <span className={styles["text-gadget"]}><Translation translationKey="mainLogo.gadgetText" /></span>
            <span className={styles["text-shop"]}><Translation translationKey="mainLogo.shopText"/></span>
          </Link>
        </div>
      </div>
      <div className={styles["middle-section"]}>
        <SearchComponent lang={lang} />
      </div>
      <div className={styles["right-section"]}>
        <NavLink href={`/${lang}/orders`} classCss={styles["order-link"]}>
          <Image
            className={styles["order-link-img"]}
            width={widthHeight}
            height={widthHeight}
            src="/icons/order.svg"
            alt="Order"
          />
        </NavLink>
        <NavLink href={`/${lang}/cart`} classCss={styles["cart-link"]}>
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
        </NavLink>
        {user ?
          (user.role === 'admin' ?
            <NavLink href={`/${lang}/admin`} classCss={styles["login"]}>
              <Image
                className={styles["login-img"]}
                width={widthHeight}
                height={widthHeight}
                src='/icons/admin-logo.svg'
                alt="Admin Profile"
              />
            </NavLink>
          : 
            <NavLink href={`/${lang}/profile`} classCss={styles["login"]}>
              <Image
                className={styles["login-img"]}
                width={widthHeight}
                height={widthHeight}
                src='/icons/profile.svg'
                alt="Profile"
              />
            </NavLink>
          )
        :
          <NavLink href={`/${lang}/login`} classCss={styles["login"]}>
            <Image
              className={styles["login-img"]}
              width={widthHeight}
              height={widthHeight}
              src="/icons/login.svg"
              alt="Login"
            />
          </NavLink>
        }
      </div>
    </header>
  );
}
