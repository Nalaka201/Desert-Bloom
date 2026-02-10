import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { suppliers } from '../data/suppliers';
import Footer from '../components/common/Footer';
import '../styles/CeylonSeeds.css';

const CeylonSeeds = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const supplier = suppliers.find(s => s.id === 'ceylon-seeds');

    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    if (!supplier) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Supplier Not Found</div>;

    const filteredSeeds = supplier.seeds.filter(seed => {
        const matchesFilter = filter === 'All' || seed.category === filter;
        const matchesSearch = seed.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="supplier-details-page">
            <div className="ceylon-container">
                <div className="supplier-profile-card">
                    <div className="profile-header">
                        <div className="profile-logo-wrapper">
                            <img src={supplier.logo} alt="Ceylon Seeds Logo" className="profile-logo" />
                        </div>
                        <div className="profile-main-info">
                            <h1 className="supplier-name-title">{supplier.name}</h1>
                            <div className="rating-location">
                                <span className="p-rating">⭐ {supplier.rating} ({supplier.reviews} reviews)</span>
                                <span className="p-location">📍 {supplier.location}</span>
                            </div>
                            <p className="p-description">{supplier.desc}</p>
                        </div>
                        <div className="profile-actions">
                            <button className="btn-contact-primary">Contact Now</button>
                            <button className="btn-call-secondary">
                                <span className="icon">📞</span> Call Us
                            </button>
                        </div>
                    </div>

                    <div className="about-section">
                        <h3 className="section-subtitle">About Company</h3>
                        <p className="about-text">{supplier.about}</p>
                    </div>

                    <div className="stats-badges">
                        {supplier.stats.map((stat, index) => (
                            <div key={index} className="badge-item">
                                <div className="badge-value">{stat.value}</div>
                                <div className="badge-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="certifications-row">
                        <span className="cert-title">Certifications & Trust</span>
                        <div className="cert-pills">
                            <span className="p-pill">ISO 9001:2015</span>
                            <span className="p-pill">Goverment Certified</span>
                        </div>
                    </div>
                </div>

                <div className="seeds-section">
                    <h2 className="seeds-title">Available Premium Seeds</h2>
                    <div className="seeds-toolbar">
                        <div className="filter-chips-row">
                            {['All', 'Grains', 'Vegetables'].map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-chip ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="search-bar-rounded">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search seeds..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="seeds-grid">
                        {filteredSeeds.map(seed => (
                            <div key={seed.id} className="seed-product-card">
                                <div className="product-image-wrapper">
                                    <img src={seed.image} alt={seed.name} className="product-img" />
                                    <div className="category-icon-overlay">
                                        {seed.category === 'Grains' ? '🌾' : '🍅'}
                                    </div>
                                </div>
                                <div className="product-details">
                                    <h3 className="product-title">{seed.name}</h3>
                                    <div className="detail-row">
                                        <span>📅 {seed.season}</span>
                                        <span className="reviews-text">{seed.reviews} reviews</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>⌛ {seed.days} days</span>
                                        <span className="rating-small">⭐ {seed.rating}</span>
                                    </div>
                                    <div className="price-stock-row">
                                        <div className="price-tag">
                                            <span className="rs">Rs. {seed.price}</span>
                                            <span className="per">per kg</span>
                                        </div>
                                        <span className="stock-status">In Stock</span>
                                    </div>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => navigate(`/order/${seed.id}`)}
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CeylonSeeds;
