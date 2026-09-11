"use client";

import Translation from "@/components/translation/Translation";
import styles from "./page.module.css";
import { useTheme } from "next-themes";

export default function DarkButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className={styles["switch-container"]}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />
        <span className={styles.slider}></span>
      </label>
      <div className={styles.text}>
        <Translation translationKey="admin.settings.darkMode" />
      </div>
    </div>
  );
}
