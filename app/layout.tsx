import type { Metadata } from "next";
import { Roboto } from 'next/font/google';

import Header from "@/components/header/Header";
import "./globals.css";

const roboto = Roboto({
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: "Online Shop Next App",
  description: "Online shop maded with next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}