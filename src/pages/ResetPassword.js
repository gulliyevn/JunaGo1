// src/pages/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState('');

    // Get email from localStorage or URL params
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const urlEmail = searchParams.get('email');

        if (storedEmail) {
            setFormData(prev => ({ ...prev, email: storedEmail }));
            console.log('Using stored email:', storedEmail);
        } else if (urlEmail) {
            setFormData(prev => ({ ...prev, email: urlEmail }));
            console.log('Using URL email:', urlEmail);
        } else {
            console.warn('No email found in localStorage or URL!');
        }
    }, [searchParams]);

    // If already authenticated, redirect to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required!';
        }

        // Password validation
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters!';
        }

        // Password confirmation validation
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setNotification('');

        console.log('Sending request to server...');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://194.87.95.28:8080'}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (!response.ok) {
                setNotification(result.message || 'Password reset failed.');
                return;
            }

            setNotification('Password successfully changed!');

            setTimeout(() => {
                localStorage.removeItem('email'); // Clear email only on successful reset
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('Network error:', error);
            setNotification('Network error, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <div className="reset-password-card">
                    <div className="reset-password-header">
                        <h1>Reset your password</h1>
                        <p>Enter your new password below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="reset-password-form">
                        {notification && (
                            <div className={`notification ${notification.includes('successfully') ? 'success' : 'error'}`}>
                                <i className={`fas ${notification.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                {notification}
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
                                required
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">New password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                    disabled={loading}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility('password')}
                                    disabled={loading}
                                >
                                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_confirmation">Confirm new password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleInputChange}
                                    placeholder="Confirm new password"
                                    disabled={loading}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    disabled={loading}
                                >
                                    <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </button>
                            </div>
                            {errors.password_confirmation && <span className="error-message">{errors.password_confirmation}</span>}
                        </div>

                        <button
                            type="submit"
                            className="reset-password-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner small"></span>
                                    Resetting password...
                                </>
                            ) : (
                                'Reset password'
                            )}
                        </button>
                    </form>

                    <div className="reset-password-footer">
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

export default ResetPassword;