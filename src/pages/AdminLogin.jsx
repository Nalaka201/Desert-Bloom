import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/AdminLogin.css';
import logo from '../assets/logo.png';

const AdminLogin = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 600));

        const registeredAdmins = JSON.parse(localStorage.getItem('registered_admins') || '[]');

        // Primary default admin check for Nalaka and admin
        const isDefaultAdmin =
            (username === 'Nalaka' && password === 'Nalaka201@') ||
            (username === 'admin' && password === 'admin123');

        if (isDefaultAdmin) {
            localStorage.setItem('admin_auth', 'true');
            localStorage.setItem('admin_user', username);
            navigate('/admin');
            return;
        }

        const user = registeredAdmins.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);

        if (user) {
            localStorage.setItem('admin_auth', 'true');
            localStorage.setItem('admin_user', user.username);
            navigate('/admin');
        } else {
            setError(t('admin_login.error_invalid'));
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <LanguageSwitcher className="auth-page-switcher" />
            <div className="admin-login-bg-pattern"></div>

            <div className="admin-login-wrapper">
                {/* Left Panel — Branding */}
                <div className="admin-login-brand-panel">
                    <div className="admin-login-brand-content">
                        <div className="admin-login-logo">
                            <div className="admin-login-logo-icon">
                                <img src={logo} alt="Aswenna.lk" />
                            </div>
                            <span className="admin-login-logo-text">Aswenna.lk</span>
                        </div>

                        <div className="admin-login-brand-hero">
                            <span className="admin-login-eyebrow">{t('admin_login.access_eyebrow')}</span>
                            <h1 className="admin-login-brand-title">{t('admin_login.control_center')}</h1>
                            <p className="admin-login-brand-desc">
                                {t('admin_login.hero_desc')}
                            </p>
                        </div>

                        <div className="admin-login-features">
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18" /><path d="M18.7 8 12 14.7l-3.5-3.5L3 16.7" /></svg>
                                </div>
                                <div>
                                    <strong>{t('admin_login.feature_analytics_title')}</strong>
                                    <span>{t('admin_login.feature_analytics_desc')}</span>
                                </div>
                            </div>
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <div>
                                    <strong>{t('admin_login.feature_access_title')}</strong>
                                    <span>{t('admin_login.feature_access_desc')}</span>
                                </div>
                            </div>
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 8 12 3 3 8l9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
                                </div>
                                <div>
                                    <strong>{t('admin_login.feature_orders_title')}</strong>
                                    <span>{t('admin_login.feature_orders_desc')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel — Login Form */}
                <div className="admin-login-form-panel">
                    <div className="admin-login-form-content">
                        <div className="admin-login-form-header">
                            <span className="admin-login-eyebrow admin-login-eyebrow-dark">{t('admin_login.welcome_back')}</span>
                            <h2>{t('admin_login.sign_in')}</h2>
                            <p>{t('admin_login.sign_in_subtitle')}</p>
                        </div>

                        {error && (
                            <div className="admin-login-error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form className="admin-login-form" onSubmit={handleLogin}>
                            <div className="admin-login-field">
                                <label htmlFor="admin-username">{t('admin_login.username_label')}</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <input
                                        id="admin-username"
                                        type="text"
                                        placeholder={t('admin_login.username_placeholder')}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="admin-login-field">
                                <label htmlFor="admin-password">{t('admin_login.password_label')}</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input
                                        id="admin-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={t('admin_login.password_placeholder')}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="admin-login-toggle-pw"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        aria-label={showPassword ? t('admin_login.hide_password') : t('admin_login.show_password')}
                                    >
                                        {showPassword ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="admin-login-submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="admin-login-spinner"></span>
                                ) : (
                                    <>
                                        {t('admin_login.sign_in')}
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;