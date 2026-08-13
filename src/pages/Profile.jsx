import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import '../styles/Home.css';

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
            // Try to load this specific user's profile from the centralized storage
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
        <div className="profile-page" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 style={{ color: '#166534', marginBottom: '0.5rem' }}>{t('profile.title')}</h1>
                            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>{t('profile.subtitle')}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '8px',
                                border: '1px solid #ef4444',
                                background: 'transparent',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>🚪</span> Logout
                        </button>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* Personal Info Card */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                                {t('profile.personal_info')}
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#374151' }}>{t('profile.name')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        value={profile.name}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#374151' }}>{t('profile.nic')}</label>
                                    <input
                                        type="text"
                                        name="nic"
                                        className="form-input"
                                        value={profile.nic}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#374151' }}>{t('profile.phone')}</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-input"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#374151' }}>{t('profile.email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input"
                                        value={profile.email}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                                {t('profile.address_info')}
                            </h2>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#374151' }}>{t('profile.address_line1')}</label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        className="form-input"
                                        value={profile.addressLine1}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#374151' }}>{t('profile.address_line2')}</label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        className="form-input"
                                        value={profile.addressLine2}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div style={{ maxWidth: '200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#374151' }}>{t('profile.zip')}</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        className="form-input"
                                        value={profile.zip}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '4rem' }}>
                            <button
                                onClick={handleSave}
                                className="cta-btn"
                                style={{ background: '#166534', border: 'none', cursor: 'pointer' }}
                            >
                                {t('profile.save_btn')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
