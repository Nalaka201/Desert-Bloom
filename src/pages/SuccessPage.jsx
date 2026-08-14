import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaHome, FaHistory } from 'react-icons/fa';
import Footer from '../components/common/Footer';
import '../styles/SuccessPage.css';

const SuccessPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId || "ORD-" + Math.floor(Math.random() * 1000000);

    return (
        <div className="success-page">
            <section className="success-content container">
                <div className="success-order-card">

                    <h1>{t('success_page.title')}</h1>
                    <p className="success-subtitle">{t('success_page.subtitle')}</p>

                    <div className="success-order-stamp">
                        <span>Order</span>
                        <strong>Confirmed</strong>
                    </div>

                    <div className="success-order-id-box">
                        <span className="success-order-id-label">{t('success_page.order_id')}</span>
                        <span className="success-order-id-value">{orderId}</span>
                    </div>

                    <div className="success-actions">
                        <button onClick={() => navigate('/home')} className="btn-gold-primary">
                            <FaHome /> {t('success_page.back_home')}
                        </button>
                        <button onClick={() => navigate('/history')} className="btn-gold-secondary">
                            <FaHistory /> {t('success_page.view_history')}
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SuccessPage;