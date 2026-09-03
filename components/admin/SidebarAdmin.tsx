import styles from './SidebarAdmin.module.css';
import NavLink from '../marketing/header/NavLink';

export default function SidebarAdmin() {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles['sidebar-top']}>
          <NavLink href="/admin" classCss={styles.link}>
            <div className={styles['link-text']}>📊 Dashboard</div>
          </NavLink>
          <NavLink href="/admin/products" classCss={styles.link}>
            <div className={styles['link-text']}>📦 Products</div>
          </NavLink>
          <NavLink href="/admin/orders" classCss={styles.link}>
            <div className={styles['link-text']}>📋 Orders</div>
          </NavLink>
          <NavLink href="/admin/add-product" classCss={styles.link}>
            <div className={styles['link-text']}>➕ Add Product</div>
          </NavLink>
          <NavLink href="/admin/users" classCss={styles.link}>
            <div className={styles['link-text']}>👥 Users</div>
          </NavLink>
        </div>
        <NavLink href="/admin/settings" classCss={styles.link}>
          <div className={styles['link-text']}>⚙️ Settings</div>
        </NavLink>
      </div>
      <div className={`${styles['sidebar-mobile']}`}>
      <div className={styles['sidebar-top']}>
        <NavLink href="/admin" classCss={styles.link}>
          <div className={styles['link-text']}>📊</div>
        </NavLink>
        <NavLink href="/admin/products" classCss={styles.link}>
          <div className={styles['link-text']}>📦</div>
        </NavLink>
        <NavLink href="/admin/orders" classCss={styles.link}>
          <div className={styles['link-text']}>📋</div>
        </NavLink>
        <NavLink href="/admin/add-product" classCss={styles.link}>
          <div className={styles['link-text']}>➕</div>
        </NavLink>
        <NavLink href="/admin/users" classCss={styles.link}>
          <div className={styles['link-text']}>👥</div>
        </NavLink>
      </div>
      <NavLink href="/admin/settings" classCss={styles.link}>
        <div className={styles['link-text']}>⚙️</div>
      </NavLink>
    </div>
    </>
  );
}