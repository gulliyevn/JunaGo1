// src/components/Courses/CourseCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import { FaUser, FaClock, FaStar, FaUsers } from 'react-icons/fa';
import '../../styles/components/CourseCard.css';

const CourseCard = ({ course }) => {
    const { t } = useTranslation();
    
    // Get the first lesson ID or default to 1
    const firstLessonId = course.lessons && course.lessons.length > 0 
        ? course.lessons[0].id 
        : '1';
    
    return (
        <div className="course-card">
            <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-price">${course.price}</div>
                {course.rating && (
                    <div className="course-rating">
                        <FaStar /> <span>{course.rating.toFixed(1)}</span>
                    </div>
                )}
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
                        <FaUser /> {course.instructor}
                    </div>
                    <div className="course-duration">
                        <FaClock /> {course.duration}
                    </div>
                    {course.students && (
                        <div className="course-students">
                            <FaUsers /> {course.students} {t('students')}
                        </div>
                    )}
                </div>
                <Link 
                    to={`/courses/${course.id}/lessons/${firstLessonId}`} 
                    className="course-button"
                >
                    {t('view_course')}
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;