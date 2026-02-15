import React from 'react';
import { useTranslation } from 'react-i18next';
import SupplierSection from '../components/home/SupplierSection';
import FeatureSection from '../components/home/FeatureSection';
import TestimonialSection from '../components/home/TestimonialSection';
import Footer from '../components/common/Footer';
import '../styles/Home.css';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Plant with Confidence,<br />
                        Harvest with Pride
                    </h1>
                    <p className="hero-subtitle">
                        Premium seeds and expert suppliers for your farm's success.
                    </p>
                    <a href="#suppliers" className="cta-btn">
                        Explore Suppliers
                    </a>
                </div>

                <div className="stats-container">
                    <div className="stat-box">
                        <div className="stat-icon">🏢</div>
                        <div className="stat-number">6+</div>
                        <div className="stat-text">Seed Companies</div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon">🌾</div>
                        <div className="stat-number">1000+</div>
                        <div className="stat-text">Quality Seeds</div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon">👨‍🌾</div>
                        <div className="stat-number">100+</div>
                        <div className="stat-text">Happy Farmers</div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon">✅</div>
                        <div className="stat-number">90%</div>
                        <div className="stat-text">Success Rate</div>
                    </div>
                </div>
            </section>

            {/* Spacer to push content down below the floating stats */}
            <div style={{ height: '60px' }}></div>

            <SupplierSection />
            <FeatureSection />
            <TestimonialSection />
            <Footer />
        </div>
    );
};

export default Home;
