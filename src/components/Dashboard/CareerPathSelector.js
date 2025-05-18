// src/components/Dashboard/CareerPathSelector.js
import React, { useState } from 'react';
import '../../styles/Dashboard/CareerPathSelector.css';

const CareerPathSelector = ({ onSelectPath }) => {
    const [selectedPath, setSelectedPath] = useState('');

    const careerPaths = [
        {
            id: 'frontend',
            name: 'Frontend Developer',
            description: 'Создание пользовательских интерфейсов',
            skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'],
            icon: '💻',
            timeToJunior: '4-6 месяцев',
            averageSalary: '$3000-5000'
        },
        {
            id: 'backend',
            name: 'Backend Developer',
            description: 'Серверная логика и API',
            skills: ['Node.js', 'Express', 'Databases', 'APIs'],
            icon: '⚡',
            timeToJunior: '5-7 месяцев',
            averageSalary: '$3500-6000'
        },
        {
            id: 'fullstack',
            name: 'Full Stack Developer',
            description: 'Frontend + Backend разработка',
            skills: ['React', 'Node.js', 'Databases', 'DevOps'],
            icon: '🚀',
            timeToJunior: '6-8 месяцев',
            averageSalary: '$4000-7000'
        },
        {
            id: 'datascience',
            name: 'Data Science',
            description: 'Анализ данных и машинное обучение',
            skills: ['Python', 'Pandas', 'ML', 'Statistics'],
            icon: '📊',
            timeToJunior: '6-9 месяцев',
            averageSalary: '$4500-8000'
        },
        {
            id: 'mobile',
            name: 'Mobile Developer',
            description: 'Разработка мобильных приложений',
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
            icon: '📱',
            timeToJunior: '5-7 месяцев',
            averageSalary: '$3500-6500'
        },
        {
            id: 'devops',
            name: 'DevOps Engineer',
            description: 'Автоматизация и развертывание',
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
            icon: '🔧',
            timeToJunior: '7-10 месяцев',
            averageSalary: '$4000-7500'
        }
    ];

    const handleSelect = (path) => {
        setSelectedPath(path.id);
    };

    const handleConfirm = () => {
        const selected = careerPaths.find(path => path.id === selectedPath);
        if (selected) {
            onSelectPath(selected);
        }
    };

    return (
        <div className="career-path-selector">
            <div className="selector-header">
                <h2 className="selector-title">Выберите свой карьерный путь</h2>
                <p className="selector-subtitle">
                    ИИ создаст персональный роадмап и подберет курсы под вашу цель
                </p>
            </div>

            <div className="paths-grid">
                {careerPaths.map(path => (
                    <div
                        key={path.id}
                        className={`path-card ${selectedPath === path.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(path)}
                    >
                        <div className="path-icon">{path.icon}</div>
                        <h3 className="path-name">{path.name}</h3>
                        <p className="path-description">{path.description}</p>

                        <div className="path-details">
                            <div className="path-skills">
                                <span className="details-label">Ключевые навыки:</span>
                                <div className="skills-tags">
                                    {path.skills.map(skill => (
                                        <span key={skill} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="path-info">
                                <div className="info-item">
                                    <span className="info-icon">⏱️</span>
                                    <span className="info-text">{path.timeToJunior}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">💰</span>
                                    <span className="info-text">{path.averageSalary}</span>
                                </div>
                            </div>
                        </div>

                        <div className="path-selection-indicator">
                            {selectedPath === path.id && <span className="check-icon">✓</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="selector-footer">
                <button
                    className="confirm-selection-btn"
                    disabled={!selectedPath}
                    onClick={handleConfirm}
                >
                    Подтвердить выбор
                </button>
                <p className="change-note">
                    *Вы сможете изменить карьерный путь в любое время в настройках
                </p>
            </div>
        </div>
    );
};

export default CareerPathSelector;