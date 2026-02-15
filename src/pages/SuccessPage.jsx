import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import '../styles/Home.css'; // Reuse some layout styles

const SuccessPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId || "ORD-" + Math.floor(Math.random() * 1000000);

    return (
        <div className="success-page-container" style={{ paddingTop: '100px', textAlign: 'center', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
                <h1 style={{ color: '#166534', marginBottom: '1rem' }}>{t('success_page.title')}</h1>
                <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '2rem' }}>
                    {t('success_page.subtitle')}
                </p>

                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', display: 'inline-block', marginBottom: '2rem', border: '1px solid #bbf7d0' }}>
                    <strong>{t('success_page.order_id')}: </strong>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{orderId}</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate('/home')}
                        className="cta-btn"
                        style={{ background: '#166534' }}
                    >
                        {t('success_page.back_home')}
                    </button>
                    <button
                        onClick={() => navigate('/history')}
                        className="cta-btn"
                        style={{ background: '#ffffff', color: '#166534', border: '2px solid #166534' }}
                    >
                        {t('success_page.view_history')}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SuccessPage;
