import userSession from "../userSession";
import styles from "./page.module.css";
import SignupForm from "./signupForm";

export default async function Signup() {
  await userSession();
  return (
    <main className={styles.main}>
      <SignupForm />
    </main>
  );
}
