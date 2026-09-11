'use client';

import { useTranslation } from "react-i18next";

export default function Translation({
  translationKey
}: {
  translationKey: string
}) {
  const { t } = useTranslation();
  return (
    <>
      {t(`${translationKey}`)}
    </>
  );
}