import HeaderAdmin from '@/components/admin/header/HeaderAdmin';
import SidebarAdmin from '@/components/admin/sidebar/SidebarAdmin';
import { getCurrentUser } from '@/lib/auth';

import '@/app/globals.css';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ lang: 'en' | 'fa' }>
}) {
  const { lang } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${lang}/login`);
  }
  
  if (user.role === 'user') {
    redirect(`/${lang}/profile`);
  }
  
  return (
    <>
      <HeaderAdmin lang={lang} />
      <SidebarAdmin lang={lang} />
      {children}
    </>
  );
}