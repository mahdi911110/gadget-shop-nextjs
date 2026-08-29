'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import styles from './NavLink.module.css';

export default function NavLink(
  { 
    href, classCss, children
  }: {
    href:string, classCss:string, children:ReactNode}
  ) {
  const path = usePathname();
  let isActive;
  if (path.startsWith('/admin')) {
    isActive =
    href === "/admin"
      ? path === "/admin"
      : path.endsWith(href);
  } else {
    isActive =
      href === "/"
        ? path === "/"
        : path.startsWith(href);
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