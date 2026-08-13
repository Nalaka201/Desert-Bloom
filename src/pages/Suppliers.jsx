import React from 'react';
import { useTranslation } from 'react-i18next';
import SupplierSection from '../components/home/SupplierSection';
import Footer from '../components/common/Footer';

const Suppliers = () => {
    const { t } = useTranslation();

    return (
        <div className="suppliers-page">
            <div style={{
                background: '#166534',
                color: 'white',
                padding: '4rem 2rem',
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('suppliers_page.title')}</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', opacity: '0.9' }}>
                    {t('suppliers_page.subtitle')}
                </p>
            </div>

            <div className="container">
                <SupplierSection />
            </div>

            <Footer />
        </div>
    );
};

export default Suppliers;
