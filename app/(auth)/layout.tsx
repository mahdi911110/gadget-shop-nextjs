import HeaderAuth from '@/components/auth/HeaderAuth';
import '../globals.css';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <HeaderAuth />
      {children}
    </>
  );
}