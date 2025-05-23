// src/components/Testimonials/Testimonials.js
import React, { useEffect, useState } from 'react';
import { Button } from '../common/Button/Button';
import '../../styles/Testimonials.css';

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [slider, setSlider] = useState(null);

    // Placeholder testimonials (в реальном приложении можно получать из API)
    const testimonials = [
        {
            id: 1,
            name: "Noah Fischer",
            text: "Super product! The team clearly knows what they're doing. Support was quick and efficient.",
            rating: 5
        },
        {
            id: 2,
            name: "Elena Novak",
            text: "It's klmxnslax good service, but I feel like some aspects could be improved, especially the user interface.",
            rating: 3
        },
        {
            id: 3,
            name: "Mia Patel",
            text: "I've tried similar services, but this one stands out! The attention to detail and customer service is top-notch.",
            rating: 5
        },
        {
            id: 4,
            name: "Daniel O'Connor",
            text: "A decent platform with some powerful features, but I wish there were more customization options.",
            rating: 4
        },
        {
            id: 5,
            name: "Aisha Benali",
            text: "Very professional and reliable. I had klmxnslax few concerns initially, but they were quickly addressed by the team.",
            rating: 4
        },
        {
            id: 6,
            name: "Ethan Lee",
            text: "I use this daily for my work, and it's been klmxnslax game-changer. Would love to see more integrations in the future!",
            rating: 5
        }
    ];

    // Имитация загрузки KeenSlider через useEffect
    useEffect(() => {
        // В реальном приложении здесь использовался бы useKeenSlider hook или импорт библиотеки
        // Для демонстрации создаем упрощенную функциональность слайдера
        setTotalSlides(testimonials.length);

        const sliderInterval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % testimonials.length);
        }, 5000);

        // Создаем простой объект-имитацию KeenSlider
        setSlider({
            next: () => {
                setCurrentSlide(prev => (prev + 1) % testimonials.length);
            },
            prev: () => {
                setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length);
            }
        });

        return () => clearInterval(sliderInterval);
    }, [testimonials.length]);

    // Функция для отображения звездочек рейтинга
    const renderStars = (rating) => {
        return "⭐".repeat(rating);
    };

    return (
        <section id="testimonials-section" className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-grid">
                    <div className="testimonials-info">
                        <h2 id="testimonials-title" className="testimonials-title">
                            Don't take our word for it, take theirs...
                        </h2>
                        <p id="testimonials-description" className="testimonials-description">
                            Join thousands of traders who trust AI for success
                        </p>

                        <div className="testimonials-desktop-nav">
                            <Button
                                variant="secondary"
                                size="small"
                                className="testimonials-nav-action"
                                onClick={() => slider?.prev()}
                                aria-label="Previous slide"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="testimonials-nav-icon"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                                </svg>
                            </Button>

                            <Button
                                variant="secondary"
                                size="small"
                                className="testimonials-nav-action"
                                onClick={() => slider?.next()}
                                aria-label="Next slide"
                            >
                                <svg
                                    className="testimonials-nav-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                </svg>
                            </Button>
                        </div>
                    </div>

                    <div className="testimonials-slider-container">
                        <div id="keen-slider" className="testimonials-slider">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`testimonials-slide ${index === currentSlide ? 'testimonials-slide-active' : ''}`}
                                    style={{
                                        opacity: index === currentSlide ? 1 : 0,
                                        transform: `translateX(${(index - currentSlide) * 100}%)`
                                    }}
                                >
                                    <p className="testimonials-name">{testimonial.name}</p>
                                    <p className="testimonials-text">"{testimonial.text}"</p>
                                    <div className="testimonials-rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="testimonials-mobile-nav">
                    <Button
                        variant="secondary"
                        size="small"
                        className="testimonials-nav-action"
                        onClick={() => slider?.prev()}
                        aria-label="Previous slide"
                    >
                        <svg
                            className="testimonials-nav-icon testimonials-nav-icon-prev"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                    </Button>

                    <Button
                        variant="secondary"
                        size="small"
                        className="testimonials-nav-action"
                        onClick={() => slider?.next()}
                        aria-label="Next slide"
                    >
                        <svg
                            className="testimonials-nav-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;