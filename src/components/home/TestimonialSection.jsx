import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/HomeSections.css';

const TestimonialSection = () => {
    const { t } = useTranslation();

    return (
        <section className="section-padding container">
            <h2 className="section-title-center">{t('testimonials.title')}</h2>
            <p className="section-subtitle">{t('testimonials.subtitle')}</p>

            <div className="testimonials-grid">
                <div className="quote-card">
                    <p className="quote-text">
                        {t('testimonials.t1_quote')}
                    </p>
                    <p className="quote-author">{t('testimonials.t1_author')}</p>
                </div>

                <div className="quote-card">
                    <p className="quote-text">
                        {t('testimonials.t2_quote')}
                    </p>
                    <p className="quote-author">{t('testimonials.t2_author')}</p>
                </div>
            </div>

            <div id="about" className="newsletter-section" style={{ marginTop: '5rem' }}>
                <h3>{t('footer.newsletter_title')}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                    {t('footer.newsletter_desc')}
                </p>
                <div className="newsletter-form">
                    <input type="email" placeholder={t('footer.email_placeholder')} className="email-input" />
                    <button className="sub-btn">{t('footer.sub_btn')}</button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
