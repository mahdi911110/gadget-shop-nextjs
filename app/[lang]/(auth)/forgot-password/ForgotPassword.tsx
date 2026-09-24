'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";

import styles from '../auth.module.css';
import { useActionState } from "react";
import { forgotPasswordAction } from "./forgotPasswordAction";

export default function ForgotPassword({ lang }: { lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction.bind(null, lang),
    null
  );
  if (state) {
    return (
    <div className={styles.container}>
      <div className={styles.title}>EMAIL SENT</div>
      <div className={styles.box}>
        <div className={styles.text}>If this email is registerd in this site we send you email.</div>
        <div className={styles.text}>Please check your email box to chage your password.</div>
      </div>
    </div>
    );
  }
  return (
    <form action={formAction} className={styles.container}>
      <div className={styles.title}>{t('auth.sendEmailHeader')}</div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.email')}</div>
          <input className={styles.input} type="email" name="email" placeholder={t('auth.sendEmailPlaceholder')} />
        </div>
        <button disabled={isPending} type="submit" className={styles.button}>{t('auth.sendEmailButton')}</button>
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
    </form>
  );
}