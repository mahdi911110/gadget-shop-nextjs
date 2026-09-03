"use client";

import Link from "next/link";

import loginAction from "./login";
import { useActionState, useState } from "react";
import styles from "../auth.module.css";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    loginAction,
    null,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={styles.container} action={formAction}>
      <div className={styles.title}>LOGIN</div>
      <div className={styles.box}>
        <label className={styles.text}>Email:</label>
        <input
          className={styles.input}
          name="email"
          type="text"
          autoComplete="username"
          placeholder="Email or username"
          required
        />
      </div>
      <div className={styles.box}>
        <label className={styles.text}>Password:</label>
        <input
          className={styles.input}
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Password"
          required
        />
      </div>
      <div className={styles["check-box"]}>
        <input
          className={styles.check}
          type="checkbox"
          onClick={(event) => setShowPassword(event.currentTarget.checked)}
        />{" "}
        Show password
      </div>
      {errorMessage && <div className={styles.error} role="alert">{errorMessage}</div>}
      <button
        className={isPending ? `${styles.button} loading` : styles.button}
        type="submit"
        disabled={isPending}
        onClick={() => { setShowPassword(false) }}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
      <div className={styles["under-input"]}>
        {"Forgot Your Password? "}
        <Link className={styles.link} href="/forgot-password">
          Send Email
        </Link>
      </div>
      <div className={styles["under-input"]}>
        {"Don't Have Account? "}
        <Link className={styles.link} href="/signup">
          Create Account
        </Link>
      </div>
    </form>
  );
}
