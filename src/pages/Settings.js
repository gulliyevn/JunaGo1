import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import usePageTitle from '../hooks/usePageTitle';
import { Button } from '../components/common/Button/Button';

const Settings = () => {
  const pageTitle = usePageTitle('Settings');
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-form">
            <div className="form-group">
              <label>Display Name</label>
              <input type="text" className="form-control" defaultValue="John Doe" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" defaultValue="john.doe@example.com" />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea className="form-control" rows="3" defaultValue="Frontend developer passionate about learning new technologies."></textarea>
            </div>
            <div className="form-actions">
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="settings-form">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="form-actions">
              <Button variant="primary">Update Password</Button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="settings-form">
            <div className="notification-option">
              <div className="notification-info">
                <h4>Email Notifications</h4>
                <p>Receive emails about course updates and announcements</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-option">
              <div className="notification-info">
                <h4>Browser Notifications</h4>
                <p>Get push notifications in your browser</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="form-actions">
              <Button variant="primary">Save Preferences</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {pageTitle}
      <div className="settings-page">
        <div className="container">
          <h1 className="page-title">Settings</h1>
          
          <div className="settings-container">
            <div className="settings-sidebar">
              <ul className="settings-tabs">
                <li className={activeTab === 'profile' ? 'active' : ''}>
                  <Button 
                    variant={activeTab === 'profile' ? 'primary' : 'secondary'}
                    size="small"
                    className="settings-tab-action"
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="fas fa-user"></i> Profile
                  </Button>
                </li>
                <li className={activeTab === 'account' ? 'active' : ''}>
                  <Button 
                    variant={activeTab === 'account' ? 'primary' : 'secondary'}
                    size="small"
                    className="settings-tab-action"
                    onClick={() => setActiveTab('account')}
                  >
                    <i className="fas fa-lock"></i> Account & Security
                  </Button>
                </li>
                <li className={activeTab === 'notifications' ? 'active' : ''}>
                  <Button 
                    variant={activeTab === 'notifications' ? 'primary' : 'secondary'}
                    size="small"
                    className="settings-tab-action"
                    onClick={() => setActiveTab('notifications')}
                  >
                    <i className="fas fa-bell"></i> Notifications
                  </Button>
                </li>
              </ul>
            </div>
            
            <div className="settings-content">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings; 