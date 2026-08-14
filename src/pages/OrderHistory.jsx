import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import api from '../services/api';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'paid', 'pending'

    useEffect(() => {
        const fetchAllOrders = async () => {
            let allOrders = [];

            // 1. Try fetching from API
            try {
                const res = await api.get('/orders');
                if (res.data && res.data.length > 0) {
                    allOrders = res.data.map(o => ({
                        orderId: o.order_id ? `#${o.order_id}` : o.orderId,
                        supplier: o.supplier_name || o.supplier || 'Local Store',
                        total: o.total_amount || o.total || 0,
                        remainingBalance: o.remaining_balance ?? o.remainingBalance ?? 0,
                        date: o.order_date || o.date || new Date().toISOString(),
                        items: o.items || [],
                        source: 'api'
                    }));
                }
            } catch (err) {
                console.error('API fetch failed, using localStorage fallback', err);
            }

            // 2. Also read from localStorage
            try {
                const localOrders = JSON.parse(localStorage.getItem('farmer_orders') || '[]');
                const localMapped = localOrders.map(o => ({
                    orderId: o.orderId,
                    supplier: o.supplier || 'Local Store',
                    total: o.total || 0,
                    remainingBalance: o.remainingBalance ?? 0,
                    date: o.date || o.timestamp ? new Date(o.timestamp || o.date).toISOString() : new Date().toISOString(),
                    items: o.items || [],
                    source: 'local'
                }));

                // Merge: avoid duplicates by orderId
                const apiIds = new Set(allOrders.map(o => o.orderId));
                localMapped.forEach(lo => {
                    if (!apiIds.has(lo.orderId)) {
                        allOrders.push(lo);
                    }
                });
            } catch (e) {
                console.error('localStorage parse error', e);
            }

            // Sort by date (newest first)
            allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            setOrders(allOrders);
        };

        fetchAllOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        if (filter === 'paid') return order.remainingBalance === 0;
        if (filter === 'pending') return order.remainingBalance > 0;
        return true;
    });

    const paidCount = orders.filter(o => o.remainingBalance === 0).length;
    const pendingCount = orders.filter(o => o.remainingBalance > 0).length;

    return (
        <div className="history-page">
            <div className="history-container">
                {/* Header */}
                <div className="history-header">
                    <h1 className="history-title">{t('order_history.title')}</h1>
                    <p className="history-subtitle">Track all your orders — pending and completed</p>
                </div>

                {/* Stats Cards */}
                <div className="history-stats-grid">
                    <div className="history-stat-card">
                        <div className="stat-value">{orders.length}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                    <div className="history-stat-card">
                        <div className="stat-value">{paidCount}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                    <div className="history-stat-card">
                        <div className="stat-value pending">{pendingCount}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="history-filters">
                    {[
                        { key: 'all', label: `All (${orders.length})` },
                        { key: 'paid', label: `✅ Completed (${paidCount})` },
                        { key: 'pending', label: `⏳ Pending (${pendingCount})` }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`filter-btn ${filter === tab.key ? 'active' : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="history-empty">
                        <div className="history-empty-icon">📦</div>
                        <p>{filter === 'all' ? t('order_history.no_orders') : `No ${filter} orders found`}</p>
                        {filter === 'all' && (
                            <Link to="/home" className="cta-btn">
                                Start Shopping
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="history-list">
                        {filteredOrders.map((order, index) => (
                            <div key={order.orderId || index} className="history-order-card">
                                <div className="order-card-inner">
                                    {/* Left side */}
                                    <div>
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <span className="order-supplier">{order.supplier}</span>
                                            {order.remainingBalance === 0 ? (
                                                <span className="order-status-badge paid">✅ Paid</span>
                                            ) : (
                                                <span className="order-status-badge pending">⏳ Rs. {order.remainingBalance?.toLocaleString()} due</span>
                                            )}
                                        </div>
                                        <div className="order-meta">
                                            <span className="order-id-mono">{order.orderId}</span>
                                            <span>•</span>
                                            <span>{new Date(order.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        {/* Items summary */}
                                        {order.items && order.items.length > 0 && (
                                            <div className="order-items">
                                                {order.items.map((item, i) => (
                                                    <span key={i}>
                                                        {item.type || item.name} ×{item.quantity}
                                                        {i < order.items.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right side */}
                                    <div className="order-total-col">
                                        <div className="order-total">
                                            Rs. {order.total?.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default OrderHistory;
