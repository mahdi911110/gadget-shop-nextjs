import { getCurrentUser } from "@/lib/shopdb";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  } else if(user.role === 'admin') {
    redirect('/admin');
  }
  
  return (
    <h1>this is profile page</h1>
  );
}