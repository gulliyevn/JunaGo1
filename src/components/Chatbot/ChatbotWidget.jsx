import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useChatbot } from '../../contexts/ChatbotContext';
import { sendMessage, getDemoResponse } from '../../services/chatbotService';
import useTranslationService from '../../hooks/useTranslationService';
import ChatMessage from './ChatMessage';
import { FaRobot, FaTimes, FaCog, FaTrash, FaGlobe } from 'react-icons/fa';
import styles from './ChatbotWidget.module.css';

/**
 * A collapsible AI chatbot widget that provides assistance to users
 */
const ChatbotWidget = () => {
  const { t } = useTranslation();
  const { translate } = useTranslationService();
  const { user, isDemoMode } = useAuth();
  const { 
    isChatbotOpen, 
    chatHistory, 
    suggestedQuestions,
    toggleChatbot,
    closeChatbot,
    addMessage,
    clearChatHistory,
    isWorkspacePage
  } = useChatbot();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with greeting message
  useEffect(() => {
    if (localMessages.length === 0) {
      const greeting = {
        id: 1,
        text: t('chatbot_greeting', 'Hi! How can I help you today?'),
        sender: 'bot',
        timestamp: new Date()
      };
      setLocalMessages([greeting]);
    }
  }, [localMessages, t]);

  // Sync with chat history from context
  useEffect(() => {
    if (chatHistory.length > 0) {
      setLocalMessages(chatHistory);
    }
  }, [chatHistory]);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    if (isChatbotOpen) {
      scrollToBottom();
    }
  }, [localMessages, isChatbotOpen]);

  // Focus on input when chat is opened
  useEffect(() => {
    if (isChatbotOpen) {
      inputRef.current?.focus();
    }
  }, [isChatbotOpen]);

  // Don't render if not on workspace page
  if (!isWorkspacePage) return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: localMessages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    const updatedMessages = [...localMessages, userMessage];
    setLocalMessages(updatedMessages);
    addMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      let response;
      
      if (isDemoMode) {
        // Use demo response in demo mode
        response = getDemoResponse(inputMessage);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
      } else {
        // Get real response from AI service
        response = await sendMessage(
          inputMessage, 
          localMessages.filter(msg => msg.id > 1).map(msg => ({
            text: msg.text,
            sender: msg.sender
          })),
          { userId: user?.id, language: t('current_language_code', 'en') }
        );
      }

      // Add bot response to chat
      const botMessage = {
        id: localMessages.length + 2,
        text: response.message,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setLocalMessages(prev => [...prev, botMessage]);
      addMessage(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage = {
        id: localMessages.length + 2,
        text: t('chatbot_error', 'Sorry, I had trouble processing your request. Please try again.'),
        sender: 'bot',
        error: true,
        timestamp: new Date()
      };
      
      setLocalMessages(prev => [...prev, errorMessage]);
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    // Keep only the greeting message
    const greeting = localMessages[0];
    setLocalMessages([greeting]);
    clearChatHistory();
    setShowControls(false);
  };

  const translateChat = async () => {
    setIsLoading(true);
    
    try {
      // Translate all bot messages
      const translatedMessages = await Promise.all(
        localMessages.map(async (message) => {
          if (message.sender === 'bot') {
            const translatedText = await translate(message.text);
            return { ...message, text: translatedText };
          }
          return message;
        })
      );
      
      setLocalMessages(translatedMessages);
      setShowControls(false);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  if (!isChatbotOpen) return null;

  return (
    <div className={`${styles.chatbotContainer} ${isChatbotOpen ? styles.open : ''}`}>
      {/* Chatbot header */}
      <div className={styles.chatHeader}>
        <div className={styles.chatTitle}>
          <FaRobot className={styles.botIcon} />
          <h3>{t('chatbot_title', 'AI Assistant')}</h3>
        </div>
        <div className={styles.chatControls}>
          <button
            className={styles.controlButton}
            onClick={() => setShowControls(!showControls)}
            aria-label={t('chatbot_settings', 'Chatbot settings')}
          >
            <FaCog />
          </button>
          <button
            className={styles.closeButton}
            onClick={closeChatbot}
            aria-label={t('close', 'Close')}
          >
            <FaTimes />
          </button>
          
          {showControls && (
            <div className={styles.controlsDropdown} onClick={e => e.stopPropagation()}>
              <button onClick={translateChat}>
                <FaGlobe /> {t('translate', 'Translate')}
              </button>
              <button onClick={handleClearChat}>
                <FaTrash /> {t('clear_chat', 'Clear chat')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chatbot content area */}
      <div className={styles.chatMessages}>
        {localMessages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isUser={message.sender === 'user'}
          />
        ))}
        {isLoading && (
          <div className={styles.typingIndicator}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {suggestedQuestions.length > 0 && localMessages.length < 3 && (
        <div className={styles.suggestedQuestions}>
          <p className={styles.suggestedQuestionsTitle}>
            {t('suggested_questions', 'Suggested Questions')}
          </p>
          <div className={styles.questionButtons}>
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className={styles.questionButton}
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat input area */}
      <div className={styles.chatInputArea}>
        <input
          type="text"
          ref={inputRef}
          className={styles.chatInput}
          placeholder={t('chatbot_placeholder', 'Type your message...')}
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button
          className={styles.sendButton}
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          aria-label={t('send', 'Send')}
        >
          &#10148;
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget; 