import React from 'react';
import styles from './ProjectActivity.module.scss';

interface ProjectActivityProps {
  activities: any[];
  isLoading: boolean;
}

const ProjectActivity: React.FC<ProjectActivityProps> = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>
          <i className="fas fa-history"></i>
        </div>
        <h3 className={styles.emptyTitle}>No recent activity</h3>
        <p className={styles.emptyMessage}>
          Your recent project activities will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.activityContainer}>
      <h2 className={styles.title}>Recent Activity</h2>
      
      <div className={styles.activityList}>
        {activities.map((activity, index) => (
          <div key={index} className={styles.activityItem}>
            <div className={`${styles.activityIcon} ${getActivityTypeClass(activity.type)}`}>
              <i className={`fas fa-${getActivityTypeIcon(activity.type)}`}></i>
            </div>
            <div className={styles.activityContent}>
              <div className={styles.activityHeader}>
                <h4 className={styles.activityTitle}>{activity.title}</h4>
                <span className={styles.activityTime}>{formatActivityTime(activity.time)}</span>
              </div>
              <p className={styles.activityText}>{activity.text}</p>
              
              {activity.codeSnippet && (
                <div className={styles.codeSnippet}>
                  <pre>{activity.codeSnippet}</pre>
                </div>
              )}
              
              {activity.contributors && activity.contributors.length > 0 && (
                <div className={styles.activityContributors}>
                  {activity.contributors.map((contributor: any, idx: number) => (
                    <img 
                      key={idx} 
                      src={contributor.avatarUrl} 
                      alt={contributor.name} 
                      className={styles.contributorAvatar} 
                    />
                  ))}
                  {activity.contributorsCount > activity.contributors.length && (
                    <div className={styles.moreContributors}>
                      +{activity.contributorsCount - activity.contributors.length}
                    </div>
                  )}
                </div>
              )}
              
              {activity.link && (
                <a href={activity.link} className={styles.activityLink}>
                  {activity.linkText || 'View changes'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className={styles.showMoreButton}>
        Show more activity
      </button>
    </div>
  );
};

// Helper functions
const getActivityTypeClass = (type: string): string => {
  switch (type) {
    case 'branch':
      return styles.green;
    case 'star':
      return styles.blue;
    case 'commit':
      return styles.purple;
    case 'team':
      return styles.yellow;
    default:
      return styles.gray;
  }
};

const getActivityTypeIcon = (type: string): string => {
  switch (type) {
    case 'branch':
      return 'code-branch';
    case 'star':
      return 'star';
    case 'commit':
      return 'code';
    case 'team':
      return 'users';
    default:
      return 'history';
  }
};

const formatActivityTime = (time: string): string => {
  const date = new Date(time);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  
  if (diffHours < 1) {
    return 'Just now';
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
};

export default ProjectActivity; 