"use client";

import { useActionState } from "react";
import styles from "./page.module.css";
import { updateDeleteButton } from "./updateDeleteButton";

export default function ButtonDelete({
  productId,
  cartId,
}: {
  productId: number;
  cartId: number;
}) {
  const [state, formAction, isPending] = useActionState(
    updateDeleteButton.bind(null, productId, cartId),
    null,
  );
  return (
    <form action={formAction}>
      <button
        className={styles["button-delete"]}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
