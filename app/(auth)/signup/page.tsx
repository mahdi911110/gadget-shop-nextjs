"use client";

import styles from "./page.module.css";

import Link from "next/link";
import signupAction from "./signupAction";
import { useActionState, useState } from "react";

export default function Signup() {
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <main className={styles.main}>
      <form className={styles.container} action={formAction}>
        <div className={styles.title}>SIGN UP</div>
        <div className={styles["input-box"]}>
          <div className={styles.box}>
            <div className={styles.text}>Email:</div>
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>Username:</div>
            <input
              className={styles.input}
              name="username"
              placeholder="Username"
              required
            />
          </div>
        </div>
        <div className={styles["input-box"]}>
          <div className={styles.box}>
            <div className={styles.text}>Phone number:</div>
            <input
              className={styles.input}
              name="phoneNumber"
              placeholder="Phone number"
              required
            />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>Address:</div>
            <input
              className={styles.input}
              name="address"
              placeholder="Address"
              required
            />
          </div>
        </div>
        <div className={styles["input-box"]}>
          <div className={styles.box}>
            <div className={styles.text}>Country:</div>
            <input
              className={styles.input}
              name="country"
              placeholder="Country"
              required
            />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>City:</div>
            <input
              className={styles.input}
              name="city"
              placeholder="City"
              required
            />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.text}>Birthday:</div>
          <input
            className={styles.input}
            name="birthday"
            type="date"
            required
          />
        </div>
        <div className={styles["input-box"]}>
          <div className={styles.box}>
            <div className={styles.text}>Password:</div>
            <input
              className={styles.input}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>Type password again:</div>
            <input
              className={styles.input}
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Type password again"
              required
            />
          </div>
          <div className={state?.passwordError ? `${styles.error}` : `${styles['text-password']}`}>Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.</div>
        </div>
        <div className={styles["check-box"]}>
          <input
            className={styles.check}
            type="checkbox"
            onClick={handleShowPassword}
          />{" "}
          Show password
        </div>
        {state?.error && <div className={styles.error}>{state.error}</div>}
        <button
          className={`${styles.button} ${isPending ? styles.loading : ""}`}
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </button>
        <div className={styles["under-input"]}>
          {"Have Account? "}
          <Link className={styles.link} href="/login">
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}
