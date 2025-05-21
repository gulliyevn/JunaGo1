// src/App.js (с системой безопасности)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/themeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import components
import Hero from './components/Hero/Hero';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Features from './components/Features/Features';
import SalaryCalculator from './components/SalaryCalculator/SalaryCalculator';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import ChatbotButton from './components/Chatbot/ChatbotButton';

// Import layouts
import MainLayout from './components/layout/MainLayout';

// Import pages
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseIntro from './pages/CourseIntro';
import StudentDashboard from './pages/StudentDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UpgradePlan from './pages/UpgradePlan';

// Import new pages
import RoadmapPage from './pages/Roadmap/RoadmapPage';
import ContactPage from './pages/Contact/ContactPage';
import FeedbackPage from './pages/Feedback/FeedbackPage';
import LearningPathPage from './pages/LearningPath/LearningPathPage';
import CartPage from './pages/Cart/CartPage';
import WorkspacePage from './pages/Workspace/WorkspacePage';

// Simple page components
const ArticlesPage = () => (
  <div className="container">
    <h1>Articles Page</h1>
    <p>Here you'll find our latest articles and tutorials.</p>
    <div className="articles-grid">
      <div className="article-card">
        <h2>Getting Started with React</h2>
        <p>Learn the basics of React and how to create your first component.</p>
      </div>
      <div className="article-card">
        <h2>Advanced TypeScript Techniques</h2>
        <p>Master TypeScript with these advanced tips and tricks.</p>
      </div>
      <div className="article-card">
        <h2>CSS Grid Layout</h2>
        <p>A comprehensive guide to CSS Grid Layout.</p>
      </div>
    </div>
  </div>
);

const ProjectPage = () => (
  <div className="container">
    <h1>Project Page</h1>
    <p>Explore our projects and get involved in the development process.</p>
    <div className="projects-section">
      <div className="project-card">
        <h2>Open Source Libraries</h2>
        <p>Contribute to our open source libraries and tools.</p>
      </div>
      <div className="project-card">
        <h2>Student Projects</h2>
        <p>See what our students are building and get inspired.</p>
      </div>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div className="container text-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
  </div>
);

const HomePage = () => (
  <>
    <Hero />
    <ImageSlider />
    <Features />
    <SalaryCalculator />
    <Pricing />
    <Testimonials />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ChatbotProvider>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
              <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
              <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
              <Route path="/articles" element={<MainLayout><ArticlesPage /></MainLayout>} />
              <Route path="/community" element={<MainLayout><ProjectPage /></MainLayout>} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/learning-path" element={<MainLayout><LearningPathPage /></MainLayout>} />

              {/* Authentication */}
              <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
              <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
              <Route path="/forgot-password" element={<MainLayout><ForgotPassword /></MainLayout>} />
              <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />

              {/* Protected pages */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout><StudentDashboard /></MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/courses/:courseId" element={
                <ProtectedRoute>
                  <MainLayout><CourseDetail /></MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/courses/:courseId/lessons/:lessonId" element={
                <ProtectedRoute>
                  <MainLayout><CourseIntro /></MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/courses/:courseId/lessons/:lessonId/content" element={
                <ProtectedRoute>
                  <MainLayout><CourseDetail /></MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/workspace" element={
                <ProtectedRoute requirePremium>
                  <WorkspacePage />
                </ProtectedRoute>
              } />
              <Route path="/upgrade" element={<MainLayout><UpgradePlan /></MainLayout>} />
              <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />

              {/* 404 page */}
              <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
            </Routes>
            
            {/* Chatbot components */}
            <ChatbotWidget />
            <ChatbotButton />
          </ChatbotProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;