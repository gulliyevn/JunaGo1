// src/components/common/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import '../../styles/components/Chatbot.css';

const Chatbot = () => {
    // State variables
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isMinimized, setIsMinimized] = useState(false);

    // Refs
    const chatboxRef = useRef(null);
    const chatInputRef = useRef(null);

    // API Key (should be moved to environment variables in production)
    const API_KEY = "YOUR_API_KEY";

    // Toggle chatbot visibility
    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    // Close chatbot
    const closeChatbot = () => {
        if (isChatbotOpen) {
            setIsChatbotOpen(false);
        }
    };

    // Minimize chatbot
    const minimizeChatbot = () => {
        setIsMinimized(!isMinimized);
    };

    // Handle chat input
    const handleChat = () => {
        if (!userMessage.trim()) return;

        // Create new message
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessage = {
            message: userMessage,
            type: 'outgoing',
            timestamp
        };

        // Add message to chat
        setChatMessages([...chatMessages, newMessage]);

        // Clear input
        setUserMessage('');

        // Show typing animation and response after delay
        setTimeout(() => {
            const incomingTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const typingMessage = {
                message: null,
                type: 'incoming',
                isTyping: true,
                timestamp: incomingTimestamp
            };

            setChatMessages(prev => [...prev, typingMessage]);

            // Generate response after delay
            setTimeout(() => {
                setChatMessages(prev => {
                    const updatedMessages = [...prev];
                    const typingIndex = updatedMessages.findIndex(msg => msg.isTyping);

                    if (typingIndex !== -1) {
                        updatedMessages[typingIndex] = {
                            message: "I'm klmxnslax simulated response. In klmxnslax real implementation, this would come from the OpenAI API.",
                            type: 'incoming',
                            isTyping: false,
                            timestamp: incomingTimestamp
                        };
                    }

                    return updatedMessages;
                });
            }, 1500);
        }, 600);
    };

    // Auto-focus input when opening chat
    useEffect(() => {
        if (isChatbotOpen) {
            setTimeout(() => {
                chatInputRef.current?.focus();
            }, 300);
        }
    }, [isChatbotOpen]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [chatMessages]);

    // Handle key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    };

    return (
        <>
            <button className="chatbot-toggler" onClick={toggleChatbot}>
                <span className={`material-symbols-outlined ${isChatbotOpen ? 'opacity-0' : ''}`}>chat</span>
                <span className={`material-symbols-outlined ${!isChatbotOpen ? 'opacity-0' : ''}`}>close</span>
            </button>

            <div className={`chatbot ${isChatbotOpen ? 'show-chatbot' : ''} ${isMinimized ? 'minimized' : ''}`}>
                <header className="chatbot-header">
                    <h2>Chatbot</h2>
                    <div className="chatbot-controls">
                        <button className="minimize-btn" onClick={minimizeChatbot}>
                            <span className="material-symbols-outlined">minimize</span>
                        </button>
                        <button className="close-btn" onClick={closeChatbot}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </header>

                <ul className="chatbox" ref={chatboxRef}>
                    {chatMessages.map((chat, index) => (
                        <li key={index} className={`chat ${chat.type} mb-4`}>
                            {chat.type === 'outgoing' ? (
                                <div className="flex flex-row-reverse">
                                    <div className="max-w-80">
                                        <div className="chat-message outgoing-message">
                                            <p>{chat.message}</p>
                                        </div>
                                        <div className="chat-timestamp">{chat.timestamp}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex">
                                    <div className="chat-avatar">
                                        <span className="material-symbols-outlined">smart_toy</span>
                                    </div>
                                    <div className="max-w-80">
                                        <div className="chat-message incoming-message">
                                            {chat.isTyping ? (
                                                <div className="typing-animation">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            ) : (
                                                <p>{chat.message}</p>
                                            )}
                                        </div>
                                        <div className="chat-timestamp">{chat.timestamp}</div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="chat-input">
          <textarea
              placeholder="Enter a message..."
              ref={chatInputRef}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
          />
                    <button
                        id="send-btn"
                        className={!userMessage.trim() ? 'invisible opacity-0' : ''}
                        onClick={handleChat}
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;