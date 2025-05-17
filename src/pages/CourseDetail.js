// src/pages/CourseDetail.js
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import coursesData from '../utils/coursesData';
import CodeEditor from '../components/Courses/CodeEditor';
import CourseMaterials from '../components/Courses/CourseMaterials';
import CourseContent from '../components/Courses/CourseContent';
import CourseHeader from '../components/Courses/CourseHeader';
import CourseProgressBar from '../components/Courses/CourseProgressBar';
import CourseTabs from '../components/Courses/CourseTabs';
import '../styles/CourseDetail.css';

// Lazy loading Chatbot
const Chatbot = lazy(() => import('../components/common/Chatbot'));

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('theory');
    const [courseProgress, setCourseProgress] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [course, setCourse] = useState(null);

    // Fetch course data
    useEffect(() => {
        const foundCourse = coursesData.find(c => c.id === parseInt(courseId));

        if (foundCourse) {
            setCourse(foundCourse);
            setCourseProgress(foundCourse.progress || 0);

            // Check if course is in favorites
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.includes(foundCourse.id));

            // Check if course is completed
            const progress = JSON.parse(localStorage.getItem('progress')) || {};
            setIsCompleted(progress[foundCourse.id] === 'completed');

            if (progress[foundCourse.id] === 'completed') {
                setCourseProgress(100);
            }
        } else {
            // Redirect to courses page if course not found
            navigate('/courses');
        }
    }, [courseId, navigate]);

    const toggleFavorite = () => {
        if (!course) return;

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter(id => id !== course.id);
        } else {
            newFavorites = [...favorites, course.id];
        }

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    const markAsCompleted = () => {
        if (!course) return;

        const progress = JSON.parse(localStorage.getItem('progress')) || {};
        progress[course.id] = 'completed';
        localStorage.setItem('progress', JSON.stringify(progress));

        setIsCompleted(true);
        setCourseProgress(100);
    };

    if (!course) {
        return (
            <div className="course-loading">
                <div className="loading-spinner"></div>
                <p>Loading course...</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{course.title} | JunaGO</title>
            </Helmet>

            <main className="course-detail-container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/" className="breadcrumb-link">Home</Link> /
                    <Link to="/courses" className="breadcrumb-link">Courses</Link> /
                    <span className="breadcrumb-current">{course.title}</span>
                </div>

                {/* Course Header */}
                <CourseHeader
                    title={course.title}
                    duration={course.duration}
                    level={course.level}
                    isFavorite={isFavorite}
                    isCompleted={isCompleted}
                    onToggleFavorite={toggleFavorite}
                    onMarkCompleted={markAsCompleted}
                />

                {/* Progress Bar */}
                <CourseProgressBar
                    progress={courseProgress}
                    isCompleted={isCompleted}
                />

                {/* Content Tabs */}
                <CourseTabs
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* Course Content Area */}
                <div className="course-content-area">
                    <div className="course-main-content">
                        <CourseContent activeTab={activeTab} />
                    </div>

                    <div className="course-sidebar">
                        <CodeEditor />
                        <CourseMaterials />
                    </div>
                </div>
            </main>

            {/* Chatbot */}
            <Suspense fallback={<div>Loading Chatbot...</div>}>
                <Chatbot />
            </Suspense>
        </>
    );
};

export default CourseDetail;