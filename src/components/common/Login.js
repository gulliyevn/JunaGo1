// src/components/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Toggle password visibility
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({
            visible: true,
            message,
            type
        });

        setTimeout(() => {
            setNotification({
                visible: false,
                message: '',
                type: ''
            });
        }, 3000);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email.trim() || !password) {
            showNotification('Email and password are required!', 'error');
            return;
        }

        try {
            const response = await fetch('http://194.87.95.28:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            let data = null;
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            }

            if (!response.ok) {
                showNotification(data?.message || 'Login failed!', 'error');
                return;
            }

            localStorage.setItem('authToken', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            showNotification('Login successful!', 'success');

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
            showNotification('Server error! Please try again later.', 'error');
        }
    };

    // OAuth handlers
    const handleGoogleSignUp = () => {
        window.location.href = 'https://auth-user.ru';
    };

    const handleFacebookSignUp = () => {
        window.location.href = 'https://';
    };

    return (
        <div className="login-container">
            <form id="loginForm" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                    />
                </div>

                <div className="form-group password-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Your password"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePassword}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Login
                </button>

                <div className="auth-links">
                    <a href="/forgot-password">Forgot Password?</a>
                    <a href="/signup">Sign Up</a>
                </div>

                <div className="social-login">
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        className="google-button"
                    >
                        Sign in with Google
                    </button>
                    <button
                        type="button"
                        onClick={handleFacebookSignUp}
                        className="facebook-button"
                    >
                        Sign in with Facebook
                    </button>
                </div>
            </form>

            {notification.visible && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default Login;