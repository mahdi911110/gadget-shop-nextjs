import { getProducts } from '@/lib/shopdb';
import styles from './page.module.css';
import Image from 'next/image';

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default function ProductsPage() {
  const products = getProducts() as ProductType[];
  return (
    <main className={styles.main}>
      <input className={styles['input-search']} type="text" placeholder='Search products...' />
      <div className={styles['table-container']}>
        {products ?
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    Image
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    Product
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    Price
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    Stock
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className={styles['product-table-td']}>
                    <div className={styles['img-container']}>
                      <Image src={product.image_url} alt={product.product_name} sizes='40px' fill/>
                    </div>
                  </td>
                  <td className={styles['product-table-td']}>{product.product_name}</td>
                  <td className={styles['product-table-td']}>${product.price_cents / 100}</td>
                  <td className={styles['product-table-td']}>{product.stock}</td>
                  <td className={styles['product-table-td']}>
                    <div className={styles['product-table-actions']}>
                      <span className={styles.edit}>Edit</span>
                      <span className={styles.delete}>Delete</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        :
          'No products have found.'
        }
      </div>
    </main>
  );
}