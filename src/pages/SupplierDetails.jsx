import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaSearch,
    FaCalendarAlt,
    FaCommentAlt,
    FaHourglassHalf,
    FaHeart,
    FaRegHeart,
    FaSeedling,
    FaLeaf,
    FaAppleAlt,
    FaCheckCircle,
    FaUsers,
    FaChartLine,
    FaStar
} from 'react-icons/fa';
import Footer from '../components/common/Footer';
import toast from 'react-hot-toast';
import api from '../services/api';
import '../styles/CeylonSeeds.css';

const useRevealOnScroll = (deps = []) => {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, deps);
};

const formatNum = (val) => {
    const n = Number(val);
    return Number.isFinite(n) ? n.toLocaleString() : val;
};

const defaultStatIcons = [FaCalendarAlt, FaUsers, FaSeedling, FaChartLine];

const getCategoryIcon = (seed) => {
    if (seed.category === 'Grains') return <FaSeedling />;
    if (seed.category === 'Fruits' || seed.name === 'Tomato') return <FaAppleAlt />;
    return <FaLeaf />;
};

const SupplierDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState(new Set());
    const [expandedCert, setExpandedCert] = useState(null);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const res = await api.get('/suppliers');
                const found = res.data.find(s => s.id === id);
                setSupplier(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSupplier();
    }, [id]);

    const displayStats = supplier?.stats || [
        { label: 'Years Experience', value: '15+' },
        { label: 'Happy Farmers', value: '2000+' },
        { label: 'Seeds Varieties', value: '50+' },
        { label: 'Satisfaction', value: '95%' }
    ];
    const displayAbout = supplier?.about || supplier?.description || "Leading agricultural provider.";
    const displaySeeds = useMemo(() => supplier?.seeds || [], [supplier]);
    const isVerified = supplier?.verified !== false;

    const certDetails = {
        iso: { title: t('supplier_details.iso'), detail: 'ISO 22000:2018 — Food Safety Management. Cert. No. LK-FS-4471. Valid till Dec 2027.' },
        gov: { title: t('supplier_details.gov'), detail: 'Dept. of Agriculture Approved Supplier. Reg. No. DOA/2019/0342.' }
    };

    const categories = ['All', 'Fruits', 'Vegetables', 'Grains'];

    const categoryCounts = useMemo(() => {
        const counts = { All: displaySeeds.length };
        categories.slice(1).forEach(cat => {
            counts[cat] = displaySeeds.filter(s => s.category === cat).length;
        });
        return counts;
    }, [displaySeeds]);

    const filteredSeeds = useMemo(() => {
        return displaySeeds.filter(seed => {
            const matchesFilter = filter === 'All' || seed.category === filter;
            const matchesSearch = (seed.name || '').toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [displaySeeds, filter, searchQuery]);

    const getStockStatus = (seed) => {
        const qty = typeof seed.stockCount === 'number' ? seed.stockCount : null;
        if (qty === null) return { label: t('supplier_details.in_stock'), cls: 'stock-in' };
        if (qty === 0) return { label: 'Out of Stock', cls: 'stock-out' };
        if (qty <= 10) return { label: 'Low Stock', cls: 'stock-low' };
        return { label: t('supplier_details.in_stock'), cls: 'stock-in' };
    };

    const toggleWishlist = (seedId) => {
        setWishlist(prev => {
            const next = new Set(prev);
            if (next.has(seedId)) next.delete(seedId);
            else next.add(seedId);
            return next;
        });
    };

    useRevealOnScroll([filteredSeeds.length, loading]);

    if (loading) {
        return (
            <div className="supplier-details-page">
                <div className="ceylon-container">
                    <div className="supplier-profile-card skeleton-card">
                        <div className="profile-header">
                            <div className="skeleton-box skeleton-logo"></div>
                            <div className="profile-main-info">
                                <div className="skeleton-box skeleton-line" style={{ width: '40%', height: '1.8rem' }}></div>
                                <div className="skeleton-box skeleton-line" style={{ width: '30%' }}></div>
                                <div className="skeleton-box skeleton-line" style={{ width: '80%' }}></div>
                                <div className="skeleton-box skeleton-line" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="seeds-grid">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="seed-product-card skeleton-card">
                                <div className="skeleton-box" style={{ height: '180px', borderRadius: 0 }}></div>
                                <div className="product-details">
                                    <div className="skeleton-box skeleton-line" style={{ width: '70%' }}></div>
                                    <div className="skeleton-box skeleton-line" style={{ width: '50%' }}></div>
                                    <div className="skeleton-box skeleton-line" style={{ width: '90%', height: '2.5rem' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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

    return (
        <div className="supplier-details-page">
            <div className="ceylon-container">
                <div className="supplier-profile-card reveal-on-scroll">
                    <div className="profile-header">
                        <div className="profile-logo-wrapper">
                            <img
                                src={supplier.logo}
                                alt={`${supplier.name} Logo`}
                                className="profile-logo"
                            />
                            {isVerified && (
                                <span className="verified-badge" title="Verified Supplier">
                                    <FaCheckCircle />
                                </span>
                            )}
                        </div>
                        <div className="profile-main-info">
                            <h1 className="supplier-name-title">
                                {supplier.name}
                                {isVerified && (
                                    <span className="verified-pill">
                                        <FaCheckCircle /> Verified
                                    </span>
                                )}
                            </h1>
                            <div className="rating-location">
                                <span className="p-rating">
                                    <FaStar className="star-icon" />
                                    <span className="rating-num">{supplier.rating}</span>
                                    <span className="reviews-muted">({formatNum(supplier.reviews)} {t('supplier_details.reviews')})</span>
                                </span>
                                <span className="p-location"><FaMapMarkerAlt /> {supplier.location}</span>
                            </div>
                            <p className="p-description">
                                {supplier.desc}
                            </p>
                        </div>
                        <div className="profile-actions">
                            <button className="btn-contact-primary">
                                <FaCommentAlt /> {t('supplier_details.contact_btn')}
                            </button>
                            <button className="btn-call-secondary">
                                <FaPhoneAlt /> {t('supplier_details.call_btn')}
                            </button>
                        </div>
                    </div>

                    <div className="about-section">
                        <h3 className="section-subtitle">{t('supplier_details.about_title')}</h3>
                        <p className="about-text">{displayAbout}</p>
                    </div>

                    <div className="section-divider"></div>

                    <div className="stats-badges">
                        {displayStats.map((stat, index) => {
                            const Icon = defaultStatIcons[index] || FaSeedling;
                            return (
                                <div key={index} className="badge-item">
                                    <div className="badge-icon"><Icon /></div>
                                    <div className="badge-value">{stat.value}</div>
                                    <div className="badge-label">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="section-divider"></div>

                    <div className="certifications-row">
                        <span className="cert-title">{t('supplier_details.certs_title')}</span>
                        <div className="cert-pills">
                            {Object.entries(certDetails).map(([key, cert]) => (
                                <div key={key} className="cert-pill-wrapper">
                                    <button
                                        type="button"
                                        className="p-pill"
                                        onClick={() => setExpandedCert(expandedCert === key ? null : key)}
                                    >
                                        {cert.title}
                                    </button>
                                    {expandedCert === key && (
                                        <div className="cert-tooltip">{cert.detail}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="seeds-section reveal-on-scroll">
                    <h2 className="seeds-title">{t('supplier_details.available_seeds')}</h2>

                    <div className="seeds-toolbar">
                        <div className="filter-chips-row">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-chip ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {t(`suppliers.${cat.toLowerCase()}`)}
                                    <span className="chip-count">({categoryCounts[cat] || 0})</span>
                                </button>
                            ))}
                        </div>
                        <div className="search-bar-rounded">
                            <span className="search-icon"><FaSearch /></span>
                            <input
                                type="text"
                                placeholder={t('supplier_details.search_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="search-btn-inner">{t('supplier_details.search_btn')}</button>
                        </div>
                    </div>

                    {filteredSeeds.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon"><FaSeedling /></div>
                            <h3>No seeds found</h3>
                            <p>Try a different filter or search term.</p>
                            <button
                                className="clear-filters-btn"
                                onClick={() => { setFilter('All'); setSearchQuery(''); }}
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="seeds-grid">
                            {filteredSeeds.map(seed => {
                                const stock = getStockStatus(seed);
                                const isWishlisted = wishlist.has(seed.id);
                                return (
                                    <div key={seed.id} className="seed-product-card reveal-on-scroll">
                                        <div className="product-image-wrapper">
                                            <img src={seed.image} alt={seed.name} className="product-img" />
                                            <button
                                                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                                onClick={() => toggleWishlist(seed.id)}
                                                aria-label="Toggle wishlist"
                                            >
                                                {isWishlisted ? <FaHeart className="heart-filled" /> : <FaRegHeart />}
                                            </button>
                                            <div className="category-icon-overlay">
                                                {getCategoryIcon(seed)}
                                            </div>
                                        </div>
                                        <div className="product-details">
                                            <h3 className="product-title">{seed.name}</h3>
                                            <div className="detail-row">
                                                <span><FaCalendarAlt /> {seed.season}</span>
                                                <span className="reviews-text">{formatNum(seed.reviews)} {t('supplier_details.reviews')}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span><FaHourglassHalf /> {seed.days} {t('supplier_details.days')}</span>
                                                <span className="rating-small"><FaStar size={10} /> {seed.rating}</span>
                                            </div>
                                            <div className="price-stock-row">
                                                <div className="price-tag">
                                                    <span className="rs">
                                                        <span className="currency">Rs.</span> {formatNum(seed.price)}
                                                    </span>
                                                    <span className="per">{t('supplier_details.per_kg')}</span>
                                                </div>
                                                <span className={`stock-status ${stock.cls}`}>{stock.label}</span>
                                            </div>
                                            <button
                                                className="add-to-cart-btn"
                                                disabled={stock.cls === 'stock-out'}
                                                onClick={() => {
                                                    if (seed.isDirectOrder || seed.name === 'Sweet Corn') {
                                                        navigate(`/order/${seed.id}`);
                                                    } else {
                                                        toast.success(`${seed.name} ${t('supplier_details.added_to_cart') || 'added to cart!'}`);
                                                    }
                                                }}
                                            >
                                                {stock.cls === 'stock-out' ? 'Unavailable' : t('supplier_details.add_to_cart')}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="mobile-sticky-actions">
                <button className="btn-contact-primary">
                    <FaCommentAlt /> {t('supplier_details.contact_btn')}
                </button>
                <button className="btn-call-secondary">
                    <FaPhoneAlt /> {t('supplier_details.call_btn')}
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default SupplierDetails;