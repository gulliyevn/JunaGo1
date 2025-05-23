import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/layout/MainLayout';
import { Button } from '../../components/common/Button/Button';
import styles from './RoadmapPage.module.css';

const roadmapCategories = [
  { id: 'developer', name: 'Developer Roadmaps' },
  { id: 'project', name: 'Project Ideas' },
  { id: 'best', name: 'Best Practices' },
  { id: 'skill', name: 'Skill-based Roadmaps' },
];

const roadmapItems = [
  { id: 'role-based', name: 'Role-based Roadmaps', category: 'developer' },
  { id: 'frontend', name: 'Frontend', category: 'developer' },
  { id: 'backend', name: 'Backend', category: 'developer' },
  { id: 'devops', name: 'DevOps', category: 'developer' },
  { id: 'fullstack', name: 'Full Stack', category: 'developer' },
  { id: 'ai-engineer', name: 'AI Engineer', category: 'developer' },
  { id: 'data-analyst', name: 'Data Analyst', category: 'developer' },
  { id: 'ai-data', name: 'AI and Data Science', category: 'developer' },
  { id: 'android', name: 'Android', category: 'developer' },
  { id: 'ios', name: 'iOS', category: 'developer' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'developer' },
  { id: 'blockchain', name: 'Blockchain', category: 'developer' },
  { id: 'qa', name: 'QA', category: 'developer' },
  { id: 'software-architect', name: 'Software Architect', category: 'developer' },
  { id: 'cyber-security', name: 'Cyber Security', category: 'developer' },
  { id: 'ux-design', name: 'UX Design', category: 'developer' },
  { id: 'game-developer', name: 'Game Developer', category: 'developer' },
  { id: 'technical-writer', name: 'Technical Writer', category: 'developer' },
  { id: 'mlops', name: 'MLOps', category: 'developer' },
  { id: 'product-manager', name: 'Product Manager', category: 'developer' },
];

const RoadmapPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = React.useState('developer');

  const filteredRoadmaps = roadmapItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <MainLayout>
      <div className={styles.roadmapPage}>
        <div className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.title}>Step-by-step Developer Roadmaps</h1>
            <p className={styles.subtitle}>
              Explore our developer roadmaps to get a clear path to becoming a software developer.
              Choose your path and start learning today.
            </p>
            <Button 
              variant="primary" 
              size="large" 
              className={styles.getStartedAction}
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Developer Roadmaps</h2>
          
          <div className={styles.categories}>
            {roadmapCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "secondary"}
                size="small"
                className={styles.categoryAction}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className={styles.roadmapGrid}>
            {filteredRoadmaps.map((roadmap) => (
              <div key={roadmap.id} className={styles.roadmapCard}>
                <h3 className={styles.roadmapTitle}>{roadmap.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RoadmapPage; 