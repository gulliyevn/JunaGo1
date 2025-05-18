// src/pages/ForgotPassword.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    // If already authenticated, redirect to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        // Clear notification when user starts typing
        if (notification) setNotification('');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setNotification('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setNotification('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setNotification('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://194.87.95.28:8080'}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setNotification(result.message || 'Failed to send reset email');
                return;
            }

            // Store email for reset password page
            localStorage.setItem('email', email.trim());

            setIsEmailSent(true);
            setNotification('Reset link sent! Check your email for further instructions.');

        } catch (error) {
            console.error('Network error:', error);
            setNotification('Network error, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (isEmailSent) {
        return (
            <div className="forgot-password-page">
                <div className="forgot-password-container">
                    <div className="forgot-password-card">
                        <div className="email-sent-content">
                            <div className="email-sent-icon">
                                <i className="fas fa-envelope-check"></i>
                            </div>
                            <h1>Check your email</h1>
                            <p>
                                We've sent a password reset link to:
                                <br />
                                <strong>{email}</strong>
                            </p>
                            <div className="email-instructions">
                                <p>Follow the link in the email to reset your password.</p>
                                <p className="email-note">
                                    Didn't receive the email? Check your spam folder or
                                    <button
                                        className="resend-link"
                                        onClick={() => setIsEmailSent(false)}
                                    >
                                        try again
                                    </button>
                                </p>
                            </div>
                            <Link to="/login" className="back-to-login">
                                Back to sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="forgot-password-card">
                    <div className="forgot-password-header">
                        <h1>Forgot your password?</h1>
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        {notification && (
                            <div className={`notification ${notification.includes('sent') ? 'success' : 'error'}`}>
                                <i className={`fas ${notification.includes('sent') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                {notification}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                disabled={loading}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="forgot-password-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner small"></span>
                                    Sending reset link...
                                </>
                            ) : (
                                'Send reset link'
                            )}
                        </button>
                    </form>

                    <div className="forgot-password-footer">
                        <p>
                            Remember your password?
                            <Link to="/login" className="login-link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;