import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../utils/themeContext';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  useTranslation();
  const { theme } = useTheme();
  
  return (
    <footer className={styles.footer} data-theme={theme}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <img 
                src={theme === 'dark' ? '/assets/logowhite.png' : '/assets/logodark.png'} 
                alt="JunaGO" 
                className={styles.logo} 
              />
              <div className={styles.learnWith}>
                Learn<br />with<br />comfort
              </div>
            </div>
            <p className={styles.description}>
              We leverage AI and advanced tools to help you make informed decisions in IT. 
              Our innovative solutions provide accurate insights and hands-on learning, 
              making your education more efficient and impactful.
            </p>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>SERVICES</h3>
              <ul className={styles.linkList}>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/workspace">Workspace</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                <li><Link to="/roadmap">Roadmap</Link></li>
                <li><Link to="/community">Community</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>INFORMATION</h3>
              <ul className={styles.linkList}>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/return-policy">Return Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>CUSTOMER SERVICE</h3>
              <ul className={styles.linkList}>
                <li><Link to="/feedback">Feedbacks</Link></li>
                <li><Link to="/career">Career</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className={styles.subscribeSection}>
              <h3 className={styles.columnTitle}>SUBSCRIBE!</h3>
              <p className={styles.subscribeText}>
                Start your coding journey with JunaGo, learn new skills and be informed about all events!
              </p>
              <div className={styles.socialLinks}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <div className={styles.socialIcon}>📱</div>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <div className={styles.socialIcon}>🐦</div>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <div className={styles.socialIcon}>📷</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          © {new Date().getFullYear()} All Rights reserved by JunaGo
        </div>
      </div>
    </footer>
  );
};

export default Footer; 