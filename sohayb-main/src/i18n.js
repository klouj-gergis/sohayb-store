import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 👇 Import translations
import en from "./translation/en/global.json";
import ar from "./translation/ar/global.json";

i18n
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next)
  .init({
    resources: {
        en: {
          global: en
        },
        ar: {
          global:ar
        }
      },
    detection: {
      order: ["localStorage", "cookie", "navigator"], // 👈 check in this order
      caches: ["localStorage", "cookie"],             // 👈 store user choice
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
