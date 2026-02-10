import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import '../styles/Contact.css';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info-card">
                        <h2>{t('contact.info_title')}</h2>
                        <p style={{ marginBottom: '2rem', opacity: '0.8' }}>
                            {t('contact.info_subtitle')}
                        </p>

                        <div className="info-item">
                            <span className="info-icon">📍</span>
                            <div>
                                <strong>{t('contact.address')}</strong>
                                <p>{t('contact.address_val')}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">📞</span>
                            <div>
                                <strong>{t('contact.phone')}</strong>
                                <p>+94 77 123 4567</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">✉️</span>
                            <div>
                                <strong>{t('contact.email')}</strong>
                                <p>support@desertbloom.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
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
                            <button className="submit-btn" type="submit">{t('contact.submit')}</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
