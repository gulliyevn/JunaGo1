// src/components/common/DarkModeToggle.js
import React, { useEffect, useState } from 'react';
import '../../styles/components/DarkModeToggle.css';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize dark mode from preferences
    useEffect(() => {
        // Check localStorage first
        const savedDarkMode = localStorage.getItem('darkMode');

        if (savedDarkMode === 'true') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else if (savedDarkMode === 'false') {
            setIsDarkMode(false);
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // If no saved preference, check OS preference
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            // Default: light mode
            setIsDarkMode(false);
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        if (newMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

        // Save preference to localStorage
        localStorage.setItem('darkMode', newMode.toString());
    };

    return (
        <div className="dark-mode-toggle">
            <input
                type="checkbox"
                name="darkMode"
                id="darkMode"
                className="toggle-checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <label htmlFor="darkMode" className="toggle-label">
                <span className="sr-only">Toggle Dark Mode</span>
            </label>
        </div>
    );
};

export default DarkModeToggle;