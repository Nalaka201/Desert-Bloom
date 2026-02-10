import React from 'react';
import SupplierSection from '../components/home/SupplierSection';
import Footer from '../components/common/Footer';

const Company = () => {
    return (
        <div className="company-page">
            <div className="container" style={{ paddingTop: '4rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-dark)' }}>Our Partner Companies</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-gray)', marginBottom: '3rem' }}>
                    We collaborate with the best seed producers in Sri Lanka to ensure your farming success.
                </p>
                <SupplierSection />
            </div>
            <Footer />
        </div>
    );
};

export default Company;
