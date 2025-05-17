// src/pages/Courses.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CourseCard from '../components/Courses/CourseCard';
import coursesData from '../utils/coursesData';
import '../styles/Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterLevel, setFilterLevel] = useState('');

    // Get unique categories and levels for filters
    const categories = [...new Set(coursesData.map(course => course.category))];
    const levels = [...new Set(coursesData.map(course => course.level))];

    // Load courses on component mount
    useEffect(() => {
        setCourses(coursesData);
    }, []);

    // Filter courses based on search term and filters
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = filterCategory === '' || course.category === filterCategory;
        const matchesLevel = filterLevel === '' || course.level === filterLevel;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    return (
        <>
            <Helmet>
                <title>Courses | JunaGO</title>
            </Helmet>

            <main className="courses-page">
                <div className="courses-header">
                    <h1 className="courses-title">Explore Our Courses</h1>
                    <p className="courses-subtitle">Enhance your skills with our industry-leading courses</p>
                </div>

                <div className="courses-container">
                    <div className="courses-filters">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-group">
                            <label htmlFor="category-filter">Category:</label>
                            <select
                                id="category-filter"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="level-filter">Level:</label>
                            <select
                                id="level-filter"
                                value={filterLevel}
                                onChange={(e) => setFilterLevel(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">All Levels</option>
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="courses-grid">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        ) : (
                            <div className="no-courses">
                                <h3>No courses found</h3>
                                <p>Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Courses;