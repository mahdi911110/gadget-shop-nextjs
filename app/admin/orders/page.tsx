import OrdersComponent from "@/app/admin/orders/OrdersComponent";
import { getRecentOrders } from "@/lib/shopdb";

type RecentOrders = {
  id: number;
  username: string;
  totalAmount: number;
  status: string;
  created_at: string;
};

export default function OrdersPage() {
  const orders = getRecentOrders() as RecentOrders[];
  return (
    <OrdersComponent orders={orders} />    
  );
}