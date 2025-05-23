import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProjectHeader from './components/ProjectHeader';
import ProjectList from './components/ProjectList';
import ProjectActivity from './components/ProjectActivity';
import { useAuth } from '../../contexts/AuthContext';
import { ProjectService } from '../../services/ProjectService';
import { Project } from '../../types/Project';
import styles from './ProjectsPage.module.scss';
import { Button } from '../../components/common/Button/Button';
import usePageTitle from '../../hooks/usePageTitle';

const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('updated');
  const pageTitle = usePageTitle('Projects');

  useEffect(() => {
    // Fetch projects
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      try {
        const data = await ProjectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    // Fetch activities
    const fetchActivities = async () => {
      setIsLoadingActivities(true);
      try {
        const data = await ProjectService.getActivities();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsLoadingActivities(false);
      }
    };

    fetchProjects();
    fetchActivities();
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  // Filter projects based on search term and filters
  const filteredProjects = projects.filter(project => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status filter
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'starred' && project.starred) ||
      (filter === 'archived' && project.archived) ||
      (filter === 'active' && !project.archived);
    
    return matchesSearch && matchesFilter;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'stars':
        return b.stars - a.stars;
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'updated':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  return (
    <DashboardLayout>
      {pageTitle}
      <div className={styles.projectsPage}>
        <ProjectHeader 
          user={user}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
        
        <div className={styles.projectsContainer}>
          <div className={styles.mainContent}>
            <div className={styles.filtersContainer}>
              <div className={styles.filterButtons}>
                <Button 
                  variant={filter === 'all' ? 'primary' : 'secondary'}
                  size="small"
                  className={styles.filterButton}
                  onClick={() => handleFilterChange('all')}
                >
                  <i className="fas fa-border-all"></i> All
                </Button>
                <Button 
                  variant={filter === 'starred' ? 'primary' : 'secondary'}
                  size="small"
                  className={styles.filterButton}
                  onClick={() => handleFilterChange('starred')}
                >
                  <i className="fas fa-star"></i> Starred
                </Button>
                <Button 
                  variant={filter === 'active' ? 'primary' : 'secondary'}
                  size="small"
                  className={styles.filterButton}
                  onClick={() => handleFilterChange('active')}
                >
                  <i className="fas fa-code"></i> Active
                </Button>
                <Button 
                  variant={filter === 'archived' ? 'primary' : 'secondary'}
                  size="small"
                  className={styles.filterButton}
                  onClick={() => handleFilterChange('archived')}
                >
                  <i className="fas fa-archive"></i> Archived
                </Button>
              </div>
              
              <div className={styles.sortContainer}>
                <select 
                  className={styles.sortSelect}
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="updated">Recently Updated</option>
                  <option value="created">Recently Created</option>
                  <option value="name">Name</option>
                  <option value="stars">Most Stars</option>
                </select>
              </div>
            </div>
            
            <ProjectList
              projects={sortedProjects}
              isLoading={isLoadingProjects}
            />
          </div>
          
          <div className={styles.activityContainer}>
            <ProjectActivity 
              activities={activities}
              isLoading={isLoadingActivities}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage; 