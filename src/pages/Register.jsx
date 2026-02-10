import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/Auth.css';

const Register = () => {
    const { t } = useTranslation();
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
        <div className="auth-container">
            <LanguageSwitcher className="auth-page-switcher" />
            {/* Left Panel: Form */}
            <div className="auth-panel-form">
                <div className="auth-form-card">
                    <h1 className="auth-title">{t('auth.register_title')}</h1>
                    <p className="auth-subtitle">
                        {t('auth.have_account')} <Link to="/" className="auth-link">{t('auth.login_now')}</Link>
                    </p>

                    <form className="auth-form" onSubmit={handleRegister}>
                        <div className="auth-input-group">
                            <span className="auth-input-icon">👤</span>
                            <input
                                type="text"
                                placeholder={t('auth.fullname')}
                                className="auth-input"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

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
                            <span className="auth-input-icon">📞</span>
                            <input
                                type="text"
                                placeholder={t('auth.phone')}
                                className="auth-input"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="auth-input-group">
                            <span className="auth-input-icon">✉️</span>
                            <input
                                type="email"
                                placeholder={t('auth.email')}
                                className="auth-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                        <div className="auth-input-group">
                            <span className="auth-input-icon">🔒</span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder={t('auth.confirm_pass')}
                                className="auth-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span
                                className="auth-eye-icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                {showConfirmPassword ? '🔒' : '👁️'}
                            </span>
                        </div>

                        <div className="auth-extras">
                            <label className="auth-checkbox-group">
                                <input type="checkbox" /> {t('auth.terms')}
                            </label>
                        </div>

                        <button type="submit" className="auth-btn">
                            <span>➔</span> {t('auth.create_account')}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Panel: Branding */}
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
                        {t('hero.subtitle')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
