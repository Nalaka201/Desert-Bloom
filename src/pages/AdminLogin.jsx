import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Check in registered admins
        const registeredAdmins = JSON.parse(localStorage.getItem('registered_admins') || '[]');

        // Add a default admin if none exist
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
            setError('Invalid Admin Credentials');
        }
    };

    return (
        <div className="auth-container" style={{ background: '#f0fdf4' }}>
            <div className="auth-panel-form" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <div className="auth-form-card" style={{ border: '2px solid #166534' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '3rem' }}>🔐</span>
                        <h1 className="auth-title" style={{ color: '#166534' }}>Admin Portal</h1>
                        <p className="auth-subtitle">Authorized personnel only</p>
                    </div>

                    {error && <div style={{ color: '#ef4444', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="auth-input-group">
                            <span className="auth-input-icon">👤</span>
                            <input
                                type="text"
                                placeholder="Admin Username"
                                className="auth-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <span className="auth-input-icon">🔒</span>
                            <input
                                type="password"
                                placeholder="Admin Password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="auth-btn" style={{ background: '#166534' }}>
                            <span>➔</span> Login to Console
                        </button>
                    </form>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p className="auth-subtitle">
                            Don't have an admin account? <Link to="/admin-register" className="auth-link">Register New Admin</Link>
                        </p>
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                onClick={() => navigate('/')}
                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Back to Farmer Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
