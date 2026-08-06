import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/HomeSections.css';

const TestimonialSection = () => {
    const { t } = useTranslation();

    const testimonialData = [
        {
            id: 1,
            quote: '"Switching to Ceylon Seeds via Aswenna.lk gave me a 35% higher yield in my hybrid paddy harvest. The 98% germination rate was outstanding!"',
            author: 'Samantha Kumara',
            crop: 'Hybrid Paddy & Maize',
            location: 'Polonnaruwa District',
            initials: 'SK',
            rating: 5,
            impact: '+35% Yield Boost'
        },
        {
            id: 2,
            quote: '"Their express delivery reached my farm gate in Anuradhapura within 24 hours. The seeds arrived fresh in vacuum packages with ISO certification."',
            author: 'Sanjeewa Perera',
            crop: 'Chilli & Onion Seeds',
            location: 'Anuradhapura District',
            initials: 'SP',
            rating: 5,
            impact: '24-Hour Delivery'
        },
        {
            id: 3,
            quote: '"Achieved over 95% germination on hybrid tomatoes. The direct agronomist guidance saved my crop during the heavy rain season!"',
            author: 'Nihal Wickramasinghe',
            crop: 'Vegetable Crops',
            location: 'Kurunegala District',
            initials: 'NW',
            rating: 5,
            impact: '98% Germination'
        },
        {
            id: 4,
            quote: '"The hill country seeds from Green Valley thrive perfectly in Badulla soil. Direct supplier pricing helped reduce my cultivation cost significantly."',
            author: 'Ruwan Fernando',
            crop: 'Carrot & Leeks',
            location: 'Badulla District',
            initials: 'RF',
            rating: 5,
            impact: 'Direct Rates'
        },
        {
            id: 5,
            quote: '"Desert Bloom platform makes it super easy to order seeds online. The cash-on-delivery and PDF order receipts give me full peace of mind."',
            author: 'Kanthi Gunawardena',
            crop: 'Organic Fruits',
            location: 'Hambantota District',
            initials: 'KG',
            rating: 5,
            impact: '100% Reliable'
        }
    ];

    return (
        <section id="testimonials" className="section-padding container testimonial-section-wrap">
            <div className="testimonial-header-block">
                <div className="section-badge">
                    <span className="live-dot"></span> VERIFIED FARMER REVIEWS
                </div>
                <h2 className="section-title-center">Real Stories from Sri Lankan Farmers</h2>
                <p className="section-subtitle">
                    Discover how thousands of local farmers across Sri Lanka are boosting yields and profits with Aswenna.lk
                </p>
            </div>

            {/* Continuous Marquee Slider Track */}
            <div className="marquee-wrapper">
                <div className="marquee-track">
                    {/* Doubled array for seamless looping */}
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

                            <div className="quote-impact-badge">
                                <span>🏆 {item.impact}</span>
                                <span className="crop-type-pill">{item.crop}</span>
                            </div>

                            <div className="quote-author-row">
                                <div className="author-avatar-circle">{item.initials}</div>
                                <div className="author-info">
                                    <p className="quote-author">{item.author}</p>
                                    <span className="author-location">📍 {item.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Banner Callout */}
            <div className="farmer-trust-banner">
                <div className="trust-banner-content">
                    <div className="trust-icon-box">🌾</div>
                    <div>
                        <h3>Are you a registered farmer or seed producer?</h3>
                        <p>Join over 10,000+ happy farmers in Sri Lanka optimizing their harvest with verified seed suppliers.</p>
                    </div>
                </div>
                <a href="#suppliers" className="primary-cta-btn trust-cta-btn">
                    <span>Find Seeds Now</span>
                    <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default TestimonialSection;


