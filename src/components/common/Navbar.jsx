import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import NotificationDropdown from './NotificationDropdown';
import '../../styles/Navbar.css';
import logoImg from '../../assets/Logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [userInitial, setUserInitial] = React.useState('U');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isLoggedIn = !!localStorage.getItem('access_token');
  const location = useLocation();

  // Close drawer on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
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
  }, [isLoggedIn]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          {/* Brand */}
          <Link to="/home" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="brand-logo-container">
              <img src={logoImg} alt="Desert Bloom" className="brand-logo-img" />
            </div>
            <span>Aswenna.lk</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li><Link to="/home" className="nav-link">{t('nav.home')}</Link></li>
            <li><Link to="/about" className="nav-link">{t('nav.about')}</Link></li>
            <li><Link to="/suppliers" className="nav-link">{t('nav.suppliers')}</Link></li>
            <li><Link to="/contact" className="nav-link">{t('nav.contact')}</Link></li>
            {isLoggedIn && (
              <li><Link to="/history" className="nav-link">{t('nav.history')}</Link></li>
            )}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <NotificationDropdown />
                <button className="icon-btn">
                  <svg className="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span className="notification-badge-number">0</span>
                </button>
                <Link to="/profile" className="profile-avatar">{userInitial}</Link>
              </>
            ) : (
              <Link to="/login" className="navbar-login-btn">{t('auth.login_btn')}</Link>
            )}
          </div>

          {/* Hamburger Button (mobile only) */}
          <button
            className={`hamburger-btn${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`mobile-menu-overlay${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside className={`mobile-drawer${menuOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-inner">
          {/* Language switcher in drawer */}
          <div className="mobile-lang-wrap">
            <LanguageSwitcher />
          </div>

          {/* Nav Links */}
          <nav className="mobile-nav-links">
            <Link to="/home" className="mobile-nav-link">{t('nav.home')}</Link>
            <Link to="/about" className="mobile-nav-link">{t('nav.about')}</Link>
            <Link to="/suppliers" className="mobile-nav-link">{t('nav.suppliers')}</Link>
            <Link to="/contact" className="mobile-nav-link">{t('nav.contact')}</Link>
            {isLoggedIn && (
              <Link to="/history" className="mobile-nav-link">{t('nav.history')}</Link>
            )}
          </nav>

          {/* Footer actions */}
          <div className="mobile-nav-footer">
            {isLoggedIn ? (
              <div className="mobile-user-actions">
                <NotificationDropdown />
                <Link to="/profile" className="profile-avatar">{userInitial}</Link>
              </div>
            ) : (
              <Link to="/login" className="navbar-login-btn mobile-login-btn">{t('auth.login_btn')}</Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;