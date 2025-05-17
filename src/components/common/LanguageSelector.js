// src/components/Header/LanguageSelector.js
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/LanguageSelector.css';

const LanguageSelector = () => {
    const [currentLang, setCurrentLang] = useState('en');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Using emoji flags instead of image files
    const languages = [
        { code: 'en', name: 'EN', flag: '🇬🇧' },
        { code: 'tr', name: 'TR', flag: '🇹🇷' },
        { code: 'ru', name: 'RU', flag: '🇷🇺' }
    ];

    // Initialize from localStorage or browser preference
    useEffect(() => {
        try {
            const savedLang = localStorage.getItem('lang') ||
                (navigator.language && navigator.language.slice(0, 2).toLowerCase()) ||
                'en';

            setCurrentLang(savedLang);
        } catch (e) {
            console.error("Error accessing localStorage:", e);
        }
    }, []);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Change language
    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        localStorage.setItem('lang', lang);
        setIsDropdownOpen(false);
    };

    // Get current language data
    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

    return (
        <div className="language-selector" ref={dropdownRef}>
            <button
                id="dropdownButton"
                className="language-button"
                onClick={toggleDropdown}
            >
                <span className="flag-emoji">{currentLanguage.flag}</span>
            </button>

            {isDropdownOpen && (
                <div
                    id="dropdownContent"
                    className="dropdown-content"
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            data-lang={lang.code}
                            className={`lang-option ${lang.code === currentLang ? 'active' : ''}`}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            <span className="flag-emoji">{lang.flag}</span>
                            <span>{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;