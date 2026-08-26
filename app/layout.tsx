import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}