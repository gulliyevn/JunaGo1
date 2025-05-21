import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [messageCount] = useState(3);
  const [notificationCount] = useState(5);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      {/* DevConnect Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.logo} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className={styles.logoText}>JunaGO</span>
        </div>
        <button className={styles.collapseButton} onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.collapseIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      {/* User Profile */}
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className={styles.avatarImage} />
          ) : (
            <span className={styles.avatarPlaceholder}>{user?.fullName?.charAt(0) || 'U'}</span>
          )}
          <div className={styles.onlineIndicator}></div>
        </div>
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{user?.fullName || 'User'}</h3>
          <p className={styles.userRole}>{user?.role || 'Student'}</p>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className={styles.navigation}>
        <NavLink 
          to="/dashboard" 
          className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={`${styles.navLink} ${isActive('/profile') ? styles.active : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
        </NavLink>
        
        <NavLink 
          to="/projects" 
          className={`${styles.navLink} ${isActive('/projects') ? styles.active : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span>Projects</span>
        </NavLink>
        
        <NavLink 
          to="/articles" 
          className={`${styles.navLink} ${isActive('/articles') ? styles.active : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span>Articles</span>
        </NavLink>
        
        <NavLink 
          to="/workspace" 
          className={`${styles.navLink} ${isActive('/workspace') ? styles.active : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>Code Editor</span>
        </NavLink>
        
        <NavLink 
          to="/messages" 
          className={`${styles.navLink} ${isActive('/messages') ? styles.active : ''}`}
        >
          <div className={styles.navLinkWithBadge}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Messages</span>
          </div>
          {messageCount > 0 && <span className={styles.badge}>{messageCount}</span>}
        </NavLink>
        
        <NavLink 
          to="/notifications" 
          className={`${styles.navLink} ${isActive('/notifications') ? styles.active : ''}`}
        >
          <div className={styles.navLinkWithBadge}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>Notifications</span>
          </div>
          {notificationCount > 0 && <span className={`${styles.badge} ${styles.warning}`}>{notificationCount}</span>}
        </NavLink>
        
        <NavLink 
          to="/courses" 
          className={`${styles.navLink} ${isActive('/courses') ? styles.active : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Courses</span>
        </NavLink>
        
        <NavLink 
          to="/projects" 
          className={`${styles.navLink} ${isActive('/projects') ? styles.active : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Projects</span>
        </NavLink>
        
        {/* Divider */}
        <div className={styles.divider}></div>
        
        {/* My Groups */}
        <div className={styles.groupSection}>
          <h3 className={styles.groupTitle}>MY GROUPS</h3>
          
          <a href="#javascript-developers" className={styles.groupLink}>
            <div className={styles.groupIcon}>JS</div>
            <span>JavaScript Developers</span>
          </a>
          
          <a href="#ui-ux-designers" className={styles.groupLink}>
            <div className={`${styles.groupIcon} ${styles.green}`}>UI</div>
            <span>UI/UX Designers</span>
          </a>
          
          <a href="#it-students" className={styles.groupLink}>
            <div className={`${styles.groupIcon} ${styles.purple}`}>ST</div>
            <span>IT Students</span>
          </a>
        </div>
      </nav>
      
      {/* Settings Link */}
      <div className={styles.footer}>
        <NavLink to="/settings" className={styles.settingsLink}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar; 