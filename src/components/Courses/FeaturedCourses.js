// src/components/Courses/FeaturedCourses.js
import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import coursesData from '../../utils/coursesData';
import '../../styles/components/FeaturedCourses.css';

const FeaturedCourses = () => {
    // Get 3 featured courses (you could have a 'featured' flag in real data)
    const featuredCourses = coursesData.slice(0, 3);

    return (
        <section className="featured-courses-section">
            <div className="featured-courses-container">
                <div className="featured-courses-header">
                    <h2 className="featured-courses-title">Featured Courses</h2>
                    <p className="featured-courses-subtitle">Start your learning journey with our most popular courses</p>
                </div>

                <div className="featured-courses-grid">
                    {featuredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                <div className="featured-courses-action">
                    <Link to="/courses" className="view-all-button">
                        View All Courses <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;