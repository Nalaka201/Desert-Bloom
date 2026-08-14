import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBullseye, FaSeedling } from 'react-icons/fa';
import HowItWorks from '../components/about/HowItWorks';
import ImpactStats from '../components/about/ImpactStats';
import TestimonialSection from '../components/home/TestimonialSection';
import Footer from '../components/common/Footer';
import '../styles/About.css';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about-page">
            <section className="about-hero">
                <h1>{t('about.hero')}</h1>
                <p className="about-hero-subtitle">{t('about.hero_subtitle')}</p>
            </section>

            <section className="about-content-section container">
                <div className="about-grid">
                    <div className="about-text">
                        <span className="eyebrow">{t('about.story_title')}</span>
                        <h2>{t('about.story_title')}</h2>
                        <p>{t('about.story_p1')}</p>
                        <p>{t('about.story_p2')}</p>
                        <p>{t('about.story_p3')}</p>
                        <p>{t('about.story_p4')}</p>
                    </div>
                    <div className="about-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop"
                            alt="Farming Story"
                            className="about-image"
                        />
                        <div className="image-tag">
                            <span>Since</span>
                            <strong>Day One</strong>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mission-vision">
                <div className="container mv-inner">
                    <div className="mv-card">
                        <div className="mv-icon"><FaBullseye /></div>
                        <h3>{t('about.mission_title')}</h3>
                        <p>{t('about.mission_text')}</p>
                    </div>
                    <div className="mv-card">
                        <div className="mv-icon"><FaSeedling /></div>
                        <h3>{t('about.vision_title')}</h3>
                        <p>{t('about.vision_text')}</p>
                    </div>
                </div>
            </section>

            <HowItWorks />
            <ImpactStats />
            <TestimonialSection />
            <Footer />
        </div>
    );
};

export default About;