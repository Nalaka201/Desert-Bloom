import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/Auth.css'; // Use shared premium styles
import farm from '../assets/farm.png';
import plant from '../assets/plant.png';

const countries = [
    { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: 'https://flagcdn.com/w40/lk.png' },
    { code: 'US', name: 'USA', dial: '+1', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'GB', name: 'UK', dial: '+44', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'IN', name: 'India', dial: '+91', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: 'https://flagcdn.com/w40/au.png' },
    { code: 'CA', name: 'Canada', dial: '+1', flag: 'https://flagcdn.com/w40/ca.png' },
    { code: 'AE', name: 'UAE', dial: '+971', flag: 'https://flagcdn.com/w40/ae.png' },
];

const ForgotPassword = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Request, 2: Verify, 3: Reset
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const [countryCode, setCountryCode] = useState(countries[0].dial);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/');
        }
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setCountryCode(country.dial);
        setShowDropdown(false);
    };

    const handleCodeChange = (e) => {
        const val = e.target.value;
        setCountryCode(val);
        // Try to find matching country
        const match = countries.find(c => c.dial === val);
        if (match) {
            setSelectedCountry(match);
        }
    };

    const nextStep = (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Final step: Reset complete, go to login
            navigate('/');
        }
    };

    return (
        <div className={`auth-container lang-${i18n.language}`}>
            <LanguageSwitcher className="auth-page-switcher" />

            <div className="auth-card auth-card-forgot">


                {/* Right Panel: Form */}
                <div className="auth-panel-form">
                    <div className="auth-form-card-premium">
                        {step === 1 ? (
                            <Link to="/" className="back-btn-simple">
                                ← {t('forgot_password.back_to_login')}
                            </Link>
                        ) : (
                            <button className="back-btn-simple" onClick={handleBack}>
                                ← {t('forgot_password.back')}
                            </button>
                        )}

                        {/* STEP 1: REQUEST CODE */}
                        {step === 1 && (
                            <>
                                <h1 className="auth-title-large">{t('forgot_password.title')}</h1>
                                <p className="auth-subtitle-refined">{t('forgot_password.desc')}</p>
                                <form className="auth-form-refined" onSubmit={nextStep}>
                                    <div>
                                        <label className="auth-input-label-premium">Enter the Phone Number here</label>
                                        <div className="auth-input-group-premium">
                                            <div className="auth-country-selector" ref={dropdownRef}>
                                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)}>
                                                    <img src={selectedCountry.flag} alt={selectedCountry.code} className="auth-flag-img" />
                                                    <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginLeft: '0.5rem', marginRight: '0.5rem' }}>▼</span>
                                                </div>

                                                <input
                                                    type="text"
                                                    className="auth-country-code-input"
                                                    value={countryCode}
                                                    onChange={handleCodeChange}
                                                    placeholder="+94"
                                                />

                                                {showDropdown && (
                                                    <div className="auth-country-dropdown">
                                                        {countries.map((country) => (
                                                            <div
                                                                key={country.code}
                                                                className="auth-country-option"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCountrySelect(country);
                                                                }}
                                                            >
                                                                <img src={country.flag} alt={country.code} className="auth-flag-sm" />
                                                                <span>{country.name} ({country.dial})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <input
                                                type="tel"
                                                className="auth-input-refined"
                                                placeholder="7X XXX XXXX"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="auth-btn-premium">
                                        <span className="btn-icon">📩</span> <span>{t('forgot_password.send_code')}</span>
                                    </button>
                                </form>
                            </>
                        )}

                        {/* STEP 2: VERIFICATION */}
                        {step === 2 && (
                            <>
                                <h1 className="auth-title-large">{t('forgot_password.verify_title')}</h1>
                                <p className="auth-subtitle-refined">{t('forgot_password.verify_desc')}</p>
                                <form className="auth-form-refined" onSubmit={nextStep}>
                                    <label className="auth-input-label-premium">Enter Verification Code</label>
                                    <div className="auth-otp-container">
                                        {[0, 1, 2, 3, 4, 5].map((i) => (
                                            <input
                                                key={i}
                                                id={`otp-${i}`}
                                                type="text"
                                                maxLength="1"
                                                className="auth-otp-input"
                                                required
                                                inputMode="numeric"
                                                autoComplete="one-time-code"
                                                onInput={(e) => {
                                                    const val = e.target.value;
                                                    if (val && i < 5) {
                                                        document.getElementById(`otp-${i + 1}`).focus();
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Backspace' && !e.target.value && i > 0) {
                                                        document.getElementById(`otp-${i - 1}`).focus();
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p className="auth-sent-to-text">
                                        {t('forgot_password.sent_to')} <strong>{selectedCountry.dial} 7X XXX XXXX</strong>
                                    </p>
                                    <button type="submit" className="auth-btn-premium">
                                        <span className="btn-icon">✅</span> <span>{t('forgot_password.verify_btn')}</span>
                                    </button>
                                    <div className="auth-resend-link">
                                        <a href="#" className="auth-link-forgot">{t('forgot_password.resend')}</a>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* STEP 3: RESET PASSWORD */}
                        {step === 3 && (
                            <>
                                <h1 className="auth-title-large">{t('forgot_password.reset_title')}</h1>
                                <p className="auth-subtitle-refined">{t('forgot_password.reset_desc')}</p>
                                <form className="auth-form-refined" onSubmit={nextStep}>
                                    <div>
                                        <label className="auth-input-label-premium">New Password</label>
                                        <div className="auth-input-group-premium">
                                            <span className="auth-input-icon-colored">🔒</span>
                                            <input
                                                type={showNewPass ? 'text' : 'password'}
                                                className="auth-input-refined"
                                                placeholder={t('forgot_password.new_pass_placeholder')}
                                                required
                                            />
                                            <span className="auth-eye-icon-refined" onClick={() => setShowNewPass(!showNewPass)}>
                                                {showNewPass ? '🙈' : '👁️'}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="auth-input-label-premium">Confirm Password</label>
                                        <div className="auth-input-group-premium">
                                            <span className="auth-input-icon-colored">🔐</span>
                                            <input
                                                type={showConfirmPass ? 'text' : 'password'}
                                                className="auth-input-refined"
                                                placeholder={t('forgot_password.confirm_pass_placeholder')}
                                                required
                                            />
                                            <span className="auth-eye-icon-refined" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                                {showConfirmPass ? '🙈' : '👁️'}
                                            </span>
                                        </div>
                                    </div>
                                    <button type="submit" className="auth-btn-premium">
                                        <span className="btn-icon">🔄</span> <span>{t('forgot_password.reset_btn')}</span>
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
