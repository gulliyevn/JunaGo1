import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaBook, FaClock, FaUserGraduate, FaStar, FaInfoCircle } from 'react-icons/fa';
import coursesData from '../utils/coursesData';
import styles from './CourseIntro.module.scss';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Define the base Course interface to match coursesData structure
interface BaseCourse {
  id: number;
  title: string;
  category: string;
  price: number;
  instructor: string;
  duration: string;
  level: string;
  image: string;
  description: string;
  curriculum: string[];
  progress: number;
  rating: number;
  students: number;
  lastUpdated: string;
}

// Extended Course interface with optional properties
interface Course extends BaseCourse {
  reviews?: number;  
  prerequisites?: string[];
  learningObjectives?: string[];
  lessons?: Lesson[];
}

const CourseIntro: React.FC = () => {
  const { t } = useTranslation();
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch course and lesson data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Find course by ID - convert courseId to number for comparison
        const foundCourse = coursesData.find(c => c.id === Number(courseId)) as BaseCourse | undefined;
        
        if (foundCourse) {
          // Create a properly typed course with lessons
          const courseWithLessons: Course = {
            ...foundCourse,
            // Create dummy lessons based on curriculum
            lessons: foundCourse.curriculum.map((item, index) => ({
              id: String(index + 1),
              title: item,
              duration: '30 minutes',
              description: `Learn about ${item} in this comprehensive lesson.`,
              difficulty: index === 0 ? 'beginner' : 
                          index < 3 ? 'intermediate' : 'advanced'
            })),
            // Add dummy prerequisites and learning objectives
            prerequisites: ['Basic programming knowledge', 'Understanding of web development'],
            learningObjectives: foundCourse.curriculum,
            reviews: Math.floor(Math.random() * 1000) + 100
          };
          
          setCourse(courseWithLessons);
          
          // Find lesson by ID if lessonId is provided
          if (lessonId && courseWithLessons.lessons) {
            const foundLesson = courseWithLessons.lessons.find(l => l.id === lessonId);
            if (foundLesson) {
              setLesson(foundLesson);
            }
          } else if (courseWithLessons.lessons && courseWithLessons.lessons.length > 0) {
            // Default to first lesson if lessonId is not provided
            setLesson(courseWithLessons.lessons[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId, lessonId]);

  const startLesson = () => {
    if (course && lesson) {
      navigate(`/courses/${course.id}/lessons/${lesson.id}/content`);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div className={styles.errorContainer}>
        <FaInfoCircle className={styles.errorIcon} />
        <h2>{t('course_not_found')}</h2>
        <p>{t('course_not_found_description')}</p>
        <button 
          className={styles.button}
          onClick={() => navigate('/courses')}
        >
          {t('browse_courses')}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.courseIntroContainer}>
      <div className={styles.courseIntroHeader}>
        <div className={styles.courseImage}>
          <img src={course.image} alt={course.title} />
        </div>
        <div className={styles.courseInfo}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <div className={styles.courseMetadata}>
            <div className={styles.metadataItem}>
              <FaUserGraduate />
              <span>{course.instructor}</span>
            </div>
            <div className={styles.metadataItem}>
              <FaClock />
              <span>{course.duration}</span>
            </div>
            <div className={styles.metadataItem}>
              <FaStar />
              <span>{course.rating} ({course.reviews || 0} {t('reviews')})</span>
            </div>
          </div>
          <p className={styles.courseDescription}>{course.description}</p>
        </div>
      </div>

      <div className={styles.lessonIntroSection}>
        <h2 className={styles.lessonTitle}>
          <FaBook className={styles.lessonIcon} />
          <span>{t('lesson')}: {lesson.title}</span>
        </h2>
        
        <div className={styles.lessonDetails}>
          <div className={styles.lessonInfo}>
            <div className={styles.infoItem}>
              <strong>{t('duration')}:</strong> {lesson.duration}
            </div>
            <div className={styles.infoItem}>
              <strong>{t('difficulty')}:</strong> 
              <span className={styles[`difficulty-${lesson.difficulty}`]}>
                {t(lesson.difficulty)}
              </span>
            </div>
          </div>
          
          <div className={styles.lessonDescription}>
            <h3>{t('about_this_lesson')}</h3>
            <p>{lesson.description}</p>
          </div>
          
          <div className={styles.prerequisites}>
            <h3>{t('prerequisites')}</h3>
            <ul>
              {course.prerequisites && course.prerequisites.length > 0 ? (
                course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))
              ) : (
                <li>{t('no_prerequisites')}</li>
              )}
            </ul>
          </div>
          
          <div className={styles.whatYouWillLearn}>
            <h3>{t('what_you_will_learn')}</h3>
            <ul>
              {course.learningObjectives && course.learningObjectives.length > 0 ? (
                course.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))
              ) : (
                <li>{t('learning_objectives_placeholder')}</li>
              )}
            </ul>
          </div>
        </div>
        
        <div className={styles.actionContainer}>
          <button 
            className={styles.startButton}
            onClick={startLesson}
          >
            <span>{t('start_lesson')}</span>
            <FaArrowRight />
          </button>
          <button 
            className={styles.backButton}
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            {t('back_to_course')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseIntro; 