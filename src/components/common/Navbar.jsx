import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import NotificationDropdown from './NotificationDropdown';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [userInitial, setUserInitial] = React.useState('U');

  React.useEffect(() => {
    const savedProfile = localStorage.getItem('farmer_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.name) {
          setUserInitial(profile.name.charAt(0).toUpperCase());
        }
      } catch (e) {
        console.error("Error parsing profile", e);
      }
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/home" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="brand-logo-container">
            <img src="/src/assets/plant.png" alt="Desert Bloom" className="brand-logo-img" />
          </div>
          <span>Desert Bloom</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/home" className="nav-link">{t('nav.home')}</Link></li>
          <li><Link to="/about" className="nav-link">{t('nav.about')}</Link></li>
          <li><Link to="/suppliers" className="nav-link">Suppliers</Link></li>
          <li><Link to="/contact" className="nav-link">{t('nav.contact')}</Link></li>
          <li><Link to="/history" className="nav-link">{t('nav.history')}</Link></li>
        </ul>

        <div className="nav-actions">
          <LanguageSwitcher />
          <NotificationDropdown />
          <button className="icon-btn">
            <svg className="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="notification-badge-number">0</span>
          </button>
          <Link to="/profile" className="profile-avatar">{userInitial}</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
