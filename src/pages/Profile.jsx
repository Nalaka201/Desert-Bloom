import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import '../styles/Profile.css';

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
        zip: 'NP / 32 / AA / 02'
    });

    useEffect(() => {
        // Get the logged-in user's NIC
        const userNic = localStorage.getItem('user_nic');

        if (userNic && userNic !== 'guest') {
            const allProfiles = localStorage.getItem('all_farmer_profiles');
            if (allProfiles) {
                try {
                    const profilesMap = JSON.parse(allProfiles);
                    if (profilesMap[userNic]) {
                        setProfile(profilesMap[userNic]);
                        return;
                    }
                } catch (error) {
                    console.error('Error loading profile:', error);
                }
            }

            // Fallback: check for farmer_profile in localStorage
            const savedProfile = localStorage.getItem('farmer_profile');
            if (savedProfile) {
                try {
                    setProfile(JSON.parse(savedProfile));
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

    const handleSave = () => {
        localStorage.setItem('farmer_profile', JSON.stringify(profile));
        alert(t('profile.success_msg'));
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            navigate('/');
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div>
                        <h1 className="profile-title">{t('profile.title')}</h1>
                        <p className="profile-subtitle">{t('profile.subtitle')}</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>

                <div className="profile-content">
                    <div className="profile-card">
                        <h2 className="card-title">{t('profile.personal_info')}</h2>
                        <div className="form-grid">
                            <div className="profile-form-group">
                                <label>{t('profile.name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="profile-input"
                                    value={profile.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.nic')}</label>
                                <input
                                    type="text"
                                    name="nic"
                                    className="profile-input"
                                    value={profile.nic}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.phone')}</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="profile-input"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="profile-input"
                                    value={profile.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Card */}
                    <div className="profile-card">
                        <h2 className="card-title">{t('profile.address_info')}</h2>
                        <div className="form-grid">
                            <div className="profile-form-group">
                                <label>{t('profile.address_line1')}</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    className="profile-input"
                                    value={profile.addressLine1}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>{t('profile.address_line2')}</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    className="profile-input"
                                    value={profile.addressLine2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-form-group" style={{ maxWidth: '200px' }}>
                                <label>{t('profile.zip')}</label>
                                <input
                                    type="text"
                                    name="zip"
                                    className="profile-input"
                                    value={profile.zip}
                                    onChange={handleChange}
                                />
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
