import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Create the context
const ChatbotContext = createContext();

/**
 * Provider component for chatbot functionality
 */
export const ChatbotProvider = ({ children }) => {
  const { isDemoMode } = useAuth();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "How do I start learning JavaScript?",
    "What is React used for?",
    "Can you explain async/await in JavaScript?",
    "How do I create a responsive website?"
  ]);
  const [chatbotMode, setChatbotMode] = useState('general'); // 'general', 'course', 'code'
  const location = useLocation();
  
  // Automatically close chatbot when not in workspace
  useEffect(() => {
    if (!location.pathname.includes('/workspace')) {
      setIsChatbotOpen(false);
    }
  }, [location.pathname]);

  /**
   * Open the chatbot
   */
  const openChatbot = () => {
    // Only allow opening if on workspace page
    if (location.pathname.includes('/workspace')) {
      setIsChatbotOpen(true);
    }
  };

  /**
   * Close the chatbot
   */
  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  /**
   * Toggle the chatbot open/closed state
   */
  const toggleChatbot = () => {
    // Only allow toggling if on workspace page
    if (location.pathname.includes('/workspace')) {
      setIsChatbotOpen(prev => !prev);
    }
  };

  /**
   * Add a message to the chat history
   * @param {Object} message - Message object
   */
  const addMessage = (message) => {
    setChatHistory(prev => [...prev, message]);
  };

  /**
   * Clear the chat history
   */
  const clearChatHistory = () => {
    setChatHistory([]);
  };

  /**
   * Set the chatbot mode for specialized assistance
   * @param {string} mode - Mode identifier ('general', 'course', 'code')
   */
  const setChatMode = (mode) => {
    setChatbotMode(mode);
  };

  /**
   * Set context-aware suggested questions
   * @param {Array} questions - Array of question strings
   */
  const updateSuggestedQuestions = (questions) => {
    setSuggestedQuestions(questions);
  };

  // Context value
  const value = {
    isChatbotOpen,
    chatHistory,
    suggestedQuestions,
    chatbotMode,
    isDemoMode,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    addMessage,
    clearChatHistory,
    setChatMode,
    updateSuggestedQuestions,
    isWorkspacePage: location.pathname.includes('/workspace')
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

/**
 * Custom hook for using the chatbot context
 */
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  
  return context;
};

export default ChatbotContext; 