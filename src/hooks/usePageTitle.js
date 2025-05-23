import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Хук для управления заголовком страницы
 * @param {string} title - Название страницы (без суффикса "| JunaGO")
 * @returns {JSX.Element} Компонент Helmet с настроенным заголовком
 */
export const usePageTitle = (title) => {
  const formattedTitle = title ? `${title} | JunaGO` : 'JunaGO';

  // Также обновляем document.title для совместимости
  useEffect(() => {
    // Это безопасно работает даже при проблемах с React Helmet
    document.title = formattedTitle;
    
    // Cleanup при размонтировании компонента
    return () => {
      document.title = 'JunaGO';
    };
  }, [formattedTitle]);

  try {
    // Пытаемся использовать Helmet для лучшего SEO
    return (
      <Helmet>
        <title>{formattedTitle}</title>
        <meta property="og:title" content={formattedTitle} />
        <meta name="twitter:title" content={formattedTitle} />
      </Helmet>
    );
  } catch (error) {
    // Если с Helmet возникают проблемы, просто возвращаем null
    // Title все равно установится через useEffect выше
    console.warn('React Helmet error:', error);
    return null;
  }
};

export default usePageTitle; 