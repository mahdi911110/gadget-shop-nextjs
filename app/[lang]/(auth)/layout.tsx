import HeaderAuth from '@/components/auth/HeaderAuth';
import '@/app/globals.css';

export default async function RootLayout({
  children,
  params
}: {
  children: LayoutProps<"/">
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  return (
    <>
      <HeaderAuth lang={lang} />
      {children}
    </>
  );
}