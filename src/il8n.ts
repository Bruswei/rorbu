import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Language resources
import enTranslation from "./locales/en.json";
import deTranslation from "./locales/de.json";

// Configure i18next
i18n.use(initReactI18next).init({
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  resources: {
    en: {
      translation: enTranslation,
    },
    de: {
      translation: deTranslation,
    },
  },
  interpolation: {
    escapeValue: false, // Disable HTML escaping
  },
});

export default i18n;
