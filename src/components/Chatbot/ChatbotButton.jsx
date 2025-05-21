import React from 'react';
import { useChatbot } from '../../contexts/ChatbotContext';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaTimes } from 'react-icons/fa';
import styles from './ChatbotButton.module.css';

const ChatbotButton = () => {
  const { t } = useTranslation();
  const { 
    isChatbotOpen,
    toggleChatbot,
    isWorkspacePage
  } = useChatbot();

  // Only show button on workspace page
  if (!isWorkspacePage) return null;

  return (
    <button 
      className={`${styles.chatbotButton} ${isChatbotOpen ? styles.open : ''}`}
      onClick={toggleChatbot}
      aria-label={isChatbotOpen ? t('close_chatbot') : t('open_chatbot')}
    >
      {isChatbotOpen ? <FaTimes /> : <FaRobot />}
    </button>
  );
};

export default ChatbotButton; 