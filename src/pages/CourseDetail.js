// src/pages/CourseDetail.js
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CodeEditor from '../components/Courses/CodeEditor';
import CourseMaterials from '../components/Courses/CourseMaterials';
import CourseContent from '../components/Courses/CourseContent';
import CourseHeader from '../components/Courses/CourseHeader';
import CourseProgressBar from '../components/Courses/CourseProgressBar';
import CourseTabs from '../components/Courses/CourseTabs';
import '../styles/CourseDetail.css';

// Ленивая загрузка Chatbot после всех других импортов
const Chatbot = lazy(() => import('../components/common/Chatbot'));

const CourseDetail = () => {
    const { courseId } = useParams();
    const [activeTab, setActiveTab] = useState('theory');
    const [courseProgress, setCourseProgress] = useState(25);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Остальной код без изменений
    const courseData = {
        id: courseId || 'current-course',
        title: 'JavaScript Basics',
        duration: '12 hours',
        level: 'Intermediate',
        progress: courseProgress,
    };

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const progress = JSON.parse(localStorage.getItem('progress')) || {};

        setIsFavorite(favorites.includes(courseData.id));
        setIsCompleted(progress[courseData.id] === 'completed');

        if (progress[courseData.id] === 'completed') {
            setCourseProgress(100);
        }
    }, [courseData.id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter(id => id !== courseData.id);
        } else {
            newFavorites = [...favorites, courseData.id];
        }

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    const markAsCompleted = () => {
        const progress = JSON.parse(localStorage.getItem('progress')) || {};
        progress[courseData.id] = 'completed';
        localStorage.setItem('progress', JSON.stringify(progress));

        setIsCompleted(true);
        setCourseProgress(100);
    };

    return (
        <>
            <Helmet>
                <title>{courseData.title} | JunaGO</title>
            </Helmet>

            <main className="course-detail-container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/" className="breadcrumb-link">Home</Link> /
                    <Link to="/courses" className="breadcrumb-link">Courses</Link> /
                    <span className="breadcrumb-current">{courseData.title}</span>
                </div>

                {/* Course Header */}
                <CourseHeader
                    title={courseData.title}
                    duration={courseData.duration}
                    level={courseData.level}
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

            {/* Chatbot с использованием Suspense */}
            <Suspense fallback={<div>Loading Chatbot...</div>}>
                <Chatbot />
            </Suspense>
        </>
    );
};

export default CourseDetail;