import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
        if (stored) setSuppliersList(JSON.parse(stored));
    }, []);

    const handleDetailsClick = (id) => {
        navigate(`/supplier/${id}`);
    };

    const filteredSuppliers = suppliersList.filter(s => {
        const matchesFilter = filter === 'all' || s.category === filter;
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              s.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusLabel = (rating) => {
        if (rating >= 4.8) return 'Top Rated';
        if (rating >= 4.6) return 'Gov Certified';
        return 'Verified';
    };

    const getBadgeClass = (rating) => {
        if (rating >= 4.8) return 'badge-top';
        if (rating >= 4.6) return 'badge-popular';
        return 'badge-verified';
    };

    return (
        <section id="suppliers" className="section-padding container supplier-section-wrap">

            {/* Header Block */}
            <div className="supplier-header-block">
                <div className="section-badge">
                    <span className="live-dot"></span> CERTIFIED SEED NETWORK
                </div>
                <h2 className="section-title-center">Top Seed Companies &amp; Partners</h2>
                <p className="section-subtitle">
                    Connect directly with island-wide certified seed producers for high-yielding, premium harvests
                </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="filter-bar">
                <div className="search-input-wrapper">
                    <span className="search-icon-svg">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by company name or district (e.g. Colombo, Anuradhapura)..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="clear-search-btn" onClick={() => setSearchTerm('')} title="Clear search">✕</button>
                    )}
                </div>

                <div className="filter-chips-wrapper">
                    <div className="filter-chips">
                        <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                            <span className="chip-icon">🌱</span> All Categories
                        </button>
                        <button className={`chip ${filter === 'veg' ? 'active' : ''}`} onClick={() => setFilter('veg')}>
                            <span className="chip-icon">🥦</span> Vegetables
                        </button>
                        <button className={`chip ${filter === 'fruit' ? 'active' : ''}`} onClick={() => setFilter('fruit')}>
                            <span className="chip-icon">🍊</span> Fruits
                        </button>
                    </div>
                    <span className="supplier-count-badge">
                        Showing <strong>{filteredSuppliers.length}</strong> Trusted Suppliers
                    </span>
                </div>
            </div>

            {/* Supplier Cards Grid */}
            <div className="supplier-grid">
                {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map(sup => (
                        <div key={sup.id} className="supplier-card-mini">

                            {/* Top Row: Badge + Rating */}
                            <div className="card-top-tag-row">
                                <span className={`status-tag ${getBadgeClass(sup.rating)}`}>
                                    {getStatusLabel(sup.rating)}
                                </span>
                                <span className="rating-badge">
                                    <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                    {sup.rating}
                                </span>
                            </div>

                            {/* Company Logo + Name + Location */}
                            <div className="card-main-content">
                                <div className="card-header">
                                    <div className="logo-box">
                                        <img src={sup.logo} alt={sup.name} className="card-logo" />
                                    </div>
                                    <div className="company-title-area">
                                        <h3 className="card-title">{sup.name}</h3>
                                        <div className="location-pill">
                                            <svg className="loc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            <span>{sup.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="card-desc">{sup.desc}</p>

                                {/* Products & Reviews info with proper SVG icons */}
                                <div className="card-info-grid">
                                    <div className="info-item">
                                        <svg className="info-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2a5 5 0 0 1 5 5c0 2.5-2 5-5 8-3-3-5-5.5-5-8a5 5 0 0 1 5-5z"/>
                                            <circle cx="12" cy="7" r="2"/>
                                        </svg>
                                        <span className="info-label">{sup.products}</span>
                                    </div>
                                    <div className="info-item text-right">
                                        <svg className="info-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                            <circle cx="9" cy="7" r="4"/>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                        <span className="info-label">{sup.reviews} Reviews</span>
                                    </div>
                                </div>
                            </div>

                            {/* Explore Button only */}
                            <button className="detail-btn" onClick={() => handleDetailsClick(sup.id)}>
                                <span>Explore Seeds &amp; Order</span>
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
                        <button className="chip active" onClick={() => { setSearchTerm(''); setFilter('all'); }}>Reset Search Filters</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SupplierSection;
