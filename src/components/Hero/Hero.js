// src/components/Hero/Hero.js (Updated)
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../utils/themeContext';
import '../../styles/Hero.css';
import logoMainDark from '../../assets/logomaindark.png';
import logoMainWhite from '../../assets/logomainwhite.svg';

const Hero = () => {
    const { theme } = useTheme();
    
    // Choose logo based on theme
    const logoImage = theme === 'dark' ? logoMainWhite : logoMainDark;

    return (
        <section className={`hero-section ${theme === 'dark' ? 'dark-hero' : 'light-hero'}`}>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h2 className="hero-title">
                            Let's learn <br className="hero-br" />with <span className="hero-title-accent">JUNA!</span>
                        </h2>
                        <p className="hero-subtitle">
                            Your new assistant Juna AI
                        </p>
                        <div className="hero-buttons">
                            <Link to="/pricing" className="hero-button">
                                Subscribe now
                            </Link>
                            <Link to="/courses" className="hero-button hero-button-secondary">
                                Explore Courses
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={logoImage} alt="JunaGO Logo" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;