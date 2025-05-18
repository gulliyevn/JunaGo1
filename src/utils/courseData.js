// src/utils/coursesData.js - с исправленными изображениями

const coursesData = [
    {
        id: 1,
        title: "Introduction to JavaScript",
        category: "Programming",
        price: 79.99,
        instructor: "Alex Johnson",
        duration: "8 weeks",
        level: "Beginner",
        image: "https://picsum.photos/300/200?random=1", // Альтернативный placeholder
        description: "This comprehensive course covers JavaScript fundamentals, from basic syntax to advanced concepts like closures and promises. Perfect for beginners looking to start their programming journey.",
        curriculum: [
            "JavaScript Basics and Syntax",
            "Functions and Scope",
            "Arrays and Objects",
            "DOM Manipulation",
            "Asynchronous JavaScript",
            "Error Handling",
            "JavaScript Modules",
            "Modern JS Features (ES6+)"
        ],
        progress: 25,
        rating: 4.8,
        students: 3254,
        lastUpdated: "April 2025",
        theoryContent: "<p>In this lesson, we'll learn the basics of JavaScript programming. JavaScript is a programming language that allows you to create dynamically updated content, control multimedia, animate images, and much more.</p><h3>Variables</h3><p>Variables are used for storing data. In JavaScript, there are three ways to declare variables:</p><pre><code>let x = 5;\nconst y = 10;\nvar z = 15;</code></pre><h3>Functions</h3><p>Functions are blocks of code designed to perform specific tasks. A function is executed when it is called.</p><pre><code>function greet(name) {\n  return `Hello, ${name}!`;\n}</code></pre>",
        practiceExercises: [
            {
                title: "Task 1: Greeting Function",
                description: "Create a function greetUser that takes a user's name and returns a greeting string in the format \"Hello, [name]!\"."
            },
            {
                title: "Task 2: Sum of Numbers",
                description: "Write a function sumNumbers that takes two numbers and returns their sum."
            }
        ],
        materials: [
            {
                name: "JavaScript Basics.pdf",
                type: "pdf",
                url: "#"
            },
            {
                name: "MDN Documentation",
                type: "link",
                url: "#"
            },
            {
                name: "Video: Functions Basics",
                type: "video",
                url: "#"
            },
            {
                name: "Code Examples",
                type: "code",
                url: "#"
            }
        ]
    },
    {
        id: 2,
        title: "React Fundamentals",
        category: "Frontend",
        price: 89.99,
        instructor: "Sarah Miller",
        duration: "10 weeks",
        level: "Intermediate",
        image: "https://picsum.photos/300/200?random=2",
        description: "Learn how to build modern user interfaces with React. This course covers everything from component basics to advanced state management and routing.",
        curriculum: [
            "React Core Concepts",
            "JSX and Components",
            "Props and State",
            "Hooks in Depth",
            "Context API",
            "React Router",
            "Forms in React",
            "Performance Optimization",
            "Testing React Applications",
            "Building a Complete Project"
        ],
        progress: 0,
        rating: 4.9,
        students: 2187,
        lastUpdated: "May 2025",
        theoryContent: "<p>Welcome to React Fundamentals! In this course, you'll learn how to build powerful, interactive user interfaces with React. React is a JavaScript library created by Facebook for building user interfaces.</p><h3>Components</h3><p>Components are the building blocks of any React application. A component is a self-contained piece of code that returns HTML via a render function.</p><pre><code>function Welcome() {\n  return <h1>Hello, React!</h1>;\n}</code></pre><h3>Props</h3><p>Props (short for properties) allow you to pass data from a parent component to a child component.</p>",
        practiceExercises: [
            {
                title: "Task 1: Create a Component",
                description: "Create a React component that displays a user's name and profile picture."
            },
            {
                title: "Task 2: Props and State",
                description: "Build a counter component that can increment and decrement a value."
            }
        ],
        materials: [
            {
                name: "React Documentation",
                type: "link",
                url: "#"
            },
            {
                name: "Component Patterns.pdf",
                type: "pdf",
                url: "#"
            },
            {
                name: "Video: Hooks Tutorial",
                type: "video",
                url: "#"
            }
        ]
    },
    {
        id: 3,
        title: "Python for Data Science",
        category: "Data Science",
        price: 99.99,
        instructor: "Michael Chen",
        duration: "12 weeks",
        level: "Intermediate",
        image: "https://picsum.photos/300/200?random=3",
        description: "Master Python programming and its applications in data analysis and visualization. Learn to work with popular libraries like Pandas, NumPy, and Matplotlib.",
        curriculum: [
            "Python Basics",
            "Data Structures in Python",
            "NumPy for Numerical Computing",
            "Data Analysis with Pandas",
            "Data Visualization with Matplotlib and Seaborn",
            "Statistical Analysis",
            "Machine Learning Basics",
            "Data Cleaning and Preprocessing",
            "Working with APIs and Web Scraping",
            "Final Project: End-to-End Data Analysis"
        ],
        progress: 0,
        rating: 4.7,
        students: 1856,
        lastUpdated: "March 2025",
        theoryContent: "<p>Welcome to Python for Data Science! Python has become the language of choice for data scientists due to its simplicity and powerful libraries.</p><h3>NumPy</h3><p>NumPy is the fundamental package for scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with a large collection of high-level mathematical functions.</p><pre><code>import numpy as np\n\n# Create an array\narr = np.array([1, 2, 3, 4, 5])\nprint(arr.mean())</code></pre>",
        practiceExercises: [
            {
                title: "Task 1: Data Analysis",
                description: "Analyze a dataset of sales records to find trends and patterns."
            },
            {
                title: "Task 2: Visualization",
                description: "Create meaningful visualizations to represent the data from Task 1."
            }
        ],
        materials: [
            {
                name: "Python Data Science Handbook",
                type: "pdf",
                url: "#"
            },
            {
                name: "Pandas Documentation",
                type: "link",
                url: "#"
            },
            {
                name: "Dataset: Sales Records",
                type: "file",
                url: "#"
            }
        ]
    },
    {
        id: 4,
        title: "Node.js Backend Development",
        category: "Backend",
        price: 94.99,
        instructor: "David Wilson",
        duration: "10 weeks",
        level: "Advanced",
        image: "https://picsum.photos/300/200?random=4",
        description: "Build scalable server-side applications with Node.js and Express. Learn about RESTful APIs, authentication, databases, and deployment.",
        curriculum: [
            "Node.js Fundamentals",
            "Express.js Framework",
            "RESTful API Development",
            "Authentication and Authorization",
            "Database Integration (MongoDB)",
            "Error Handling and Logging",
            "Testing Node.js Applications",
            "Performance Optimization",
            "Deployment and CI/CD",
            "Real-time Applications with Socket.io"
        ],
        progress: 0,
        rating: 4.6,
        students: 1432,
        lastUpdated: "February 2025",
        materials: [
            {
                name: "Node.js Documentation",
                type: "link",
                url: "#"
            },
            {
                name: "API Design Patterns.pdf",
                type: "pdf",
                url: "#"
            }
        ]
    },
    {
        id: 5,
        title: "UI/UX Design Principles",
        category: "Design",
        price: 69.99,
        instructor: "Emma Roberts",
        duration: "6 weeks",
        level: "Beginner",
        image: "https://picsum.photos/300/200?random=5",
        description: "Master the principles of user interface and user experience design. Learn about design thinking, wireframing, prototyping, and user testing.",
        curriculum: [
            "Design Thinking Process",
            "User Research Methods",
            "Information Architecture",
            "Wireframing and Prototyping",
            "Visual Design Principles",
            "Usability Testing",
            "Responsive Design",
            "Design Systems",
            "Accessibility in Design",
            "Portfolio Development"
        ],
        progress: 0,
        rating: 4.8,
        students: 2876,
        lastUpdated: "April 2025",
        materials: [
            {
                name: "Design Principles Guide",
                type: "pdf",
                url: "#"
            },
            {
                name: "Figma Templates",
                type: "file",
                url: "#"
            }
        ]
    },
    {
        id: 6,
        title: "Advanced JavaScript Patterns",
        category: "Programming",
        price: 109.99,
        instructor: "Robert Martinez",
        duration: "8 weeks",
        level: "Advanced",
        image: "https://picsum.photos/300/200?random=6",
        description: "Deep dive into advanced JavaScript design patterns and best practices. Learn about functional programming, design patterns, and performance optimization.",
        curriculum: [
            "Functional Programming in JavaScript",
            "Object-Oriented JavaScript",
            "Common Design Patterns",
            "Advanced Closures and Scope",
            "Asynchronous Patterns",
            "Memory Management and Performance",
            "Module Patterns and Architecture",
            "Testing and Debugging Advanced JavaScript",
            "Meta-programming and Proxies",
            "Concurrent JavaScript with Workers"
        ],
        progress: 0,
        rating: 4.9,
        students: 1298,
        lastUpdated: "May 2025",
        materials: [
            {
                name: "JavaScript Patterns.pdf",
                type: "pdf",
                url: "#"
            },
            {
                name: "Performance Optimization Guide",
                type: "link",
                url: "#"
            }
        ]
    }
];

export default coursesData;