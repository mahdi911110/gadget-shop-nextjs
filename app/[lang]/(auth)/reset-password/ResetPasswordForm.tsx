"use client";

import Link from "next/link";
import styles from "../auth.module.css";
import { useActionState, useState } from "react";
import { useTranslation } from "react-i18next";
import { resetPasswordAction } from "./resetPasswordAction";

export default function ResetPasswordForm({ lang, token }: { lang: "fa" | "en", token: string }) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction.bind(null, lang, token),
    null,
  );
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form action={formAction} className={styles.container}>
      <div className={styles.title}>{t('auth.resetPassword')}</div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.newPassword')}</div>
          <input
            className={styles.input}
            type={showPassword ? 'text' : "password"}
            name="newPassword"
            placeholder={t('auth.newPasswordPlaceholder')}
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.newPasswordAgain')}</div>
          <input
            className={styles.input}
            type={showPassword ? 'text' : "password"}
            name="newPasswordAgain"
            autoComplete="new-password"
            placeholder={t('auth.newPasswordAgainPlaceholder')}
            required
          />
        </div>
        {state?.error &&
          <div className={styles.error} role="alert">
            {state.error}
          </div>
        }
        <div className={styles["check-box"]}>
          <input
            className={styles.check}
            type="checkbox"
            onChange={(event) => setShowPassword(event.currentTarget.checked)}
          />{" "}
          {t("auth.showPass")}
        </div>
        <button
          disabled={isPending}
          type="submit"
          className={styles.button}
        >
          {t('auth.resetPasswordButton')}
        </button>
      <div className={styles["under-input"]}>
        {`${t("auth.haveAccount")} `}
        <Link className={styles.link} href={`/${lang}/login`}>
          {t("auth.loginButton")}
        </Link>
      </div>
    </form>
  );
}
