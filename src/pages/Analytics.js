import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import usePageTitle from '../hooks/usePageTitle';

const Analytics = () => {
  const pageTitle = usePageTitle('Analytics');

  return (
    <MainLayout>
      {pageTitle}
      <div className="analytics-page">
        <div className="container">
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-description">
            Track your learning progress and performance metrics
          </p>
          
          <div className="analytics-charts">
            <div className="chart-container">
              <h2>Learning Progress</h2>
              <div className="chart-placeholder">
                {/* Chart will be rendered here */}
                <div className="chart-loading">Charts loading...</div>
              </div>
            </div>
            
            <div className="chart-container">
              <h2>Time Spent</h2>
              <div className="chart-placeholder">
                {/* Chart will be rendered here */}
                <div className="chart-loading">Charts loading...</div>
              </div>
            </div>
            
            <div className="chart-container">
              <h2>Performance</h2>
              <div className="chart-placeholder">
                {/* Chart will be rendered here */}
                <div className="chart-loading">Charts loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics; 