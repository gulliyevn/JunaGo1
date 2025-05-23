// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button/Button';
import usePageTitle from '../hooks/usePageTitle';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();
    const pageTitle = usePageTitle('Login');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Откуда пришел пользователь (для редиректа после логина)
    const from = location.state?.from?.pathname || '/dashboard';

    // Если уже авторизован, перенаправляем
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Очищаем ошибку при изменении инпута
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { email, password } = formData;

        // Валидация
        if (!email.trim() || !password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        // Попытка входа
        const result = await login(email, password);

        if (result.success) {
            // Успешный вход - редирект
            navigate(from, { replace: true });
        } else {
            // Ошибка входа
            setError(result.error || 'Invalid email or password');
        }

        setLoading(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // OAuth функции
    const handleGoogleLogin = () => {
        // В продакшне здесь будет OAuth flow
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    };

    const handleFacebookLogin = () => {
        // В продакшне здесь будет OAuth flow
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/facebook`;
    };

    return (
        <div className="login-page">
            {pageTitle}
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1>Welcome back!</h1>
                        <p>Sign in to your JunaGO account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                disabled={loading}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    disabled={loading}
                                    autoComplete="current-password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="small"
                                    className="password-toggle-btn"
                                    onClick={togglePasswordVisibility}
                                    disabled={loading}
                                >
                                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </Button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <Button 
                            type="submit"
                            variant="primary"
                            size="medium"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner small"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    <div className="login-divider">
                        <span>or sign in with</span>
                    </div>

                    <div className="social-login">
                        <Button
                            type="button"
                            variant="secondary"
                            size="medium"
                            className="social-button google"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <i className="fab fa-google"></i>
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="medium"
                            className="social-button facebook"
                            onClick={handleFacebookLogin}
                            disabled={loading}
                        >
                            <i className="fab fa-facebook-f"></i>
                            Facebook
                        </Button>
                    </div>

                    <div className="login-footer">
                        <p>
                            Don't have an account?
                            <Link to="/signup" className="signup-link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;