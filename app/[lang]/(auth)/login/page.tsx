import styles from "../auth.module.css";
import LoginForm from "./LoginForm";
import redirectByRole from "@/lib/redirectByRole";

export default async function LoginPage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  await redirectByRole(lang);
  return (
    <main className={styles.main}>
      <LoginForm lang={lang} />
    </main>
  );
}
