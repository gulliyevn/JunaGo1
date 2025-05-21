import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../../../types/Project';
import styles from './ProjectList.module.scss';

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>
          <i className="fas fa-folder-open"></i>
        </div>
        <h3 className={styles.emptyTitle}>No projects found</h3>
        <p className={styles.emptyMessage}>
          Start creating a new project or adjust your search criteria.
        </p>
        <button className={styles.newProjectButton}>
          <i className="fas fa-plus"></i> Create New Project
        </button>
      </div>
    );
  }

  return (
    <div className={styles.projectsGrid}>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList; 