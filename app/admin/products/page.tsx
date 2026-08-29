import styles from './page.module.css';
import Image from 'next/image';

export default function ProductsPage() {
  return (
    <main className={styles.main}>
      <input className={styles['input-search']} type="text" placeholder='Search products...' />
      <div className={styles['table-container']}>
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
            <tr>
              <td className={styles['product-table-td']}>
                <div className={styles['img-container']}>
                  <Image src="/images/macbookpro16.jpeg" alt='MacBook Pro 16' sizes='40px' fill/>
                </div>
              </td>
              <td className={styles['product-table-td']}>MacBook Pro 16</td>
              <td className={styles['product-table-td']}>$2499</td>
              <td className={styles['product-table-td']}>12</td>
              <td className={`${styles['product-table-td']} ${styles['product-table-actions']}`}>
                <span className={styles.edit}>Edit</span>
                <span className={styles.delete}>Delete</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}