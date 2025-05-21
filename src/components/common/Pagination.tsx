import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  if (totalPages <= 1) return null;
  
  // Функция для генерации массива номеров страниц
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    
    // Если меньше 8 страниц, показываем все
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // Всегда показываем первую страницу
    pageNumbers.push(1);
    
    // Определяем нужно ли показывать многоточие в начале
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    
    // Определяем диапазон страниц для отображения
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Корректируем, если текущая страница близка к началу
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    }
    
    // Корректируем, если текущая страница близка к концу
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }
    
    // Добавляем страницы в диапазоне
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Определяем нужно ли показывать многоточие в конце
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    
    // Всегда показываем последнюю страницу
    pageNumbers.push(totalPages);
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className={styles.pagination}>
      <button 
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <div className={styles.pageNumbers}>
        {pageNumbers.map((number, index) => {
          if (number === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }
          
          return (
            <button
              key={number}
              className={`${styles.pageNumber} ${Number(number) === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(Number(number))}
            >
              {number}
            </button>
          );
        })}
      </div>
      
      <button 
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 