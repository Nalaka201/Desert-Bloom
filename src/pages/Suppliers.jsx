import React from 'react';
import { useTranslation } from 'react-i18next';
import SupplierSection from '../components/home/SupplierSection';
import Footer from '../components/common/Footer';
import '../styles/Suppliers.css';

const Suppliers = () => {
    const { t } = useTranslation();

    return (
        <div className="suppliers-page">
            <section className="suppliers-hero">
                <h1>{t('suppliers_page.title')}</h1>
                <p className="suppliers-hero-subtitle">{t('suppliers_page.subtitle')}</p>
            </section>

            <div className="container">
                <SupplierSection />
            </div>

            <Footer />
        </div>
    );
};

export default Suppliers;
