import Image from 'next/image';
import styles from './page.module.css';

export default function OrdersPage() {
  return (
    <main className={styles.main}>
      <div className={styles['main-text-container']}>
        <div className={styles['main-title']}>My Orders</div>
        <div className={styles['main-text']}>view your order history and tracking details</div>
      </div>
      <div className={styles['orders-container']}>
        <div className={styles['order-container']}>
          <div className={styles['order-title-container']}>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Order Id</div>
              <div className={styles['order-detail-text']}>47582</div>
            </div>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Order Date</div>
              <div className={styles['order-detail-text']}>15 January 2025</div>
            </div>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Total Amount</div>
              <div className={styles['order-detail-text']}>$487.00</div>
            </div>
          </div>
          <div className={styles['order-detail']}>
            <div className={styles['order-img-text-container']}>
              <div className={styles['order-img-container']}>
                <Image src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes='80px' fill/>
              </div>
              <div className={styles['order-text-container']}>
                <div className={styles['order-text-title']}>MacBook 16 Pro</div>
                <div className={styles['button-buy-again-container']}>
                  <button className={styles['button-buy-again']}>Buy Again</button>
                </div>
              </div>
            </div>
            <div className={styles['order-date-container']}>
              <div className={styles['order-date']}>
                🟢 <span className={styles['deliver-text']}>Deliverd on </span>22 January 2025
              </div>
            </div>
          </div>
          <div className={styles['order-detail']}>
            <div className={styles['order-img-text-container']}>
              <div className={styles['order-img-container']}>
                <Image src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes='80px' fill/>
              </div>
              <div className={styles['order-text-container']}>
                <div className={styles['order-text-title']}>MacBook 16 Pro</div>
                <div className={styles['button-buy-again-container']}>
                  <button className={styles['button-buy-again']}>Buy Again</button>
                </div>
              </div>
            </div>
            <div className={styles['order-date-container']}>
              <div className={styles['order-date']}>
                🟢 <span className={styles['deliver-text']}>Deliverd on </span>22 January 2025
              </div>
            </div>
          </div>
          <div className={styles['order-detail']}>
            <div className={styles['order-img-text-container']}>
              <div className={styles['order-img-container']}>
                <Image src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes='80px' fill/>
              </div>
              <div className={styles['order-text-container']}>
                <div className={styles['order-text-title']}>MacBook 16 Pro</div>
                <div className={styles['button-buy-again-container']}>
                  <button className={styles['button-buy-again']}>Buy Again</button>
                </div>
              </div>
            </div>
            <div className={styles['order-date-container']}>
              <div className={styles['order-date']}>
                🟢 <span className={styles['deliver-text']}>Deliverd on </span>22 January 2025
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['orders-container']}>
        <div className={styles['order-container']}>
          <div className={styles['order-title-container']}>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Order Id</div>
              <div className={styles['order-detail-text']}>47582</div>
            </div>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Order Date</div>
              <div className={styles['order-detail-text']}>15 January 2025</div>
            </div>
            <div className={styles['order-title']}>
              <div className={styles['order-main-text']}>Total Amount</div>
              <div className={styles['order-detail-text']}>$487.00</div>
            </div>
          </div>
          <div className={styles['order-detail']}>
            <div className={styles['order-img-text-container']}>
              <div className={styles['order-img-container']}>
                <Image src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes='80px' fill/>
              </div>
              <div className={styles['order-text-container']}>
                <div className={styles['order-text-title']}>MacBook 16 Pro</div>
                <div className={styles['button-buy-again-container']}>
                  <button className={styles['button-buy-again']}>Buy Again</button>
                </div>
              </div>
            </div>
            <div className={styles['order-date-container']}>
              <div className={styles['order-date']}>
                🟢 <span className={styles['deliver-text']}>Deliverd on </span>22 January 2025
              </div>
            </div>
          </div>
          <div className={styles['order-detail']}>
            <div className={styles['order-img-text-container']}>
              <div className={styles['order-img-container']}>
                <Image src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes='80px' fill/>
              </div>
              <div className={styles['order-text-container']}>
                <div className={styles['order-text-title']}>MacBook 16 Pro</div>
                <div className={styles['button-buy-again-container']}>
                  <button className={styles['button-buy-again']}>Buy Again</button>
                </div>
              </div>
            </div>
            <div className={styles['order-date-container']}>
              <div className={styles['order-date']}>
                🟢 <span className={styles['deliver-text']}>Deliverd on </span>22 January 2025
              </div>
            </div>
          </div>
          <div className={styles['order-detail']}>
            <div className={styles['order-img-text-container']}>
              <div className={styles['order-img-container']}>
                <Image src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes='80px' fill/>
              </div>
              <div className={styles['order-text-container']}>
                <div className={styles['order-text-title']}>MacBook 16 Pro</div>
                <div className={styles['button-buy-again-container']}>
                  <button className={styles['button-buy-again']}>Buy Again</button>
                </div>
              </div>
            </div>
            <div className={styles['order-date-container']}>
              <div className={styles['order-date']}>
                🟢 <span className={styles['deliver-text']}>Deliverd on </span>22 January 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}