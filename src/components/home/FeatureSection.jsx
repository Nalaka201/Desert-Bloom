import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/HomeSections.css';

const FeatureSection = () => {
    const { t } = useTranslation();

    const featureItems = [
        {
            id: 1,
            badge: '100% CERTIFIED',
            badgeClass: 'tag-quality',
            title: 'High Germination Guaranteed',
            desc: 'Every seed packet is tested in government-approved laboratories for over 95% germination rate and disease resistance.',
            icon: (
                <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                </svg>
            )
        },
        {
            id: 2,
            badge: '24-48 HR EXPRESS',
            badgeClass: 'tag-express',
            highlight: true,
            title: 'Island-Wide Farm Delivery',
            desc: 'Rapid delivery straight to your farm gate across all 25 districts, ensuring you never miss optimal planting conditions.',
            icon: (
                <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
            )
        },
        {
            id: 3,
            badge: 'DIRECT ADVICE',
            badgeClass: 'tag-support',
            title: 'Agronomist Hotline Support',
            desc: 'Free expert consultation on crop selection, soil matching, and seasonal pest management from certified agricultural officers.',
            icon: (
                <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            )
        },
        {
            id: 4,
            badge: 'DIRECT RATES',
            badgeClass: 'tag-price',
            title: 'Supplier Direct Wholesale Rates',
            desc: 'No middleman markups! Get direct factory rates and flexible cash-on-delivery options for maximum profitability.',
            icon: (
                <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
            )
        }
    ];

    return (
        <section id="features" className="section-padding feature-section">
            <div className="container">
                <div className="section-header-pill">
                    <div className="section-badge">
                        <span className="live-dot"></span> WHY CHOOSE ASWENNA.LK
                    </div>
                    <h2 className="section-title-center">Built Specifically for Sri Lankan Farmers</h2>
                    <p className="section-subtitle">
                        Empowering your farm with trusted inputs, guaranteed seed vitality, and expert guidance every step of the way.
                    </p>
                </div>

                <div className="features-grid-modern">
                    {featureItems.map((item) => (
                        <div 
                            key={item.id} 
                            className={`feature-card-modern ${item.highlight ? 'highlighted-feature-card' : ''}`}
                        >
                            <div className="feature-icon-circle-glow">
                                {item.icon}
                            </div>
                            <span className={`feature-tag ${item.badgeClass}`}>
                                {item.badge}
                            </span>
                            <h3 className="feature-card-title">{item.title}</h3>
                            <p className="feature-card-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;

