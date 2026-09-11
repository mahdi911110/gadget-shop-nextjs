import styles from "./SidebarAdmin.module.css";
import NavLink from "../../marketing/header/NavLink";
import Translation from "@/components/translation/Translation";

export default function SidebarAdmin({ lang }: { lang: "fa" | "en" }) {
  return (
    <>
      <div className={`${styles.sidebar} ${lang === 'fa' ? styles['sidebar-fa'] : styles['sidebar-en']}`}>
        <div className={styles["sidebar-top"]}>
          <NavLink href={`/${lang}/admin`} classCss={styles.link}>
            <div className={styles["link-text"]}><Translation translationKey="sidebar.dashboard" /></div>
          </NavLink>
          <NavLink href={`/${lang}/admin/products`} classCss={styles.link}>
            <div className={styles["link-text"]}><Translation translationKey="sidebar.products" /></div>
          </NavLink>
          <NavLink href={`/${lang}/admin/orders`} classCss={styles.link}>
            <div className={styles["link-text"]}><Translation translationKey="sidebar.orders" /></div>
          </NavLink>
          <NavLink href={`/${lang}/admin/add-product`} classCss={styles.link}>
            <div className={styles["link-text"]}><Translation translationKey="sidebar.addProduct" /></div>
          </NavLink>
          <NavLink href={`/${lang}/admin/users`} classCss={styles.link}>
            <div className={styles["link-text"]}><Translation translationKey="sidebar.users" /></div>
          </NavLink>
        </div>
        <NavLink href={`/${lang}/admin/settings`} classCss={styles.link}>
          <div className={styles["link-text"]}><Translation translationKey="sidebar.settings" /></div>
        </NavLink>
      </div>
      <div className={`${styles["sidebar-mobile"]} ${lang === 'fa' ? styles['sidebar-mobile-fa'] : styles['sidebar-mobile-en']}`}>
        <div className={styles["sidebar-top"]}>
          <NavLink href={`/${lang}/admin`} classCss={styles.link}>
            <div className={styles["link-text"]}>📊</div>
          </NavLink>
          <NavLink href={`/${lang}/admin/products`} classCss={styles.link}>
            <div className={styles["link-text"]}>📦</div>
          </NavLink>
          <NavLink href={`/${lang}/admin/orders`} classCss={styles.link}>
            <div className={styles["link-text"]}>📋</div>
          </NavLink>
          <NavLink href={`/${lang}/admin/add-product`} classCss={styles.link}>
            <div className={styles["link-text"]}>➕</div>
          </NavLink>
          <NavLink href={`/${lang}/admin/users`} classCss={styles.link}>
            <div className={styles["link-text"]}>👥</div>
          </NavLink>
        </div>
        <NavLink href={`/${lang}/admin/settings`} classCss={styles.link}>
          <div className={styles["link-text"]}>⚙️</div>
        </NavLink>
      </div>
    </>
  );
}
