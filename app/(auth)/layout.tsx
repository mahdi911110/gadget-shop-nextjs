import HeaderAuth from '@/components/header/HeaderAuth';
import '../globals.css';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <HeaderAuth />
      {children}
    </>
  );
}