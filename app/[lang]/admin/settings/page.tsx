'use client';

import { useTranslation } from 'react-i18next';
import styles from './page.module.css';

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <main className={styles.main}>
      <div className={styles['switch-container']}>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
        <div className={styles.text}>{t('admin.settings.darkMode')}</div>
      </div>
    </main>
  );
}