// src/components/Courses/CourseHeader.js
import React from 'react';
import { FaClock, FaLayerGroup, FaHeart, FaRegHeart, FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';
import '../../styles/components/CourseHeader.css';

const CourseHeader = ({
                          title,
                          duration,
                          level,
                          isFavorite,
                          isCompleted,
                          onToggleFavorite,
                          onMarkCompleted
                      }) => {
    return (
        <div className="course-header">
            <div className="course-header-left">
                <h1 className="course-title">{title}</h1>
                <div className="course-meta">
          <span className="course-duration">
            <FaClock /> {duration}
          </span>
                    <span className="course-level">
            <FaLayerGroup /> {level}
          </span>
                </div>
            </div>

            <div className="course-header-actions">
                <button
                    className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                    onClick={onToggleFavorite}
                >
                    {isFavorite ? (
                        <>
                            <FaHeart /> <span>Favorited</span>
                        </>
                    ) : (
                        <>
                            <FaRegHeart /> <span>Add to favorites</span>
                        </>
                    )}
                </button>

                <button
                    className={`complete-button ${isCompleted ? 'completed' : ''}`}
                    onClick={onMarkCompleted}
                    disabled={isCompleted}
                >
                    {isCompleted ? (
                        <>
                            <FaCheckCircle /> <span>Completed</span>
                        </>
                    ) : (
                        <>
                            <FaRegCheckCircle /> <span>Mark as complete</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CourseHeader;