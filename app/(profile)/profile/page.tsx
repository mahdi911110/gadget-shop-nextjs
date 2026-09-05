import { getCurrentUser } from "@/lib/auth";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>PROFILE</div>
        <div className={styles.box}>
          <span className={styles["text-title"]}>Email:</span> {user.email}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}>Username:</span>{" "}
          {user.username}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}>Phone number:</span>{" "}
          {user.phone_number}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}>Address:</span>{" "}
          {user.address}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}>Country:</span>{" "}
          {user.country}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}>City:</span> {user.city}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}>Birthday:</span>{" "}
          {user.birthday}
        </div>
        <div className={styles['button-container']}>
          <Link href="/profile/edit" className={styles['button-edit']}>
            ✏️ Edit
          </Link>
        </div>
      </div>
    </main>
  );
}