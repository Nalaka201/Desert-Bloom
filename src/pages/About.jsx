import React from 'react';
import { useTranslation } from 'react-i18next';
import FeatureSection from '../components/home/FeatureSection';
import TestimonialSection from '../components/home/TestimonialSection';
import Footer from '../components/common/Footer';
import '../styles/About.css';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about-page">
            <section className="about-hero">
                <h1>{t('about.hero')}</h1>
            </section>

            <section className="about-content-section container">
                <div className="about-grid">
                    <div className="about-text">
                        <h2>{t('about.story_title')}</h2>
                        <p>{t('about.story_p1')}</p>
                        <p>{t('about.story_p2')}</p>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop"
                        alt="Farming Story"
                        className="about-image"
                    />
                </div>
            </section>

            <section className="mission-vision">
                <div className="container">
                    <div className="mv-grid">
                        <div className="mv-card">
                            <h3>{t('about.mission_title')}</h3>
                            <p>{t('about.mission_text')}</p>
                        </div>
                        <div className="mv-card">
                            <h3>{t('about.vision_title')}</h3>
                            <p>{t('about.vision_text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeatureSection />
            <TestimonialSection />
            <Footer />
        </div>
    );
};

export default About;
