// src/components/Courses/CourseProgressBar.js
import React from 'react';
import '../../styles/components/CourseProgressBar.css';

const CourseProgressBar = ({ progress, isCompleted }) => {
    return (
        <div className="progress-container">
            <div className="progress-header">
                <span className="progress-label">Course progress</span>
                <span className="progress-percentage">{progress}%</span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default CourseProgressBar;