import HeaderProfile from '@/components/profile/HeaderProfile';
import '@/app/globals.css';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
  params 
}: {
  children: React.ReactNode,
  params: Promise<{ lang: 'fa' | 'en' }>
}
) {
  const { lang } = await params;
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${lang}/login`);
  }
  
  if (user.role === 'admin') {
    redirect(`/${lang}/admin`);
  }


  return (
    <>
      <HeaderProfile lang={lang} />
      {children}
    </>
  );
}