// src/components/ImageSlider/ImageSlider.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import coursesData from '../../utils/coursesData';
import '../../styles/ImageSlider.css';

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    // Берем первые 6 курсов для слайдера
    const courses = coursesData.slice(0, 6);

    const itemsPerView = () => {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };

    const [perView, setPerView] = useState(itemsPerView());

    useEffect(() => {
        const handleResize = () => {
            setPerView(itemsPerView());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const prev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = Math.max(prevIndex - 1, 0);
            return newIndex;
        });
    };

    const next = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = Math.min(prevIndex + 1, courses.length - perView);
            return newIndex;
        });
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${currentIndex * (100 / perView)}%)`;
        }
    }, [currentIndex, perView]);

    return (
        <section className="slider-section">
            <div className="slider-container">
                <div className="slider-header">
                    <h2 className="slider-title">Featured Courses</h2>
                    <p className="slider-subtitle">Start your learning journey with our top-rated courses</p>
                </div>

                <div className="slider-content">
                    <div className="slider-navigation slider-nav-left">
                        <button
                            onClick={prev}
                            className="slider-button slider-button-left"
                            disabled={currentIndex === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    <div className="slider-wrapper">
                        <ul className="slider" ref={sliderRef}>
                            {courses.map((course, index) => (
                                <li key={course.id} className="slider-item" style={{ flexBasis: `${100 / perView}%` }}>
                                    <div className="slider-card">
                                        <Link to={`/courses/${course.id}`} className="slider-card-link">
                                            <div className="slider-image">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                />
                                                <div className="slider-price">${course.price}</div>
                                                <div className="slider-level">{course.level}</div>
                                            </div>
                                            <div className="slider-content-card">
                                                <h3 className="slider-title-course">{course.title}</h3>
                                                <p className="slider-instructor">
                                                    <i className="fas fa-user"></i> {course.instructor}
                                                </p>
                                                <p className="slider-description">{course.description}</p>
                                                <div className="slider-meta">
                                                    <span className="slider-duration">
                                                        <i className="fas fa-clock"></i> {course.duration}
                                                    </span>
                                                    <span className="slider-rating">
                                                        <i className="fas fa-star"></i> {course.rating}
                                                    </span>
                                                </div>
                                                <div className="slider-button-wrapper">
                                                    <span className="slider-button-more">View Course</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="slider-navigation slider-nav-right">
                        <button
                            onClick={next}
                            className="slider-button slider-button-right"
                            disabled={currentIndex >= courses.length - perView}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile navigation - both buttons together */}
                    <div className="slider-navigation-mobile">
                        <button
                            onClick={prev}
                            className="slider-button slider-button-left"
                            disabled={currentIndex === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="slider-button slider-button-right"
                            disabled={currentIndex >= courses.length - perView}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="slider-action">
                    <Link to="/courses" className="view-all-courses-button">
                        View All Courses <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ImageSlider;