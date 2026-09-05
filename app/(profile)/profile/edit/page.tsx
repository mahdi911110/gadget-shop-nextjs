import { getCurrentUser } from '@/lib/auth';
import EditForm from './EditForm';
import styles from './page.module.css';
import { redirect } from 'next/navigation';

export default async function ProfileEditPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className={styles.main}>
      <EditForm user={user} />
    </main>
  );
}