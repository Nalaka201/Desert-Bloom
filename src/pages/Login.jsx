import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/Auth.css';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [nic, setNic] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('user_nic', nic || 'guest');
        localStorage.setItem('access_token', 'dummy-token');
        navigate('/home');
    };

    return (
        <div className="auth-container">
            <LanguageSwitcher className="auth-page-switcher" />
            {/* Left Panel: Branding */}
            <div className="auth-panel-branding">
                <div className="auth-branding-content">
                    <div className="auth-logo">
                        <span className="brand-logo">🌱</span>
                        <span>Desert Bloom</span>
                    </div>
                    <img
                        src="https://img.freepik.com/free-vector/farmer-man-standing-holding-shovel_1308-41071.jpg"
                        alt="Farmer Illustration"
                        className="auth-farmer-img"
                    />
                    <p className="auth-tagline">
                        Empowering farmers with premium seeds and trusted suppliers
                    </p>
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="auth-panel-form">
                <div className="auth-form-card">
                    <h1 className="auth-title">{t('auth.login_title')}</h1>
                    <p className="auth-subtitle">
                        {t('auth.no_account')} <Link to="/register" className="auth-link">{t('auth.register_now')}</Link>
                    </p>

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="auth-input-group">
                            <span className="auth-input-icon">📋</span>
                            <input
                                type="text"
                                placeholder={t('auth.nic')}
                                className="auth-input"
                                value={nic}
                                onChange={(e) => setNic(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <span className="auth-input-icon">🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={t('auth.password')}
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="auth-eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                {showPassword ? '🔒' : '👁️'}
                            </span>
                        </div>

                        <div className="auth-extras">
                            <label className="auth-checkbox-group">
                                <input type="checkbox" /> {t('auth.remember')}
                            </label>
                            <Link to="/forgot-password" title="Forget Password?" className="auth-link" style={{ color: '#166534' }}>{t('auth.forgot')}</Link>
                        </div>

                        <button type="submit" className="auth-btn">
                            <span>➔</span> {t('auth.login_btn')}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                        <Link
                            to="/admin-login"
                            className="auth-link"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                color: '#64748b',
                                fontSize: '0.875rem'
                            }}
                        >
                            <span>🔐</span> Admin Portal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
