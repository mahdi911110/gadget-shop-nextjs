import HeaderAuth from '@/components/header/HeaderAuth';
import '../globals.css';
import { getCurrentUser } from '@/lib/shopdb';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === 'admin') {
      redirect('/admin');
    } else {
      redirect('/profile');
    }
  }
  
  return (
    <>
      <HeaderAuth />
      {children}
    </>
  );
}