import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserFriends, FaStore, FaMapMarkedAlt, FaBoxOpen } from 'react-icons/fa';
import api from '../../services/api';
import '../../styles/ImpactStats.css';

const ImpactStats = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({
        farmers: 0,
        suppliers: 0,
        districts: 4,
        orders: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [farmersRes, suppliersRes, ordersRes] = await Promise.all([
                    api.get('/farmers/'),
                    api.get('/suppliers/'),
                    api.get('/orders/'),
                ]);

                setStats((prev) => ({
                    ...prev,
                    farmers: farmersRes.data?.length || 0,
                    suppliers: suppliersRes.data?.length || 0,
                    orders: ordersRes.data?.length || 0,
                }));
            } catch (err) {
                console.error('Failed to fetch impact stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statItems = [
        { icon: <FaUserFriends />, value: stats.farmers, label: t('about.stat_farmers') },
        { icon: <FaStore />, value: stats.suppliers, label: t('about.stat_suppliers') },
        { icon: <FaMapMarkedAlt />, value: stats.districts, label: t('about.stat_districts') },
        { icon: <FaBoxOpen />, value: stats.orders, label: t('about.stat_orders') },
    ];

    return (
        <section className="impact-stats">
            <div className="container">
                <h2 className="section-title">{t('about.impact_title')}</h2>
                <p className="section-subtitle">{t('about.impact_subtitle')}</p>

                <div className="stats-grid">
                    {statItems.map((item, idx) => (
                        <div className="stat-card" key={idx}>
                            <div className="stat-icon">{item.icon}</div>
                            <div className="stat-value">
                                {loading ? '—' : `${item.value}+`}
                            </div>
                            <div className="stat-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;