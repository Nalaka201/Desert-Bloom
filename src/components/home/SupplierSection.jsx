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
            <div className="filter-bar">
                <div className="search-input-wrapper">
                    <span style={{ position: 'absolute', left: '15px', top: '15px', fontSize: '1.1rem' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-chips">
                    <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Seeds</button>
                    <button className={`chip ${filter === 'veg' ? 'active' : ''}`} onClick={() => setFilter('veg')}>Vegetables</button>
                    <button className={`chip ${filter === 'fruit' ? 'active' : ''}`} onClick={() => setFilter('fruit')}>Fruits</button>
                </div>
            </div>

            <div className="supplier-grid">
                {filteredSuppliers.map(sup => (
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
                            See Details
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SupplierSection;
