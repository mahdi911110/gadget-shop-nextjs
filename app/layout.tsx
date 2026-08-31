import { Roboto } from 'next/font/google';
import './globals.css';
import { getCurrentUser } from '@/lib/shopdb';
import { redirect } from 'next/navigation';

const roboto = Roboto({
  subsets: ['latin'],
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}