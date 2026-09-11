'use client';

import { useActionState, useEffect } from "react";
import styles from "./page.module.css";
import buyAgainAction from "./buyAgainAction";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ButtonBuyAgain({ productId, lang }: { productId: number, lang: 'fa' | 'en' }) {
  const [state, formAction, isPending] = useActionState(
    buyAgainAction.bind(null, lang, productId),
    null
  );
  const { t } = useTranslation();
  
  useEffect(() => {
    if (state) {
      toast.error(state.error);
    }
  }, [state]);
  
  return (
    <form
      className={styles["button-buy-again-container"]}
      action={formAction}
    >
      <button
        className={
          isPending ? 
            `${styles["button-buy-again"]} loading`
          :
            styles["button-buy-again"]
          }
        type="submit"
        disabled={isPending}
      >
        <span
          className={
            isPending ?
              styles['spiner-icon']
            :
              ''
          }
        >
          ⭮
        </span> 
        {isPending ? t('order.buyingAgain') : t('order.buyAgain')}
      </button>
    </form>
  );
}
