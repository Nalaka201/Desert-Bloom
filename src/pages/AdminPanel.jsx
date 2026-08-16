import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { suppliers as initialSuppliers } from '../data/suppliers';
import api from '../services/api';
import logo from '../assets/logo.png';
import {
    MdDashboard,
    MdInventory2,
    MdStorefront,
    MdPeople,
    MdEdit,
    MdLogout
} from 'react-icons/md';
import '../styles/Admin.css';

const AdminPanel = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    const [orders, setOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [siteContent, setSiteContent] = useState({});

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemForm, setNewItemForm] = useState({});
    const [managingSeedsFor, setManagingSeedsFor] = useState(null);
    const [editingSeedId, setEditingSeedId] = useState(null);
    const [seedEditForm, setSeedEditForm] = useState({});

    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth');
        if (!isAuth) {
            navigate('/admin-login');
            return;
        }

        if (!localStorage.getItem('farmer_suppliers')) {
            localStorage.setItem('farmer_suppliers', JSON.stringify(initialSuppliers));
        }

        if (!localStorage.getItem('farmer_users')) {
            const defaultUser = {
                id: 1,
                name: 'K.H. Somathilaka',
                phone: '071 3244 232',
                nic: '198512345678',
                email: 'somathilaka@farmmail.lk',
                location: 'Anuradhapura'
            };
            localStorage.setItem('farmer_users', JSON.stringify([defaultUser]));
        }

        loadData();
    }, []);

    const loadData = async () => {
        let apiOrders = [];
        let apiSuppliers = [];
        let apiFarmers = [];

        try {
            const [ordersRes, suppliersRes, farmersRes] = await Promise.all([
                api.get('/orders').catch(() => ({ data: [] })),
                api.get('/suppliers').catch(() => ({ data: [] })),
                api.get('/farmers').catch(() => ({ data: [] }))
            ]);
            apiOrders = ordersRes.data;
            apiSuppliers = suppliersRes.data;
            apiFarmers = farmersRes.data;
        } catch (err) {
            console.warn("API base failed:", err);
        }

        const storedOrders = JSON.parse(localStorage.getItem('farmer_orders') || '[]');
        const storedSuppliers = JSON.parse(localStorage.getItem('farmer_suppliers') || JSON.stringify(initialSuppliers));
        const storedFarmers = JSON.parse(localStorage.getItem('farmer_users') || '[]');

        const allOrders = [...apiOrders];
        storedOrders.forEach(so => {
            if (!allOrders.find(ao => ao.orderId === so.orderId)) {
                allOrders.push(so);
            }
        });

        const allSuppliers = apiSuppliers.length > 0 ? apiSuppliers : storedSuppliers;
        const allFarmers = apiFarmers.length > 0 ? apiFarmers : storedFarmers;

        setOrders(allOrders);
        setSuppliers(allSuppliers);
        setFarmers(allFarmers);

        const defaultContent = {
            heroTitle1: 'Plant with Confidence,',
            heroTitle2: 'Harvest with Pride',
            heroSubtitle: 'Premium seeds and expert suppliers for your farm\'s success.'
        };
        setSiteContent(JSON.parse(localStorage.getItem('farmer_site_content') || JSON.stringify(defaultContent)));
    };

    const handleOrderEdit = (order) => {
        setEditingId(order.orderId);
        setEditForm({ farmerName: order.farmerName || 'K.H. Somathilaka', supplier: order.supplier, total: order.total });
    };

    const saveOrderEdit = async (id) => {
        try {
            await api.put(`/orders/${id}`, {
                supplier_name: editForm.supplier,
                total_amount: Number(editForm.total),
                remaining_balance: 0
            });
            loadData();
            setEditingId(null);
        } catch (err) {
            const updated = orders.map(o => o.orderId === id ? { ...o, supplier: editForm.supplier, total: Number(editForm.total) } : o);
            setOrders(updated);
            localStorage.setItem('farmer_orders', JSON.stringify(updated));
            setEditingId(null);
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm(t('admin_panel.confirm_delete_order'))) {
            try {
                await api.delete(`/orders/${id}`);
                loadData();
            } catch (err) {
                const updated = orders.filter(o => o.orderId !== id);
                setOrders(updated);
                localStorage.setItem('farmer_orders', JSON.stringify(updated));
            }
        }
    };

    const handleSupplierEdit = (sup) => {
        setEditingId(sup.id);
        setEditForm({
            name: sup.name,
            location: sup.location,
            rating: sup.rating,
            products: sup.products,
            desc: sup.desc || ''
        });
    };

    const saveSupplierEdit = async (id) => {
        const updateData = {
            name: editForm.name,
            location: editForm.location,
            rating: Number(editForm.rating),
            description: editForm.desc || ''
        };

        try {
            await api.put(`/suppliers/${id}`, updateData);
            loadData();
            setEditingId(null);
        } catch (err) {
            const updated = suppliers.map(s => s.id === id ? { ...s, ...updateData, products: editForm.products } : s);
            setSuppliers(updated);
            localStorage.setItem('farmer_suppliers', JSON.stringify(updated));
            setEditingId(null);
        }
    };

    const addSupplier = async () => {
        if (!newItemForm.name) return alert(t('admin_panel.name_required'));

        const newId = 'sup-' + Date.now();
        const newSupplier = {
            id: newId,
            name: newItemForm.name,
            location: newItemForm.location || 'Unknown',
            rating: Number(newItemForm.rating || 4.5),
            desc: newItemForm.desc || 'Quality seed supplier.',
            products: '0 Products available',
            logo: 'https://cdn-icons-png.flaticon.com/512/2910/2910810.png',
            seeds: [],
            reviews: 0
        };

        try {
            await api.post('/suppliers', {
                id: newId,
                name: newSupplier.name,
                location: newSupplier.location,
                rating: newSupplier.rating,
                description: newSupplier.desc
            });
            loadData();
        } catch (err) {
            const updated = [...suppliers, newSupplier];
            setSuppliers(updated);
            localStorage.setItem('farmer_suppliers', JSON.stringify(updated));
        }

        setShowAddModal(false);
        setNewItemForm({});
    };

    const deleteSupplier = async (id) => {
        if (window.confirm(t('admin_panel.confirm_delete_supplier'))) {
            try {
                await api.delete(`/suppliers/${id}`);
                loadData();
            } catch (err) {
                const updated = suppliers.filter(s => s.id !== id);
                setSuppliers(updated);
                localStorage.setItem('farmer_suppliers', JSON.stringify(updated));
            }
        }
    };

    const handleFarmerEdit = (f) => {
        setEditingId(f.id);
        setEditForm({ name: f.name, phone: f.phone, email: f.email, location: f.location });
    };

    const saveFarmerEdit = async (id) => {
        const updateData = { ...editForm };
        try {
            await api.put(`/farmers/${id}`, updateData);
            loadData();
            setEditingId(null);
        } catch (err) {
            const updated = farmers.map(f => f.id === id ? { ...f, ...updateData } : f);
            setFarmers(updated);
            localStorage.setItem('farmer_users', JSON.stringify(updated));
            setEditingId(null);
        }
    };

    const deleteFarmer = async (id) => {
        if (window.confirm(t('admin_panel.confirm_delete_farmer'))) {
            try {
                await api.delete(`/farmers/${id}`);
                loadData();
            } catch (err) {
                const updated = farmers.filter(f => f.id !== id);
                setFarmers(updated);
                localStorage.setItem('farmer_users', JSON.stringify(updated));
            }
        }
    };

    const handleSeedEdit = (seed) => {
        setEditingSeedId(seed.id);
        setSeedEditForm({ name: seed.name, code: seed.code, price: seed.price });
    };

    const saveSeedEdit = (supplierId, seedId) => {
        const updatedSuppliers = suppliers.map(s => {
            if (s.id === supplierId) {
                const updatedSeeds = s.seeds.map(seed =>
                    seed.id === seedId ? { ...seed, ...seedEditForm, price: Number(seedEditForm.price) } : seed
                );
                return { ...s, seeds: updatedSeeds };
            }
            return s;
        });
        localStorage.setItem('farmer_suppliers', JSON.stringify(updatedSuppliers));
        setSuppliers(updatedSuppliers);
        setEditingSeedId(null);
    };

    const deleteSeed = (supplierId, seedId) => {
        if (window.confirm(t('admin_panel.confirm_delete_seed'))) {
            const updatedSuppliers = suppliers.map(s => {
                if (s.id === supplierId) {
                    const updatedSeeds = s.seeds.filter(seed => seed.id !== seedId);
                    return { ...s, seeds: updatedSeeds, products: `${updatedSeeds.length} Products available` };
                }
                return s;
            });
            localStorage.setItem('farmer_suppliers', JSON.stringify(updatedSuppliers));
            setSuppliers(updatedSuppliers);
        }
    };

    const addSeed = (supplierId) => {
        const name = prompt(t('admin_panel.enter_seed_name'));
        const price = prompt(t('admin_panel.enter_price'));
        if (!name || !price) return;

        const updatedSuppliers = suppliers.map(s => {
            if (s.id === supplierId) {
                const newSeed = {
                    id: Date.now(),
                    name,
                    price: Number(price),
                    code: 'NEW-' + Math.floor(Math.random() * 100),
                    weight: '1 kg',
                    image: 'https://via.placeholder.com/400'
                };
                const updatedSeeds = [...(s.seeds || []), newSeed];
                return { ...s, seeds: updatedSeeds, products: `${updatedSeeds.length} Products available` };
            }
            return s;
        });
        localStorage.setItem('farmer_suppliers', JSON.stringify(updatedSuppliers));
        setSuppliers(updatedSuppliers);
    };

    const handleContentChange = (e) => {
        const { name, value } = e.target;
        setSiteContent(prev => ({ ...prev, [name]: value }));
    };

    const saveSiteContent = () => {
        localStorage.setItem('farmer_site_content', JSON.stringify(siteContent));
        alert(t('admin_panel.content_saved'));
    };

    const handleAdminLogout = () => {
        if (window.confirm(t('admin_panel.confirm_logout'))) {
            localStorage.removeItem('admin_auth');
            navigate('/admin-login');
        }
    };

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    // Tab -> translated section title
    const tabTitles = {
        dashboard: t('admin_panel.tab_dashboard'),
        orders: t('admin_panel.tab_orders'),
        suppliers: t('admin_panel.tab_suppliers'),
        farmers: t('admin_panel.tab_farmers'),
        content: t('admin_panel.tab_content')
    };

    // Tab -> "Add New X" label
    const addNewLabels = {
        orders: t('admin_panel.add_new_order'),
        suppliers: t('admin_panel.add_new_supplier'),
        farmers: t('admin_panel.add_new_farmer')
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo"><img src={logo} alt="Aswenna.lk Logo" className="logo-img" /><span>Aswenna.lk</span></div>
                <nav className="admin-nav">
                    <div className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <MdDashboard className="admin-nav-icon" /> {t('admin_panel.nav_dashboard')}
                    </div>
                    <div className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                        <MdInventory2 className="admin-nav-icon" /> {t('admin_panel.nav_orders')}
                    </div>
                    <div className={`admin-nav-item ${activeTab === 'suppliers' ? 'active' : ''}`} onClick={() => setActiveTab('suppliers')}>
                        <MdStorefront className="admin-nav-icon" /> {t('admin_panel.nav_suppliers')}
                    </div>
                    <div className={`admin-nav-item ${activeTab === 'farmers' ? 'active' : ''}`} onClick={() => setActiveTab('farmers')}>
                        <MdPeople className="admin-nav-icon" /> {t('admin_panel.nav_farmers')}
                    </div>
                    <div className={`admin-nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
                        <MdEdit className="admin-nav-icon" /> {t('admin_panel.nav_content')}
                    </div>
                    <div className="admin-nav-item admin-nav-logout" onClick={handleAdminLogout}>
                        <MdLogout className="admin-nav-icon" /> {t('admin_panel.nav_logout')}
                    </div>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {managingSeedsFor ?
                            t('admin_panel.managing_seeds', { name: suppliers.find(s => s.id === managingSeedsFor)?.name }) :
                            tabTitles[activeTab]
                        }
                    </h1>
                    <div className="admin-header-actions">
                        <div className="admin-lang-wrap">
                            <LanguageSwitcher />
                        </div>
                        {managingSeedsFor ? (
                            <div className="admin-header-actions">
                                <button onClick={() => addSeed(managingSeedsFor)} className="admin-btn admin-btn-primary">
                                    + {t('admin_panel.add_new_seed')}
                                </button>
                                <button onClick={() => setManagingSeedsFor(null)} className="admin-btn admin-btn-secondary">
                                    {t('admin_panel.back_to_suppliers')}
                                </button>
                            </div>
                        ) : (
                            activeTab !== 'dashboard' && activeTab !== 'content' && (
                                <button onClick={() => setShowAddModal(true)} className="admin-btn admin-btn-primary">
                                    + {addNewLabels[activeTab]}
                                </button>
                            )
                        )}
                    </div>
                </header>

                {activeTab === 'dashboard' && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-label">{t('admin_panel.total_revenue')}</div>
                            <div className="stat-value">Rs. {totalRevenue.toLocaleString()}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">{t('admin_panel.total_suppliers')}</div>
                            <div className="stat-value">{suppliers.length}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">{t('admin_panel.active_farmers')}</div>
                            <div className="stat-value">{farmers.length}</div>
                        </div>
                    </div>
                )}

                <div className="admin-card">
                    {activeTab === 'orders' && (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{t('admin_panel.col_id')}</th>
                                    <th>{t('admin_panel.col_farmer')}</th>
                                    <th>{t('admin_panel.col_supplier')}</th>
                                    <th>{t('admin_panel.col_items')}</th>
                                    <th>{t('admin_panel.col_amount')}</th>
                                    <th>{t('admin_panel.col_status')}</th>
                                    <th>{t('admin_panel.col_actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.orderId}>
                                        <td>#{o.orderId}</td>
                                        <td>{editingId === o.orderId ? <input className="admin-inline-input" value={editForm.farmerName} onChange={e => setEditForm({ ...editForm, farmerName: e.target.value })} /> : o.farmerName || 'Somathilaka'}</td>
                                        <td>{editingId === o.orderId ? <input className="admin-inline-input" value={editForm.supplier} onChange={e => setEditForm({ ...editForm, supplier: e.target.value })} /> : o.supplier}</td>
                                        <td className="admin-cell-items">
                                            {o.items ? (
                                                <ul className="admin-items-list">
                                                    {o.items.map((item, idx) => (
                                                        <li key={idx}>• {item.type} ({item.quantity})</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="admin-muted">{t('admin_panel.no_details')}</span>
                                            )}
                                        </td>
                                        <td>{editingId === o.orderId ? <input className="admin-inline-input" type="number" value={editForm.total} onChange={e => setEditForm({ ...editForm, total: e.target.value })} /> : 'Rs. ' + o.total.toLocaleString()}</td>
                                        <td><span className={`status-chip ${o.remainingBalance === 0 ? 'status-paid' : 'status-pending'}`}>{o.remainingBalance === 0 ? t('admin_panel.status_paid') : t('admin_panel.status_partial')}</span></td>
                                        <td className="admin-actions">
                                            {editingId === o.orderId ?
                                                <><button onClick={() => saveOrderEdit(o.orderId)}>✅</button><button onClick={() => setEditingId(null)}>❌</button></> :
                                                <><button onClick={() => handleOrderEdit(o)}>✏️</button><button onClick={() => deleteOrder(o.orderId)}>🗑️</button></>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'suppliers' && !managingSeedsFor && (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{t('admin_panel.col_name')}</th>
                                    <th>{t('admin_panel.col_location')}</th>
                                    <th>{t('admin_panel.col_rating')}</th>
                                    <th>{t('admin_panel.col_products')}</th>
                                    <th>{t('admin_panel.col_actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map(s => (
                                    <tr key={s.id}>
                                        <td>{editingId === s.id ? <input className="admin-inline-input" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /> : s.name}</td>
                                        <td>{editingId === s.id ? <input className="admin-inline-input" value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} /> : s.location}</td>
                                        <td>{editingId === s.id ? <input className="admin-inline-input" type="number" value={editForm.rating} onChange={e => setEditForm({ ...editForm, rating: e.target.value })} /> : '⭐ ' + s.rating}</td>
                                        <td>{editingId === s.id ? <input className="admin-inline-input" value={editForm.products} onChange={e => setEditForm({ ...editForm, products: e.target.value })} /> : s.products}</td>
                                        <td>
                                            {editingId === s.id ?
                                                <div className="admin-actions"><button onClick={() => saveSupplierEdit(s.id)}>✅</button><button onClick={() => setEditingId(null)}>❌</button></div> :
                                                <div className="admin-actions">
                                                    <button onClick={() => handleSupplierEdit(s)} title={t('admin_panel.edit_details')}>✏️</button>
                                                    <button onClick={() => setManagingSeedsFor(s.id)} className="admin-btn admin-btn-small">{t('admin_panel.manage_seeds')}</button>
                                                    <button onClick={() => deleteSupplier(s.id)} title={t('admin_panel.delete_supplier')}>🗑️</button>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {managingSeedsFor && (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{t('admin_panel.col_seed_name')}</th>
                                    <th>{t('admin_panel.col_code')}</th>
                                    <th>{t('admin_panel.col_price')}</th>
                                    <th>{t('admin_panel.col_actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.find(s => s.id === managingSeedsFor)?.seeds?.map(seed => (
                                    <tr key={seed.id}>
                                        <td>{editingSeedId === seed.id ? <input className="admin-inline-input" value={seedEditForm.name} onChange={e => setSeedEditForm({ ...seedEditForm, name: e.target.value })} /> : seed.name}</td>
                                        <td>{editingSeedId === seed.id ? <input className="admin-inline-input" value={seedEditForm.code} onChange={e => setSeedEditForm({ ...seedEditForm, code: e.target.value })} /> : seed.code}</td>
                                        <td>{editingSeedId === seed.id ? <input className="admin-inline-input" type="number" value={seedEditForm.price} onChange={e => setSeedEditForm({ ...seedEditForm, price: e.target.value })} /> : seed.price.toLocaleString()}</td>
                                        <td className="admin-actions">
                                            {editingSeedId === seed.id ?
                                                <><button onClick={() => saveSeedEdit(managingSeedsFor, seed.id)}>✅</button><button onClick={() => setEditingSeedId(null)}>❌</button></> :
                                                <><button onClick={() => handleSeedEdit(seed)}>✏️</button><button onClick={() => deleteSeed(managingSeedsFor, seed.id)}>🗑️</button></>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'farmers' && (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{t('admin_panel.col_name')}</th>
                                    <th>{t('admin_panel.col_phone')}</th>
                                    <th>{t('admin_panel.col_email')}</th>
                                    <th>{t('admin_panel.col_location')}</th>
                                    <th>{t('admin_panel.col_actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {farmers.map(f => (
                                    <tr key={f.id}>
                                        <td>{editingId === f.id ? <input className="admin-inline-input" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /> : f.name}</td>
                                        <td>{editingId === f.id ? <input className="admin-inline-input" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} /> : f.phone}</td>
                                        <td>{editingId === f.id ? <input className="admin-inline-input" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /> : f.email}</td>
                                        <td>{editingId === f.id ? <input className="admin-inline-input" value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} /> : f.location}</td>
                                        <td className="admin-actions">
                                            {editingId === f.id ?
                                                <><button onClick={() => saveFarmerEdit(f.id)}>✅</button><button onClick={() => setEditingId(null)}>❌</button></> :
                                                <><button onClick={() => handleFarmerEdit(f)}>✏️</button><button onClick={() => deleteFarmer(f.id)}>🗑️</button></>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'content' && (
                        <div className="admin-content-form">
                            <div className="form-group">
                                <label>{t('admin_panel.hero_title_1')}</label>
                                <input name="heroTitle1" value={siteContent.heroTitle1} onChange={handleContentChange} />
                            </div>
                            <div className="form-group">
                                <label>{t('admin_panel.hero_title_2')}</label>
                                <input name="heroTitle2" value={siteContent.heroTitle2} onChange={handleContentChange} />
                            </div>
                            <div className="form-group">
                                <label>{t('admin_panel.hero_subtitle')}</label>
                                <textarea name="heroSubtitle" value={siteContent.heroSubtitle} onChange={handleContentChange} rows="4"></textarea>
                            </div>
                            <button onClick={saveSiteContent} className="admin-btn admin-btn-primary admin-btn-full">
                                {t('admin_panel.save_website_changes')}
                            </button>
                        </div>
                    )}
                </div>

                {showAddModal && (
                    <div className="admin-modal-overlay">
                        <div className="admin-modal">
                            <h2>+ {addNewLabels[activeTab]}</h2>
                            <div className="admin-modal-body">
                                <input placeholder={t('admin_panel.ph_name')} onChange={e => setNewItemForm({ ...newItemForm, name: e.target.value })} />
                                <input placeholder={t('admin_panel.ph_location')} onChange={e => setNewItemForm({ ...newItemForm, location: e.target.value })} />
                                <input type="number" step="0.1" placeholder={t('admin_panel.ph_rating')} onChange={e => setNewItemForm({ ...newItemForm, rating: e.target.value })} />
                                <textarea placeholder={t('admin_panel.ph_description')} onChange={e => setNewItemForm({ ...newItemForm, desc: e.target.value })}></textarea>
                            </div>
                            <div className="admin-modal-footer">
                                <button onClick={addSupplier} className="admin-btn admin-btn-primary admin-btn-full">{t('admin_panel.save_supplier')}</button>
                                <button onClick={() => setShowAddModal(false)} className="admin-btn admin-btn-secondary">{t('admin_panel.cancel')}</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;