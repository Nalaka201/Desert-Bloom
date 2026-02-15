import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/Auth.css';
import farm from '../assets/farm.png';
import plant from '../assets/plant.png';

const Register = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [fullName, setFullName] = React.useState('');
    const [nic, setNic] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Simulating registration success
        const profileData = {
            name: fullName,
            nic: nic,
            phone: phone,
            email: email,
            addressLine1: '',
            addressLine2: '',
            zip: ''
        };

        localStorage.setItem('user_nic', nic);
        localStorage.setItem('farmer_profile', JSON.stringify(profileData));

        alert('Registration successful! Please log in to your account.');
        navigate('/');
    };

    return (
        <div className={`auth-container lang-${i18n.language}`}>
            <div className="auth-blob auth-blob-1"></div>
            <div className="auth-blob auth-blob-2"></div>
            <LanguageSwitcher className="auth-page-switcher" />

            <div className="auth-card auth-card-register">
                {/* Left Panel: Form */}
                <div className="auth-panel-form">
                    <div className="auth-form-card-premium">
                        <h1 className="auth-title-large">{t('auth.register_title')}</h1>
                        <p className="auth-subtitle-refined">
                            {t('auth.have_account')} <Link to="/" className="auth-link-register">{t('auth.login_now')}</Link>
                        </p>

                        <form className="auth-form-refined" onSubmit={handleRegister}>
                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">👤</span>
                                <input
                                    type="text"
                                    placeholder={t('auth.fullname')}
                                    className="auth-input-refined"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">🪪</span>
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
                                <span className="auth-input-icon-colored">📞</span>
                                <input
                                    type="text"
                                    placeholder={t('auth.phone')}
                                    className="auth-input-refined"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">📧</span>
                                <input
                                    type="email"
                                    placeholder={t('auth.email')}
                                    className="auth-input-refined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">🔐</span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder={t('auth.confirm_pass')}
                                    className="auth-input-refined"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="auth-eye-icon-refined"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? '👁️' : '🙈'}
                                </span>
                            </div>

                            <div className="auth-extras-refined" style={{ justifyContent: 'flex-start' }}>
                                <label className="auth-checkbox-group-refined">
                                    <input type="checkbox" required /> <span>{t('auth.terms')}</span>
                                </label>
                            </div>

                            <button type="submit" className="auth-btn-premium">
                                <span className="btn-icon">➔</span> <span>{t('auth.create_account')}</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Panel: Branding */}
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
            </div>
        </div>
    );
};

export default Register;
