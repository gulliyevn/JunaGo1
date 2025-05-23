import { useEffect } from 'react';

/**
 * Хук для установки заголовка документа без использования React Helmet
 * @param {string} title - Название страницы (без суффикса "| JunaGO")
 */
const useDocumentTitle = (title) => {
  useEffect(() => {
    const formattedTitle = title ? `${title} | JunaGO` : 'JunaGO';
    document.title = formattedTitle;
    
    return () => {
      document.title = 'JunaGO';
    };
  }, [title]);
};

export default useDocumentTitle; 