// src/components/common/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/Chatbot.css';
import CourseDetail from "../../pages/CourseDetail";

// Используем объявление функции напрямую
export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'incoming',
            content: "Hi there! 👋\nI'm your AI assistant. How can I help you today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const chatboxRef = useRef(null);

    // Остальной код без изменений
    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        if (isMinimized) {
            setIsMinimized(false);
        }
    };

    const closeChatbot = () => {
        setIsOpen(false);
    };

    const minimizeChatbot = () => {
        setIsMinimized(!isMinimized);
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newUserMessage = {
            type: 'outgoing',
            content: inputMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newUserMessage]);
        setInputMessage('');

        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'typing' }]);

            setTimeout(() => {
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const typingIndex = updatedMessages.findIndex(msg => msg.type === 'typing');

                    if (typingIndex !== -1) {
                        updatedMessages[typingIndex] = {
                            type: 'incoming',
                            content: "I'm klmxnslax demo AI assistant. In klmxnslax real implementation, I would provide helpful answers about this course. Is there anything specific about JavaScript basics you'd like to know?",
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };
                    }

                    return updatedMessages;
                });
            }, 1500);
        }, 500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const renderChatMessage = (message, index) => {
        if (message.type === 'typing') {
            return (
                <li key={`typing-${index}`} className="chat incoming">
                    <div className="chat-avatar">
                        <span className="bot-icon"></span>
                    </div>
                    <div className="chat-bubble">
                        <div className="typing-animation">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </li>
            );
        }

        if (message.type === 'incoming') {
            return (
                <li key={`incoming-${index}`} className="chat incoming">
                    <div className="chat-avatar">
                        <span className="bot-icon"></span>
                    </div>
                    <div className="chat-content">
                        <div className="chat-bubble">
                            <p>{message.content}</p>
                        </div>
                        <div className="chat-timestamp">{message.timestamp}</div>
                    </div>
                </li>
            );
        }

        return (
            <li key={`outgoing-${index}`} className="chat outgoing">
                <div className="chat-content">
                    <div className="chat-bubble">
                        <p>{message.content}</p>
                    </div>
                    <div className="chat-timestamp">{message.timestamp}</div>
                </div>
            </li>
        );
    };

    return (
        <>
            <button
                className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
                onClick={toggleChatbot}
            >
                <span className={`chat-icon ${isOpen ? 'hidden' : ''}`}></span>
                <span className={`close-icon ${isOpen ? '' : 'hidden'}`}></span>
            </button>

            <div className={`chatbot ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
                <div className="chatbot-header">
                    <div className="chatbot-header-title">
                        <span className="bot-icon"></span>
                        <h2>AI Assistant</h2>
                    </div>

                    <div className="chatbot-controls">
                        <button className="minimize-button" onClick={minimizeChatbot}>
                            <span className="minimize-icon"></span>
                        </button>
                        <button className="close-button" onClick={closeChatbot}>
                            <span className="close-icon"></span>
                        </button>
                    </div>
                </div>

                <ul className="chatbox" ref={chatboxRef}>
                    {messages.map((message, index) => renderChatMessage(message, index))}
                </ul>

                <div className="chat-input-area">
                    <textarea
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    ></textarea>
                    <button
                        className={`send-button ${!inputMessage.trim() ? 'hidden' : ''}`}
                        onClick={handleSendMessage}
                    >
                        <span className="send-icon"></span>
                    </button>
                </div>

                <div className="chatbot-footer">
                    AI Assistant may produce inaccurate information
                </div>
            </div>
        </>
    );
};

