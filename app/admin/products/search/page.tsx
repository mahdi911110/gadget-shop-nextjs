import { searchProducts } from "@/lib/shopdb";
import ProductsComponent from "../ProductsComponent";

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default async function SearchProductPage({
  searchParams
}: {
  searchParams: Promise<{
    q?: string
  }>
}) {
  const { q } = await searchParams;
  const products = searchProducts(String(q)) as ProductType[];
  return (
    <ProductsComponent products={products} />
  );
}