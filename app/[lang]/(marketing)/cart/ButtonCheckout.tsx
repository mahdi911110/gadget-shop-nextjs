"use client";

import { useActionState, useEffect } from "react";
import styles from "./page.module.css";
import checkoutAction from "./checkoutAction";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ButtonCheckout({ lang }:{ lang: 'fa' | 'en'}) {
  const [state, formAction, isPending] = useActionState(
    checkoutAction.bind(null, lang),
    null,
  );
  const { t } = useTranslation();
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.notFound) {
      toast.error(state.notFound);
    }
  }, [state]);

  return (
    <form className={styles['form-buttom']} action={formAction}>
      <button
        className={
          isPending ?
            `${styles["button-checkout"]} loading`
          :
            styles["button-checkout"]
        }
        type="submit"
        disabled={isPending}
      >
        {isPending ? t('cart.paymentSummary.proceedingToCheckout') : t('cart.paymentSummary.proceedToCheckout')}
      </button>
    </form>
  );
}
