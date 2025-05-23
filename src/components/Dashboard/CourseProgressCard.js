// src/components/Dashboard/CourseProgressCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button/Button';
import '../../styles/Dashboard/CourseProgressCard.css';

const CourseProgressCard = ({ course }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return '#4CAF50';
            case 'Intermediate': return '#FF9800';
            case 'Advanced': return '#F44336';
            default: return '#2196F3';
        }
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return '#4CAF50';
        if (progress >= 50) return '#FF9800';
        return '#2196F3';
    };

    return (
        <div className="course-progress-card">
            <div className="course-header">
                <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <span
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(course.difficulty) }}
                    >
                        {course.difficulty}
                    </span>
                </div>
                <div className="progress-circle">
                    <svg className="progress-ring" width="60" height="60">
                        <circle
                            className="progress-ring-circle background"
                            stroke="#e0e0e0"
                            strokeWidth="4"
                            fill="transparent"
                            r="26"
                            cx="30"
                            cy="30"
                        />
                        <circle
                            className="progress-ring-circle progress"
                            stroke={getProgressColor(course.progress)}
                            strokeWidth="4"
                            fill="transparent"
                            r="26"
                            cx="30"
                            cy="30"
                            strokeDasharray={`${2 * Math.PI * 26}`}
                            strokeDashoffset={`${2 * Math.PI * 26 * (1 - course.progress / 100)}`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="progress-text">{course.progress}%</span>
                </div>
            </div>

            <div className="course-details">
                <div className="next-lesson">
                    <span className="label">Следующий урок:</span>
                    <span className="value">{course.nextLesson}</span>
                </div>
                <div className="time-info">
                    <span className="time-left">⏱️ {course.timeLeft}</span>
                </div>
            </div>

            <div className="ai-recommendation">
                <div className="ai-icon">🤖</div>
                <p className="ai-text">{course.aiRecommendation}</p>
            </div>

            <div className="card-actions">
                <Button
                    as={Link}
                    to={`/courses/${course.id}/lesson`}
                    variant="primary"
                    className="continue-action"
                >
                    Продолжить обучение
                </Button>
                <Button
                    as={Link}
                    to={`/courses/${course.id}`}
                    variant="secondary"
                    className="details-action"
                >
                    Детали курса
                </Button>
            </div>
        </div>
    );
};

export default CourseProgressCard;