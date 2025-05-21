import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../../types/Project';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };

  // Get icon class based on project type
  const getIconClass = (type: string) => {
    switch (type) {
      case 'web':
        return 'code-branch';
      case 'mobile':
        return 'mobile-alt';
      case 'api':
        return 'database';
      case 'ai':
        return 'fire';
      default:
        return 'code';
    }
  };

  // Get color class based on project type
  const getColorClass = (type: string) => {
    switch (type) {
      case 'web':
        return styles.blue;
      case 'mobile':
        return styles.green;
      case 'api':
        return styles.purple;
      case 'ai':
        return styles.red;
      default:
        return styles.gray;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={`${styles.projectIcon} ${getColorClass(project.type)}`}>
            <i className={`fas fa-${getIconClass(project.type)}`}></i>
          </div>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{project.name}</h3>
            <p className={styles.updatedAt}>Updated {formatDate(project.updatedAt)}</p>
          </div>
          <div className={styles.actions}>
            <button className={`${styles.actionButton} ${project.starred ? styles.starred : ''}`}>
              <i className={`fas fa-star`}></i>
            </button>
            <div className={styles.menuButton}>
              <button className={styles.actionButton}>
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        </div>
        
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.tags}>
          {project.tags.map((tag, index) => (
            <span key={index} className={`${styles.tag} ${getColorClass(project.type)}`}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <i className="fas fa-star text-yellow-500"></i>
            <span>{project.stars} stars</span>
          </div>
          <div className={styles.stat}>
            <i className="fas fa-code-branch"></i>
            <span>{project.forks} forks</span>
          </div>
          <div className={styles.stat}>
            <i className="fas fa-thumbs-up text-blue-500"></i>
            <span>{project.likes} likes</span>
          </div>
          <div className={styles.stat}>
            <i className="fas fa-comment"></i>
            <span>{project.comments} comments</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.contributors}>
            {project.contributors.slice(0, 3).map((contributor, index) => (
              <div key={index} className={styles.contributorAvatar}>
                {contributor.avatarUrl ? (
                  <img src={contributor.avatarUrl} alt={contributor.name} />
                ) : (
                  <div className={styles.avatarPlaceholder}>{contributor.name.charAt(0)}</div>
                )}
              </div>
            ))}
            {project.contributors.length > 3 && (
              <div className={styles.contributorAvatar}>
                <div className={styles.moreContributors}>+{project.contributors.length - 3}</div>
              </div>
            )}
          </div>
          <Link to={`/projects/${project.id}`} className={styles.viewLink}>
            <i className="fas fa-external-link-alt"></i> View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 