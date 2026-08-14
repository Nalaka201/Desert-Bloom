import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import '../styles/Profile.css';

const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5" />
        <path d="M21 12H9" />
    </svg>
);

const PROVINCE_DISTRICTS = {
    'Western': ['Colombo', 'Gampaha', 'Kalutara'],
    'Central': ['Kandy', 'Matale', 'Nuwara Eliya'],
    'Southern': ['Galle', 'Matara', 'Hambantota'],
    'Northern': ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
    'Eastern': ['Ampara', 'Batticaloa', 'Trincomalee'],
    'North Western': ['Kurunegala', 'Puttalam'],
    'North Central': ['Anuradhapura', 'Polonnaruwa'],
    'Uva': ['Badulla', 'Monaragala'],
    'Sabaragamuwa': ['Ratnapura', 'Kegalle'],
};

const PROVINCES = Object.keys(PROVINCE_DISTRICTS);

const Profile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: 'K.H. Somathilaka',
        nic: '198512345678',
        phone: '071 3244 232',
        email: 'somathilaka@farmmail.lk',
        addressLine1: '#32 Kanapellawa',
        addressLine2: 'Nr. B.A.P. Handabawatta, Anuradhapura.',
        province: 'North Central',
        district: 'Anuradhapura',
        zip: 'NP / 32 / AA / 02'
    });

    useEffect(() => {
        const userNic = localStorage.getItem('user_nic');

        if (userNic && userNic !== 'guest') {
            const allProfiles = localStorage.getItem('all_farmer_profiles');
            if (allProfiles) {
                try {
                    const profilesMap = JSON.parse(allProfiles);
                    if (profilesMap[userNic]) {
                        // merge with defaults so missing province/district never crash render
                        setProfile(prev => ({ ...prev, ...profilesMap[userNic] }));
                        return;
                    }
                } catch (error) {
                    console.error('Error loading profile:', error);
                }
            }

            const savedProfile = localStorage.getItem('farmer_profile');
            if (savedProfile) {
                try {
                    setProfile(prev => ({ ...prev, ...JSON.parse(savedProfile) }));
                } catch (error) {
                    console.error('Error parsing profile:', error);
                }
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleProvinceChange = (e) => {
        const newProvince = e.target.value;
        setProfile(prev => ({
            ...prev,
            province: newProvince,
            district: PROVINCE_DISTRICTS[newProvince][0]
        }));
    };

    const handleSave = () => {
        localStorage.setItem('farmer_profile', JSON.stringify(profile));
        alert(t('profile.success_msg'));
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            navigate('/');
        }
    };

    const initials = profile.name
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();

    // safety net - if province is missing/unknown, fall back to full province list for the dropdown
    const districtOptions = PROVINCE_DISTRICTS[profile.province] || PROVINCES.flatMap(p => PROVINCE_DISTRICTS[p]);

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-header-left">
                        <div className="avatar-stamp">{initials}</div>
                        <div>
                            <h1 className="profile-title">{t('profile.title')}</h1>
                            <p className="profile-subtitle">{t('profile.subtitle')}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogoutIcon /> Logout
                    </button>
                </div>

                <div className="profile-content">
                    <div className="profile-card">
                        <h2 className="card-title">{t('profile.personal_info')}</h2>
                        <div className="form-grid">
                            <div className="profile-form-group">
                                <label>{t('profile.name')}</label>
                                <input type="text" name="name" className="profile-input" value={profile.name} onChange={handleChange} />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.nic')}</label>
                                <input type="text" name="nic" className="profile-input" value={profile.nic} onChange={handleChange} />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.phone')}</label>
                                <input type="text" name="phone" className="profile-input" value={profile.phone} onChange={handleChange} />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.email')}</label>
                                <input type="email" name="email" className="profile-input" value={profile.email} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="profile-card">
                        <h2 className="card-title">{t('profile.address_info')}</h2>
                        <div className="form-grid">
                            <div className="profile-form-group">
                                <label>{t('profile.address_line1')}</label>
                                <input type="text" name="addressLine1" className="profile-input" value={profile.addressLine1} onChange={handleChange} />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.address_line2')}</label>
                                <input type="text" name="addressLine2" className="profile-input" value={profile.addressLine2} onChange={handleChange} />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.province')}</label>
                                <select
                                    name="province"
                                    className="profile-input profile-select"
                                    value={profile.province}
                                    onChange={handleProvinceChange}
                                >
                                    {PROVINCES.map((prov) => (
                                        <option key={prov} value={prov}>{prov}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.district')}</label>
                                <select
                                    name="district"
                                    className="profile-input profile-select"
                                    value={profile.district}
                                    onChange={handleChange}
                                >
                                    {districtOptions.map((dist) => (
                                        <option key={dist} value={dist}>{dist}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="profile-form-group" style={{ maxWidth: '200px' }}>
                                <label>{t('profile.zip')}</label>
                                <input type="text" name="zip" className="profile-input" value={profile.zip} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button onClick={handleSave} className="save-btn">
                            {t('profile.save_btn')}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;