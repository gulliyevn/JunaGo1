// src/pages/UpgradePlan.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UpgradePlan.css';

const UpgradePlan = () => {
    const { user, isPremium } = useAuth();

    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: 0,
            period: 'навсегда',
            features: [
                '3 бесплатных курса',
                'Базовые упражнения',
                'Сообщество',
                'Базовая поддержка'
            ],
            current: !isPremium()
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 29.99,
            period: 'месяц',
            popular: true,
            features: [
                'Все курсы без ограничений',
                'ИИ-ментор 24/7',
                'Персональный roadmap',
                'Приоритетная поддержка',
                'Сертификаты',
                'Живые вебинары'
            ],
            current: isPremium()
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 99.99,
            period: 'месяц',
            features: [
                'Все возможности Premium',
                'Корпоративная панель',
                'Аналитика команды',
                'Индивидуальная поддержка',
                'Кастомные курсы',
                'API доступ'
            ],
            current: false
        }
    ];

    const handleUpgrade = (planId) => {
        // В продакшне здесь будет интеграция с платежной системой
        console.log(`Upgrading to ${planId}`);
    };

    if (!user) {
        return (
            <div className="upgrade-page">
                <div className="upgrade-container">
                    <div className="auth-required">
                        <h2>Авторизация требуется</h2>
                        <p>Войдите в систему, чтобы управлять подпиской</p>
                        <Link to="/login" className="login-btn">
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="upgrade-page">
            <div className="upgrade-container">
                <div className="upgrade-header">
                    <h1>Выберите план</h1>
                    <p>Выберите план, который подходит для ваших целей обучения</p>
                    {isPremium() && (
                        <div className="current-plan-badge">
                            Текущий план: Premium ✨
                        </div>
                    )}
                </div>

                <div className="plans-grid">
                    {plans.map(plan => (
                        <div
                            key={plan.id}
                            className={`plan-card ${plan.popular ? 'popular' : ''} ${plan.current ? 'current' : ''}`}
                        >
                            {plan.popular && (
                                <div className="popular-badge">
                                    Популярный
                                </div>
                            )}

                            <div className="plan-header">
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">
                                    {plan.price === 0 ? (
                                        <span className="price-free">Бесплатно</span>
                                    ) : (
                                        <>
                                            <span className="price-currency">$</span>
                                            <span className="price-amount">{plan.price}</span>
                                            <span className="price-period">/{plan.period}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="plan-features">
                                <ul>
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>
                                            <i className="fas fa-check"></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="plan-action">
                                {plan.current ? (
                                    <button className="plan-button current" disabled>
                                        Текущий план
                                    </button>
                                ) : (
                                    <button
                                        className="plan-button"
                                        onClick={() => handleUpgrade(plan.id)}
                                    >
                                        {plan.price === 0 ? 'Остаться' : 'Выбрать план'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="upgrade-footer">
                    <div className="money-back">
                        <i className="fas fa-shield-alt"></i>
                        <span>30 дней гарантии возврата денег</span>
                    </div>
                    <div className="support-info">
                        <p>Нужна помощь с выбором? <a href="/contact">Свяжитесь с нами</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradePlan;