import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    const [email, setEmail] = React.useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            setEmail('');
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Desert Bloom</h3>
                        <p className="footer-text">
                            We connect farmers with high-quality seed suppliers to ensure the best harvest since 2024.
                        </p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">f</a>
                            <a href="#" className="social-icon">t</a>
                            <a href="#" className="social-icon">in</a>
                            <a href="#" className="social-icon">ig</a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>{t('footer.links_title')}</h4>
                        <div className="footer-links">
                            <Link to="/about">{t('nav.about')}</Link>
                            <Link to="/products">{t('nav.company')}</Link>
                            <Link to="/">Success Stories</Link>
                            <Link to="/">Growing Guides</Link>
                            <Link to="/">Blog & Resources</Link>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>{t('footer.contact_title')}</h4>
                        <div className="footer-links">
                            <Link to="/contact">{t('nav.contact')}</Link>
                            <Link to="/">FAQs</Link>
                            <Link to="/">Warranty</Link>
                            <Link to="/">Return Policy</Link>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>{t('footer.newsletter_title')}</h4>
                        <div className="footer-links">
                            <p style={{ fontSize: '0.85rem', opacity: '0.8' }}>{t('footer.newsletter_desc')}</p>
                            <form className="newsletter-form" onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ padding: '0.4rem', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                                    required
                                />
                                <button
                                    type="submit"
                                    style={{ background: 'var(--primary-green)', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                                >➔</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="bottom-bar">
                    © 2026 Desert Bloom - {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
