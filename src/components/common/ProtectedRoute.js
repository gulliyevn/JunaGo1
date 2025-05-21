// src/components/common/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Компонент для защиты роутов
const ProtectedRoute = ({ children, requirePremium = false, requireAdmin = false }) => {
    const { isAuthenticated, isPremium, isAdmin, loading, isDemoMode } = useAuth();
    const location = useLocation();

    // Показываем загрузку пока проверяем аутентификацию
    if (loading) {
        return (
            <div className="auth-loading">
                <div className="loading-spinner"></div>
                <p>Проверка доступа...</p>
            </div>
        );
    }

    // В демо-режиме всегда разрешаем доступ
    if (isDemoMode) {
        return children;
    }

    // Если не авторизован, перенаправляем на логин
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Если требуется премиум, но у пользователя его нет
    if (requirePremium && !isPremium()) {
        return <Navigate to="/upgrade" replace />;
    }

    // Если требуются права админа, но у пользователя их нет
    if (requireAdmin && !isAdmin()) {
        return <Navigate to="/dashboard" replace />;
    }

    // Если все проверки прошли, рендерим компонент
    return children;
};

export default ProtectedRoute;

// Компонент для отображения контента в зависимости от подписки
export const PremiumContent = ({ children, fallback }) => {
    const { isPremium, isDemoMode } = useAuth();

    // В демо-режиме показываем весь контент
    if (isDemoMode) {
        return children;
    }

    if (!isPremium()) {
        return fallback || (
            <div className="premium-required">
                <div className="premium-lock">
                    <i className="fas fa-lock" style={{ fontSize: '2rem', color: '#FFD700' }}></i>
                    <h3>Премиум контент</h3>
                    <p>Обновите подписку для доступа к этому материалу</p>
                    <button className="upgrade-btn">
                        Обновить подписку
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

// Компонент для ограничения доступа к курсу
export const CourseAccessGate = ({ course, children }) => {
    const { canAccessCourse, isAuthenticated, isDemoMode } = useAuth();

    // В демо-режиме всегда предоставляем доступ
    if (isDemoMode) {
        return children;
    }

    if (!isAuthenticated) {
        return (
            <div className="course-access-required">
                <h3>Авторизация требуется</h3>
                <p>Войдите в систему, чтобы получить доступ к курсу</p>
                <a href="/login" className="login-required-btn">
                    Войти
                </a>
            </div>
        );
    }

    if (!canAccessCourse(course)) {
        return (
            <div className="course-access-denied">
                <div className="access-denied-content">
                    <i className="fas fa-crown" style={{ fontSize: '2rem', color: '#FFD700' }}></i>
                    <h3>Премиум курс</h3>
                    <p>Этот курс доступен только пользователям с премиум подпиской</p>
                    <div className="course-preview">
                        <h4>Что вас ждет:</h4>
                        <ul>
                            {course.features?.slice(0, 3).map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                    <button className="upgrade-course-btn">
                        Получить доступ за ${course.price || '29.99'}
                    </button>
                </div>
            </div>
        );
    }

    return children;
};