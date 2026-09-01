import { Roboto } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({
  subsets: ['latin'],
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ToastContainer />
      <html>
        <body className={roboto.className}>
          {children}
        </body>
      </html>
    </>
  );
}