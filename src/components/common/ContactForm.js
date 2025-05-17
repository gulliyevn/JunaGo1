// src/components/common/ContactForm.js
import React, { useState } from 'react';
import '../../styles/components/ContactForm.css';

const ContactForm = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        rating: ''
    });

    // Notification state
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        const { name, email, message, rating } = formData;
        if (!name.trim() || !email.trim() || !message.trim() || !rating) {
            showNotification("All fields are required!", "error");
            return;
        }

        // Prepare request data
        const requestData = { ...formData };
        console.log("Sending data:", JSON.stringify(requestData));

        try {
            const response = await fetch("http://your-backend-api.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error("Invalid response from server.");
            }

            // Check for server response errors
            if (!response.ok) throw new Error(data.message || "Failed to send message.");

            showNotification("Message sent successfully!", "success");
            setFormData({
                name: '',
                email: '',
                message: '',
                rating: ''
            });
        } catch (error) {
            showNotification(error.message || "Error sending message. Try again later.", "error");
        }
    };

    // Display notifications
    const showNotification = (message, type) => {
        setNotification({
            visible: true,
            message,
            type
        });

        setTimeout(() => {
            setNotification({
                visible: false,
                message: '',
                type: ''
            });
        }, 3000);
    };

    return (
        <div className="contact-form-container">
            <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    >
                        <option value="">Select a rating</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Send Message
                </button>
            </form>

            {notification.visible && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default ContactForm;