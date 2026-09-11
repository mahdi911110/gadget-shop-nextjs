'use client';

import Image from "next/image";
import { useTheme } from "next-themes";

import styles from './DarkButton.module.css';

export default function DarkButton({ widthHeight }: { widthHeight: number }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button className={styles['theme-button']} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      <Image
        className={styles["theme-img"]}
        width={widthHeight}
        height={widthHeight}
        src={`/icons/${isDark ? 'sun' : 'moon'}.svg`}
        alt={isDark ? 'Dark Mode' : 'Light Mode'}
      />
    </button>
  );
}