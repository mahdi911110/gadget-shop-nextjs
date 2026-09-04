import { getProducts } from '@/lib/shopdb';
import styles from './page.module.css';
import SearchProduct from './SearchProduct';
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

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{
    search?: string
  }>
}) {
  const { search } = await searchParams;
  let newSearch = '';
  if (search !== undefined) {
    newSearch = search.trim();
  }
  const products = getProducts(newSearch) as ProductType[];
  return (
    <main className={styles.main}>
      <SearchProduct />
      <div className={styles['table-container']}>
        {products.length > 0 ?
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    ID
                  </div>  
                </th>
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
                  <td className={styles['product-table-td']}>{product.id}</td>
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
                      <button className={styles.edit}>✏️ Edit</button>
                      <button className={styles.delete}>❮ Back</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        :
          <div className={styles['not-found']}>
            {newSearch === '' ? '📭' : '🔍'} No products have found.
          </div>
        }
      </div>
    </main>
  );
}