import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function redirectByRole() {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === 'admin') {
      redirect('/admin');
    }
    
    redirect('/profile');
  }
}