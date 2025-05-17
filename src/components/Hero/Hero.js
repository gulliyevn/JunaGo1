import React from 'react';
import { useTheme } from '../../utils/themeContext';
import '../../styles/Hero.css';
import logoMainDark from '../../assets/logomaindark.png';
import logoMainWhite from '../../assets/logomainwhite.svg';

const Hero = () => {
    const { darkMode } = useTheme();
    const logoImage = darkMode ? logoMainWhite : logoMainDark;

    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h2 className="hero-title">
                            Let's learn <br className="hero-br" />with <span className="hero-title-accent">JUNA!</span>
                        </h2>
                        <p className="hero-subtitle">
                            Your new assistant Juna AI
                        </p>
                        <button
                            onClick={() => window.location.href = '/pricing'}
                            className="hero-button"
                        >
                            Subscribe now
                        </button>
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