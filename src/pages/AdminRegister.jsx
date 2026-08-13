import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/AdminLogin.css';
import plant from '../assets/plant.png';

const AdminRegister = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminKey: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        if (formData.password !== formData.confirmPassword) {
            setError(t('admin_register.pass_mismatch') || 'Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.adminKey !== 'ADMIN123') {
            setError(t('admin_register.invalid_key') || 'Invalid Admin Security Key (Try: ADMIN123)');
            setIsLoading(false);
            return;
        }

        const existingAdmins = JSON.parse(localStorage.getItem('registered_admins') || '[]');
        if (existingAdmins.find(a => a.username === formData.username)) {
            setError(t('admin_register.user_exists') || 'Username already exists');
            setIsLoading(false);
            return;
        }

        const newAdmin = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        localStorage.setItem('registered_admins', JSON.stringify([...existingAdmins, newAdmin]));
        setIsLoading(false);
        alert(t('admin_register.success_msg') || 'Admin account created successfully!');
        navigate('/admin-login');
    };

    return (
        <div className="admin-login-page">
            <LanguageSwitcher className="auth-page-switcher" />
            <div className="admin-login-bg-pattern"></div>

            <div className="admin-login-wrapper" style={{ minHeight: '640px' }}>
                {/* Left Panel — Branding */}
                <div className="admin-login-brand-panel">
                    <div className="admin-login-brand-content">
                        <div className="admin-login-logo">
                            <div className="admin-login-logo-icon">
                                <img src={plant} alt="Desert Bloom" />
                            </div>
                            <span className="admin-login-logo-text">Desert Bloom</span>
                        </div>

                        <div className="admin-login-brand-hero">
                            <div className="admin-login-shield">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="M12 8v4M12 16h.01" />
                                </svg>
                            </div>
                            <h1 className="admin-login-brand-title">Admin Portal</h1>
                            <p className="admin-login-brand-desc">
                                Create an authorized administrator account to oversee products, manage seed suppliers, and control site parameters.
                            </p>
                        </div>

                        <div className="admin-login-features">
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">🔑</div>
                                <div>
                                    <strong>Security Key Access</strong>
                                    <span>Protected registration flow</span>
                                </div>
                            </div>
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">🛡️</div>
                                <div>
                                    <strong>Full Authorization</strong>
                                    <span>Complete control panel permissions</span>
                                </div>
                            </div>
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">🌐</div>
                                <div>
                                    <strong>Tri-lingual System</strong>
                                    <span>English, Sinhala & Tamil management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel — Registration Form */}
                <div className="admin-login-form-panel">
                    <div className="admin-login-form-content">
                        <div className="admin-login-form-header">
                            <h2>{t('admin_register.title') || 'Admin Registration'}</h2>
                            <p>{t('admin_register.subtitle') || 'Create a new administrator account'}</p>
                        </div>

                        {error && (
                            <div className="admin-login-error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form className="admin-login-form" onSubmit={handleRegister}>
                            {/* Username */}
                            <div className="admin-login-field">
                                <label htmlFor="reg-username">{t('admin_register.username') || 'Username'}</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <input
                                        id="reg-username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="admin-login-field">
                                <label htmlFor="reg-email">{t('admin_register.email') || 'Email Address'}</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <input
                                        id="reg-email"
                                        type="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="admin-login-field">
                                <label htmlFor="reg-password">{t('admin_register.password') || 'Password'}</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input
                                        id="reg-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="admin-login-toggle-pw"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="admin-login-field">
                                <label htmlFor="reg-confirm">{t('admin_register.confirm_pass') || 'Confirm Password'}</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                    </svg>
                                    <input
                                        id="reg-confirm"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Re-enter your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="admin-login-toggle-pw"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Security Key */}
                            <div className="admin-login-field">
                                <label htmlFor="reg-key">{t('admin_register.sec_key') || 'Admin Security Key'}</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <polyline points="9 12 11 14 15 10" />
                                    </svg>
                                    <input
                                        id="reg-key"
                                        type="text"
                                        placeholder="Security Key (Try: ADMIN123)"
                                        value={formData.adminKey}
                                        onChange={(e) => setFormData({ ...formData, adminKey: e.target.value })}
                                        required
                                    />
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
                                        {t('admin_register.submit_btn') || 'Create Admin Account'}
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="admin-login-footer">
                            <p>
                                {t('admin_register.have_account') || 'Already have an admin account?'}{' '}
                                <Link to="/admin-login">{t('admin_register.login_link') || 'Sign In'}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
