import React from 'react';
import styles from './ProjectHeader.module.scss';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../../components/common/Button/Button';

interface ProjectHeaderProps {
  user: any;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ 
  user,
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBackground}>
        <Button 
          variant="secondary" 
          size="small" 
          className={styles.editButton}
          aria-label="Edit profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.editIcon} viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </Button>
      </div>
      <div className={styles.headerContent}>
        <div className={styles.avatarContainer}>
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="Profile" className={styles.avatarImage} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user?.fullName?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.basicInfo}>
            <h1 className={styles.userName}>{user?.fullName || 'User'}</h1>
            <p className={styles.userRole}>{user?.role || 'Developer'}</p>
            <p className={styles.userLocation}>
              {user?.location || 'Location'} · <span className={styles.contactInfo}>Contact info</span>
            </p>
            <div className={styles.connections}>
              <span className={styles.connectionItem}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.connectionIcon} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                JunaGO
              </span>
              <span className={styles.connectionItem}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.connectionIcon} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {user?.education || 'University'}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <Button variant="primary" size="medium" className={styles.primaryButton}>
              <i className="fas fa-plus"></i> Connect
            </Button>
            <Button variant="secondary" size="medium" className={styles.secondaryButton}>
              <i className="fas fa-envelope"></i> Message
            </Button>
            <Button variant="secondary" size="small" className={styles.secondaryButton}>
              <i className="fas fa-ellipsis-h"></i>
            </Button>
          </div>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Repositories</span>
            <div className={styles.statValue}>
              <i className="fas fa-code-branch"></i>
              <span>{user?.stats?.repositories || 48}</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Connections</span>
            <div className={styles.statValue}>
              <i className="fas fa-user-friends"></i>
              <span>{user?.stats?.connections || 512}</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Stars Received</span>
            <div className={styles.statValue}>
              <i className="fas fa-star"></i>
              <span>{user?.stats?.stars || 324}</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Profile Views</span>
            <div className={styles.statValue}>
              <i className="fas fa-eye"></i>
              <span>{user?.stats?.views || '1.2k'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader; 