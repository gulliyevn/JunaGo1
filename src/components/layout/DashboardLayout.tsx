import React, { useState } from 'react';
import Sidebar from './Sidebar';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`${styles.content} ${sidebarOpen ? styles.withSidebar : styles.withCollapsedSidebar}`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 