// src/components/Footer/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../utils/themeContext';
import '../../styles/Footer.css';

// Import both logo versions
import logoDark from '../../assets/logowhite1.png'; // Light logo for dark mode
import logoWhite from '../../assets/logonew.png'; // Dark logo for light mode

const Footer = () => {
    const { darkMode } = useTheme(); // Get current theme
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupContent, setPopupContent] = useState('');

    // Choose logo based on theme
    const logoImage = darkMode ? logoWhite : logoDark;

    const openPopup = (type) => {
        let title, content;

        if (type === 'privacy') {
            title = 'Privacy Policy';
            content = `
        We value your privacy. Any personal information you provide (such as name, email address, or payment details) is collected only to fulfill your orders and improve our services.

        We do NOT:
        - sell or share your data with third parties;
        - collect unnecessary data;
        - store your data longer than required.

        Data collected via our Telegram bot is used only to support functionality and is not stored or shared.
      `;
        } else if (type === 'terms') {
            title = 'Terms & Conditions';
            content = `
        1. Service Description
        We provide digital products (PDF ebooks) and access to an AI-powered Telegram bot. All payments are made in advance. Refunds are only issued at our sole discretion in the case of technical issues.

        2. User Rights
        You are granted a non-transferable, personal-use-only license. You may not copy, redistribute, or resell any materials.

        3. Telegram Bot Access
        We do not guarantee 24/7 uptime or availability of the Telegram bot. Telegram usage is governed by Telegram's own terms and policies.

        4. Limitation of Liability
        We are not responsible for:
        - your personal or financial decisions;
        - access disruptions or service downtime;
        - any form of financial loss.

        5. Changes to Terms
        We reserve the right to update these terms at any time without prior notice.
      `;
        }

        setPopupTitle(title);
        setPopupContent(content);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-logo">
                        <Link to="/" className="footer-logo-link">
                            <img src={logoImage} alt="JunaGO" className="footer-logo-img" />
                            <span className="footer-slogan">Learn<br />with comfort</span>
                        </Link>
                        <p className="footer-description">
                            We leverage AI and advanced tools to help you make informed decisions in IT.
                            Our innovative solutions provide accurate insights and hands-on learning,
                            making your education more efficient and impactful.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-links-column">
                            <h2 className="footer-links-title">SERVICES</h2>
                            <nav className="footer-nav">
                                <ul>
                                    <li><Link to="/education">Courses</Link></li>
                                    <li><Link to="/workspace">Workspace</Link></li>
                                    <li><Link to="/articles">Articles</Link></li>
                                    <li><Link to="/roadmap">Roadmap</Link></li>
                                    <li><Link to="/community">Project</Link></li>
                                </ul>
                            </nav>
                        </div>

                        <div className="footer-links-column">
                            <h2 className="footer-links-title">INFORMATION</h2>
                            <nav className="footer-nav">
                                <ul>
                                    <li><Link to="/about-us">About Us</Link></li>
                                    <li><button onClick={() => openPopup('privacy')} className="footer-text-button">Return Policy</button></li>
                                    <li><button onClick={() => openPopup('terms')} className="footer-text-button">Terms & Conditions</button></li>
                                    <li><button onClick={() => openPopup('privacy')} className="footer-text-button">Privacy Policy</button></li>
                                </ul>
                            </nav>
                        </div>

                        <div className="footer-links-column">
                            <h2 className="footer-links-title">CUSTOMER SERVICE</h2>
                            <nav className="footer-nav">
                                <ul>
                                    <li><Link to="/feedback">Feedbacks</Link></li>
                                    <li><Link to="/career">Career</Link></li>
                                    <li><Link to="/community">Community</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            </nav>
                        </div>

                        <div className="footer-links-column">
                            <h2 className="footer-links-title">Subscribe!</h2>
                            <p className="footer-subscribe-text">
                                Start your coding journey with JunaGo, learn new skills and
                                be informed about all events!
                            </p>
                            <div className="footer-social">
                                <a href="https://www.facebook.com/" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://x.com/" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-x-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer bottom with full width */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="footer-copyright">© 2025 All Rights reserved by JunaGo</p>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="footer-popup-overlay" onClick={closePopup}>
                    <div className="footer-popup" onClick={(e) => e.stopPropagation()}>
                        <button className="footer-popup-close" onClick={closePopup}>Close</button>
                        <h2 className="footer-popup-title">{popupTitle}</h2>
                        <div className="footer-popup-content">{popupContent}</div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;