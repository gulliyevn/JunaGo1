// src/components/Dashboard/LearningPathCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard/LearningPathCard.css';

const LearningPathCard = ({ careerPath, careerProgress }) => {
    // Роадмапы для разных карьерных путей
    const careerPaths = {
        "Frontend Developer": [
            { id: 1, title: "HTML/CSS", status: "completed", progress: 100, description: "Основы верстки" },
            { id: 2, title: "JavaScript", status: "completed", progress: 100, description: "Основы программирования" },
            { id: 3, title: "React", status: "current", progress: 75, description: "Библиотека для UI" },
            { id: 4, title: "TypeScript", status: "next", progress: 0, description: "Типизированный JS" },
            { id: 5, title: "Next.js", status: "locked", progress: 0, description: "React фреймворк" }
        ],
        "Backend Developer": [
            { id: 1, title: "JavaScript", status: "completed", progress: 100, description: "Основы языка" },
            { id: 2, title: "Node.js", status: "current", progress: 30, description: "Серверная разработка" },
            { id: 3, title: "Express.js", status: "next", progress: 0, description: "Web фреймворк" },
            { id: 4, title: "Databases", status: "locked", progress: 0, description: "SQL и NoSQL" },
            { id: 5, title: "DevOps", status: "locked", progress: 0, description: "Развертывание" }
        ],
        "Data Science": [
            { id: 1, title: "Python", status: "completed", progress: 100, description: "Основы языка" },
            { id: 2, title: "Pandas", status: "current", progress: 45, description: "Анализ данных" },
            { id: 3, title: "NumPy", status: "next", progress: 0, description: "Численные вычисления" },
            { id: 4, title: "Machine Learning", status: "locked", progress: 0, description: "Алгоритмы ML" },
            { id: 5, title: "Deep Learning", status: "locked", progress: 0, description: "Нейронные сети" }
        ]
    };

    const currentPath = careerPaths[careerPath] || careerPaths["Frontend Developer"];
    const currentSkill = currentPath.find(skill => skill.status === "current");
    const nextSkill = currentPath.find(skill => skill.status === "next");

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return '✅';
            case 'current': return '🎯';
            case 'next': return '⭕';
            case 'locked': return '🔒';
            default: return '⭕';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#4CAF50';
            case 'current': return '#2196F3';
            case 'next': return '#FF9800';
            case 'locked': return '#757575';
            default: return '#757575';
        }
    };

    return (
        <div className="learning-path-card">
            <div className="card-header">
                <div className="path-title-section">
                    <h3 className="card-title">🛣️ {careerPath}</h3>
                    <div className="career-progress">
                        <div className="progress-bar career-progress-bar">
                            <div
                                className="progress-fill career-progress-fill"
                                style={{ width: `${careerProgress}%` }}
                            ></div>
                        </div>
                        <span className="career-progress-text">{careerProgress}% до Junior</span>
                    </div>
                </div>
                <Link to="/roadmap" className="full-roadmap-link">
                    Полный роадмап →
                </Link>
            </div>

            <div className="path-container">
                <div className="current-focus">
                    <h4 className="focus-title">Сейчас изучаю:</h4>
                    <div className="current-skill">
                        <span className="skill-icon">{getStatusIcon(currentSkill?.status)}</span>
                        <div className="skill-details">
                            <span className="skill-name">{currentSkill?.title}</span>
                            <span className="skill-description">{currentSkill?.description}</span>
                            <div className="skill-progress">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${currentSkill?.progress}%` }}
                                    ></div>
                                </div>
                                <span className="progress-text">{currentSkill?.progress}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="skills-timeline">
                    {currentPath.map((skill, index) => (
                        <div key={skill.id} className={`timeline-item ${skill.status}`}>
                            <div className="timeline-marker">
                                <span
                                    className="marker-icon"
                                    style={{ backgroundColor: getStatusColor(skill.status) }}
                                >
                                    {getStatusIcon(skill.status)}
                                </span>
                                {index < currentPath.length - 1 && (
                                    <div className="timeline-connector"></div>
                                )}
                            </div>
                            <div className="timeline-content">
                                <span className="skill-title">{skill.title}</span>
                                {skill.status === 'current' && (
                                    <span className="current-badge">В процессе</span>
                                )}
                                {skill.status === 'next' && (
                                    <span className="next-badge">Следующий</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-footer">
                <div className="ai-recommendation mini">
                    <span className="ai-icon">🤖</span>
                    <p className="ai-text">
                        {nextSkill ?
                            `После завершения ${currentSkill?.title}, рекомендую изучить ${nextSkill.title}. Это ключевой навык для Frontend разработчика!` :
                            `Отличный прогресс! Ты близок к завершению пути ${careerPath}!`
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LearningPathCard;