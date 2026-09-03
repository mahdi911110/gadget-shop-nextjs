import ButtonCheckout from "./ButtonCheckout";

import styles from './page.module.css';

type CartItems = {
  productId: number,
  price_cents: number,
  image_url: string,
  product_name: string,
  quantity: number,
  delivery_option: number,
  cartId: number,
  cartItemsId: number
};

export default async function PaymentSummary({
    cartItems,
    quantity,
    totalPriceCents
  }: {
    cartItems: CartItems[],
    quantity: number,
    totalPriceCents: number
  }) {
  const shippingCost = cartItems?.reduce((total, cartItem) => {
    if (cartItem.delivery_option === 1) {
      return total + 499;
    }

    if (cartItem.delivery_option === 2) {
      return total + 999;
    }

    return total;
  }, 0) ?? 0;
  
  const totalBeforeTaxCents = totalPriceCents + shippingCost;
  const taxCents = Math.round(totalBeforeTaxCents / 10);
  const totalPriceCetsWithTax = totalBeforeTaxCents + taxCents;

  return (
    <div className={styles["payment-summary"]}>
      <div className={styles["payment-summary-title"]}>Order Summary</div>
      <div className={styles["text-container"]}>
        <div className={styles.text}>Items ({quantity}):</div>
        <div className={styles.pirce}>${(totalPriceCents / 100).toFixed(2)}</div>
      </div>
      <div className={styles["text-container"]}>
        <div className={styles.text}>Shipping & handling:</div>
        <div className={styles.pirce}>${(shippingCost / 100).toFixed(2)}</div>
      </div>
      <div className={styles["text-container"]}>
        <div className={styles.text}>Total before tax:</div>
        <div className={styles.pirce}>${(totalBeforeTaxCents / 100).toFixed(2)}</div>
      </div>
      <div className={styles["text-container"]}>
        <div className={styles.text}>Estimated tax (10%):</div>
        <div className={styles.pirce}>${(taxCents / 100).toFixed(2)}</div>
      </div>
      <div className={styles["total-container"]}>
        <div className={styles.text}>Order Total:</div>
        <div className={styles.pirce}>${(totalPriceCetsWithTax / 100).toFixed(2)}</div>
      </div>
      <ButtonCheckout />
    </div>
  );
}