import Link from "next/link";
import { getCurrentUser } from "@/lib/shopdb";
import { redirect } from "next/navigation";

import styles from '../auth.module.css';

export default async function Login() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/profile');
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>THE EMAIL HAS BEEN SENT</div>
        <div className={styles.box}>
          <div className={styles.text}>The password reset link has been sent to your email.</div>
          <div className={styles.text}>Please check your email inbox.</div>
        </div>
        <div className={styles['under-input']}>
          {"After you change your password please "}
          <Link className={styles.link} href="/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}