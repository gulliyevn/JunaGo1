import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import usePageTitle from '../hooks/usePageTitle';

const Messages = () => {
  const pageTitle = usePageTitle('Messages');
  const [messages] = useState([
    { id: 1, sender: 'Support Team', content: 'Hello! How can we help you today?', time: '10:30 AM', unread: false },
    { id: 2, sender: 'Course Instructor', content: 'I reviewed your last assignment. Great work!', time: 'Yesterday', unread: true },
    { id: 3, sender: 'System Notification', content: 'Your subscription will renew in 5 days', time: 'May 15, 2023', unread: false },
  ]);

  return (
    <MainLayout>
      {pageTitle}
      <div className="messages-page">
        <div className="container">
          <h1 className="page-title">Messages</h1>
          <p className="page-description">
            Your communications and notifications
          </p>
          
          <div className="messages-container">
            <div className="message-list">
              {messages.map(message => (
                <div key={message.id} className={`message-item ${message.unread ? 'unread' : ''}`}>
                  <div className="message-avatar">
                    {message.sender.charAt(0)}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">{message.sender}</span>
                      <span className="message-time">{message.time}</span>
                    </div>
                    <div className="message-body">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages; 