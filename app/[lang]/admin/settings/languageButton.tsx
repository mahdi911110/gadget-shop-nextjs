'use client';

import { usePathname, useRouter } from "next/navigation";
import styles from './page.module.css';
import Translation from "@/components/translation/Translation";

export default function LanguageButton({ lang }: { lang: 'fa' | 'en' }) {
  const router = useRouter();
  const pathName = usePathname();
  const isPresian = lang === 'fa' ? true : false;
  function toggleLanguage() {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    const newPathName = pathName.replace(
      `/${lang}`,
      `/${newLang}`
    );

    router.push(newPathName);
  }

  return (
    <div className={styles["switch-container"]}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isPresian}
          onChange={toggleLanguage}
        />
        <span className={styles.slider}></span>
      </label>
      <div className={styles.text}>
        <Translation translationKey="admin.settings.changeLanguage" />
      </div>
    </div>
  );
}