import React from 'react';
import { useTranslation } from 'react-i18next';
import SupplierSection from '../components/home/SupplierSection';
import Footer from '../components/common/Footer';

const Company = () => {
    const { t } = useTranslation();

    return (
        <div className="company-page">
            <div className="container" style={{ paddingTop: '4rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-dark)' }}>{t('company_page.title')}</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-gray)', marginBottom: '3rem' }}>
                    {t('company_page.subtitle')}
                </p>
                <SupplierSection />
            </div>
            <Footer />
        </div>
    );
};

export default Company;
