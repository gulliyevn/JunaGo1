// src/utils/themeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст темы
const ThemeContext = createContext();

// Компонент-провайдер темы
export const ThemeProvider = ({ children }) => {
    // Проверяем наличие сохраненной темы в localStorage, иначе используем светлую тему
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // Эффект для изменения темы
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Функция для переключения темы
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    // Получаем текущую тему как строку
    const theme = darkMode ? 'dark' : 'light';

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Хук для использования темы в компонентах
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};