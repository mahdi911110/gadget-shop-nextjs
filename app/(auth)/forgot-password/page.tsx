import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

import styles from '../auth.module.css';

export default async function Forget() {
  const user = await getCurrentUser();
  
  if (user) {
    redirect('/profile');
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>SENDING EMAIL</div>
        <div className={styles.box}>
          <div className={styles.text}>Email:</div>
          <input className={styles.input} type="email" placeholder="Type a registered email" />
        </div>
        <button className={styles.button}>Send Email</button>
        <div className={styles['under-input']}>
          {"Don't Have Account? "} 
          <Link className={styles.link} href="/signup">
            Create Account
          </Link>
        </div>
        <div className={styles['under-input']}>
          {'Have Account? '}
          <Link className={styles.link} href="/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}