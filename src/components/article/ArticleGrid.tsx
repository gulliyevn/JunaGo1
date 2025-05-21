import React from 'react';
import { Article } from '../../types/Article';
import ArticleCard from './ArticleCard';
import styles from './ArticleGrid.module.css';

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, loading = false }) => {
  // Если данные загружаются, показываем скелетон карточек
  if (loading) {
    return (
      <div className={styles.grid}>
        {[...Array(6)].map((_, index) => (
          <div key={`skeleton-${index}`} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonDescription}></div>
              <div className={styles.skeletonMeta}>
                <div className={styles.skeletonAvatar}></div>
                <div className={styles.skeletonAuthor}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Если нет статей, показываем соответствующее сообщение
  if (articles.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No articles found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  // Отображаем сетку статей
  return (
    <div className={styles.grid}>
      {articles.map(article => (
        <div key={article.id} className={styles.cardContainer}>
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
};

export default ArticleGrid; 