import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles['image-container']}>
          <Image
            className={styles['card-img']}
            src="/images/macbookpro16.jpeg"
            alt="MacBook pro 16"
            sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, (max-width: 1800px) 17vw, 11vw"
            fill
          />
        </div>
        <div className={styles['card-detail']}>
          <div className={styles['card-title']}>
            MacBook Pro 16
          </div>
          <div className={styles['card-description']}>
            Powerful laptop with M3 Max chip for professional workflows
          </div>
          <div className={styles.rating}>
            <div className={styles['card-stars']}>⭐️⭐️⭐️⭐️⭐️</div>
            <div className={styles['card-count']}>(1523)</div>
          </div>
          <div className={styles['card-money-container']}>
            <div className={styles['card-money']}>$2499</div>
            <div className={styles['card-discount']}>$2699</div>
          </div>
          <div className={styles['card-button-container']}>
            <Link href="/" className={styles['card-link-show']}>👁 View</Link>
            <button className={styles['card-button-add']}>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles['image-container']}>
          <Image
            className={styles['card-img']}
            src="/images/macbookpro16.jpeg"
            alt="MacBook pro 16"
            sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, (max-width: 1800px) 17vw, 11vw"
            fill
          />
        </div>
        <div className={styles['card-detail']}>
          <div className={styles['card-title']}>
            MacBook Pro 16
          </div>
          <div className={styles['card-description']}>
            Powerful laptop with M3 Max chip for professional workflows
          </div>
          <div className={styles.rating}>
            <div className={styles['card-stars']}>⭐️⭐️⭐️⭐️⭐️</div>
            <div className={styles['card-count']}>(1523)</div>
          </div>
          <div className={styles['card-money-container']}>
            <div className={styles['card-money']}>$2499</div>
            <div className={styles['card-discount']}>$2699</div>
          </div>
          <div className={styles['card-button-container']}>
            <Link href="/" className={styles['card-link-show']}>👁 View</Link>
            <button className={styles['card-button-add']}>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles['image-container']}>
          <Image
            className={styles['card-img']}
            src="/images/macbookpro16.jpeg"
            alt="MacBook pro 16"
            sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, (max-width: 1800px) 17vw, 11vw"
            fill
          />
        </div>
        <div className={styles['card-detail']}>
          <div className={styles['card-title']}>
            MacBook Pro 16
          </div>
          <div className={styles['card-description']}>
            Powerful laptop with M3 Max chip for professional workflows
          </div>
          <div className={styles.rating}>
            <div className={styles['card-stars']}>⭐️⭐️⭐️⭐️⭐️</div>
            <div className={styles['card-count']}>(1523)</div>
          </div>
          <div className={styles['card-money-container']}>
            <div className={styles['card-money']}>$2499</div>
            <div className={styles['card-discount']}>$2699</div>
          </div>
          <div className={styles['card-button-container']}>
            <Link href="/" className={styles['card-link-show']}>👁 View</Link>
            <button className={styles['card-button-add']}>Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}
