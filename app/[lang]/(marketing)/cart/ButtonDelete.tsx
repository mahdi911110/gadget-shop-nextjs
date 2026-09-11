"use client";

import { useFormStatus } from "react-dom";
import styles from "./page.module.css";
import { updateDeleteButton } from "./updateDeleteButton";
import { useTranslation } from "react-i18next";

export default function ButtonDelete({
  lang,
  productId,
  cartId,
}: {
  lang: 'fa' | 'en',
  productId: number,
  cartId: number
}) {
  const { t } = useTranslation();
  const { pending } = useFormStatus();
  return (
    <form action={updateDeleteButton.bind(null, lang, productId, cartId)}>
      <button
        className={styles["button-delete"]}
        type="submit"
        disabled={pending}
      >
        {pending ? t('cart.deleteButton.deleting') : t('cart.deleteButton.delete')}
      </button>
    </form>
  );
}
