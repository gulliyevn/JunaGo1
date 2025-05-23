import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../utils/themeContext';
import { Button } from '../common/Button/Button';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode: isDarkMode, toggleTheme } = useTheme();

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
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
            <img src={isDarkMode ? "/assets/logowhite.png" : "/assets/logodark.png"} alt="JunaGO" width="120" height="40" />
          </Link>
        </div>
        
        <Button 
          variant="secondary"
          size="small"
          className={styles.backAction} 
          onClick={goBack}
          aria-label={t('go_back')}
        >
          <img src="/assets/icons/arrow-back.svg" alt="Back" className={styles.iconSvg} />
        </Button>

        <Button 
          variant="secondary"
          size="small"
          className={styles.menuToggleAction} 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? t('close_menu') : t('open_menu')}
        >
          {isMenuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </Button>

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
                to="/community" 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={closeMenu}
              >
                {t('projects')}
              </NavLink>
            </li>
          </ul>
          
          {/* Right section (appears both in mobile nav and desktop header) */}
          <div className={styles.rightSection}>
            <Button 
              variant="secondary"
              size="small"
              className={styles.themeToggleAction} 
              onClick={toggleTheme}
              aria-label={isDarkMode ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
            >
              {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </Button>
            
            <Link to="/cart" className={styles.cartLink} onClick={closeMenu}>
              <img src="/assets/icons/shopping-bag.svg" alt="Cart" className={styles.iconSvg} />
            </Link>

            <div className={styles.langSelector}>
              <Button 
                variant={i18n.language === 'en' ? 'primary' : 'secondary'}
                size="small"
                className={styles.langAction} 
                onClick={() => changeLanguage('en')}
                aria-label="English"
              >
                EN
              </Button>
              <Button 
                variant={i18n.language === 'ru' ? 'primary' : 'secondary'}
                size="small"
                className={styles.langAction} 
                onClick={() => changeLanguage('ru')}
                aria-label="Russian"
              >
                RU
              </Button>
              <Button 
                variant={i18n.language === 'tr' ? 'primary' : 'secondary'}
                size="small"
                className={styles.langAction} 
                onClick={() => changeLanguage('tr')}
                aria-label="Turkish"
              >
                TR
              </Button>
            </div>

            <Link to="/login" className={styles.loginButton} onClick={closeMenu}>
              <i className={`fas fa-sign-in-alt ${styles.loginIcon}`}></i>
              <span>{t('login')}</span>
            </Link>
          </div>
        </nav>

        {/* Desktop right section - same content as the one inside nav but only visible on desktop */}
        <div className={styles.rightSection}>
          <Button 
            variant="secondary"
            size="small"
            className={styles.themeToggleAction} 
            onClick={toggleTheme}
            aria-label={isDarkMode ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
          >
            {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </Button>
          
          <Link to="/cart" className={styles.cartLink}>
            <img src="/assets/icons/shopping-bag.svg" alt="Cart" className={styles.iconSvg} />
          </Link>
          
          <div className={styles.langSelector}>
            <Button 
              variant={i18n.language === 'en' ? 'primary' : 'secondary'}
              size="small"
              className={styles.langAction} 
              onClick={() => changeLanguage('en')}
              aria-label="English"
            >
              EN
            </Button>
            <Button 
              variant={i18n.language === 'ru' ? 'primary' : 'secondary'}
              size="small"
              className={styles.langAction} 
              onClick={() => changeLanguage('ru')}
              aria-label="Russian"
            >
              RU
            </Button>
            <Button 
              variant={i18n.language === 'tr' ? 'primary' : 'secondary'}
              size="small"
              className={styles.langAction} 
              onClick={() => changeLanguage('tr')}
              aria-label="Turkish"
            >
              TR
            </Button>
          </div>

          <Link to="/login" className={styles.loginButton}>
            <i className={`fas fa-sign-in-alt ${styles.loginIcon}`}></i>
            <span>{t('login')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 