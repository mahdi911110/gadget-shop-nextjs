import styles from "./page.module.css";
import { searchProducts } from "@/lib/shopdb";
import CardComponent from "../../../components/marketing/product/ProductComponent";

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default async function SearchPage({
    searchParams
  }: {
    searchParams: Promise<{
      q?: string
    }>
  }) {
  const { q } = await searchParams;
  let products: ProductType[] = [];
  if (q) {
    products = searchProducts(q) as ProductType[];
  }
  
  return (
    <>
      <div className={styles.result}>Search result for: &quot;{q}&quot;</div>
      <main className={styles.main}>
        {products.length > 0 ?
          products.map(product => (
            <CardComponent key={product.id} product={product} />
          ))
        : 
          <div className={styles['not-found']}>🥺 Product not found.</div>
        }
      </main>
    </>
  );
}
