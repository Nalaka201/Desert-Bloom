import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { CardIcon, LockIcon, EyeIcon, EyeOffIcon } from '../components/common/Icons';
import toast from 'react-hot-toast';
import '../styles/Auth.css';
import farmer from '../assets/farmer.png';
import logo from '../assets/Logo.png';

const Login = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Load remembered NIC on component mount
    useEffect(() => {
        const rememberedNic = localStorage.getItem('remembered_nic');
        if (rememberedNic) {
            setNic(rememberedNic);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const trimmedNic = nic.trim();

        if (!trimmedNic) {
            toast.error('Please enter your NIC number.');
            setIsLoading(false);
            return;
        }

        // 1. Fetch registered farmer profiles
        let profilesMap = {};
        const allProfiles = localStorage.getItem('all_farmer_profiles');
        if (allProfiles) {
            try {
                profilesMap = JSON.parse(allProfiles);
            } catch (err) {
                console.error('Error loading farmer profiles:', err);
            }
        }

        // 2. Demo Farmer Accounts
        const demoAccounts = {
            '198512345678': {
                name: 'K.H. Somathilaka',
                nic: '198512345678',
                phone: '071 3244 232',
                email: 'somathilaka@gmail.com',
                password: 'farmer123',
                addressLine1: 'No. 45, Main Street',
                addressLine2: 'Anuradhapura',
                zip: '50000'
            },
            '200012345678': {
                name: 'Sunil Perera',
                nic: '200012345678',
                phone: '077 1234 567',
                email: 'sunil@gmail.com',
                password: 'farmer123',
                addressLine1: 'Paddy Farm Rd',
                addressLine2: 'Polonnaruwa',
                zip: '51000'
            }
        };

        const user = profilesMap[trimmedNic] || demoAccounts[trimmedNic];

        if (!user) {
            toast.error('NIC not registered. Please register first.');
            setIsLoading(false);
            return;
        }

        // 3. Password Verification
        if (user.password && user.password !== password) {
            toast.error('Incorrect password!');
            setIsLoading(false);
            return;
        }

        // Handle profile if created without stored password
        if (!user.password) {
            user.password = password;
            profilesMap[trimmedNic] = user;
            localStorage.setItem('all_farmer_profiles', JSON.stringify(profilesMap));
        }

        // 4. Save Auth Session
        localStorage.setItem('user_nic', trimmedNic);
        localStorage.setItem('access_token', 'farmer-token-' + Date.now());
        localStorage.setItem('farmer_profile', JSON.stringify(user));

        if (rememberMe) {
            localStorage.setItem('remembered_nic', trimmedNic);
        } else {
            localStorage.removeItem('remembered_nic');
        }

        toast.success(`Welcome back, ${user.name || 'Farmer'}!`);
        setIsLoading(false);

        setTimeout(() => {
            navigate('/home');
        }, 200);
    };

    return (
        <div className={`auth-container lang-${i18n.language}`}>
            <div className="auth-blob auth-blob-1"></div>
            <div className="auth-blob auth-blob-2"></div>
            <LanguageSwitcher className="auth-page-switcher" />

            <div className="auth-card auth-card-login">
                <div className="auth-panel-branding">
                    <div className="auth-logo-top">
                        <div className="auth-logo-icon">
                            <img src={logo} alt="Aswenna.lk Logo" className="logo-img" />
                        </div>
                        <span className="auth-brand-name">Aswenna.lk</span>
                    </div>

                    <div className="auth-branding-main">
                        <img src={farmer} alt="Farmer Illustration" className="auth-farmer-img-premium" />
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
                                <span className="auth-input-icon-colored">
                                    <CardIcon size={20} />
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    placeholder={t('auth.nic')}
                                    className="auth-input-refined"
                                    value={nic}
                                    onChange={(e) => setNic(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">
                                    <LockIcon size={20} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
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
                                    {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                                </span>
                            </div>

                            <div className="auth-extras-refined">
                                <label className="auth-checkbox-group-refined">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span>{t('auth.remember')}</span>
                                </label>
                                <Link to="/forgot-password" title={t('auth.forgot')} className="auth-link-forgot">{t('auth.forgot')}</Link>
                            </div>

                            <button type="submit" className="auth-btn-premium" id="login-submit-btn" disabled={isLoading}>
                                <span>{isLoading ? 'Signing in...' : t('auth.login_btn')}</span>
                                <span className="btn-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;