import { getCurrentUser } from "@/lib/auth";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import Link from "next/link";
import Translation from "@/components/translation/Translation";

export default async function ProfilePage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${lang}/login`);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}><Translation translationKey="profile.profile" /></div>
        <div className={styles.box}>
          <span className={styles["text-title"]}><Translation translationKey="auth.email" /></span> {user.email}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}><Translation translationKey="auth.username" /></span>{" "}
          {user.username}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}><Translation translationKey="auth.phoneNumber" /></span>{" "}
          {user.phone_number}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}><Translation translationKey="auth.address" /></span>{" "}
          {user.address}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}><Translation translationKey="auth.country" /></span>{" "}
          {user.country}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}><Translation translationKey="auth.city" /></span> {user.city}
        </div>
        <div className={styles.box}>
          <span className={styles["text-title"]}><Translation translationKey="auth.birthday" /></span>{" "}
          {user.birthday}
        </div>
        <div className={styles['button-container']}>
          <Link href={`/${lang}/profile/edit`} className={styles['button-edit']}>
            <Translation translationKey="cart.editForm.edit" />
          </Link>
        </div>
      </div>
    </main>
  );
}