"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import styles from "./NavLink.module.css";

export default function NavLink({
  href,
  classCss,
  children,
  lang,
}: {
  href: string;
  classCss: string;
  children: ReactNode;
  lang: "fa" | "en";
}) {
  const path = usePathname();
  let isActive;
  if (path.startsWith(`/${lang}/admin`)) {
    isActive =
      href === `/${lang}/admin`
        ? path === `/${lang}/admin`
        : path.endsWith(href);
  } else {
    isActive =
      href === `/${lang}` ? path === `/${lang}` : path.startsWith(href);
  }
  return (
    <Link
      href={href}
      className={isActive ? `${classCss} ${styles.active}` : classCss}
    >
      {children}
    </Link>
  );
}
