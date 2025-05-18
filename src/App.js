// src/App.js (с системой безопасности)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/themeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import components
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Features from './components/Features/Features';
import SalaryCalculator from './components/SalaryCalculator/SalaryCalculator';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';

// Import pages
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import StudentDashboard from './pages/StudentDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UpgradePlan from './pages/UpgradePlan';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="app">
                        <Header />
                        <main>
                            <Routes>
                                {/* Публичные страницы */}
                                <Route path="/" element={
                                    <>
                                        <Hero />
                                        <ImageSlider />
                                        <Features />
                                        <SalaryCalculator />
                                        <Pricing />
                                        <Testimonials />
                                    </>
                                } />

                                {/* Authentication */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/reset-password" element={<ResetPassword />} />

                                {/* Public course catalog (preview only) */}
                                <Route path="/courses" element={<Courses />} />
                                <Route path="/pricing" element={<Pricing />} />

                                {/* Protected pages - authenticated users only */}
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <StudentDashboard />
                                    </ProtectedRoute>
                                } />

                                {/* Course detail page - access control inside component */}
                                <Route path="/courses/:courseId" element={
                                    <ProtectedRoute>
                                        <CourseDetail />
                                    </ProtectedRoute>
                                } />

                                {/* Premium pages */}
                                <Route path="/workspace" element={
                                    <ProtectedRoute requirePremium>
                                        <div>Premium Workspace</div>
                                    </ProtectedRoute>
                                } />

                                {/* Subscription upgrade */}
                                <Route path="/upgrade" element={<UpgradePlan />} />

                                {/* Other public pages */}
                                <Route path="/articles" element={<div>Articles Page</div>} />
                                <Route path="/roadmap" element={<div>Roadmap Page</div>} />
                                <Route path="/community" element={<div>Community Page</div>} />

                                {/* 404 page */}
                                <Route path="*" element={<div>Page Not Found</div>} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;