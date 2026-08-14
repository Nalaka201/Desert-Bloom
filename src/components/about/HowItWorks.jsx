import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserPlus, FaSearch, FaShoppingCart, FaFileInvoice } from 'react-icons/fa';
import '../../styles/HowItWorks.css';

const steps = [
    { icon: <FaUserPlus />, key: 'register' },
    { icon: <FaSearch />, key: 'browse' },
    { icon: <FaShoppingCart />, key: 'order' },
    { icon: <FaFileInvoice />, key: 'invoice' },
];

const HowItWorks = () => {
    const { t } = useTranslation();

    return (
        <section className="how-it-works container">
            <h2 className="section-title">{t('about.how_it_works_title')}</h2>
            <p className="section-subtitle">{t('about.how_it_works_subtitle')}</p>

            <div className="steps-grid">
                {steps.map((step, index) => (
                    <div className="step-card" key={step.key}>
                        <div className="step-number">{index + 1}</div>
                        <div className="step-icon">{step.icon}</div>
                        <h3>{t(`about.step_${step.key}_title`)}</h3>
                        <p>{t(`about.step_${step.key}_desc`)}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;