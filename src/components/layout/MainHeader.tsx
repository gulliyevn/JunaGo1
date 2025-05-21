import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../utils/themeContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './MainHeader.module.css';

const MainHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, darkMode, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout, isDemoMode, toggleDemoMode } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header} data-theme={theme}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img 
              src={theme === 'dark' ? '/assets/logowhite.png' : '/assets/logodark.png'} 
              alt="JunaGO" 
              width="80" 
              height="25" 
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink 
                to="/courses" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {t('courses')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/workspace" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {t('workspace')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/articles" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {t('articles')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/roadmap" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {t('roadmap')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/community" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {t('project')}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.rightSection}>
          {/* Theme Toggle Switch */}
          <label className={styles.themeToggle}>
            <input 
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
            />
            <span className={styles.slider}></span>
          </label>
          
          <div className={styles.demoToggle}>
            <button
              className={`${styles.demoButton} ${isDemoMode ? styles.demoActive : ''}`}
              onClick={toggleDemoMode}
            >
              {isDemoMode ? 'Demo ON' : 'Demo OFF'}
            </button>
          </div>
          
          <div className={styles.langSelector}>
            <button 
              className={`${styles.langButton} ${i18n.language === 'en' ? styles.langButtonActive : ''}`} 
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`${styles.langButton} ${i18n.language === 'ru' ? styles.langButtonActive : ''}`} 
              onClick={() => changeLanguage('ru')}
            >
              RU
            </button>
            <button 
              className={`${styles.langButton} ${i18n.language === 'tr' ? styles.langButtonActive : ''}`} 
              onClick={() => changeLanguage('tr')}
            >
              TR
            </button>
          </div>

          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <NavLink to="/dashboard" className={styles.userInfo} title={t('dashboard')}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.name} className={styles.userAvatar} />
                ) : (
                  <span className={styles.userInitial}>{user?.name?.charAt(0) || 'U'}</span>
                )}
              </NavLink>
              <div className={styles.userActions}>
                <NavLink to="/cart" className={styles.cartLink} title={t('cart')}>
                  <img src="/assets/icons/shopping-bag.svg" alt="Cart" className={styles.iconSvg} />
                </NavLink>
                <button onClick={logout} className={styles.logoutButton} title={t('logout')}>
                  <img src="/assets/icons/arrow-back.svg" alt="Logout" className={styles.iconSvg} />
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className={styles.loginButton}>
              {t('login')}
            </NavLink>
          )}

          {/* Hamburger Menu Button */}
          <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={closeMenu}>
          ✕
        </button>
        
        <div className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <NavLink 
                to="/courses" 
                className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('courses')}
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink 
                to="/workspace" 
                className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('workspace')}
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink 
                to="/articles" 
                className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('articles')}
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink 
                to="/roadmap" 
                className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('roadmap')}
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink 
                to="/community" 
                className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('project')}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && <div className={styles.menuOverlay} onClick={closeMenu}></div>}
    </header>
  );
};

export default MainHeader; 