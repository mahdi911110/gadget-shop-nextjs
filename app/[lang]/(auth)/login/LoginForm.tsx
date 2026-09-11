"use client";

import Link from "next/link";

import loginAction from "./login";
import { useActionState, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../auth.module.css";

export default function LoginForm({ lang }: { lang: 'fa' | 'en' }) {
  const [errorMessage, formAction, isPending] = useActionState(
    loginAction.bind(null, lang),
    null,
  );
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  return (
    <form className={styles.container} action={formAction}>
      <div className={styles.title}>{t('auth.login')}</div>
      <div className={styles.box}>
        <label className={styles.text}>{t('auth.email')}</label>
        <input
          className={styles.input}
          name="email"
          type="text"
          autoComplete="username"
          placeholder={`${t('auth.emailOrUsername')}`}
          required
        />
      </div>
      <div className={styles.box}>
        <label className={styles.text}>{t('auth.password')}</label>
        <input
          className={styles.input}
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder={`${t('auth.passwordPlaceholder')}`}
          required
        />
      </div>
      <div className={styles["check-box"]}>
        <input
          className={styles.check}
          type="checkbox"
          onClick={(event) => setShowPassword(event.currentTarget.checked)}
        />{" "}
        {t('auth.showPass')}
      </div>
      {errorMessage && <div className={styles.error} role="alert">{errorMessage}</div>}
      <button
        className={isPending ? `${styles.button} loading` : styles.button}
        type="submit"
        disabled={isPending}
        onClick={() => { setShowPassword(false) }}
      >
        {isPending ? `${t('auth.loggingIn')}` : `${t('auth.loginButton')}`}
      </button>
      <div className={styles["under-input"]}>
        {`${t('auth.forgetPass')} `}
        <Link className={styles.link} href={`/${lang}/forgot-password`}>
          {t('auth.sendEmail')}
        </Link>
      </div>
      <div className={styles["under-input"]}>
        {`${t('auth.noAccount')} `}
        <Link className={styles.link} href={`/${lang}/signup`}>
          {t('auth.createAccount')}
        </Link>
      </div>
    </form>
  );
}
