import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/HomeSections.css';

const FeatureSection = () => {
    const { t } = useTranslation();

    return (
        <section className="section-padding feature-section">
            <div className="container">
                <div className="section-header-pill">
                    <span className="section-badge">WHY CHOOSE US</span>
                    <h2 className="section-title-center">{t('features.title')}</h2>
                    <p className="section-subtitle">{t('features.subtitle')}</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-circle">
                            <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                <path d="M9 12l2 2 4-4"></path>
                            </svg>
                        </div>
                        <div className="feature-tag">100% Guaranteed</div>
                        <h3>{t('features.f1_title')}</h3>
                        <p className="feature-card-desc">
                            {t('features.f1_desc')}
                        </p>
                    </div>

                    <div className="feature-card highlighted-feature-card">
                        <div className="feature-icon-circle">
                            <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                        </div>
                        <div className="feature-tag tag-express">24-48 HR Delivery</div>
                        <h3>{t('features.f2_title')}</h3>
                        <p className="feature-card-desc">
                            {t('features.f2_desc')}
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-circle">
                            <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                        <div className="feature-tag">Agronomist Access</div>
                        <h3>{t('features.f3_title')}</h3>
                        <p className="feature-card-desc">
                            {t('features.f3_desc')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;

