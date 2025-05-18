// src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseProgressCard from '../components/Dashboard/CourseProgressCard';
import LearningPathCard from '../components/Dashboard/LearningPathCard';
import AchievementsCard from '../components/Dashboard/AchievementsCard';
import UpcomingLessonsCard from '../components/Dashboard/UpcomingLessonsCard';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
    const [studentData, setStudentData] = useState({
        name: "Иван Петров",
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

    return (
        <div className="student-dashboard">
            <div className="dashboard-container">
                {/* Заголовок и статистика */}
                <div className="dashboard-header">
                    <div className="welcome-section">
                        <h1 className="welcome-title">Добро пожаловать, {studentData.name}! 👋</h1>
                        <p className="welcome-subtitle">Продолжай свой путь к {studentData.level}</p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📚</div>
                            <div className="stat-content">
                                <span className="stat-number">{studentData.totalCourses}</span>
                                <span className="stat-label">Активных курсов</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">🏆</div>
                            <div className="stat-content">
                                <span className="stat-number">{studentData.completedCourses}</span>
                                <span className="stat-label">Завершено</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">🔥</div>
                            <div className="stat-content">
                                <span className="stat-number">{studentData.currentStreak}</span>
                                <span className="stat-label">Дней подряд</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">⏱️</div>
                            <div className="stat-content">
                                <span className="stat-number">{studentData.totalHours}ч</span>
                                <span className="stat-label">Общее время</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Основной контент */}
                <div className="dashboard-content">
                    {/* Левая колонка */}
                    <div className="main-column">
                        {/* Прогресс по курсам */}
                        <section className="dashboard-section">
                            <h2 className="section-title">Мои курсы</h2>
                            <div className="courses-grid">
                                {enrolledCourses.map(course => (
                                    <CourseProgressCard key={course.id} course={course} />
                                ))}
                            </div>
                        </section>

                        {/* Рекомендации ИИ */}
                        <section className="dashboard-section">
                            <h2 className="section-title">🤖 ИИ рекомендует</h2>
                            <div className="ai-recommendations">
                                <div className="ai-recommendation-card">
                                    <div className="ai-avatar">🎯</div>
                                    <div className="ai-message">
                                        <p>Отличная работа с JavaScript! Рекомендую пройти тест на знание ES6+ перед переходом к React Advanced. Это поможет лучше понять современный синтаксис.</p>
                                        <button className="ai-action-btn">Пройти тест ES6+</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Правая колонка */}
                    <div className="sidebar-column">
                        {/* Ближайшие уроки */}
                        <UpcomingLessonsCard lessons={upcomingLessons} />

                        {/* Достижения */}
                        <AchievementsCard achievements={achievements} />

                        {/* Персональный роадмап */}
                        <LearningPathCard
                            careerPath={studentData.careerPath}
                            careerProgress={studentData.careerProgress}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;