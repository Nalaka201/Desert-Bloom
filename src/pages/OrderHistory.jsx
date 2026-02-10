import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import api from '../services/api';
import '../styles/Home.css';

const OrderHistory = () => {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders');
                setOrders(res.data);
            } catch (err) { console.error(err); }
        };
        fetchOrders();
    }, []);

    return (
        <div className="history-page" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem', color: '#166534' }}>{t('order_history.title')}</h1>

                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', background: '#f9fafb', borderRadius: '16px' }}>
                        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>{t('order_history.no_orders')}</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto', background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>{t('order_history.table_id')}</th>
                                    <th style={{ padding: '1rem' }}>{t('order_history.table_date')}</th>
                                    <th style={{ padding: '1rem' }}>{t('order_history.table_total')}</th>
                                    <th style={{ padding: '1rem' }}>{t('order_history.table_status')}</th>
                                    <th style={{ padding: '1rem' }}>{t('order_history.table_action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.order_id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>#{order.order_id}</td>
                                        <td style={{ padding: '1rem' }}>{new Date(order.order_date).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>Rs. {order.total_amount.toLocaleString()}</td>
                                        <td style={{ padding: '1rem' }}>
                                            {order.remaining_balance === 0 ? (
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    background: '#dcfce7',
                                                    color: '#166534',
                                                    fontWeight: 'bold'
                                                }}>
                                                    ✅ Full Payment OK
                                                </span>
                                            ) : (
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    background: '#fef9c3',
                                                    color: '#854d0e',
                                                    fontWeight: 'bold'
                                                }}>
                                                    ⏳ Pending: Rs. {order.remaining_balance?.toLocaleString()}
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <button style={{
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e7eb',
                                                background: 'white',
                                                cursor: 'pointer'
                                            }}>
                                                {t('order_history.view_details')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default OrderHistory;
