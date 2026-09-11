import Image from "next/image";

import styles from "./page.module.css";
import { getCurrentUser } from "@/lib/auth";
import { getQuantity, getUserCart, getTotalPriceCents } from "@/lib/shopdb";
import DeliveryOptions from "./DeliveryOptions";
import ButtonSave from "./ButtonSave";
import ButtonDelete from "./ButtonDelete";
import PaymentSummary from "./PaymentSummary";
import Translation from "@/components/translation/Translation";

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

export default async function CartPage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en'}>
}) {
  const user = await getCurrentUser();
  let cartItems: CartItems[] = [];
  if (user) {
    cartItems = await getUserCart(user.id) as CartItems[];
  }

  const quantity = user ? getQuantity(user.id) ?? 0 : 0;

  const totalPriceCents = user ? getTotalPriceCents(user.id) ?? 0 : 0;

  const { lang } = await params;

  return (
    <main className={styles.main}>
      <div className={styles['card-container']}>
        {cartItems.length === 0 ?
          <div className={styles['not-found']}>
            <Translation translationKey="cart.card.empty" />
          </div>
        :
          cartItems.map((cartItem) => (
            <div key={cartItem.productId} className={styles.card}>
              <div className={styles["card-img-container"]}>
                <Image
                  className={styles["card-img"]}
                  src={cartItem.image_url}
                  alt={cartItem.product_name}
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
                  <div className={styles.edit}><Translation translationKey="cart.card.quantity" /></div>
                  <ButtonSave lang={lang} quantity={cartItem.quantity} productId={cartItem.productId} />
                  <ButtonDelete lang={lang} productId={cartItem.productId} cartId={cartItem.cartId} />
                </div>
              </div>
              <DeliveryOptions
                lang={lang}
                productId={cartItem.productId}
                deliveryOption={cartItem.delivery_option}
              />
            </div>
          ))
        }
      </div>
      <PaymentSummary
        lang={lang}
        cartItems={cartItems}
        quantity={quantity}
        totalPriceCents={totalPriceCents}
      />
    </main>
  );
}
