import { getProducts } from '@/lib/shopdb';
import styles from './page.module.css';
import SearchProduct from './SearchProduct';
import Image from "next/image";
import Link from 'next/link';
import Pagination from '@/components/pagination/Pagination';

type ProductType = {
  products: {
    id: number,
    product_name: string,
    price_cents: number,
    stock: number,
    category: string,
    description: string,
    image_url: string
  } [],
  totalPages: number;
}

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{
    search?: string,
    page?: string
  }>
}) {
  const { search, page } = await searchParams;
  let newSearch = '';
  let newPage = 1;
  if (search !== undefined) {
    newSearch = search.trim();
  }
  if (page !== undefined) {
    newPage = Number(page.trim());
  }
  const { products, totalPages } = getProducts(newSearch, newPage) as ProductType;
  return (
    <main className={styles.main}>
      <SearchProduct />
      {search &&
        <div className={styles['text-result']}>
          Search result for: &quot;{newSearch}&quot;
        </div>
      }
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
                    Name
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    Description
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    Category
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
                  <td className={styles["product-table-td"]}>{product.id}</td>
                  <td className={styles["product-table-td"]}>
                    <div className={styles["img-container"]}>
                      <Image
                        src={product.image_url}
                        alt={product.product_name}
                        sizes="40px"
                        fill
                      />
                    </div>
                  </td>
                  <td className={styles["product-table-td"]}>{product.product_name}</td>
                  <td className={styles["product-table-td"]}>{product.description}</td>
                  <td className={styles["product-table-td"]}>{product.category}</td>
                  <td className={styles["product-table-td"]}>
                    ${product.price_cents / 100}
                  </td>
                  <td className={styles["product-table-td"]}>{product.stock}</td>
                  <td className={styles["product-table-td"]}>
                    <div className={styles["product-table-actions"]}>
                      <Link href={`/admin/products/${product.id}`} className={styles.edit}>
                        ✏️ Edit
                      </Link>
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
      <Pagination
        url="/admin/products"
        search={newSearch}
        page={newPage}
        totalPages={totalPages}
      />
    </main>
  );
}