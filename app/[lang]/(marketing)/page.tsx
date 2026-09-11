import styles from "./page.module.css";
import { getProducts } from "@/lib/shopdb";
import CardComponent from "@/components/marketing/product/ProductComponent";
import Pagination from "@/components/pagination/Pagination";
import Translation from "@/components/translation/Translation";

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
    <main>
      {search &&
        <div className={styles['text-result']}>
          <Translation translationKey="mainSearch.searchResult" /> &quot;{newSearch}&quot;
        </div>
      }
      <div className={styles.main}>
        {products.length > 0 ?
          products.map(product => (
              <CardComponent key={product.id} product={product} lang={lang} />
          ))
        :
          <div className={styles['not-found']}>
            {newSearch === '' ? '📭' : '🔍'} No products have been found.
          </div>
        }
      </div>
      <Pagination
        url={`/${lang.trim()}`}
        search={newSearch}
        page={newPage}
        totalPages={totalPages}
      />
    </main>
  );
}
