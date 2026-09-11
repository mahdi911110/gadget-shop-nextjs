import { Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({
  subsets: ['latin'],
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" enableSystem defaultTheme='system'>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}