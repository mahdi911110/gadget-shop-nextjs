"use client";

import { useState, useTransition } from "react";

import styles from "./page.module.css";

import updateDeliveryOptions from "./updateDeliveryOptions";

export default function DeliveryOptions({
  productId,
  deliveryOption,
}: {
  productId: number;
  deliveryOption: number;
}) {
  const [selectedOption, setSelectedOption] = useState(deliveryOption);
  const [isPending, startTransition] = useTransition();

  function handleDeliveryOption(option: number) {
    setSelectedOption(option);

    startTransition(async () => {
      await updateDeliveryOptions(option, productId);
    });
  }

  return (
    <div className={styles["delivery-options-container"]}>
      <div className={styles["delivery-option-title"]}>
        Choose a delivery option:
      </div>

      <label className={styles["delivery-options"]}>
        <input
          className={styles.radio}
          type="radio"
          name={`delivery-name-${productId}`}
          checked={selectedOption === 0}
          disabled={isPending}
          onChange={() => handleDeliveryOption(0)}
        />

        <div className={styles["delivery-title-container"]}>
          <div className={styles["delivery-title"]}>
            Monday, September 10
          </div>
          <div className={styles["text-shipping"]}>
            FREE Shipping
          </div>
        </div>
      </label>

      <label className={styles["delivery-options"]}>
        <input
          className={styles.radio}
          type="radio"
          name={`delivery-name-${productId}`}
          checked={selectedOption === 1}
          disabled={isPending}
          onChange={() => handleDeliveryOption(1)}
        />

        <div className={styles["delivery-title-container"]}>
          <div className={styles["delivery-title"]}>
            Tuesday, September 1
          </div>
          <div className={styles["text-shipping"]}>
            $4.99 Shipping
          </div>
        </div>
      </label>

      <label className={styles["delivery-options"]}>
        <input
          className={styles.radio}
          type="radio"
          name={`delivery-name-${productId}`}
          checked={selectedOption === 2}
          disabled={isPending}
          onChange={() => handleDeliveryOption(2)}
        />

        <div className={styles["delivery-title-container"]}>
          <div className={styles["delivery-title"]}>
            Friday, August 28
          </div>
          <div className={styles["text-shipping"]}>
            $9.99 Shipping
          </div>
        </div>
      </label>

      {isPending && (
        <div className={styles['loading-text']}>
          Updating delivery option...
        </div>
      )}
    </div>
  );
}