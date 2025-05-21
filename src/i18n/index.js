import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import trTranslation from './locales/tr/translation.json';

// Resources for i18next
const resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  tr: {
    translation: trTranslation,
  },
};

// Get browser language or saved language preference
const getUserLanguage = () => {
  const savedLanguage = localStorage.getItem('i18nextLng');
  if (savedLanguage && ['en', 'ru', 'tr'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  const browserLang = navigator.language.split('-')[0];
  return ['en', 'ru', 'tr'].includes(browserLang) ? browserLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getUserLanguage(),
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Debug mode in development
    debug: process.env.NODE_ENV === 'development',
    
    // Handle missing translations
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: "${key}" for language: ${lng}`);
      return key;
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n; 