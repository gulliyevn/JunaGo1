import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import PlaceholderImage from '../common/PlaceholderImage';
import styles from './DashboardSidebar.module.css';

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const { user, isDemoMode, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sidebar menu items with icons and translations
  const sidebarItems = [
    { id: 'dashboard', icon: '📊', label: t('dashboard') },
    { id: 'courses', icon: '📚', label: t('courses') },
    { id: 'learning-path', icon: '🛣️', label: t('learning_path') },
    { id: 'projects', icon: '📝', label: t('projects') },
    { id: 'achievements', icon: '🏆', label: t('achievements') },
    { id: 'settings', icon: '⚙️', label: t('settings') },
  ];

  // Generate avatar from user data
  const userAvatar = user?.avatar || (
    <PlaceholderImage 
      width={isCollapsed ? 40 : 60} 
      height={isCollapsed ? 40 : 60} 
      text={user?.name || 'User'} 
      colorScheme="blue"
      pattern="gradient"
      showInitials={true}
      className={styles.avatarPlaceholder}
    />
  );

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.userProfile}>
          <div className={styles.avatarContainer}>
            {typeof userAvatar === 'string' ? (
              <img 
                src={userAvatar} 
                alt={user?.name || 'User'} 
                className={styles.userAvatar} 
              />
            ) : userAvatar}
          </div>
          
          {!isCollapsed && (
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user?.name || 'User'}</h3>
              <p className={styles.userLevel}>{user?.level || 'Student'}</p>
            </div>
          )}
        </div>
        
        <button 
          className={styles.collapseButton} 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? t('expand_sidebar') : t('collapse_sidebar')}
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>
      
      <nav className={styles.sidebarNav}>
        <ul className={styles.sidebarMenu}>
          {sidebarItems.map(item => (
            <li 
              key={item.id} 
              className={`${styles.sidebarItem} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              {!isCollapsed && <span className={styles.itemLabel}>{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.sidebarFooter}>
        {isDemoMode && <span className={styles.demoBadge}>Demo</span>}
        
        {!isCollapsed && (
          <div className={styles.subscriptionInfo}>
            <span className={styles.subscriptionLabel}>
              {user?.subscription || 'Free'}
            </span>
          </div>
        )}
        
        <button className={styles.logoutButton} onClick={logout}>
          <span className={styles.logoutIcon}>🚪</span>
          {!isCollapsed && <span>{t('logout')}</span>}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar; 