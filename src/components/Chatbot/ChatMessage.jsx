import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChatbotWidget.module.css';

/**
 * Displays a single chat message in the chatbot
 */
const ChatMessage = ({ message, isUser }) => {
  const { text, timestamp, error } = message;
  
  // Format the timestamp
  const formattedTime = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(timestamp);

  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.botMessage} ${error ? styles.errorMessage : ''}`}>
      <div className={styles.messageContent}>
        {!isUser && (
          <div className={styles.messageSender}>
            <span className={styles.botAvatar}>🤖</span>
          </div>
        )}
        <div className={styles.messageBody}>
          <div className={styles.messageText}>{text}</div>
          <div className={styles.messageTime}>{formattedTime}</div>
        </div>
        {isUser && (
          <div className={styles.messageSender}>
            <span className={styles.userAvatar}>👤</span>
          </div>
        )}
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    error: PropTypes.bool
  }).isRequired,
  isUser: PropTypes.bool.isRequired
};

export default ChatMessage; 