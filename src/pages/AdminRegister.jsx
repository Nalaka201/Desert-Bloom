import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminKey: '' // A secret key to prevent random people from registering as admin
    });
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Optional secret key check (e.g., 'FARM-ADMIN-2024')
        if (formData.adminKey !== 'ADMIN123') {
            setError('Invalid Admin Security Key');
            return;
        }

        const existingAdmins = JSON.parse(localStorage.getItem('registered_admins') || '[]');
        if (existingAdmins.find(a => a.username === formData.username)) {
            setError('Username already exists');
            return;
        }

        const newAdmin = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        localStorage.setItem('registered_admins', JSON.stringify([...existingAdmins, newAdmin]));
        alert('Admin account created successfully!');
        navigate('/admin-login');
    };

    return (
        <div className="auth-container" style={{ background: '#f0fdf4' }}>
            <div className="auth-panel-form" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <div className="auth-form-card" style={{ border: '2px solid #166534' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '3rem' }}>🛡️</span>
                        <h1 className="auth-title" style={{ color: '#166534' }}>Admin Registration</h1>
                        <p className="auth-subtitle">Create a new administrator account</p>
                    </div>

                    {error && <div style={{ color: '#ef4444', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form className="auth-form" onSubmit={handleRegister}>
                        <div className="auth-input-group">
                            <span className="auth-input-icon">👤</span>
                            <input
                                type="text"
                                placeholder="Username"
                                className="auth-input"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <span className="auth-input-icon">📧</span>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="auth-input"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <span className="auth-input-icon">🔒</span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="auth-input"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <span className="auth-input-icon">🔑</span>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="auth-input"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <span className="auth-input-icon">⚠️</span>
                            <input
                                type="text"
                                placeholder="Security Key (Try: ADMIN123)"
                                className="auth-input"
                                value={formData.adminKey}
                                onChange={(e) => setFormData({ ...formData, adminKey: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="auth-btn" style={{ background: '#166534' }}>
                            <span>➔</span> Create Admin Account
                        </button>
                    </form>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p className="auth-subtitle">
                            Already have an account? <Link to="/admin-login" className="auth-link">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
