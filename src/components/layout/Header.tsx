import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUser, FaSignInAlt, FaGlobe, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme on initial load and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header} data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/favicon.ico" alt="JunaGO" width="36" height="36" />
          </Link>
        </div>
        
        <button 
          className={styles.backButton} 
          onClick={goBack}
          aria-label={t('go_back')}
        >
          <img src="/assets/icons/arrow-back.svg" alt="Back" className={styles.iconSvg} />
        </button>

        <button 
          className={styles.menuToggle} 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? t('close_menu') : t('open_menu')}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile menu overlay */}
        <div 
          className={`${styles.menuOverlay} ${isMenuOpen ? styles.active : ''}`} 
          onClick={closeMenu}
        ></div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink 
                to="/courses" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                end
                onClick={closeMenu}
              >
                {t('courses')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/workspace" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('workspace')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/articles" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('articles')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/roadmap" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('roadmap')}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/project" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('projects')}
              </NavLink>
            </li>
          </ul>
          
          {/* Right section (appears both in mobile nav and desktop header) */}
          <div className={styles.rightSection}>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              aria-label={isDarkMode ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            
            <Link to="/cart" className={styles.cartLink} onClick={closeMenu}>
              <img src="/assets/icons/shopping-bag.svg" alt="Cart" className={styles.iconSvg} />
            </Link>

            <div className={styles.langSelector}>
              <button 
                className={`${styles.langButton} ${i18n.language === 'en' ? styles.langButtonActive : ''}`} 
                onClick={() => changeLanguage('en')}
                aria-label="English"
              >
                EN
              </button>
              <button 
                className={`${styles.langButton} ${i18n.language === 'ru' ? styles.langButtonActive : ''}`} 
                onClick={() => changeLanguage('ru')}
                aria-label="Russian"
              >
                RU
              </button>
              <button 
                className={`${styles.langButton} ${i18n.language === 'tr' ? styles.langButtonActive : ''}`} 
                onClick={() => changeLanguage('tr')}
                aria-label="Turkish"
              >
                TR
              </button>
            </div>

            <Link to="/login" className={styles.loginButton} onClick={closeMenu}>
              <FaSignInAlt className={styles.loginIcon} />
              <span>{t('login')}</span>
            </Link>
          </div>
        </nav>

        {/* Desktop right section - same content as the one inside nav but only visible on desktop */}
        <div className={styles.rightSection}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label={isDarkMode ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          
          <Link to="/cart" className={styles.cartLink}>
            <img src="/assets/icons/shopping-bag.svg" alt="Cart" className={styles.iconSvg} />
          </Link>
          
          <div className={styles.langSelector}>
            <button 
              className={`${styles.langButton} ${i18n.language === 'en' ? styles.langButtonActive : ''}`} 
              onClick={() => changeLanguage('en')}
              aria-label="English"
            >
              EN
            </button>
            <button 
              className={`${styles.langButton} ${i18n.language === 'ru' ? styles.langButtonActive : ''}`} 
              onClick={() => changeLanguage('ru')}
              aria-label="Russian"
            >
              RU
            </button>
            <button 
              className={`${styles.langButton} ${i18n.language === 'tr' ? styles.langButtonActive : ''}`} 
              onClick={() => changeLanguage('tr')}
              aria-label="Turkish"
            >
              TR
            </button>
          </div>

          <Link to="/login" className={styles.loginButton}>
            <FaSignInAlt className={styles.loginIcon} />
            <span>{t('login')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 