import axios from 'axios';

// Create an instance of axios for AI API requests
const aiApi = axios.create({
  baseURL: '/api/chatbot',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send a message to the AI chatbot and get a response
 * @param {string} message - User message
 * @param {Array} history - Chat history
 * @param {Object} userData - User data for context
 * @returns {Promise<Object>} - Chatbot response
 */
export const sendMessage = async (message, history = [], userData = {}) => {
  try {
    const response = await aiApi.post('/message', {
      message,
      history,
      userData,
    });
    
    return response.data;
  } catch (error) {
    console.error('AI chatbot error:', error);
    return {
      message: 'Sorry, I encountered an error. Please try again later.',
      error: true,
    };
  }
};

/**
 * Get course-specific help from the AI chatbot
 * @param {number} courseId - Course ID
 * @param {string} query - User query about the course
 * @returns {Promise<Object>} - Course-specific help response
 */
export const getCourseHelp = async (courseId, query) => {
  try {
    const response = await aiApi.post('/course-help', {
      courseId,
      query,
    });
    
    return response.data;
  } catch (error) {
    console.error('Course help error:', error);
    return {
      message: 'Sorry, I could not find help for this course. Please try again later.',
      error: true,
    };
  }
};

/**
 * Generate practice exercises based on the user's current learning topic
 * @param {string} topic - Learning topic
 * @param {string} difficulty - Exercise difficulty level
 * @returns {Promise<Object>} - Generated practice exercises
 */
export const generateExercises = async (topic, difficulty = 'medium') => {
  try {
    const response = await aiApi.post('/generate-exercises', {
      topic,
      difficulty,
    });
    
    return response.data;
  } catch (error) {
    console.error('Exercise generation error:', error);
    return {
      message: 'Sorry, I could not generate exercises at this time. Please try again later.',
      error: true,
    };
  }
};

/**
 * Get code explanations from the AI
 * @param {string} code - Code snippet to explain
 * @param {string} language - Programming language
 * @returns {Promise<Object>} - Code explanation
 */
export const explainCode = async (code, language) => {
  try {
    const response = await aiApi.post('/explain-code', {
      code,
      language,
    });
    
    return response.data;
  } catch (error) {
    console.error('Code explanation error:', error);
    return {
      message: 'Sorry, I could not explain this code at this time. Please try again later.',
      error: true,
    };
  }
};

// Demo mode functions to simulate AI responses without actual API calls
export const demoResponses = {
  greeting: [
    "Hello! How can I help you with your learning today?",
    "Hi there! I'm your JunaGO learning assistant. What would you like to know?",
    "Welcome to JunaGO! I'm here to help you with your courses and coding questions."
  ],
  
  courseHelp: {
    "javascript": "JavaScript is a programming language that adds interactivity to your website. What specific topic would you like to learn about?",
    "react": "React is a JavaScript library for building user interfaces. What part of React are you struggling with?",
    "node": "Node.js is a runtime environment that allows you to run JavaScript on the server. What would you like to know about Node.js?"
  },
  
  codeExplanation: "This code uses a loop to iterate through an array and applies a filter function to each element. The result is then mapped to a new format.",
  
  fallback: "I'm not sure I understand. Could you rephrase your question?"
};

/**
 * Get a simulated response for demo mode
 * @param {string} message - User message
 * @returns {Object} - Simulated chatbot response
 */
export const getDemoResponse = (message = "") => {
  const lowerMessage = message.toLowerCase();
  
  // Simple pattern matching
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    const randomIndex = Math.floor(Math.random() * demoResponses.greeting.length);
    return { message: demoResponses.greeting[randomIndex] };
  }
  
  if (lowerMessage.includes("javascript")) {
    return { message: demoResponses.courseHelp.javascript };
  }
  
  if (lowerMessage.includes("react")) {
    return { message: demoResponses.courseHelp.react };
  }
  
  if (lowerMessage.includes("node")) {
    return { message: demoResponses.courseHelp.node };
  }
  
  if (lowerMessage.includes("code") || lowerMessage.includes("explain")) {
    return { message: demoResponses.codeExplanation };
  }
  
  return { message: demoResponses.fallback };
};

export default {
  sendMessage,
  getCourseHelp,
  generateExercises,
  explainCode,
  getDemoResponse
}; 