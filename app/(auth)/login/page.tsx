import styles from "../auth.module.css";
import userSession from "../userSession";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  await userSession();
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
