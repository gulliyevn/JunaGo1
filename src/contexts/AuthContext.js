// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // API endpoint (в продакшне из environment variables)
    const API_BASE = process.env.REACT_APP_API_URL || 'http://194.87.95.28:8080';

    // Проверка токена при загрузке приложения
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setLoading(false);
                return;
            }

            // Проверяем валидность токена на сервере
            const response = await fetch(`${API_BASE}/user/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                // Токен невалиден, очищаем
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            // При ошибке сети не разлогиниваем, но помечаем как не авторизованный
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Сохраняем токен и пользователя
            localStorage.setItem('authToken', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setUser(data.user);
            setIsAuthenticated(true);

            return { success: true, user: data.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                // Уведомляем сервер о логауте
                await fetch(`${API_BASE}/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
            }
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            // Очищаем локальные данные независимо от API
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    // Проверка ролей пользователя
    const hasRole = (role) => {
        return user?.roles?.includes(role) || false;
    };

    const isPremium = () => {
        return user?.subscription === 'premium' || hasRole('premium');
    };

    const isAdmin = () => {
        return hasRole('admin');
    };

    // Проверка доступа к курсу
    const canAccessCourse = (course) => {
        if (!course) return false;

        // Публичные курсы доступны всем авторизованным
        if (course.type === 'free') return isAuthenticated;

        // Премиум курсы только для премиум пользователей
        if (course.type === 'premium') return isPremium();

        // По умолчанию требуем авторизацию
        return isAuthenticated;
    };

    const contextValue = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        hasRole,
        isPremium,
        isAdmin,
        canAccessCourse,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};