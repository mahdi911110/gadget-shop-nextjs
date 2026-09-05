'use client';

import { useActionState, useEffect } from 'react';
import styles from './EditForm.module.css';
import updateEdit from './updateEdit';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import Link from 'next/link';

type UserSession = {
  username: string,
  email: string,
  phone_number: string,
  address: string,
  country: string,
  city: string,
  birthday: string
} | null;

export default function EditForm({ user }: { user: UserSession }) {
  const [state, formAction, isPending] = useActionState(updateEdit, null);

  if (!user) {
    redirect('/login');
  }

  useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error);
      }
      if (state.phoneError) {
        toast.error(state.phoneError);
      }
    }
  }, [state]);

  return (
    <form className={styles.container} action={formAction}>
      <div className={styles.title}>EDIT PROFILE</div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>Email:</div>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            defaultValue={user.email}
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
            defaultValue={user.username}
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
            defaultValue={user.phone_number}
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
            defaultValue={user.address}
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
            defaultValue={user.country}
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
            defaultValue={user.city}
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
          defaultValue={user.birthday}
          required
        />
      </div>
      <div className={styles['button-container']}>
        <Link href="/profile" className={styles['button-back']}>Back</Link>
        <button
          className={styles['button-back']} type='reset'
        >
          Reset
        </button>
        <button
          className={`${styles['button-edit']} ${isPending ? styles.loading : ""}`}
          disabled={isPending}
        >
          {isPending ? "Editing..." : "Edit"}
        </button>
      </div>
    </form>
  );
}