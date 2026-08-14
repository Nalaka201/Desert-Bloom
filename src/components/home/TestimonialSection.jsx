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

            {/* ── Newsletter Strip ── */}
            <div className="newsletter-strip">
                <div className="newsletter-strip-inner">
                    <div className="newsletter-text-col">
                        <div className="newsletter-badge">📬 Farmer Updates</div>
                        <h3 className="newsletter-heading">Get weekly seed tips & weather alerts</h3>
                        <p className="newsletter-sub">Join 10,000+ farmers receiving free agronomist advice every week.</p>
                    </div>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="newsletter-input-row">
                            <input
                                type="email"
                                className="newsletter-input"
                                placeholder="Enter your email address"
                                aria-label="Email for newsletter"
                            />
                            <button type="submit" className="newsletter-btn">
                                Subscribe
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </button>
                        </div>
                        <p className="newsletter-privacy">🔒 No spam. Unsubscribe anytime. Free forever.</p>
                    </form>
                </div>
            </div>

            {/* ── Farmer CTA Trust Banner ── */}
            <div className="farmer-trust-banner">
                <div className="trust-banner-bg-glow" />

                <div className="trust-banner-top-label">
                    <span className="trust-live-dot" />
                    <span>JOIN SRI LANKA'S LARGEST FARMER NETWORK</span>
                </div>

                <div className="trust-banner-main">
                    <div className="trust-icon-box">
                        <span>🌾</span>
                    </div>
                    <div className="trust-text-block">
                        <h3 className="trust-banner-heading">Are you a Farmer or<br /><span className="trust-heading-accent">Seed Producer?</span></h3>
                        <p className="trust-banner-sub">Join over 10,000+ happy farmers across Sri Lanka who are boosting their yields with verified, ISO-certified seed suppliers and free agronomist support.</p>
                    </div>
                </div>

                <div className="trust-stats-row">
                    <div className="trust-stat-pill">
                        <span className="tsp-number">10,000+</span>
                        <span className="tsp-label">Registered Farmers</span>
                    </div>
                    <div className="trust-stat-divider" />
                    <div className="trust-stat-pill">
                        <span className="tsp-number">98%</span>
                        <span className="tsp-label">Germination Rate</span>
                    </div>
                    <div className="trust-stat-divider" />
                    <div className="trust-stat-pill">
                        <span className="tsp-number">24h</span>
                        <span className="tsp-label">Island-wide Delivery</span>
                    </div>
                    <div className="trust-stat-divider" />
                    <div className="trust-stat-pill">
                        <span className="tsp-number">Free</span>
                        <span className="tsp-label">Agronomist Support</span>
                    </div>
                </div>

                <div className="trust-cta-row">
                    <a href="#suppliers" className="trust-primary-btn">
                        <span>Find Seeds Now</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </a>
                    <a href="/register" className="trust-secondary-btn">
                        Register as Farmer
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;


