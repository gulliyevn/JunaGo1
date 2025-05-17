// src/components/Courses/CourseTabs.js
import React from 'react';
import '../../styles/components/CourseTabs.css';

const CourseTabs = ({ activeTab, onChange }) => {
    const tabs = [
        { id: 'theory', label: 'Theory' },
        { id: 'practice', label: 'Practice' },
        { id: 'assignments', label: 'Assignments' },
        { id: 'materials', label: 'Materials' }
    ];

    return (
        <div className="course-tabs-container">
            <div className="course-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`course-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CourseTabs;