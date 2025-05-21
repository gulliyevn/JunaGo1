import React from 'react';
import { Article } from '../../types/Article';
import styles from './ArticleCard.module.css';
import { formatDate } from '../../utils';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Функция для получения стилей категории
  const getCategoryStyle = (category: string) => {
    const categoryStyles: Record<string, React.CSSProperties> = {
      'React': { backgroundColor: '#61dafb33' },
      'Node.js': { backgroundColor: '#8bc34a33' },
      'DevOps': { backgroundColor: '#e91e6333' },
      'JavaScript': { backgroundColor: '#f7df1e33' },
      'Testing': { backgroundColor: '#ff572233' },
      'AI': { backgroundColor: '#9c27b033' }
    };
    
    return categoryStyles[category] || {};
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={article.coverImage} 
          alt={`${article.title} cover`} 
          className={styles.coverImage}
          // Добавляем заглушку, если изображение не загрузится
          onError={(e) => {
            e.currentTarget.src = '/assets/images/placeholder.jpg';
          }}
        />
        <div 
          className={styles.category} 
          style={getCategoryStyle(article.category)}
        >
          {article.category}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.description}</p>
        
        <div className={styles.meta}>
          <div className={styles.author}>
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className={styles.avatar}
              onError={(e) => {
                e.currentTarget.src = '/assets/images/avatar-placeholder.jpg';
              }}
            />
            <span>{article.author.name}</span>
          </div>
          <div className={styles.date}>
            {formatDate(article.publishDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 