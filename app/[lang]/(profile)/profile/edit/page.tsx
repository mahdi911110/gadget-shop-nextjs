import { getCurrentUser } from '@/lib/auth';
import EditForm from './EditForm';
import styles from './page.module.css';
import { redirect } from 'next/navigation';

export default async function ProfileEditPage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${lang}/login`);
  }

  return (
    <main className={styles.main}>
      <EditForm user={user} lang={lang} />
    </main>
  );
}