// src/components/Header/Header.js (добавляем ссылку Dashboard)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../utils/themeContext';
import LanguageSelector from '../common/LanguageSelector';
import '../../styles/Header.css';

// Import both logo versions
import logoDark from '../../assets/logowhite1.png'; // Light logo for dark mode
import logoWhite from '../../assets/logonew.png'; // Dark logo for light mode

const Header = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Select the appropriate logo based on the theme
    const logoImage = darkMode ? logoWhite : logoDark;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserData(null);
        closeMenu();
    };

    const handleNavClick = () => {
        closeMenu();
    };

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="logo" onClick={handleNavClick}>
                    <div className="logo-container">
                        <img src={logoImage} alt="JunaGO Logo" />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        <li className="nav-item">
                            <Link to="/courses" className="nav-link" onClick={handleNavClick}>Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/workspace" className="nav-link" onClick={handleNavClick}>Workspace</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/articles" className="nav-link" onClick={handleNavClick}>Articles</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/roadmap" className="nav-link" onClick={handleNavClick}>Roadmap</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/community" className="nav-link" onClick={handleNavClick}>Project</Link>
                        </li>
                    </ul>

                    {/* Mobile User Controls */}
                    <div className="mobile-user-section">
                        <div className="mobile-login-container">
                            {isLoggedIn ? (
                                <div className="mobile-user-controls">
                                    <Link to="/dashboard" onClick={handleNavClick}>
                                        <img
                                            src={userData?.avatar || "/assets/avatar.png"}
                                            alt="User Avatar"
                                            className="mobile-avatar"
                                        />
                                        <span>Dashboard</span>
                                    </Link>
                                    <button onClick={handleLogout} className="mobile-logout-button">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="mobile-login-button" onClick={handleNavClick}>
                                    <i className="fas fa-user"></i>
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Theme Toggle */}
                        <div className="mobile-theme-toggle">
                            <label htmlFor="mobile-darkMode">
                                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                <input
                                    type="checkbox"
                                    name="mobile-darkMode"
                                    id="mobile-darkMode"
                                    className="mobile-toggle-checkbox"
                                    checked={darkMode}
                                    onChange={toggleTheme}
                                />
                                <span className="mobile-toggle-slider"></span>
                            </label>
                        </div>

                        {/* Mobile Language Selector */}
                        <div className="mobile-language-selector">
                            <LanguageSelector />
                        </div>
                    </div>
                </div>

                {/* Desktop Controls */}
                <div className="header-controls">
                    <div className="login-container">
                        {isLoggedIn ? (
                            <div className="user-controls">
                                <Link to="/dashboard">
                                    <img
                                        src={userData?.avatar || "/assets/avatar.png"}
                                        alt="User Avatar"
                                        className="avatar"
                                    />
                                </Link>
                                <button onClick={handleLogout} className="logout-button">
                                    <img src="/assets/logout.png" alt="Logout" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="login-button">
                                Login
                            </Link>
                        )}
                    </div>

                    <LanguageSelector />

                    <div className="toggle-container">
                        <input
                            type="checkbox"
                            name="darkMode"
                            id="darkMode"
                            className="toggle-checkbox"
                            checked={darkMode}
                            onChange={toggleTheme}
                        />
                        <label htmlFor="darkMode" className="toggle-label"></label>
                    </div>

                    <button className="menu-button" onClick={toggleMenu}>
                        <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
            </nav>
        </header>
    );
};

export default Header;