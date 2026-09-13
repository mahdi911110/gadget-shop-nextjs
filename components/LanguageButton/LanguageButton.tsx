"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./LanguageButtom.module.css";

export default function LanguageButton({
  lang,
  size,
}: {
  lang: "fa" | "en";
  size: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggleLanguage() {
    const newLang = lang === "fa" ? "en" : "fa";

    const newPathname = `/${newLang}${pathname.slice(3)}`;
    const queryString = searchParams.toString();

    router.push(
      queryString ? `${newPathname}?${queryString}` : newPathname
    );
  }

  return (
    <button
      className={styles["language-button"]}
      type="button"
      onClick={toggleLanguage}
      aria-label={
        lang === "fa" ? "Switch to English" : "تغییر زبان به فارسی"
      }
    >
      <Image
        src="/icons/globe.svg"
        alt=""
        width={size}
        height={size}
      />

      <span className={styles["globe-text"]}>
        {lang === "fa" ? "EN" : "FA"}
      </span>
    </button>
  );
}