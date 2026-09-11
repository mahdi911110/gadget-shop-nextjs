import { getProducts } from '@/lib/shopdb';
import styles from './page.module.css';
import SearchProduct from './SearchProduct';
import Image from "next/image";
import Link from 'next/link';
import Pagination from '@/components/pagination/Pagination';
import Translation from '@/components/translation/Translation';

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
  searchParams,
  params
}: {
  searchParams: Promise<{
    search?: string,
    page?: string
  }>,
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { search, page } = await searchParams;
  const { lang } = await params;
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
    <main className={`${styles.main} ${lang === 'fa' ? styles['main-fa'] : ''}`}>
      <SearchProduct lang={lang} />
      {search &&
        <div className={styles['text-result']}>
          <Translation translationKey='mainSearch.searchResult' /> &quot;{newSearch}&quot;
        </div>
      }
      <div className={styles['table-container']}>
        {products.length > 0 ?
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.products.id' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.products.image' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.products.name' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.products.description' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.products.category' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.products.price' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.products.stock' />
                  </div>
                </th>
                <th className={styles['product-table-th']}>
                  <div className={styles['th-container']}>
                    <Translation translationKey='admin.dashboard.action' />
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
                      <Link href={`/${lang}/admin/products/${product.id}`} className={styles.edit}>
                        <Translation translationKey='cart.editForm.edit' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        :
          <div className={styles['not-found']}>
            {newSearch === '' ? '📭' : '🔍'} <Translation translationKey='admin.products.noProductsFound' />
          </div>
        }
      </div>
      <Pagination
        url={`/${lang.trim()}/admin/products`}
        search={newSearch}
        page={newPage}
        totalPages={totalPages}
      />
    </main>
  );
}