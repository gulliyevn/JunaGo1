/**
 * Форматирует дату в удобочитаемый формат
 * @param dateString Строка с датой в формате ISO (например, '2023-05-15')
 * @returns Отформатированная дата (например, 'May 15, 2023')
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Проверка на валидность даты
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Форматирование даты с помощью Intl.DateTimeFormat
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Вычисляет, сколько времени прошло с момента публикации
 * @param dateString Строка с датой в формате ISO
 * @returns Строка с относительным временем (например, '2 days ago')
 */
export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Проверка на валидность даты
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Менее минуты
  if (seconds < 60) {
    return 'just now';
  }
  
  // Минуты
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  
  // Часы
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  
  // Дни
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  
  // Месяцы
  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  
  // Годы
  const years = Math.floor(months / 12);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}; 