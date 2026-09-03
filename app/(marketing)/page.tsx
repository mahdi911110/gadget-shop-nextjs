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

export default async function Home() {
  const products = getProducts() as ProductType[];
  
  return (
    <main className={styles.main}>
      {products.map(product => (
        <CardComponent key={product.id} product={product} />
      ))}
    </main>
  );
}
