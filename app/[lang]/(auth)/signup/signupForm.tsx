"use client";

import styles from "./page.module.css";

import Link from "next/link";
import signupAction from "./signupAction";
import { useActionState, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function SignupForm({ lang }: { lang: 'fa' | 'en' }) {
  const [state, formAction, isPending] = useActionState(signupAction.bind(null, lang), null);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

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
          {state?.errors?.email && (
            <div className={styles.error} role="alert">
              {state.errors.email}
            </div>
          )}
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
          {state?.errors?.username && (
            <div className={styles.error} role="alert">
              {state.errors.username}
            </div>
          )}
        </div>
      </div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.phoneNumber')}</div>
          <input
            className={styles.input}
            name="phoneNumber"
            type="tel"
            placeholder={t('auth.phoneNumberPlaceholder')}
            autoComplete="tel"
            style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
            required
          />
          {state?.errors?.phoneNumber && (
            <div className={styles.error} role="alert">
              {state.errors.phoneNumber}
            </div>
          )}
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.address')}</div>
          <input
            className={styles.input}
            name="address"
            placeholder={t('auth.addressPlaceholder')}
            autoComplete="street-address"
            required
          />
          {state?.errors?.address && (
            <div className={styles.error} role="alert">
              {state.errors.address}
            </div>
          )}
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
          {state?.errors?.country && (
            <div className={styles.error} role="alert">
              {state.errors.country}
            </div>
          )}
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.city')}</div>
          <input
            className={styles.input}
            name="city"
            placeholder={t('auth.cityPlaceholder')}
            autoComplete="address-level2"
            required
          />
          {state?.errors?.city && (
            <div className={styles.error} role="alert">
              {state.errors.city}
            </div>
          )}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>{t('auth.birthday')}</div>
        <input
          className={styles.input}
          name="birthday"
          type="date"
          autoComplete="bday"
          required
        />
        {state?.errors?.birthday && (
          <div className={styles.error} role="alert">
            {state.errors.birthday}
          </div>
        )}
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
          {state?.errors?.password && (
            <div className={styles.error} role="alert">
              {state.errors.password}
            </div>
          )}
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
          {state?.errors?.confirmPassword && (
            <div className={styles.error} role="alert">
              {state.errors.confirmPassword}
            </div>
          )}
        </div>
      </div>
      <div className={`${styles["text-password"]}`}>
        {t('auth.passInfo')}
      </div>
      <div className={styles["check-box"]}>
        <input
          className={styles.check}
          type="checkbox"
          onChange={(event) => setShowPassword(event.currentTarget.checked)}
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
