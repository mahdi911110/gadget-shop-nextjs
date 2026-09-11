import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function redirectByRole(lang: 'fa' | 'en') {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === 'admin') {
      redirect(`/${lang}/admin`);
    }
    
    redirect(`/${lang}/profile`);
  }
}