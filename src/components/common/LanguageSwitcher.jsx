import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/Navbar.css';

const LanguageSwitcher = ({ className = '' }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={`lang-switcher ${className}`}>
            <button
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                English
            </button>
            <button
                className={`lang-btn ${i18n.language === 'si' ? 'active' : ''}`}
                onClick={() => changeLanguage('si')}
            >
                සිංහල
            </button>
            <button
                className={`lang-btn ${i18n.language === 'ta' ? 'active' : ''}`}
                onClick={() => changeLanguage('ta')}
            >
                தமிழ்
            </button>
        </div>
    );
};

export default LanguageSwitcher;
