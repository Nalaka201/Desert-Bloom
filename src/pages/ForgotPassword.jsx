import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Request, 2: Verify, 3: Reset

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/');
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
        <div className="forgot-password-page">
            <LanguageSwitcher className="auth-page-switcher" />
            <div className="forgot-card">
                <button className="back-btn" onClick={handleBack}>
                    ← {step === 1 ? t('forgot_password.back_to_login') : t('forgot_password.back')}
                </button>

                {/* STEP 1: REQUEST CODE */}
                {step === 1 && (
                    <div className="forgot-step">
                        <div className="forgot-header">
                            <h1>{t('forgot_password.title')}</h1>
                            <p>{t('forgot_password.desc')}</p>
                        </div>
                        <form className="forgot-form" onSubmit={nextStep}>
                            <div>
                                <label className="input-label">{t('forgot_password.phone_label')}</label>
                                <div className="phone-input-wrapper">
                                    <div className="country-selected">
                                        <img src="https://flagcdn.com/w20/lk.png" alt="LK" />
                                        <span>+94</span>
                                    </div>
                                    <input type="tel" className="text-input" placeholder="7X XXX XXXX" required />
                                </div>
                            </div>
                            <button type="submit" className="forgot-btn">{t('forgot_password.send_code')}</button>
                        </form>
                    </div>
                )}

                {/* STEP 2: VERIFICATION */}
                {step === 2 && (
                    <div className="forgot-step">
                        <div className="forgot-header">
                            <h1>{t('forgot_password.verify_title')}</h1>
                            <p>{t('forgot_password.verify_desc')}</p>
                        </div>
                        <form className="forgot-form" onSubmit={nextStep}>
                            <div>
                                <label className="input-label">{t('forgot_password.otp_label')}</label>
                                <div className="otp-container">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <input key={i} type="text" maxLength="1" className="otp-box" required />
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '1rem', textAlign: 'center' }}>
                                    {t('forgot_password.sent_to')} <strong>+94 7X XXX XXXX</strong>
                                </p>
                            </div>
                            <button type="submit" className="forgot-btn">{t('forgot_password.verify_btn')}</button>
                            <a href="#" className="resend-link auth-link">{t('forgot_password.resend')}</a>
                        </form>
                    </div>
                )}

                {/* STEP 3: RESET PASSWORD */}
                {step === 3 && (
                    <div className="forgot-step">
                        <div className="forgot-header">
                            <h1>{t('forgot_password.reset_title')}</h1>
                            <p>{t('forgot_password.reset_desc')}</p>
                        </div>
                        <form className="forgot-form" onSubmit={nextStep}>
                            <div>
                                <label className="input-label">{t('forgot_password.new_pass')}</label>
                                <div style={{ position: 'relative' }}>
                                    <input type="password" className="text-input" placeholder={t('forgot_password.new_pass_placeholder')} required />
                                    <span style={{ position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer', color: '#6b7280' }}>👁️</span>
                                </div>
                            </div>
                            <div>
                                <label className="input-label">{t('forgot_password.confirm_pass')}</label>
                                <div style={{ position: 'relative' }}>
                                    <input type="password" className="text-input" placeholder={t('forgot_password.confirm_pass_placeholder')} required />
                                    <span style={{ position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer', color: '#6b7280' }}>👁️</span>
                                </div>
                            </div>
                            <button type="submit" className="forgot-btn">{t('forgot_password.reset_btn')}</button>
                        </form>
                    </div>
                )}

                <div className="forgot-footer">
                    <span>{t('forgot_password.remember')}</span>
                    <Link to="/" className="login-now-btn">{t('forgot_password.login_now')}</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
