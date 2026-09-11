import redirectByRole from "@/lib/redirectByRole";
import styles from "./page.module.css";
import SignupForm from "./signupForm";

export default async function Signup({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  await redirectByRole(lang);
  return (
    <main className={styles.main}>
      <SignupForm lang={lang} />
    </main>
  );
}
