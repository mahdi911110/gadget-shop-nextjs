'use client'

import { useActionState, useEffect } from "react";
import styles from "./page.module.css";
import buyAgainAction from "./buyAgainAction";
import { toast } from "react-toastify";

export default function ButtonBuyAgain({ productId }: {productId: number}) {
  const [state, formAction, isPending] = useActionState(
    buyAgainAction.bind(null, productId),
    null
  );
  
  useEffect(() => {
    if (state) {
      toast.error(state.error);
    }
  });
  
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
        {isPending ? 'Buing...' : 'Buy Again'}
      </button>
    </form>
  );
}
