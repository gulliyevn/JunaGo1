// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/themeContext';

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

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="app">
                    <Header />
                    <main>
                        <Routes>
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
                            <Route path="/education" element={<Courses />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/courses/:courseId" element={<CourseDetail />} />
                            <Route path="/workspace" element={<div>Workspace Page</div>} />
                            <Route path="/articles" element={<div>Articles Page</div>} />
                            <Route path="/roadmap" element={<div>Roadmap Page</div>} />
                            <Route path="/community" element={<div>Project Page</div>} />
                            <Route path="/pricing" element={<Pricing />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;