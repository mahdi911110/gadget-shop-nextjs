import styles from "../auth.module.css";
import LoginForm from "./LoginForm";
import redirectByRole from "@/lib/redirectByRole";

export default async function LoginPage() {
  await redirectByRole();
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
