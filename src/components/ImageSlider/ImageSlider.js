import React, { useState, useEffect, useRef } from 'react';
import '../../styles/ImageSlider.css';
import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';
import image4 from '../../assets/4.png';

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const images = [
        { id: 1, src: image1, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
        { id: 2, src: image2, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
        { id: 3, src: image3, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
        { id: 4, src: image4, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
        { id: 5, src: image1, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
        { id: 6, src: image2, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
        { id: 7, src: image3, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
        { id: 8, src: image4, title: 'lorem', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus beatae quos,' },
    ];

    const itemsPerView = () => {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        return 4;
    };

    const [perView, setPerView] = useState(itemsPerView());

    useEffect(() => {
        const handleResize = () => {
            setPerView(itemsPerView());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const prev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = Math.max(prevIndex - 1, 0);
            return newIndex;
        });
    };

    const next = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = Math.min(prevIndex + 1, images.length - perView);
            return newIndex;
        });
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${currentIndex * (100 / perView)}%)`;
        }
    }, [currentIndex, perView]);

    return (
        <section className="slider-section">
            <div className="slider-container">
                <div className="slider-nav">
                    <div className="slider-nav-left">
                        <button
                            onClick={prev}
                            className="slider-button slider-button-left"
                            disabled={currentIndex === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="slider-wrapper">
                    <ul className="slider" ref={sliderRef}>
                        {images.map((image, index) => (
                            <li key={image.id} className="slider-item" style={{ flexBasis: `${100 / perView}%` }}>
                                <div className="slider-card">
                                    <img
                                        className="slider-image"
                                        src={image.src}
                                        alt={`Slide ${index + 1}`}
                                    />
                                    <div className="slider-content">
                                        <h2 className="slider-title">{image.title}</h2>
                                        <p className="slider-description">{image.description}</p>
                                        <button className="slider-button-more">Read more</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="slider-nav">
                    <div className="slider-nav-right">
                        <button
                            onClick={next}
                            className="slider-button slider-button-right"
                            disabled={currentIndex >= images.length - perView}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageSlider;