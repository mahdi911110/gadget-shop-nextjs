"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import { getI18nInstance } from "@/utils/i18n";

export default function Language({
  locale,
  children,
}: {
  locale: "fa" | "en";
  children: React.ReactNode;
}) {
  const [i18n, setI18n] = useState(null);

  useEffect(() => {
    getI18nInstance(locale).then(setI18n);
  }, [locale]);

  if (!i18n) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}