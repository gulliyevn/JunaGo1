// src/components/Pricing/Pricing.js
import React from 'react';
import '../../styles/Pricing.css';

const Pricing = () => {
    return (
        <section className="pricing-section">
            <div className="pricing-container">
                {/* Card 1 */}
                <div className="pricing-card">
                    <div className="pricing-header">
                        <h3 className="pricing-title">Starter</h3>
                        <p className="pricing-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className="pricing-price">
                            <strong>20$</strong>
                            <span>/month</span>
                        </div>
                        <a href="#" className="pricing-button">Get Started</a>
                    </div>
                    <div className="pricing-features">
                        <h4 className="pricing-features-title">What's included:</h4>
                        <div className="pricing-features-list">
                            <div className="pricing-feature pricing-feature-included">10 users</div>
                            <div className="pricing-feature pricing-feature-included">2GB of storage</div>
                            <div className="pricing-feature pricing-feature-included">Email support</div>
                            <div className="pricing-feature pricing-feature-excluded">Help center access</div>
                            <div className="pricing-feature pricing-feature-excluded">Phone support</div>
                            <div className="pricing-feature pricing-feature-excluded">Community access</div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="pricing-card">
                    <div className="pricing-header">
                        <h3 className="pricing-title">Pro</h3>
                        <p className="pricing-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className="pricing-price">
                            <strong>30$</strong>
                            <span>/month</span>
                        </div>
                        <a href="#" className="pricing-button">Get Started</a>
                    </div>
                    <div className="pricing-features">
                        <h4 className="pricing-features-title">What's included:</h4>
                        <div className="pricing-features-list">
                            <div className="pricing-feature pricing-feature-included">20 users</div>
                            <div className="pricing-feature pricing-feature-included">5GB of storage</div>
                            <div className="pricing-feature pricing-feature-included">Email support</div>
                            <div className="pricing-feature pricing-feature-included">Help center access</div>
                            <div className="pricing-feature pricing-feature-excluded">Phone support</div>
                            <div className="pricing-feature pricing-feature-excluded">Community access</div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="pricing-card">
                    <div className="pricing-header">
                        <h3 className="pricing-title">Enterprise</h3>
                        <p className="pricing-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className="pricing-price">
                            <strong>100$</strong>
                            <span>/month</span>
                        </div>
                        <a href="#" className="pricing-button">Get Started</a>
                    </div>
                    <div className="pricing-features">
                        <h4 className="pricing-features-title">What's included:</h4>
                        <div className="pricing-features-list">
                            <div className="pricing-feature pricing-feature-included">50 users</div>
                            <div className="pricing-feature pricing-feature-included">20GB of storage</div>
                            <div className="pricing-feature pricing-feature-included">Email support</div>
                            <div className="pricing-feature pricing-feature-included">Help center access</div>
                            <div className="pricing-feature pricing-feature-included">Phone support</div>
                            <div className="pricing-feature pricing-feature-included">Community access</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;