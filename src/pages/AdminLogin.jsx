import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AdminLogin.css';
import plant from '../assets/plant.png';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate a brief loading state
        await new Promise(resolve => setTimeout(resolve, 600));

        const registeredAdmins = JSON.parse(localStorage.getItem('registered_admins') || '[]');

        // Default admin fallback
        if (registeredAdmins.length === 0 && username === 'admin' && password === 'admin123') {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin');
            return;
        }

        const user = registeredAdmins.find(a => a.username === username && a.password === password);

        if (user) {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin');
        } else {
            setError('Invalid credentials. Please check your username and password.');
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            {/* Decorative background elements */}
            <div className="admin-login-bg-pattern"></div>

            <div className="admin-login-wrapper">
                {/* Left Panel — Branding */}
                <div className="admin-login-brand-panel">
                    <div className="admin-login-brand-content">
                        <div className="admin-login-logo">
                            <div className="admin-login-logo-icon">
                                <img src={plant} alt="Desert Bloom" />
                            </div>
                            <span className="admin-login-logo-text">Desert Bloom</span>
                        </div>

                        <div className="admin-login-brand-hero">
                            <div className="admin-login-shield">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="M9 12l2 2 4-4" />
                                </svg>
                            </div>
                            <h1 className="admin-login-brand-title">Admin Control Center</h1>
                            <p className="admin-login-brand-desc">
                                Manage orders, monitor farmers, and oversee the entire Desert Bloom supply chain from one secure dashboard.
                            </p>
                        </div>

                        <div className="admin-login-features">
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">📊</div>
                                <div>
                                    <strong>Real-time Analytics</strong>
                                    <span>Monitor sales & performance</span>
                                </div>
                            </div>
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">🛡️</div>
                                <div>
                                    <strong>Role-based Access</strong>
                                    <span>Secure admin permissions</span>
                                </div>
                            </div>
                            <div className="admin-login-feature-item">
                                <div className="admin-login-feature-icon">📦</div>
                                <div>
                                    <strong>Order Management</strong>
                                    <span>Track all transactions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel — Login Form */}
                <div className="admin-login-form-panel">
                    <div className="admin-login-form-content">
                        <div className="admin-login-form-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your admin account</p>
                        </div>

                        {error && (
                            <div className="admin-login-error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form className="admin-login-form" onSubmit={handleLogin}>
                            <div className="admin-login-field">
                                <label htmlFor="admin-username">Username</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <input
                                        id="admin-username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="admin-login-field">
                                <label htmlFor="admin-password">Password</label>
                                <div className="admin-login-input-wrap">
                                    <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input
                                        id="admin-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="admin-login-toggle-pw"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="admin-login-submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="admin-login-spinner"></span>
                                ) : (
                                    <>
                                        Sign In
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="admin-login-footer">
                            <p>
                                Don't have an admin account?{' '}
                                <Link to="/admin-register">Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
