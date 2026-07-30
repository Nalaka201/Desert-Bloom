import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import '../../styles/HomeSections.css';

import { suppliers as staticSuppliers } from '../../data/suppliers';

const SupplierSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [suppliersList, setSuppliersList] = useState(staticSuppliers);

    React.useEffect(() => {
        const stored = localStorage.getItem('farmer_suppliers');
        if (stored) {
            setSuppliersList(JSON.parse(stored));
        }
    }, []);

    const handleDetailsClick = (id) => {
        navigate(`/supplier/${id}`);
    };

    const filteredSuppliers = suppliersList.filter(s => {
        const matchesFilter = filter === 'all' || s.category === filter;
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusLabel = (rating) => {
        if (rating >= 4.8) return 'Top Rated';
        if (rating >= 4.6) return 'Popular';
        return 'Verified';
    };

    const getBadgeClass = (rating) => {
        if (rating >= 4.8) return 'badge-top';
        if (rating >= 4.6) return 'badge-popular';
        return 'badge-verified';
    };

    return (
        <section id="suppliers" className="section-padding container">
            <div className="supplier-header-block">
                <div className="section-badge">VERIFIED PARTNER NETWORK</div>
                <h2 className="section-title-center">Top Seed Suppliers in Sri Lanka</h2>
                <p className="section-subtitle">Connect directly with certified seed producers for optimal crop yield</p>
            </div>

            <div className="filter-bar">
                <div className="search-input-wrapper">
                    <span className="search-icon-svg">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="clear-search-btn" onClick={() => setSearchTerm('')}>✕</button>
                    )}
                </div>

                <div className="filter-chips-wrapper">
                    <div className="filter-chips">
                        <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                            <span className="chip-icon">🌱</span> All Seeds
                        </button>
                        <button className={`chip ${filter === 'veg' ? 'active' : ''}`} onClick={() => setFilter('veg')}>
                            <span className="chip-icon">🥦</span> Vegetables
                        </button>
                        <button className={`chip ${filter === 'fruit' ? 'active' : ''}`} onClick={() => setFilter('fruit')}>
                            <span className="chip-icon">🍊</span> Fruits
                        </button>
                    </div>
                    <span className="supplier-count-badge">
                        Showing <strong>{filteredSuppliers.length}</strong> Companies
                    </span>
                </div>
            </div>

            <div className="supplier-grid">
                {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map(sup => (
                        <div key={sup.id} className="supplier-card-mini">
                            <div className="card-main-content">
                                <div className="card-header">
                                    <div className="logo-box">
                                        <img src={sup.logo} alt="logo" className="card-logo" />
                                    </div>
                                    <span className="rating-badge">⭐ {sup.rating}</span>
                                </div>

                                <h3 className="card-title">{sup.name}</h3>
                                <p className="card-desc">{sup.desc}</p>

                                <div className="card-info-grid">
                                    <div className="info-item">
                                        <span className="info-icon">📍</span>
                                        <span className="info-label">{sup.location.split(',')[0]}</span>
                                    </div>
                                    <div className="info-item text-right">
                                        <span className="info-label">{sup.reviews} Reviews</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-icon">🌾</span>
                                        <span className="info-label">{sup.products}</span>
                                    </div>
                                    <div className="info-item text-right">
                                        <span className={`status-tag ${getBadgeClass(sup.rating)}`}>
                                            {getStatusLabel(sup.rating)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button className="detail-btn" onClick={() => handleDetailsClick(sup.id)}>
                                <span>See Details</span>
                                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-results-box">
                        <div className="no-results-icon">🌾</div>
                        <h3>No seed companies found matching "{searchTerm}"</h3>
                        <p>Try searching for a different keyword or select another category filter.</p>
                        <button className="chip active" onClick={() => { setSearchTerm(''); setFilter('all'); }}>Reset Search</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SupplierSection;

