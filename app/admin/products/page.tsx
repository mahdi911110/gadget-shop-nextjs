import { getProducts } from '@/lib/shopdb';
import ProductsComponent from './ProductsComponent';


type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default function ProductsPage() {
  const products = getProducts() as ProductType[];
  return (
    <ProductsComponent products={products} />
  );
}