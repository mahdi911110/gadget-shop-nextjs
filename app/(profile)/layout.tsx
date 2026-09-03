import HeaderProfile from '@/components/profile/HeaderProfile';
import '../globals.css';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role === 'admin') {
    redirect('/admin');
  }

  return (
    <>
      <HeaderProfile />
      {children}
    </>
  );
}