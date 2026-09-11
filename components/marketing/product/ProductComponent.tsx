import styles from './ProductComponent.module.css';
import Image from 'next/image';
import CartButtonAndLink from './CartButtonAndLink';

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default function ProductComponent({ product, lang }: { product: ProductType, lang: 'fa' | 'en' }) {
  return (
    <div className={styles.card}>
      <div className={styles['image-container']}>
        <Image
          className={styles['card-img']}
          src={product.image_url}
          alt={product.product_name}
          sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, (max-width: 1800px) 17vw, 11vw"
          fill
        />
      </div>
      <div className={styles['card-detail']}>
        <div className={styles['card-title']}>
          {product.product_name}
        </div>
        <div className={styles['card-description']}>
          {product.description}
        </div>
        <div className={styles.rating}>
          <div className={styles['card-stars']}>⭐️⭐️⭐️⭐️⭐️</div>
          <div className={styles['card-count']}>(1523)</div>
        </div>
        <div className={styles['card-money-container']}>
          <div className={styles['card-money']}>{product.stock > 0 ? `$${(product.price_cents / 100) - 200}` : ''}</div>
          <div className={styles['card-discount']}>{product.stock > 0 ? `$${product.price_cents / 100}` : ''}</div>
        </div>
        <div className={styles['text-added']}>✓ Added</div>
        <CartButtonAndLink productId={product.id} productStock={product.stock} lang={lang} />
      </div>
    </div>
  );
}