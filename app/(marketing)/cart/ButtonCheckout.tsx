"use client";

import { useActionState, useEffect } from "react";
import styles from "./page.module.css";
import checkoutAction from "./checkoutAction";
import { toast } from "react-toastify";

export default function ButtonCheckout() {
  const [state, formAction, isPending] = useActionState(
    checkoutAction.bind(null),
    null,
  );
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
        {isPending ? 'Proceeding to Checkout...' : 'Proceed to Checkout'}
      </button>
    </form>
  );
}
