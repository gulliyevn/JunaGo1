// src/components/Courses/CourseCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/CourseCard.css';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-price">${course.price}</div>
            </div>
            <div className="course-content">
                <div className="course-tags">
                    <span className="course-category">{course.category}</span>
                    <span className="course-level">{course.level}</span>
                </div>
                <h2 className="course-title">{course.title}</h2>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                    <div className="course-instructor">
                        <i className="fas fa-user"></i> {course.instructor}
                    </div>
                    <div className="course-duration">
                        <i className="fas fa-clock"></i> {course.duration}
                    </div>
                </div>
                <Link to={`/courses/${course.id}`} className="course-button">
                    View Course
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;