import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function userSession() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user) {
    if (user.role === 'admin') {
      redirect('/admin');
    } else {
      redirect('/profile');
    }
  }
}