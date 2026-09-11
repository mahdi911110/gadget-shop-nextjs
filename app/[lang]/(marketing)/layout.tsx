import type { Metadata } from "next";

import Header from "@/components/marketing/header/Header";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Online Shop Next App",
  description: "Online shop maded with next app",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  return (
    <>
      <Header lang={lang} />
      {children}
    </>
  );
}