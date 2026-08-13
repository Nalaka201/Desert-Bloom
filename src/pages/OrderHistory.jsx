import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import api from '../services/api';
import '../styles/Home.css';

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
        <div className="history-page" style={{ paddingTop: '100px', minHeight: '80vh', background: '#f0fdf4' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.75rem' }}>
                        {t('order_history.title')}
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                        Track all your orders — pending and completed
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#166534' }}>{orders.length}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem' }}>Total Orders</div>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#166534' }}>{paidCount}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem' }}>Completed</div>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#b45309' }}>{pendingCount}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem' }}>Pending</div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    background: 'white',
                    padding: '4px',
                    borderRadius: '10px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>
                    {[
                        { key: 'all', label: `All (${orders.length})` },
                        { key: 'paid', label: `✅ Completed (${paidCount})` },
                        { key: 'pending', label: `⏳ Pending (${pendingCount})` }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s',
                                background: filter === tab.key ? '#166534' : 'transparent',
                                color: filter === tab.key ? 'white' : '#6b7280'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                        <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                            {filter === 'all' ? t('order_history.no_orders') : `No ${filter} orders found`}
                        </p>
                        {filter === 'all' && (
                            <Link
                                to="/home"
                                style={{
                                    display: 'inline-block',
                                    marginTop: '1rem',
                                    padding: '10px 24px',
                                    background: '#166534',
                                    color: 'white',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Start Shopping
                            </Link>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                        {filteredOrders.map((order, index) => (
                            <div key={order.orderId || index} style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '14px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                border: '1px solid #f3f4f6',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    {/* Left side */}
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.75rem',
                                            alignItems: 'center',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <span style={{
                                                fontWeight: '700',
                                                fontSize: '1.05rem',
                                                color: '#111827'
                                            }}>
                                                {order.supplier}
                                            </span>
                                            {order.remainingBalance === 0 ? (
                                                <span style={{
                                                    padding: '3px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.75rem',
                                                    background: '#dcfce7',
                                                    color: '#166534',
                                                    fontWeight: '600'
                                                }}>
                                                    ✅ Paid
                                                </span>
                                            ) : (
                                                <span style={{
                                                    padding: '3px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.75rem',
                                                    background: '#fef9c3',
                                                    color: '#854d0e',
                                                    fontWeight: '600'
                                                }}>
                                                    ⏳ Rs. {order.remainingBalance?.toLocaleString()} due
                                                </span>
                                            )}
                                        </div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: '#9ca3af',
                                            display: 'flex',
                                            gap: '0.75rem',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ fontFamily: 'monospace', color: '#6b7280' }}>
                                                {order.orderId}
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(order.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        {/* Items summary */}
                                        {order.items && order.items.length > 0 && (
                                            <div style={{
                                                marginTop: '0.75rem',
                                                fontSize: '0.8rem',
                                                color: '#6b7280'
                                            }}>
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
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{
                                            fontWeight: '800',
                                            fontSize: '1.25rem',
                                            color: '#166534'
                                        }}>
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
