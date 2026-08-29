import styles from './page.module.css';

export default function SettingsPage() {
  return (
    <main className={styles.main}>
      <div className={styles['switch-container']}>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
        <div className={styles.text}>Dark Mode</div>
      </div>
      <div className={styles['switch-container']}>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
        <div className={styles.text}>Persian</div>
      </div>
    </main>
  );
}