import redirectByRole from "@/lib/redirectByRole";
import styles from "./page.module.css";
import SignupForm from "./signupForm";

export default async function Signup() {
  await redirectByRole();
  return (
    <main className={styles.main}>
      <SignupForm />
    </main>
  );
}
