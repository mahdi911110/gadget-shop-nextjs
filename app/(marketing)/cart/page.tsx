import Image from 'next/image';

import styles from './page.module.css';

export default function CartPage() {
  return (
    <main className={styles.main}>
      <div className={styles['card-container']}>
        <div className={styles.card}>
          <div className={styles['card-img-container']}>
            <Image className={styles['card-img']} src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes="80px" fill />
          </div>
          <div className={styles.detail}>
            <div className={styles['card-title']}>
              MacBook Pro 16
            </div>
            <div className={styles.price}>
              $2499
            </div>
            <div className={styles['button-container']}>
              <div className={styles.edit}>Quantity:</div>
              <button className={styles['button-remove']}>-</button>
              <input className={styles['input-edit']} type="text" placeholder='2' />
              <button className={styles['button-add']}>+</button>
              <button className={styles['button-delete']}>Delete</button>
            </div>
          </div>
          <div className={styles['delivery-options-container']}>
            <div className={styles['delivery-option-title']}>Choose a delivery option:</div>
            <label className={styles['delivery-options']}>
              <input className={styles.radio} type="radio" name="1" />
              <div className={styles['delivery-title-container']}>
                <div className={styles['delivery-title']}>Monday, September 10</div>
                <div className={styles['text-shipping']}>FREE Shipping</div>
              </div>
            </label>
            <label className={styles['delivery-options']}>
              <input className={styles.radio} type="radio" name="1" />
              <div className={styles['delivery-title-container']}>
                <div className={styles['delivery-title']}>Tuesday, September 1</div>
                <div className={styles['text-shipping']}>$4.99 Shipping</div>
              </div>
            </label>
            <label className={styles['delivery-options']}>
              <input className={styles.radio} type="radio" name="1" />
              <div className={styles['delivery-title-container']}>
                <div className={styles['delivery-title']}>Friday, August 28</div>
                <div className={styles['text-shipping']}>$9.99 Shipping</div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className={styles['payment-summary']}>
        <div className={styles['payment-summary-title']}>
          Order Summary
        </div>
        <div className={styles['text-container']}>
          <div className={styles.text}>Items (6):</div>
          <div className={styles.pirce}>$2499</div>
        </div>
        <div className={styles['text-container']}>
          <div className={styles.text}>Shipping & handling:</div>
          <div className={styles.pirce}>$9.99</div>
        </div>
        <div className={styles['text-container']}>
          <div className={styles.text}>Total before tax:</div>
          <div className={styles.pirce}>$2508.98</div>
        </div>
        <div className={styles['text-container']}>
          <div className={styles.text}>Estimated tax (10%):</div>
          <div className={styles.pirce}>$9.99</div>
        </div>
        <div className={styles['total-container']}>
          <div className={styles.text}>Order Total:</div>
          <div className={styles.pirce}>$2522</div>
        </div>
        <button className={styles['button-checkout']}>Proceed to Checkout</button>
      </div>
    </main>
  );
}