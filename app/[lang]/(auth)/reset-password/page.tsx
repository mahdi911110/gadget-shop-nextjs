import Link from "next/link";
import styles from '../auth.module.css';
import redirectByRole from "@/lib/redirectByRole";
import ResetPasswordForm from "./ResetPasswordForm";

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
        <div className={styles.container}>
          <div className={styles.title}>INVALID OR EXPIRED TOKEN</div>
          <div className={styles.box}>
            <div className={styles.text}>The token is invalid or expired.</div>
          </div>
          <div className={styles['under-input']}>
            {"Please send your email again "}
            <Link
              className={styles.link}
              href={`/${lang}/forgot-password`}
            >
              Send again
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <ResetPasswordForm lang={lang} token={token} />
    </main>
  );
}