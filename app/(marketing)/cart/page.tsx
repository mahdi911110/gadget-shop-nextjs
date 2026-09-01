import Image from "next/image";

import styles from "./page.module.css";
import { getCurrentUser } from "@/lib/auth";
import { getQuantity, getUserCart } from "@/lib/shopdb";
import DeliveryOptions from "./DeliveryOptions";
import ButtonSave from "./ButtonSave";
import ButtonDelete from "./ButtonDelete";

type CartItems = {
  productId: number,
  price_cents: number,
  image_url: string,
  product_name: string,
  quantity: number,
  delivery_option: number,
  cartItemsId: number
};

export default async function CartPage() {
  const user = await getCurrentUser();
  let cartItems;
  if (user) {
    cartItems = getUserCart(user.id) as CartItems[];
  }
  const quantity = user ? getQuantity(user.id) ?? 0 : 0;
  return (
    <main className={styles.main}>
      <div className={styles["card-container"]}>
        {cartItems?.map((cartItem) => (
          <div key={cartItem.productId} className={styles.card}>
            <div className={styles["card-img-container"]}>
              <Image
                className={styles["card-img"]}
                src={cartItem.image_url}
                alt="MacBook Pro 16"
                sizes="80px"
                fill
              />
            </div>
            <div className={styles.detail}>
              <div className={styles["card-title"]}>
                {cartItem.product_name}
              </div>
              <div className={styles.price}>${cartItem.price_cents / 100}</div>
              <div className={styles["button-container"]}>
                <div className={styles.edit}>Quantity:</div>
                <ButtonSave quantity={cartItem.quantity} productId={cartItem.productId} />
                <ButtonDelete productId={cartItem.productId} cartId={cartItem.cartItemsId} />
              </div>
            </div>
            <DeliveryOptions
              productId={cartItem.productId}
              deliveryOption={cartItem.delivery_option}
            />
          </div>
        ))}
      </div>
      <div className={styles["payment-summary"]}>
        <div className={styles["payment-summary-title"]}>Order Summary</div>
        <div className={styles["text-container"]}>
          <div className={styles.text}>Items ({quantity}):</div>
          <div className={styles.pirce}>$2499</div>
        </div>
        <div className={styles["text-container"]}>
          <div className={styles.text}>Shipping & handling:</div>
          <div className={styles.pirce}>$9.99</div>
        </div>
        <div className={styles["text-container"]}>
          <div className={styles.text}>Total before tax:</div>
          <div className={styles.pirce}>$2508.98</div>
        </div>
        <div className={styles["text-container"]}>
          <div className={styles.text}>Estimated tax (10%):</div>
          <div className={styles.pirce}>$9.99</div>
        </div>
        <div className={styles["total-container"]}>
          <div className={styles.text}>Order Total:</div>
          <div className={styles.pirce}>$2522</div>
        </div>
        <button className={styles["button-checkout"]}>
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}
