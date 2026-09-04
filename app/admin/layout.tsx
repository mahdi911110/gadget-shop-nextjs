import HeaderAdmin from '@/components/admin/header/HeaderAdmin';
import SidebarAdmin from '@/components/admin/sidebar/SidebarAdmin';
import { getCurrentUser } from '@/lib/auth';

import '../globals.css';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: LayoutProps<"/admin">) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }
  
  if (user.role === 'user') {
    redirect('/profile');
  }
  
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      {children}
    </>
  );
}