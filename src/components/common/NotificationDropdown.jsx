import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const NotificationDropdown = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'weather',
            title: t('notifications.weather_alert'),
            text: t('notifications.weather_alert_text'),
            time: '2 hours ago',
            isNew: true
        },
        {
            id: 2,
            type: 'product',
            title: t('notifications.new_product'),
            text: t('notifications.new_product_text'),
            time: '5 hours ago',
            isNew: true
        },
        {
            id: 3,
            type: 'order',
            title: t('notifications.order_update'),
            text: t('notifications.order_update_text', { id: 'ORD-7721' }),
            time: 'Yesterday',
            isNew: false
        }
    ]);

    const unreadCount = notifications.filter(n => n.isNew).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isNew: false })));
    };

    return (
        <div className="notification-wrapper" ref={dropdownRef} style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={() => setIsOpen(!isOpen)}>
                <svg className="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>

            {isOpen && (
                <div className="notification-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    width: '320px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    marginTop: '10px',
                    padding: '1rem',
                    border: '1px solid #f3f4f6'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', margin: '0' }}>{t('notifications.title')}</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                style={{ background: 'none', border: 'none', color: '#166534', fontSize: '0.8rem', cursor: 'pointer' }}
                            >
                                {t('notifications.clear_all')}
                            </button>
                        )}
                    </div>

                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', padding: '1rem' }}>
                                {t('notifications.empty')}
                            </p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {notifications.map(notif => (
                                    <div key={notif.id} style={{
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        background: notif.isNew ? '#f0fdf4' : '#fafafa',
                                        border: '1px solid #f3f4f6',
                                        transition: 'all 0.2s'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <strong style={{ fontSize: '0.85rem', color: '#111827' }}>{notif.title}</strong>
                                            <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{notif.time}</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: '#4b5563', margin: '0', lineHeight: '1.4' }}>
                                            {notif.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
