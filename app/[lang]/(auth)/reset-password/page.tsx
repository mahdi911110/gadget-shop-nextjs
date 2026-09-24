import styles from '../auth.module.css';
import redirectByRole from "@/lib/redirectByRole";
import ResetPasswordForm from "./ResetPasswordForm";
import InvalidResetPassword from './InvalidResetPassword';

export default async function ResetPasswordPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: 'fa' | 'en' }>,
  searchParams: Promise<{ token: string | undefined | null }>
}) {
  const { lang } = await params;
  await redirectByRole(lang);
  const { token } = await searchParams;
  if (!token) {
    return (
      <main className={styles.main}>
        <InvalidResetPassword lang={lang} />
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <ResetPasswordForm lang={lang} token={token} />
    </main>
  );
}