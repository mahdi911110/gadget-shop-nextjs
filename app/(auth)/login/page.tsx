import Link from "next/link";

import styles from '../auth.module.css';
export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>LOGIN</div>
        <div className={styles.box}>
          <div className={styles.text}>Email:</div>
          <input className={styles.input} type="text" placeholder="Email or username" />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>Password:</div>
          <input className={styles.input} type="password" placeholder="Password" />
        </div>
        <div className={styles['check-box']}>
          <input className={styles.check} type="checkbox"/> Show password
        </div>
        <button className={styles.button}>Login</button>
        <div className={styles['under-input']}>
          {"Forgot Your Password? "} 
          <Link className={styles.link} href="/forgot-password">
            Send Email
          </Link>
        </div>
        <div className={styles['under-input']}>
          {"Don't Have Account? "} 
          <Link className={styles.link} href="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}