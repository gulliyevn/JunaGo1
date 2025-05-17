// src/components/Courses/CourseMaterials.js
import React from 'react';
import { FaFilePdf, FaLink, FaFileVideo, FaCode } from 'react-icons/fa';
import '../../styles/components/CourseMaterials.css';

const CourseMaterials = () => {
    const materials = [
        { id: 1, icon: <FaFilePdf />, name: 'JavaScript Basics.pdf', link: '#' },
        { id: 2, icon: <FaLink />, name: 'MDN Documentation', link: '#' },
        { id: 3, icon: <FaFileVideo />, name: 'Video: Functions Basics', link: '#' },
        { id: 4, icon: <FaCode />, name: 'Code Examples', link: '#' }
    ];

    return (
        <div className="materials-container">
            <div className="materials-header">
                <h3 className="materials-title">
                    <i className="book-icon"></i>
                    Course Materials
                </h3>
            </div>

            <div className="materials-content">
                <ul className="materials-list">
                    {materials.map(material => (
                        <li key={material.id} className="material-item">
                            <a href={material.link} className="material-link">
                                <span className="material-icon">{material.icon}</span>
                                <span className="material-name">{material.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CourseMaterials;