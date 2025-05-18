// src/components/Dashboard/AchievementsCard.js
import React from 'react';
import '../../styles/Dashboard/AchievementsCard.css';

const AchievementsCard = ({ achievements }) => {
    const completedCount = achievements.filter(achievement => achievement.completed).length;
    const progressPercentage = (completedCount / achievements.length) * 100;

    return (
        <div className="achievements-card">
            <div className="card-header">
                <h3 className="card-title">🏆 Достижения</h3>
                <div className="achievements-progress">
                    <span className="progress-text">{completedCount}/{achievements.length}</span>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="achievements-list">
                {achievements.map(achievement => (
                    <div
                        key={achievement.id}
                        className={`achievement-item ${achievement.completed ? 'completed' : 'locked'}`}
                    >
                        <div className="achievement-icon">
                            {achievement.completed ? achievement.icon : '🔒'}
                        </div>
                        <div className="achievement-info">
                            <h4 className="achievement-title">{achievement.title}</h4>
                            <p className="achievement-description">{achievement.description}</p>
                        </div>
                        {achievement.completed && (
                            <div className="achievement-status">✅</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="card-footer">
                <button className="view-all-achievements">Все достижения</button>
            </div>
        </div>
    );
};

export default AchievementsCard;