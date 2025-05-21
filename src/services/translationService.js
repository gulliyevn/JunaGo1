import axios from 'axios';

// Create an instance of axios for DeepL API requests
const deepLApi = axios.create({
  baseURL: 'https://api-free.deepl.com/v2', // Using the free API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Translates text using the DeepL API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (e.g., 'EN', 'RU', 'TR')
 * @param {string} sourceLang - Optional source language code
 * @returns {Promise<string>} - Translated text
 */
export const translateText = async (text, targetLang, sourceLang = null) => {
  try {
    // DeepL API requires an auth key
    // This should be stored securely in environment variables
    const authKey = process.env.REACT_APP_DEEPL_API_KEY;
    
    if (!authKey) {
      console.error('DeepL API key is missing');
      return text; // Return original text if API key is missing
    }

    const params = {
      auth_key: authKey,
      text: text,
      target_lang: targetLang,
    };

    // Add source language if provided
    if (sourceLang) {
      params.source_lang = sourceLang;
    }

    const response = await deepLApi.post('/translate', params);
    
    if (response.data && response.data.translations && response.data.translations.length > 0) {
      return response.data.translations[0].text;
    }
    
    return text; // Return original text if no translation
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text on error
  }
};

/**
 * Batch translates an array of texts
 * @param {string[]} texts - Array of texts to translate
 * @param {string} targetLang - Target language code
 * @param {string} sourceLang - Optional source language code
 * @returns {Promise<string[]>} - Array of translated texts
 */
export const batchTranslate = async (texts, targetLang, sourceLang = null) => {
  try {
    const authKey = process.env.REACT_APP_DEEPL_API_KEY;
    
    if (!authKey) {
      console.error('DeepL API key is missing');
      return texts; // Return original texts if API key is missing
    }

    const params = {
      auth_key: authKey,
      text: texts,
      target_lang: targetLang,
    };

    if (sourceLang) {
      params.source_lang = sourceLang;
    }

    const response = await deepLApi.post('/translate', params);
    
    if (response.data && response.data.translations) {
      return response.data.translations.map(translation => translation.text);
    }
    
    return texts; // Return original texts if no translation
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts; // Return original texts on error
  }
};

/**
 * Translates a locale JSON object
 * @param {Object} localeObj - Locale object with key-value pairs
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Translated locale object
 */
export const translateLocale = async (localeObj, targetLang) => {
  try {
    const keys = Object.keys(localeObj);
    const values = Object.values(localeObj);
    
    // Translate all values
    const translatedValues = await batchTranslate(values, targetLang);
    
    // Reconstruct the locale object
    const translatedLocale = {};
    keys.forEach((key, index) => {
      translatedLocale[key] = translatedValues[index];
    });
    
    return translatedLocale;
  } catch (error) {
    console.error('Locale translation error:', error);
    return localeObj; // Return original locale object on error
  }
};

export default {
  translateText,
  batchTranslate,
  translateLocale
}; 