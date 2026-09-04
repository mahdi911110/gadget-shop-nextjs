import { searchOrders } from "@/lib/shopdb";
import OrdersComponent from "@/app/admin/orders/OrdersComponent";

type RecentOrders = {
  id: number;
  username: string;
  totalAmount: number;
  status: string;
  created_at: string;
};

export default async function SearchOrdersPage({
  searchParams
}: {
  searchParams: Promise<{
    q?: string
  }>
}) {
  const { q } = await searchParams;
  const orders = searchOrders(String(q)) as RecentOrders[];
  
  return (
    <OrdersComponent orders={orders} />
  );
}