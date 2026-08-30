'use client';

import Link from "next/link";

import loginAction from "./login";
import { useActionState } from "react";
import styles from '../auth.module.css';

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(loginAction, null);
  return (
    <main className={styles.main}>
      <form className={styles.container} action={formAction}>
        <div className={styles.title}>LOGIN</div>
        <div className={styles.box}>
          <div className={styles.text}>Email:</div>
          <input className={styles.input} name="email" type="text" placeholder="Email or username" />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>Password:</div>
          <input className={styles.input} name="password" type="password" placeholder="Password" />
        </div>
        <div className={styles['check-box']}>
          <input className={styles.check} type="checkbox"/> Show password
        </div>
        {errorMessage && (<div className={styles.error}>{errorMessage}</div>)}
        <button className={styles.button} type="submit">Login</button>
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
      </form>
    </main>
  );
}