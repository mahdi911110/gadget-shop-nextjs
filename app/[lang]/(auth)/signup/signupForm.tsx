"use client";

import styles from "./page.module.css";

import Link from "next/link";
import signupAction from "./signupAction";
import { useActionState, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SignupForm({ lang }: { lang: 'fa' | 'en' }) {
  const [state, formAction, isPending] = useActionState(signupAction.bind(null, lang), null);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  return (
    <form className={styles.container} action={formAction}>
      <div className={styles.title}>{t('auth.signup')}</div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.email')}</div>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            autoComplete="email"
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.username')}</div>
          <input
            className={styles.input}
            name="username"
            placeholder={t('auth.usernamePlaceholder')}
            autoComplete="username"
            required
          />
        </div>
      </div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.phoneNumber')}</div>
          <input
            className={styles.input}
            name="phoneNumber"
            placeholder={t('auth.phoneNumberPlaceholder')}
            autoComplete="phoneNumber"
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.address')}</div>
          <input
            className={styles.input}
            name="address"
            placeholder={t('auth.addressPlaceholder')}
            autoComplete="address"
            required
          />
        </div>
      </div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.country')}</div>
          <input
            className={styles.input}
            name="country"
            placeholder={t('auth.countryPlaceholder')}
            autoComplete="country"
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.city')}</div>
          <input
            className={styles.input}
            name="city"
            placeholder={t('auth.cityPlaceholder')}
            autoComplete="city"
            required
          />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>{t('auth.birthday')}</div>
        <input
          className={styles.input}
          name="birthday"
          type="date"
          autoComplete="birthday"
          required
        />
      </div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.password')}</div>
          <input
            className={styles.input}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t('auth.passwordPlaceholder')}
            autoComplete="new-password"
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.againPass')}</div>
          <input
            className={styles.input}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder={t('auth.againPassPlaceholder')}
            autoComplete="new-password"
            required
          />
        </div>
      </div>
      <div
        className={
          state?.passwordError
            ? `${styles.error}`
            : `${styles["text-password"]}`
        }
      >
        {t('auth.passInfo')}
      </div>
      <div className={styles["check-box"]}>
        <input
          className={styles.check}
          type="checkbox"
          onClick={(event) => setShowPassword(event.currentTarget.checked)}
        />
        {t('auth.showPass')}
      </div>
      {state?.error && (
        <div className={styles.error} role="alert">
          {state.error}
        </div>
      )}
      <button
        className={`${styles.button} ${isPending ? styles.loading : ""}`}
        disabled={isPending}
        onClick={() => setShowPassword(false)}
      >
        {isPending ? t('auth.registering') : t('auth.register')}
      </button>
      <div className={styles["under-input"]}>
        {`${t('auth.haveAccount')} `}
        <Link className={styles.link} href={`/${lang}/login`}>
          {t('auth.loginButton')}
        </Link>
      </div>
    </form>
  );
}
