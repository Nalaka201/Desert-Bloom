import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Aswenna<span>.lk</span></h3>
                        <p className="footer-text">
                            Empowering Sri Lankan farmers with certified seed suppliers, weather insights, and island-wide delivery since 2024.
                        </p>
                        <div className="social-icons">
                            <a href="#" className="social-icon" title="Facebook">fb</a>
                            <a href="#" className="social-icon" title="WhatsApp">wa</a>
                            <a href="#" className="social-icon" title="YouTube">yt</a>
                            <a href="#" className="social-icon" title="Instagram">ig</a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>{t('footer.links_title')}</h4>
                        <div className="footer-links">
                            <Link to="/about">{t('nav.about')}</Link>
                            <Link to="/#suppliers">{t('nav.company')}</Link>
                            <Link to="/#testimonials">Farmer Reviews</Link>
                            <Link to="/#features">Why Choose Us</Link>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>{t('footer.contact_title')}</h4>
                        <div className="footer-links">
                            <Link to="/contact">{t('nav.contact')}</Link>
                            <a href="#suppliers">Seed Catalog</a>
                            <a href="#suppliers">Verified Suppliers</a>
                        </div>
                    </div>

                    <div className="footer-col farmer-helpline-col">
                        <h4>🌾 Farmer Support Line</h4>
                        <div className="helpline-card">
                            <div className="helpline-number">
                                <span className="phone-icon">📞</span>
                                <div>
                                    <strong>077 123 4567</strong>
                                    <span className="helpline-sub">Toll-Free Agronomist Desk</span>
                                </div>
                            </div>
                            <p className="helpline-desc">
                                Monday - Saturday: 7:00 AM - 7:00 PM<br />
                                Island-wide Delivery & Seed Advisory
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bottom-bar">
                    © 2026 Aswenna.lk - {t('footer.rights')} | Desert Bloom Agricultural Network
                </div>
            </div>
        </footer>
    );
};

export default Footer;
