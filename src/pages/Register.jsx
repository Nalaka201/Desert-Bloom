import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { UserIcon, CardIcon, PhoneIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../components/common/Icons';
import '../styles/Auth.css';
import toast from 'react-hot-toast';
import farmer from '../assets/farmer.png';
import logo from '../assets/logo.png';

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

        // Password Verification 
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const trimmedNic = nic.trim();
        if (!trimmedNic) {
            toast.error("Please enter a valid NIC number");
            return;
        }

        // Store this user's profile in a centralized map indexed by NIC
        let allProfiles = {};
        const existingProfiles = localStorage.getItem('all_farmer_profiles');
        if (existingProfiles) {
            try {
                allProfiles = JSON.parse(existingProfiles);
            } catch (error) {
                console.error('Error parsing profiles:', error);
            }
        }

        // Check for existing NIC registration
        if (allProfiles[trimmedNic]) {
            toast.error("An account with this NIC already exists! Please log in.");
            return;
        }

        const profileData = {
            name: fullName,
            nic: trimmedNic,
            phone: phone,
            email: email,
            password: password,
            addressLine1: '',
            addressLine2: '',
            zip: ''
        };

        // Add this farmer's profile
        allProfiles[trimmedNic] = profileData;
        localStorage.setItem('all_farmer_profiles', JSON.stringify(allProfiles));

        // Sync with farmer_users array for Admin Panel visibility
        let farmerUsers = [];
        const storedUsers = localStorage.getItem('farmer_users');
        if (storedUsers) {
            try { farmerUsers = JSON.parse(storedUsers); } catch (e) {}
        }
        if (!farmerUsers.some(u => u.nic === trimmedNic)) {
            farmerUsers.push({
                id: Date.now(),
                name: fullName,
                nic: trimmedNic,
                phone: phone,
                location: 'Sri Lanka',
                status: 'Active'
            });
            localStorage.setItem('farmer_users', JSON.stringify(farmerUsers));
        }

        // Set current user session
        localStorage.setItem('user_nic', trimmedNic);
        localStorage.setItem('farmer_profile', JSON.stringify(profileData));

        // Success Toast Notification and Redirect
        toast.success('Registration successful! Please log in to your account.');
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
                                <span className="auth-input-icon-colored">
                                    <UserIcon size={20} />
                                </span>
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
                                <span className="auth-input-icon-colored">
                                    <CardIcon size={20} />
                                </span>
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
                                <span className="auth-input-icon-colored">
                                    <PhoneIcon size={20} />
                                </span>
                                <input
                                    type="text"
                                    placeholder={t('auth.phone')}
                                    className="auth-input-refined"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">
                                    <MailIcon size={20} />
                                </span>
                                <input
                                    type="email"
                                    placeholder={t('auth.email')}
                                    className="auth-input-refined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">
                                    <LockIcon size={20} />
                                </span>
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
                                    {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                                </span>
                            </div>

                            <div className="auth-input-group-premium">
                                <span className="auth-input-icon-colored">
                                    <LockIcon size={20} />
                                </span>
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
                                    {showConfirmPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                                </span>
                            </div>

                            <div className="auth-extras-refined" style={{ justifyContent: 'flex-start' }}>
                                <label className="auth-checkbox-group-refined">
                                    <input type="checkbox" required /> <span>{t('auth.terms')}</span>
                                </label>
                            </div>

                            <button type="submit" className="auth-btn-premium">
                                <span>{t('auth.create_account')}</span>
                                <span className="btn-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Panel: Branding */}
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
            </div>
        </div>
    );
};

export default Register;
