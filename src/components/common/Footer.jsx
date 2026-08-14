import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImg from '../../assets/Logo.png';
import '../../styles/Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            {/* Decorative top glow */}
            <div className="footer-top-glow" />

            <div className="container">
                <div className="footer-content">

                    {/* ── Brand Column ── */}
                    <div className="footer-brand">
                        <div className="footer-logo-row">
                            <img src={logoImg} alt="Aswenna.lk Logo" className="footer-logo-img" />
                            <h3 className="footer-brand-name">
                                Aswenna<span className="footer-lk">.lk</span>
                            </h3>
                        </div>

                        <p className="footer-text">
                            Empowering Sri Lankan farmers with certified seed suppliers, real-time weather insights, and island-wide delivery since 2024.
                        </p>

                        {/* Social Media Icons — real SVG logos */}
                        <div className="social-icons">
                            {/* Facebook */}
                            <a href="#" className="social-icon social-fb" title="Facebook" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            {/* WhatsApp */}
                            <a href="#" className="social-icon social-wa" title="WhatsApp" aria-label="WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                            </a>
                            {/* YouTube */}
                            <a href="#" className="social-icon social-yt" title="YouTube" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                                    <polygon fill="#02140d" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" className="social-icon social-ig" title="Instagram" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* ── Quick Links Column ── */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">{t('footer.links_title')}</h4>
                        <div className="footer-links">
                            <Link to="/about">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                {t('nav.about')}
                            </Link>
                            <Link to="/#suppliers">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                {t('nav.company')}
                            </Link>
                            <Link to="/#testimonials">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                Farmer Reviews
                            </Link>
                            <Link to="/#features">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                Why Choose Us
                            </Link>
                        </div>
                    </div>

                    {/* ── Resources Column ── */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">{t('footer.contact_title')}</h4>
                        <div className="footer-links">
                            <Link to="/contact">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                {t('nav.contact')}
                            </Link>
                            <a href="#suppliers">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                Seed Catalog
                            </a>
                            <a href="#suppliers">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                Verified Suppliers
                            </a>
                            <Link to="/history">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                Order History
                            </Link>
                        </div>
                    </div>

                    {/* ── Farmer Support Helpline Column ── */}
                    <div className="footer-col farmer-helpline-col">
                        <h4 className="footer-col-title">
                            <svg className="helpline-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            Farmer Support Line
                        </h4>
                        <div className="helpline-card">

                            {/* Phone number block */}
                            <div className="helpline-number-row">
                                <div className="helpline-phone-badge">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="helpline-number-info">
                                    <strong className="helpline-number-text">077 123 4567</strong>
                                    <span className="helpline-tag">Toll-Free · Agronomist Desk</span>
                                </div>
                            </div>

                            <div className="helpline-divider" />

                            {/* Hours & services */}
                            <div className="helpline-hours-row">
                                <div className="helpline-hour-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    <span>Mon – Sat &nbsp;7:00 AM – 7:00 PM</span>
                                </div>
                                <div className="helpline-hour-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                                    <span>Island-wide Delivery &amp; Seed Advisory</span>
                                </div>
                            </div>

                            <div className="helpline-divider" />

                            {/* Call Now — full-width clean button, no overlap */}
                            <a href="tel:0771234567" className="helpline-call-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>Call Now</span>
                                <span className="call-btn-number">077 123 4567</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="bottom-bar">
                    <span>© 2026 Aswenna<span className="bottom-lk">.lk</span> — {t('footer.rights')} | Desert Bloom Agricultural Network</span>
                    <div className="bottom-bar-links">
                        <a href="#">Privacy Policy</a>
                        <span>·</span>
                        <a href="#">Terms of Use</a>
                        <span>·</span>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
