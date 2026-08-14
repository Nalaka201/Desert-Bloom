import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import '../styles/Contact.css';

const PinIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z" />
        <circle cx="12" cy="9.5" r="2.5" />
    </svg>
);
const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
    </svg>
);
const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6 12 13 2 6" />
    </svg>
);
const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
);

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info-card">
                        <span className="eyebrow eyebrow-light">Get In Touch</span>
                        <h2>{t('contact.info_title')}</h2>
                        <p className="info-subtitle">{t('contact.info_subtitle')}</p>

                        <div className="info-item">
                            <span className="info-icon-wrap"><PinIcon /></span>
                            <div>
                                <strong>{t('contact.address')}</strong>
                                <p>{t('contact.address_val')}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon-wrap"><PhoneIcon /></span>
                            <div>
                                <strong>{t('contact.phone')}</strong>
                                <p>+94 77 123 4567</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon-wrap"><MailIcon /></span>
                            <div>
                                <strong>{t('contact.email')}</strong>
                                <p>support@desertbloom.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <span className="eyebrow">We'd Love To Hear From You</span>
                        <h2>{t('contact.form_title')}</h2>
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>{t('contact.name_label')}</label>
                                <input type="text" className="form-input" placeholder={t('contact.name_placeholder')} />
                            </div>
                            <div className="form-group">
                                <label>{t('contact.email_label')}</label>
                                <input type="email" className="form-input" placeholder={t('contact.email_placeholder')} />
                            </div>
                            <div className="form-group">
                                <label>{t('contact.msg_label')}</label>
                                <textarea className="form-textarea" placeholder={t('contact.msg_placeholder')}></textarea>
                            </div>
                            <button className="submit-btn" type="submit">
                                <span>{t('contact.submit')}</span>
                                <SendIcon />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;