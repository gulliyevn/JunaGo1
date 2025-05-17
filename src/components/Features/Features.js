// src/components/Features/Features.js
import React from 'react';
import '../../styles/Features.css';

const Features = () => {
    const features = [
        {
            id: 1,
            icon: 'fas fa-laptop-code',
            title: 'Practical Assignments',
            description: 'Each course includes practical tasks and projects to reinforce your acquired knowledge.'
        },
        {
            id: 2,
            icon: 'fas fa-users',
            title: 'Experienced Instructors',
            description: 'Our courses are led by professionals with years of experience in leading IT companies.'
        },
        {
            id: 3,
            icon: 'fas fa-certificate',
            title: 'Certificates',
            description: 'Receive a certificate upon completion that is highly valued by employers.'
        },
        {
            id: 4,
            icon: 'fas fa-clock',
            title: 'Flexible Schedule',
            description: 'Learn at your own pace with 24/7 access to all course materials.'
        },
        {
            id: 5,
            icon: 'fas fa-comments',
            title: 'Dedicated Support',
            description: 'Our instructors and mentors are always ready to answer your questions and provide assistance.'
        },
        {
            id: 6,
            icon: 'fas fa-briefcase',
            title: 'Career Assistance',
            description: 'We help our graduates find employment opportunities at leading IT companies.'
        }
    ];

    return (
        <section className="features-section">
            <div className="features-container">
                <h2 className="features-heading">Why Choose Us</h2>
                <p className="features-subheading">
                    Our platform offers everything you need for successful learning
                </p>

                <div className="features-grid">
                    {features.map(feature => (
                        <div className="feature-card" key={feature.id}>
                            <div className="feature-inner">
                                <div className="feature-icon-wrapper">
                                    <span className="feature-icon">
                                        <i className={feature.icon}></i>
                                    </span>
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-text">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;