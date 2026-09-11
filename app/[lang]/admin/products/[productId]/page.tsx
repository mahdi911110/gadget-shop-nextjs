import EditForm from "./EditForm";
import { getProduct } from "@/lib/shopdb";
import styles from './page.module.css';
import Translation from "@/components/translation/Translation";

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default async function ProductTbody({ params }: { params: Promise<{productId: string, lang: 'fa' | 'en'}> }) {
  const { productId, lang } = await params;

  const product = getProduct(Number(productId)) as ProductType;

  return product ? (
    <EditForm product={product} lang={lang} />
  ) : (
    <div className={styles['not-found']}>
      <Translation translationKey="admin.productEdit.productNotFound" />
    </div>
  );
}
