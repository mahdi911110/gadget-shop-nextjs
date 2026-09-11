import styles from '../auth.module.css';
import redirectByRole from "@/lib/redirectByRole";
import ForgotPassword from './ForgotPassword';

export default async function Forget({ params }: { params: Promise<{ lang: 'fa' | 'en' }> }) {
  const { lang } = await params;
  await redirectByRole(lang);

  return (
    <main className={styles.main}>
      <ForgotPassword lang={lang} />
    </main>
  );
}