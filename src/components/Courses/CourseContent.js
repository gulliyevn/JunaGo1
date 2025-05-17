// src/components/Courses/CourseContent.js
import React from 'react';
import '../../styles/components/CourseContent.css';

const CourseContent = ({ activeTab }) => {
    // Content for Theory tab
    const renderTheoryContent = () => (
        <div className="course-theory">
            <h2 className="content-title">Theoretical Material</h2>
            <div className="theory-content">
                <p>In this lesson, we'll learn the basics of JavaScript programming. JavaScript is a programming language that allows you to create dynamically updated content, control multimedia, animate images, and much more.</p>

                <h3>Variables</h3>
                <p>Variables are used for storing data. In JavaScript, there are three ways to declare variables:</p>
                <pre><code className="language-javascript">let x = 5;
const y = 10;
var z = 15;</code></pre>

                <h3>Functions</h3>
                <p>Functions are blocks of code designed to perform specific tasks. A function is executed when it is called.</p>
                <pre><code className="language-javascript">function greet(name) {'{'}
                    return `Hello, ${'${name}'}!`;
                    {'}'}</code></pre>

                <div className="info-box">
                    <i className="info-icon"></i>
                    <div>
                        <p>
                            <strong>Tip:</strong> Use <code>const</code> by default, and <code>let</code> only if the variable will change. Avoid <code>var</code> in modern code.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    // Content for Practice tab
    const renderPracticeContent = () => (
        <div className="course-practice">
            <h2 className="content-title">Practical Exercises</h2>
            <p className="practice-intro">Try to solve the following problems using the knowledge you've gained:</p>

            <div className="practice-task">
                <h3 className="task-title">Task 1: Greeting Function</h3>
                <p className="task-description">Create a function <code>greetUser</code> that takes a user's name and returns a greeting string in the format "Hello, [name]!".</p>
                <button className="solution-button">
                    <i className="solution-icon"></i>
                    Show solution
                </button>
            </div>

            <div className="practice-task">
                <h3 className="task-title">Task 2: Sum of Numbers</h3>
                <p className="task-description">Write a function <code>sumNumbers</code> that takes two numbers and returns their sum.</p>
                <button className="solution-button">
                    <i className="solution-icon"></i>
                    Show solution
                </button>
            </div>
        </div>
    );

    // Content for different tabs
    const renderContent = () => {
        switch (activeTab) {
            case 'practice':
                return renderPracticeContent();
            case 'assignments':
                return <div className="course-assignments">Assignments content here</div>;
            case 'materials':
                return <div className="course-materials-full">Additional materials here</div>;
            case 'theory':
            default:
                return renderTheoryContent();
        }
    };

    return (
        <div className="course-content">
            {renderContent()}
        </div>
    );
};

export default CourseContent;