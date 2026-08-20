import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { t } = useTranslation();

    return (
        <div style={{ minHeight: '100vh', padding: '120px 20px 60px', background: 'var(--bg-primary, #0a0a0a)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--text-primary, #fff)', marginBottom: '1rem' }}>
                    Admin Dashboard
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary, #aaa)' }}>
                    System overview and management tools.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
