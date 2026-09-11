'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";

import styles from '../auth.module.css';

export default function ForgotPassword({ lang }: { lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('auth.sendEmailHeader')}</div>
      <div className={styles.box}>
        <div className={styles.text}>{t('auth.email')}</div>
        <input className={styles.input} type="email" placeholder={t('auth.sendEmailPlaceholder')} />
      </div>
      <button className={styles.button}>{t('auth.sendEmailButton')}</button>
      <div className={styles['under-input']}>
        {`${t('auth.noAccount')} `}
        <Link className={styles.link} href={`/${lang}/signup`}>
          {t('auth.createAccount')}
        </Link>
      </div>
      <div className={styles['under-input']}>
        {`${t('auth.haveAccount')} `}
        <Link className={styles.link} href={`/${lang}/login`}>
          {t('auth.loginButton')}
        </Link>
      </div>
    </div>
  );
}