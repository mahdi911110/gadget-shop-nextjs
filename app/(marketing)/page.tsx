import styles from "./page.module.css";
import { getProducts } from "@/lib/shopdb";
import CardComponent from "@/components/marketing/product/ProductComponent";
import Pagination from "@/components/pagination/Pagination";

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

export default async function Home({
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
    <main>
      <div className={styles.main}>
        {products.length > 0 ?
          products.map(product => (
              <CardComponent key={product.id} product={product} />
          ))
        :
          <div className={styles['not-found']}>
            {newSearch === '' ? '📭' : '🔍'} No products have been found.
          </div>
        }
      </div>
      <Pagination
        url="/"
        search={newSearch}
        page={newPage}
        totalPages={totalPages}
      />
    </main>
  );
}
