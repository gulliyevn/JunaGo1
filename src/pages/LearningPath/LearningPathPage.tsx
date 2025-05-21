import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { demoRoadmap } from '../../services/demoData';
import styles from './LearningPath.module.css';

const LearningPathPage: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState(demoRoadmap[0].id);
  
  const currentPath = demoRoadmap.find(path => path.id === selectedPath) || demoRoadmap[0];

  return (
    <div className={styles.learningPathContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your Learning Journey</h1>
        <p className={styles.pageSubtitle}>
          Follow a structured learning path to master the skills you need for your career in technology
        </p>
      </div>
      
      <div className={styles.pathContent}>
        <div className={styles.pathHeader}>
          <h2 className={styles.pathTitle}>{currentPath.title}</h2>
          <p className={styles.pathDescription}>{currentPath.description}</p>
        </div>
        
        <div className={styles.pathSteps}>
          {currentPath.steps.map((step, index) => (
            <div key={step.id} className={styles.stepCard}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                
                <div className={styles.skillsSection}>
                  <h4 className={styles.sectionTitle}>Skills to learn:</h4>
                  <div className={styles.skillsList}>
                    {step.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {step.courses.length > 0 ? (
                  <div className={styles.coursesSection}>
                    <h4 className={styles.sectionTitle}>Recommended courses:</h4>
                    <div className={styles.courseLinks}>
                      {step.courses.map(courseId => {
                        // Здесь можно было бы найти информацию о курсе из demoCourses, если бы у нас был доступ к этим данным
                        return (
                          <Link 
                            key={courseId} 
                            to={`/courses/${courseId}`}
                            className={styles.courseLink}
                          >
                            Course {courseId.split('-')[1]}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className={styles.comingSoon}>
                    <p>Courses coming soon</p>
                  </div>
                )}
                
                <button className={styles.stepButton}>
                  {index === 0 ? 'Start Learning' : 'Continue Learning'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.pathCompletion}>
          <div className={styles.completionInfo}>
            <div className={styles.completionText}>
              <h3>Your Path Progress</h3>
              <p>Complete all steps to receive your certification!</p>
            </div>
            <div className={styles.completionStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>0/{currentPath.steps.length}</span>
                <span className={styles.statLabel}>Steps Completed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>0%</span>
                <span className={styles.statLabel}>Overall Progress</span>
              </div>
            </div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFilled} style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage; 