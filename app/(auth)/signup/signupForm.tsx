"use client";

import styles from "./page.module.css";

import Link from "next/link";
import signupAction from "./signupAction";
import { useActionState, useState } from "react";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
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
            autoComplete="email"
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>Username:</div>
          <input
            className={styles.input}
            name="username"
            placeholder="Username"
            autoComplete="username"
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
            autoComplete="phoneNumber"
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>Address:</div>
          <input
            className={styles.input}
            name="address"
            placeholder="Address"
            autoComplete="address"
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
            autoComplete="country"
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>City:</div>
          <input
            className={styles.input}
            name="city"
            placeholder="City"
            autoComplete="city"
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
          autoComplete="birthday"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
            required
          />
        </div>
      </div>
      <div
        className={
          state?.passwordError
            ? `${styles.error}`
            : `${styles["text-password"]}`
        }
      >
        Password must contain at least 8 characters, one uppercase letter, one
        lowercase letter, one number, and one special character.
      </div>
      <div className={styles["check-box"]}>
        <input
          className={styles.check}
          type="checkbox"
          onClick={(event) => setShowPassword(event.currentTarget.checked)}
        />
        Show password
      </div>
      {state?.error && (
        <div className={styles.error} role="alert">
          {state.error}
        </div>
      )}
      <button
        className={`${styles.button} ${isPending ? styles.loading : ""}`}
        disabled={isPending}
        onClick={() => setShowPassword(false)}
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
  );
}
