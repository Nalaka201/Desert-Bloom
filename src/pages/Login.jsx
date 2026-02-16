import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/Auth.css';
import farm from '../assets/farm.png';
import homeimg from '../assets/homeimg.jpg';
import plant from '../assets/plant.png';

const Login = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [nic, setNic] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Store the logged-in user's NIC
        localStorage.setItem('user_nic', nic || 'guest');
        localStorage.setItem('access_token', 'dummy-token');
        
        // Try to load existing farmer profile data based on NIC
        // Check if this user has registered before
        const allProfiles = localStorage.getItem('all_farmer_profiles');
        if (allProfiles) {
            try {
                const profilesMap = JSON.parse(allProfiles);
                if (profilesMap[nic]) {
                    // User has a registered profile, load it
                    localStorage.setItem('farmer_profile', JSON.stringify(profilesMap[nic]));
                }
            } catch (error) {
                console.error('Error loading farmer profile:', error);
            }
        }
        
        navigate('/home');
    };

    return (
        <div className={`auth-container lang-${i18n.language}`}>
            <div className="auth-blob auth-blob-1"></div>
            <div className="auth-blob auth-blob-2"></div>
            <LanguageSwitcher className="auth-page-switcher" />

            <div className="auth-card auth-card-login">
                {/* Left Panel: Branding */}
                <div className="auth-panel-branding">
                    <div className="auth-logo-top">
                        <div className="auth-logo-icon">
                            <img src={plant} alt="Desert Bloom Logo" className="logo-img" />
                        </div>
                        <span className="auth-brand-name">Desert Bloom</span>
                    </div>

                    <div className="auth-branding-main">
                        <img
                            src={farm}
                            alt="Farmer Illustration"
                            className="auth-farmer-img-premium"
                        />
                    </div>

                    <p className="auth-tagline-bottom">
                        {t('auth.tagline')}
                    </p>
                </div>

                {/* Right Panel: Form */}
                <div className="auth-panel-form">
                    <div className="auth-form-card-premium">
                        <h1 className="auth-title-large">{t('auth.login_title')}</h1>
                        <p className="auth-subtitle-refined">
                            {t('auth.no_account')} <Link to="/register" className="auth-link-register">{t('auth.register_now')}</Link>
                        </p>

                        <form className="auth-form-refined" onSubmit={handleLogin}>
                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">👤</span>
                                <input
                                    type="text"
                                    placeholder={t('auth.nic')}
                                    className="auth-input-refined"
                                    value={nic}
                                    onChange={(e) => setNic(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">🔐</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t('auth.password')}
                                    className="auth-input-refined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="auth-eye-icon-refined"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '🙈'}
                                </span>
                            </div>

                            <div className="auth-extras-refined">
                                <label className="auth-checkbox-group-refined">
                                    <input type="checkbox" /> <span>{t('auth.remember')}</span>
                                </label>
                                <Link to="/forgot-password" title={t('auth.forgot')} className="auth-link-forgot">{t('auth.forgot')}</Link>
                            </div>

                            <button type="submit" className="auth-btn-premium">
                                <span className="btn-icon">➔</span> <span>{t('auth.login_btn')}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
