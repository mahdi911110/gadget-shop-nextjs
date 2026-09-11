import { notFound } from "next/navigation";
import Language from "./language";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: 'en' | 'fa' }>;
}) {
  const { lang } = await params;
  const normalizedLang = lang.trim();
  const locale: "fa" | "en" =
    normalizedLang === "fa"
      ? "fa"
      : normalizedLang === "en"
        ? "en"
        : notFound();

  return (
    <div style={{ direction: lang === 'fa' ? "rtl" : '' }}>
      <Language locale={locale}>
        {children}
      </Language>
    </div>
  );
}
