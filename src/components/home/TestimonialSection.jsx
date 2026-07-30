import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/HomeSections.css';

const TestimonialSection = () => {
    const { t } = useTranslation();
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [activeIdx, setActiveIdx] = useState(0);

    const testimonialData = [
        {
            id: 1,
            quote: t('testimonials.t1_quote'),
            author: t('testimonials.t1_author'),
            location: 'Polonnaruwa District',
            initials: 'SK',
            rating: 5
        },
        {
            id: 2,
            quote: t('testimonials.t2_quote'),
            author: t('testimonials.t2_author'),
            location: 'Anuradhapura District',
            initials: 'SP',
            rating: 5
        },
        {
            id: 3,
            quote: '"Achieved over 95% germination rate on hybrid paddy seeds. Desert Bloom delivered directly to my farm in Kurunegala within 24 hours."',
            author: '- Nihal Wickramasinghe',
            location: 'Kurunegala District',
            initials: 'NW',
            rating: 5
        },
        {
            id: 4,
            quote: '"The agronomist advice helped me choose the ideal carrot and leek varieties for hill country soil. My crop yield doubled this season!"',
            author: '- Ruwan Fernando',
            location: 'Badulla District',
            initials: 'RF',
            rating: 5
        }
    ];

    // Auto slide timer every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % testimonialData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonialData.length]);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => {
                setSubscribed(false);
            }, 6000);
        }
    };

    return (
        <section className="section-padding container">
            <div className="testimonial-header-block">
                <div className="section-badge">VERIFIED FARMER STORIES</div>
                <h2 className="section-title-center">{t('testimonials.title')}</h2>
                <p className="section-subtitle">{t('testimonials.subtitle')}</p>
            </div>

            {/* Infinite Continuous Auto Marquee / Slider Track */}
            <div className="marquee-wrapper">
                <div className="marquee-track">
                    {/* Double the array for seamless infinite looping */}
                    {[...testimonialData, ...testimonialData].map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="quote-card marquee-card">
                            <div className="quote-header">
                                <div className="star-rating">
                                    {'★'.repeat(item.rating)}
                                </div>
                                <span className="verified-farmer-tag">
                                    <svg className="verified-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    Verified Farmer
                                </span>
                            </div>

                            <p className="quote-text">{item.quote}</p>

                            <div className="quote-author-row">
                                <div className="author-avatar-circle">{item.initials}</div>
                                <div className="author-info">
                                    <p className="quote-author">{item.author}</p>
                                    <span className="author-location">{item.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div id="about" className="newsletter-section">
                <div className="newsletter-card-inner">
                    <div className="newsletter-badge">STAY UPDATED</div>
                    <h3>{t('footer.newsletter_title')}</h3>
                    <p className="newsletter-desc-text">
                        {t('footer.newsletter_desc')}
                    </p>

                    {subscribed ? (
                        <div className="subscribe-success-toast">
                            <span className="toast-icon">✨</span>
                            <span>Thank you for subscribing! You will receive weekly farming tips and seasonal seed alerts.</span>
                        </div>
                    ) : (
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <div className="newsletter-input-wrapper">
                                <span className="newsletter-input-icon">✉️</span>
                                <input 
                                    type="email" 
                                    placeholder={t('footer.email_placeholder')} 
                                    className="email-input" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="sub-btn">
                                <span>{t('footer.sub_btn')}</span>
                                <svg className="btn-send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;


