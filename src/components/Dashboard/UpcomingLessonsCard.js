// src/components/Dashboard/UpcomingLessonsCard.js
import React from 'react';
import '../../styles/Dashboard/UpcomingLessonsCard.css';

const UpcomingLessonsCard = ({ lessons }) => {
    return (
        <div className="upcoming-lessons-card">
            <div className="card-header">
                <h3 className="card-title">📅 Ближайшие уроки</h3>
            </div>

            <div className="lessons-list">
                {lessons.map(lesson => (
                    <div key={lesson.id} className="lesson-item">
                        <div className="lesson-info">
                            <h4 className="lesson-title">{lesson.title}</h4>
                            <p className="lesson-course">{lesson.course}</p>
                            <div className="lesson-schedule">
                                <span className="lesson-time">🕐 {lesson.time}</span>
                                <span className="lesson-duration">⏱️ {lesson.duration}</span>
                            </div>
                        </div>
                        <button className="join-lesson-btn">Перейти</button>
                    </div>
                ))}
            </div>

            <div className="card-footer">
                <button className="view-all-lessons">Показать все уроки</button>
            </div>
        </div>
    );
};

export default UpcomingLessonsCard;