import HeaderAdmin from '@/components/admin/HeaderAdmin';
import SidebarAdmin from '@/components/admin/SidebarAdmin';
import '../globals.css';

export default function RootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      {children}
    </>
  );
}