import styles from "./page.module.css";
import { getProducts } from "@/lib/shopdb";
import CardComponent from "@/components/marketing/product/ProductComponent";

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default async function Home({
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
      {products.length > 0 ?
        products.map(product => (
          <CardComponent key={product.id} product={product} />
        ))
      :
        <div className={styles['not-found']}>
          {newSearch === '' ? '📭' : '🔍'} No products have been found.
        </div>
      }
    </main>
  );
}
