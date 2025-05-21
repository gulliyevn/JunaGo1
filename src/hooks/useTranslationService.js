import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText } from '../services/translationService';

/**
 * Custom hook for using the DeepL translation service
 * @returns {Object} - Translation service methods
 */
const useTranslationService = () => {
  const { i18n } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);

  /**
   * Get the DeepL language code based on the i18next language code
   * @param {string} i18nLang - i18next language code
   * @returns {string} - DeepL language code
   */
  const getDeepLLanguageCode = (i18nLang) => {
    // DeepL uses different language codes than i18next
    const langMap = {
      'en': 'EN',
      'ru': 'RU',
      'tr': 'TR'
    };
    
    return langMap[i18nLang] || 'EN'; // Default to English
  };

  /**
   * Translate text using the DeepL API
   * @param {string} text - Text to translate
   * @param {string} targetLang - Target language code (optional)
   * @returns {Promise<string>} - Translated text
   */
  const translate = async (text, targetLang = null) => {
    if (!text) return '';
    
    try {
      setIsTranslating(true);
      setTranslationError(null);
      
      // If target language is not specified, use the current i18n language
      const langCode = targetLang || getDeepLLanguageCode(i18n.language);
      
      // Translate the text
      const translatedText = await translateText(text, langCode);
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationError(error.message || 'Translation failed');
      return text; // Return original text on error
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    translate,
    isTranslating,
    translationError,
    currentLanguage: i18n.language,
    getDeepLLanguageCode
  };
};

export default useTranslationService; 