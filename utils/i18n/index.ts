import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from './locale/en/en.json';
import faLang from './locale/fa/fa.json';

const resources = {
  en: {
    translation: enLang
  },
  fa: {
    translation: faLang
  }
}

export async function getI18nInstance(lang: 'en' | 'fa') {
  await i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

  return i18n;
}