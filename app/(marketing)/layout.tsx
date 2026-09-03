import type { Metadata } from "next";

import Header from "@/components/marketing/header/Header";
import "../globals.css";

export const metadata: Metadata = {
  title: "Online Shop Next App",
  description: "Online shop maded with next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}