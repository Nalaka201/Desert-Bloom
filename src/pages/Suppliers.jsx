import React from 'react';
import SupplierSection from '../components/home/SupplierSection';
import Footer from '../components/common/Footer';

const Suppliers = () => {
    return (
        <div className="suppliers-page">
            <div style={{
                background: '#166534',
                color: 'white',
                padding: '4rem 2rem',
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Trusted Suppliers</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', opacity: '0.9' }}>
                    Connect with Sri Lanka's top seed companies and agricultural partners. Quality guaranteed for a better harvest.
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
