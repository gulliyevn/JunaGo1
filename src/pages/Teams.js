import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import usePageTitle from '../hooks/usePageTitle';
import { Button } from '../components/common/Button/Button';

const Teams = () => {
  const pageTitle = usePageTitle('Teams');

  return (
    <MainLayout>
      {pageTitle}
      <div className="teams-page">
        <div className="container">
          <h1 className="page-title">Teams</h1>
          <p className="page-description">
            Collaborate with others on projects and courses
          </p>
          
          <div className="teams-grid">
            <div className="team-card">
              <div className="team-header">
                <h3>Frontend Team</h3>
                <span className="team-members">5 members</span>
              </div>
              <p className="team-description">
                Collaborate on frontend projects and share resources
              </p>
              <div className="team-actions">
                <Button variant="primary" size="small">View Team</Button>
              </div>
            </div>
            
            <div className="team-card">
              <div className="team-header">
                <h3>Backend Developers</h3>
                <span className="team-members">3 members</span>
              </div>
              <p className="team-description">
                Work on server-side development and API creation
              </p>
              <div className="team-actions">
                <Button variant="primary" size="small">View Team</Button>
              </div>
            </div>
            
            <div className="team-card add-team">
              <div className="add-team-content">
                <span className="add-icon">+</span>
                <h3>Create Team</h3>
                <p>Start a new team collaboration</p>
                <Button variant="secondary" size="small">Create Team</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Teams; 