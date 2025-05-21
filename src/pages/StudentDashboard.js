// src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CourseProgressCard from '../components/Dashboard/CourseProgressCard';
import LearningPathCard from '../components/Dashboard/LearningPathCard';
import AchievementsCard from '../components/Dashboard/AchievementsCard';
import UpcomingLessonsCard from '../components/Dashboard/UpcomingLessonsCard';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import { useAuth } from '../contexts/AuthContext';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
    const { t } = useTranslation();
    const { user, isDemoMode } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [studentData, setStudentData] = useState({
        name: user?.name || "Иван Петров",
        level: "Intermediate Developer",
        totalCourses: 3,
        completedCourses: 1,
        currentStreak: 7,
        totalHours: 45,
        careerPath: "Frontend Developer", // Выбранный карьерный путь
        careerProgress: 65 // Общий прогресс по карьерному пути
    });

    const [enrolledCourses, setEnrolledCourses] = useState([
        {
            id: 1,
            title: "JavaScript Fundamentals",
            progress: 75,
            nextLesson: "Async/Await",
            timeLeft: "2 hours",
            difficulty: "Beginner",
            aiRecommendation: "Ты отлично справляешься! Рекомендую изучить Promises перед переходом к Async/Await."
        },
        {
            id: 2,
            title: "React Advanced",
            progress: 30,
            nextLesson: "Custom Hooks",
            timeLeft: "1.5 hours",
            difficulty: "Advanced",
            aiRecommendation: "Хорошее начало! Сосредоточься на практических заданиях для лучшего понимания."
        },
        {
            id: 3,
            title: "Node.js Backend",
            progress: 10,
            nextLesson: "Express.js Basics",
            timeLeft: "3 hours",
            difficulty: "Intermediate",
            aiRecommendation: "Новый курс! Рекомендую уделить время основам, прежде чем переходить к сложным темам."
        }
    ]);

    const achievements = [
        { id: 1, title: "Первые шаги", description: "Завершил первый урок", completed: true, icon: "🎯" },
        { id: 2, title: "Код-мастер", description: "Написал 100 строк кода", completed: true, icon: "💻" },
        { id: 3, title: "Неделька", description: "7 дней подряд в обучении", completed: true, icon: "🔥" },
        { id: 4, title: "Практик", description: "Выполнил 10 практических заданий", completed: false, icon: "⚡" }
    ];

    const upcomingLessons = [
        { id: 1, title: "Async/Await", course: "JavaScript Fundamentals", time: "Сегодня, 18:00", duration: "45 мин" },
        { id: 2, title: "Custom Hooks", course: "React Advanced", time: "Завтра, 19:00", duration: "60 мин" },
        { id: 3, title: "Express.js Setup", course: "Node.js Backend", time: "Пятница, 20:00", duration: "90 мин" }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard':
                return (
                    <>
                        {/* Статистика */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">📚</div>
                                <div className="stat-content">
                                    <span className="stat-number">{studentData.totalCourses}</span>
                                    <span className="stat-label">{t('active_courses')}</span>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">🏆</div>
                                <div className="stat-content">
                                    <span className="stat-number">{studentData.completedCourses}</span>
                                    <span className="stat-label">{t('completed')}</span>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">🔥</div>
                                <div className="stat-content">
                                    <span className="stat-number">{studentData.currentStreak}</span>
                                    <span className="stat-label">{t('day_streak')}</span>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">⏱️</div>
                                <div className="stat-content">
                                    <span className="stat-number">{studentData.totalHours}h</span>
                                    <span className="stat-label">{t('total_time')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Прогресс по курсам */}
                        <section className="dashboard-section">
                            <h2 className="section-title">{t('my_courses')}</h2>
                            <div className="courses-grid">
                                {enrolledCourses.map(course => (
                                    <CourseProgressCard key={course.id} course={course} />
                                ))}
                            </div>
                        </section>

                        {/* Рекомендации ИИ */}
                        <section className="dashboard-section">
                            <h2 className="section-title">🤖 {t('ai_recommendations')}</h2>
                            <div className="ai-recommendations">
                                <div className="ai-recommendation-card">
                                    <div className="ai-avatar">🎯</div>
                                    <div className="ai-message">
                                        <p>{t('ai_recommendation_message')}</p>
                                        <button className="ai-action-btn">{t('take_es6_test')}</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                );
            case 'courses':
                return (
                    <div className="dashboard-section">
                        <h2 className="section-title">{t('my_courses')}</h2>
                        <div className="courses-full-list">
                            {enrolledCourses.map(course => (
                                <div className="course-list-item" key={course.id}>
                                    <h3>{course.title}</h3>
                                    <div className="course-details">
                                        <span className="course-detail">{course.difficulty}</span>
                                        <span className="course-detail">{course.timeLeft} {t('left')}</span>
                                    </div>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                                    </div>
                                    <span className="progress-text">{course.progress}% {t('complete')}</span>
                                    <button className="continue-button">{t('continue')}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'learning-path':
                return (
                    <div className="dashboard-section">
                        <h2 className="section-title">{t('my_learning_path')}</h2>
                        <div className="learning-path-details">
                            <h3>{studentData.careerPath}</h3>
                            <div className="progress-container">
                                <div className="progress-bar" style={{ width: `${studentData.careerProgress}%` }}></div>
                            </div>
                            <span className="progress-text">{studentData.careerProgress}% {t('complete')}</span>
                            <div className="path-steps">
                                <div className="path-step completed">
                                    <div className="step-indicator">✓</div>
                                    <div className="step-details">
                                        <h4>HTML & CSS Basics</h4>
                                        <p>{t('completed_on')} 01/05/2023</p>
                                    </div>
                                </div>
                                <div className="path-step active">
                                    <div className="step-indicator">2</div>
                                    <div className="step-details">
                                        <h4>JavaScript Fundamentals</h4>
                                        <p>{t('in_progress')} - 75% {t('complete')}</p>
                                    </div>
                                </div>
                                <div className="path-step">
                                    <div className="step-indicator">3</div>
                                    <div className="step-details">
                                        <h4>React Basics</h4>
                                        <p>{t('upcoming')}</p>
                                    </div>
                                </div>
                                <div className="path-step">
                                    <div className="step-indicator">4</div>
                                    <div className="step-details">
                                        <h4>Advanced Frontend Development</h4>
                                        <p>{t('upcoming')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="dashboard-section">
                        <h2 className="section-title">{t('under_construction')}</h2>
                        <p>{t('feature_coming_soon')}</p>
                    </div>
                );
        }
    };

    return (
        <div className="student-dashboard-container">
            <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>{t('dashboard')}</h1>
                    <div className="dashboard-actions">
                        <button className="action-button">
                            <span>🔍</span> {t('search')}
                        </button>
                        <button className="action-button">
                            <span>🔔</span>
                        </button>
                    </div>
                </div>
                <div className="dashboard-main">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;