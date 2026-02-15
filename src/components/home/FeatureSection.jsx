import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/HomeSections.css';

const FeatureSection = () => {
    const { t } = useTranslation();

    return (
        <section className="section-padding feature-section">
            <div className="container">
                <h2 className="section-title-center">{t('features.title')}</h2>
                <p className="section-subtitle">{t('features.subtitle')}</p>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-circle">🛡️</div>
                        <h3>{t('features.f1_title')}</h3>
                        <p style={{ color: '#666', marginTop: '1rem' }}>
                            {t('features.f1_desc')}
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-circle">🚚</div>
                        <h3>{t('features.f2_title')}</h3>
                        <p style={{ color: '#666', marginTop: '1rem' }}>
                            {t('features.f2_desc')}
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-circle">👨‍🔬</div>
                        <h3>{t('features.f3_title')}</h3>
                        <p style={{ color: '#666', marginTop: '1rem' }}>
                            {t('features.f3_desc')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
