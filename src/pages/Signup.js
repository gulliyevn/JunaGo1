// src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [notification, setNotification] = useState('');

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

        // Name validation
        if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        // Password confirmation validation
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        // Terms acceptance validation
        if (!acceptTerms) {
            newErrors.terms = 'Please accept the Terms and Privacy Policy';
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

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://194.87.95.28:8080'}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setNotification('Account created successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setNotification(error.message);
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
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1>Create your account</h1>
                        <p>Join JunaGO and start your learning journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="signup-form">
                        {notification && (
                            <div className={`notification ${notification.includes('successfully') ? 'success' : 'error'}`}>
                                <i className={`fas ${notification.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                {notification}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                disabled={loading}
                                required
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

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
                            {errors.email && <span className="error-message">{errors.email}</span>}
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
                                    placeholder="Create a password"
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
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
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

                        <div className="form-group terms-group">
                            <label className="terms-checkbox">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    disabled={loading}
                                />
                                <span>
                                    I accept the{' '}
                                    <button
                                        type="button"
                                        className="modal-link"
                                        onClick={() => setShowTermsModal(true)}
                                    >
                                        Terms of Service
                                    </button>
                                    {' '}and{' '}
                                    <button
                                        type="button"
                                        className="modal-link"
                                        onClick={() => setShowPrivacyModal(true)}
                                    >
                                        Privacy Policy
                                    </button>
                                </span>
                            </label>
                            {errors.terms && <span className="error-message">{errors.terms}</span>}
                        </div>

                        <button
                            type="submit"
                            className="signup-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner small"></span>
                                    Creating account...
                                </>
                            ) : (
                                'Create account'
                            )}
                        </button>
                    </form>

                    <div className="signup-footer">
                        <p>
                            Already have an account?
                            <Link to="/login" className="login-link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Terms Modal */}
            {showTermsModal && (
                <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Terms of Service</h2>
                            <button
                                className="modal-close"
                                onClick={() => setShowTermsModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>By using JunaGO, you agree to our terms of service...</p>
                            <p>1. Service Usage: Use our platform responsibly for educational purposes.</p>
                            <p>2. Account Security: Keep your credentials secure and don't share them.</p>
                            <p>3. Content Policy: All content must be appropriate and legal.</p>
                            <p>4. Payment Terms: Premium subscriptions are billed monthly.</p>
                            <p>5. Cancellation: You can cancel anytime from your settings.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Privacy Modal */}
            {showPrivacyModal && (
                <div className="modal-overlay" onClick={() => setShowPrivacyModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Privacy Policy</h2>
                            <button
                                className="modal-close"
                                onClick={() => setShowPrivacyModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>We respect your privacy and protect your personal data...</p>
                            <p>1. Data Collection: We collect only necessary information for service provision.</p>
                            <p>2. Data Usage: Your data is used to improve your learning experience.</p>
                            <p>3. Data Sharing: We never sell your personal information to third parties.</p>
                            <p>4. Data Security: All data is encrypted and stored securely.</p>
                            <p>5. Your Rights: You can request data deletion at any time.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;