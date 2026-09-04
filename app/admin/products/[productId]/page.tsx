import EditForm from "./EditForm";
import { getProduct } from "@/lib/shopdb";
import styles from './page.module.css';

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default async function ProductTbody({ params }: { params: Promise<{productId: string}> }) {
  const { productId } = await params;

  const product = getProduct(Number(productId)) as ProductType;

  return product ? (
    <EditForm product={product} />
  ) : (
    <div className={styles['not-found']}>
      Product not found.
    </div>
  );
}
