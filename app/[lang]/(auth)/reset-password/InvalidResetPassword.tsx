'use client';

import Link from "next/link";
import styles from '../auth.module.css';
import { useTranslation } from "react-i18next";

export default function InvalidResetPassword({ lang }: { lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('auth.invalidTokenTitle')}</div>
      <div className={styles.box}>
        <div className={styles.text}>{t('auth.invalidTokenText')}</div>
      </div>
      <div className={styles['under-input']}>
        {`${t('auth.sendAgainText')} `}
        <Link
          className={styles.link}
          href={`/${lang}/forgot-password`}
        >
          {t('auth.sendEmail')}
        </Link>
      </div>
    </div>
  );
}