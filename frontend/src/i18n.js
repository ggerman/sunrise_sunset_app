// src/i18n.js

import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

// Import your translations
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

// Initialize i18next
i18n
  .use(LanguageDetector) // Detects language from the browser
  .use(XHR)               // Optional: For loading translations via xhr
  .use(initReactI18next)  // Pass i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // If language is not found, fall back to 'en'
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;

