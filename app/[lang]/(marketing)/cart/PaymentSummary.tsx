import Translation from "@/components/translation/Translation";
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

export default function PaymentSummary({
    lang,
    cartItems,
    quantity,
    totalPriceCents
  }: {
    lang: 'fa' | 'en',
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
      <div className={styles["payment-summary-title"]}><Translation translationKey="cart.paymentSummary.orderSummary"/></div>
      <div className={styles["text-container"]}>
        <div className={styles.text}><Translation translationKey="cart.paymentSummary.items"/> ({quantity}):</div>
        <div className={styles.pirce}>${(totalPriceCents / 100).toFixed(2)}</div>
      </div>
      <div className={styles["text-container"]}>
        <div className={styles.text}><Translation translationKey="cart.paymentSummary.shippingAndHandling"/></div>
        <div className={styles.pirce}>${(shippingCost / 100).toFixed(2)}</div>
      </div>
      <div className={styles["text-container"]}>
        <div className={styles.text}><Translation translationKey="cart.paymentSummary.totalBeforeTax"/></div>
        <div className={styles.pirce}>${(totalBeforeTaxCents / 100).toFixed(2)}</div>
      </div>
      <div className={styles["text-container"]}>
        <div className={styles.text}><Translation translationKey="cart.paymentSummary.estimatedTax"/></div>
        <div className={styles.pirce}>${(taxCents / 100).toFixed(2)}</div>
      </div>
      <div className={styles["total-container"]}>
        <div className={styles.text}><Translation translationKey="cart.paymentSummary.orderTotal"/></div>
        <div className={styles.pirce}>${(totalPriceCetsWithTax / 100).toFixed(2)}</div>
      </div>
      <ButtonCheckout lang={lang} />
    </div>
  );
}