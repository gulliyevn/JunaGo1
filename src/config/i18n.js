import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import tr from '../locales/tr.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  tr: { translation: tr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    console.warn(`Missing translation for key: ${key} in language: ${lng}`);
    return fallbackValue || key;
  },

  saveMissing: true,
});

export default i18n; 