"use client";

import { useFormStatus } from "react-dom";
import styles from "./page.module.css";
import { updateDeleteButton } from "./updateDeleteButton";

export default function ButtonDelete({
  productId,
  cartId,
}: {
  productId: number;
  cartId: number;
}) {
  const { pending } = useFormStatus();
  return (
    <form action={updateDeleteButton.bind(null, productId, cartId)}>
      <button
        className={styles["button-delete"]}
        type="submit"
        disabled={pending}
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
