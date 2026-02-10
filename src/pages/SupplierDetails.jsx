import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { suppliers } from '../data/suppliers';
import Footer from '../components/common/Footer';
import api from '../services/api';
import '../styles/CeylonSeeds.css';

const SupplierDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [supplier, setSupplier] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const res = await api.get('/suppliers');
                const found = res.data.find(s => s.id === id);
                setSupplier(found);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        fetchSupplier();
    }, [id]);

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

    if (!supplier) {
        return (
            <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
                <h2>{t('supplier_details.not_found')}</h2>
                <button onClick={() => navigate('/home')} className="contact-btn" style={{ marginTop: '1rem' }}>
                    {t('supplier_details.back_home')}
                </button>
            </div>
        );
    }

    // Default missing stats/about if not in DB
    const displayStats = supplier.stats || [
        { label: 'Years Experience', value: '15+' },
        { label: 'Happy Farmers', value: '2000+' },
        { label: 'Seeds Varieties', value: '50+' },
        { label: 'Satisfaction', value: '95%' }
    ];
    const displayAbout = supplier.about || supplier.description || "Leading agricultural provider.";
    const displaySeeds = supplier.seeds || [];

    const filteredSeeds = displaySeeds.filter(seed => {
        const matchesFilter = filter === 'All' || seed.category === filter;
        const matchesSearch = (seed.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="supplier-details-page">
            <div className="ceylon-container">
                {/* Top Section: Company Info matching the image */}
                <div className="supplier-profile-card">
                    <div className="profile-header">
                        <div className="profile-logo-wrapper">
                            <img
                                src={supplier.logo}
                                alt={`${supplier.name} Logo`}
                                className="profile-logo"
                            />
                        </div>
                        <div className="profile-main-info">
                            <h1 className="supplier-name-title">{supplier.name}</h1>
                            <div className="rating-location">
                                <span className="p-rating">★ {supplier.rating} ({supplier.reviews} {t('supplier_details.reviews')})</span>
                                <span className="p-location">📍 {supplier.location}</span>
                            </div>
                            <p className="p-description">
                                {supplier.desc}
                            </p>
                        </div>
                        <div className="profile-actions">
                            <button className="btn-contact-primary">{t('supplier_details.contact_btn')}</button>
                            <button className="btn-call-secondary">
                                <span className="icon">📞</span> {t('supplier_details.call_btn')}
                            </button>
                        </div>
                    </div>

                    <div className="about-section">
                        <h3 className="section-subtitle">{t('supplier_details.about_title')}</h3>
                        <p className="about-text">{displayAbout}</p>
                    </div>

                    <div className="stats-badges">
                        {displayStats.map((stat, index) => (
                            <div key={index} className="badge-item">
                                <div className="badge-value">{stat.value}</div>
                                <div className="badge-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="certifications-row">
                        <span className="cert-title">{t('supplier_details.certs_title')}</span>
                        <div className="cert-pills">
                            <span className="p-pill">{t('supplier_details.iso')}</span>
                            <span className="p-pill">{t('supplier_details.gov')}</span>
                        </div>
                    </div>
                </div>

                {/* Available Seeds Section */}
                <div className="seeds-section">
                    <h2 className="seeds-title">{t('supplier_details.available_seeds')}</h2>

                    <div className="seeds-toolbar">
                        <div className="filter-chips-row">
                            {['All', 'Fruits', 'Vegetables', 'Grains'].map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-chip ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {t(`suppliers.${cat.toLowerCase()}`)}
                                </button>
                            ))}
                        </div>
                        <div className="search-bar-rounded">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder={t('supplier_details.search_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="search-btn-inner">{t('supplier_details.search_btn')}</button>
                        </div>
                    </div>

                    <div className="seeds-grid">
                        {filteredSeeds.map(seed => (
                            <div key={seed.id} className="seed-product-card">
                                <div className="product-image-wrapper">
                                    <img src={seed.image} alt={seed.name} className="product-img" />
                                    <button className="wishlist-btn">❤️</button>
                                    <div className="category-icon-overlay">
                                        {seed.category === 'Grains' ? '🌾' : seed.name === 'Tomato' ? '🍅' : '🎃'}
                                    </div>
                                </div>
                                <div className="product-details">
                                    <h3 className="product-title">{seed.name}</h3>
                                    <div className="detail-row">
                                        <span>📅 {seed.season}</span>
                                        <span className="reviews-text">{seed.reviews} {t('supplier_details.reviews')}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>⌛ {seed.days} {t('supplier_details.days')}</span>
                                        <span className="rating-small">★ {seed.rating}</span>
                                    </div>
                                    <div className="price-stock-row">
                                        <div className="price-tag">
                                            <span className="rs">Rs. {seed.price}</span>
                                            <span className="per">{t('supplier_details.per_kg')}</span>
                                        </div>
                                        <span className="stock-status">{t('supplier_details.in_stock')}</span>
                                    </div>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => {
                                            if (seed.name === 'Sweet Corn') {
                                                navigate(`/order/${seed.id}`);
                                            } else {
                                                alert(`${seed.name} ${t('supplier_details.added_to_cart') || 'added to cart!'}`);
                                            }
                                        }}
                                    >
                                        {t('supplier_details.add_to_cart')}
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

export default SupplierDetails;
