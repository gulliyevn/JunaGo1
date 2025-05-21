import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Article, ArticleCategory, ArticlePaginationOptions } from '../types/Article';
import { getArticles, getCategories } from '../services/articleService';
import ArticleGrid from '../components/article/ArticleGrid';
import Pagination from '../components/common/Pagination';
import styles from './Articles.module.css';

const Articles: React.FC = () => {
  useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<ArticlePaginationOptions>({
    page: 1,
    itemsPerPage: 6,
    totalItems: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);

  // Дебаунс для поискового запроса
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Загрузка статей с фильтрацией и пагинацией
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      
      try {
        const result = await getArticles(
          { category: selectedCategory, searchTerm: debouncedSearchTerm },
          { page: pagination.page, itemsPerPage: pagination.itemsPerPage }
        );
        
        setArticles(result.articles);
        setPagination(result.pagination);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, [selectedCategory, debouncedSearchTerm, pagination.page, pagination.itemsPerPage]);

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    // Прокрутка вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Обработчик изменения категории
  const handleCategoryChange = (category: ArticleCategory) => {
    setSelectedCategory(category);
    // Сбрасываем на первую страницу при смене категории
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Сбрасываем на первую страницу при изменении поиска
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className={styles.articlesPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Developer Articles</h1>
        
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>
              <i className="fas fa-search"></i>
            </span>
          </div>
          
          <div className={styles.dropdown}>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value as ArticleCategory)}
              className={styles.select}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <ArticleGrid articles={articles} loading={loading} />
      
      <Pagination 
        currentPage={pagination.page} 
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Articles; 