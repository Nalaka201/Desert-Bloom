import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { suppliers as initialSuppliers } from '../data/suppliers';
import api from '../services/api';
import '../styles/Admin.css';

const AdminPanel = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    // Data States
    const [orders, setOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [siteContent, setSiteContent] = useState({});

    // Edit States
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemForm, setNewItemForm] = useState({});
    const [managingSeedsFor, setManagingSeedsFor] = useState(null);
    const [editingSeedId, setEditingSeedId] = useState(null);
    const [seedEditForm, setSeedEditForm] = useState({});

    useEffect(() => {
        // Auth check
        const isAuth = localStorage.getItem('admin_auth');
        if (!isAuth) {
            navigate('/admin-login');
            return;
        }

        // Initialize Suppliers in localStorage if not exists
        if (!localStorage.getItem('farmer_suppliers')) {
            localStorage.setItem('farmer_suppliers', JSON.stringify(initialSuppliers));
        }

        // Initialize Farmers/Users if not exists
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

        // Try to load from API
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

        // Always fallback/merge with localStorage
        const storedOrders = JSON.parse(localStorage.getItem('farmer_orders') || '[]');
        const storedSuppliers = JSON.parse(localStorage.getItem('farmer_suppliers') || JSON.stringify(initialSuppliers));
        const storedFarmers = JSON.parse(localStorage.getItem('farmer_users') || '[]');

        // Merge orders (prioritize local for this demo if needed, or just combine)
        // Combine and filter unique by id
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

    // --- ORDER ACTIONS ---
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
            // Local fallback
            const updated = orders.map(o => o.orderId === id ? { ...o, supplier: editForm.supplier, total: Number(editForm.total) } : o);
            setOrders(updated);
            localStorage.setItem('farmer_orders', JSON.stringify(updated));
            setEditingId(null);
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm('Delete this order?')) {
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

    // --- SUPPLIER ACTIONS ---
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
        if (!newItemForm.name) return alert("Name is required");

        const newId = 'sup-' + Date.now();
        const newSupplier = {
            id: newId,
            name: newItemForm.name,
            location: newItemForm.location || 'Unknown',
            rating: Number(newItemForm.rating || 4.5),
            desc: newItemForm.desc || 'Quality seed supplier.',
            products: '0 Products available',
            logo: 'https://cdn-icons-png.flaticon.com/512/2910/2910810.png', // Default icon
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
        if (window.confirm('Are you sure you want to remove this supplier? This action cannot be undone.')) {
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

    // --- FARMER ACTIONS ---
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
        if (window.confirm('Delete this farmer account?')) {
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

    // --- SEED ACTIONS ---
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
        if (window.confirm('Delete this seed?')) {
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
        const name = prompt('Enter seed name:');
        const price = prompt('Enter price:');
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

    // --- SITE CONTENT ACTIONS ---
    const handleContentChange = (e) => {
        const { name, value } = e.target;
        setSiteContent(prev => ({ ...prev, [name]: value }));
    };

    const saveSiteContent = () => {
        localStorage.setItem('farmer_site_content', JSON.stringify(siteContent));
        alert('Site content updated successfully!');
    };

    const handleAdminLogout = () => {
        if (window.confirm('Log out from Admin Panel?')) {
            localStorage.removeItem('admin_auth');
            navigate('/admin-login');
        }
    };

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">🌱 <span>FarmerAdmin</span></div>
                <nav className="admin-nav">
                    <div className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</div>
                    <div className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>📦 Orders</div>
                    <div className={`admin-nav-item ${activeTab === 'suppliers' ? 'active' : ''}`} onClick={() => setActiveTab('suppliers')}>🏢 Suppliers</div>
                    <div className={`admin-nav-item ${activeTab === 'farmers' ? 'active' : ''}`} onClick={() => setActiveTab('farmers')}>👥 Farmers</div>
                    <div className={`admin-nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>✍️ Site Content</div>
                    <div className="admin-nav-item" onClick={handleAdminLogout} style={{ marginTop: 'auto', borderTop: '1px solid #166534', color: '#ef4444' }}>🚪 Logout</div>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {managingSeedsFor ?
                            `Managing Seeds: ${suppliers.find(s => s.id === managingSeedsFor)?.name}` :
                            `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`
                        }
                    </h1>
                    {managingSeedsFor ? (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => addSeed(managingSeedsFor)} className="add-btn" style={{ padding: '8px 16px', borderRadius: '8px', background: '#166534', color: 'white', border: 'none', cursor: 'pointer' }}>
                                + Add New Seed
                            </button>
                            <button onClick={() => setManagingSeedsFor(null)} style={{ padding: '8px 16px', borderRadius: '8px', background: '#64748b', color: 'white', border: 'none', cursor: 'pointer' }}>
                                Back to Suppliers
                            </button>
                        </div>
                    ) : (
                        activeTab !== 'dashboard' && activeTab !== 'content' && (
                            <button onClick={() => setShowAddModal(true)} className="add-btn" style={{ padding: '8px 16px', borderRadius: '8px', background: '#166534', color: 'white', border: 'none', cursor: 'pointer' }}>
                                + Add New {activeTab.slice(0, -1)}
                            </button>
                        )
                    )}
                </header>

                {activeTab === 'dashboard' && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-label">Total Revenue</div>
                            <div className="stat-value">Rs. {totalRevenue.toLocaleString()}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Total Suppliers</div>
                            <div className="stat-value">{suppliers.length}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Active Farmers</div>
                            <div className="stat-value">{farmers.length}</div>
                        </div>
                    </div>
                )}

                <div className="admin-card">
                    {activeTab === 'orders' && (
                        <table className="admin-table">
                            <thead>
                                <tr><th>ID</th><th>Farmer</th><th>Supplier</th><th>Items Ordered</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.orderId}>
                                        <td>#{o.orderId}</td>
                                        <td>{editingId === o.orderId ? <input value={editForm.farmerName} onChange={e => setEditForm({ ...editForm, farmerName: e.target.value })} /> : o.farmerName || 'Somathilaka'}</td>
                                        <td>{editingId === o.orderId ? <input value={editForm.supplier} onChange={e => setEditForm({ ...editForm, supplier: e.target.value })} /> : o.supplier}</td>
                                        <td style={{ fontSize: '0.85rem' }}>
                                            {o.items ? (
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                    {o.items.map((item, idx) => (
                                                        <li key={idx} style={{ color: '#166534', fontWeight: '500' }}>
                                                            • {item.type} ({item.quantity})
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span style={{ color: '#94a3b8' }}>No details</span>
                                            )}
                                        </td>
                                        <td>{editingId === o.orderId ? <input type="number" value={editForm.total} onChange={e => setEditForm({ ...editForm, total: e.target.value })} /> : 'Rs. ' + o.total.toLocaleString()}</td>
                                        <td><span className={`status-chip ${o.remainingBalance === 0 ? 'status-paid' : 'status-pending'}`}>{o.remainingBalance === 0 ? 'Paid' : 'Partial'}</span></td>
                                        <td>
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
                                <tr><th>Name</th><th>Location</th><th>Rating</th><th>Products</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {suppliers.map(s => (
                                    <tr key={s.id}>
                                        <td>{editingId === s.id ? <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /> : s.name}</td>
                                        <td>{editingId === s.id ? <input value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} /> : s.location}</td>
                                        <td>{editingId === s.id ? <input type="number" value={editForm.rating} onChange={e => setEditForm({ ...editForm, rating: e.target.value })} /> : '⭐ ' + s.rating}</td>
                                        <td>{editingId === s.id ? <input value={editForm.products} onChange={e => setEditForm({ ...editForm, products: e.target.value })} /> : s.products}</td>
                                        <td>
                                            {editingId === s.id ?
                                                <><button onClick={() => saveSupplierEdit(s.id)}>✅</button><button onClick={() => setEditingId(null)}>❌</button></> :
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button onClick={() => handleSupplierEdit(s)} title="Edit Details">✏️</button>
                                                    <button onClick={() => setManagingSeedsFor(s.id)} style={{ background: '#166534', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Manage Seeds</button>
                                                    <button onClick={() => deleteSupplier(s.id)} title="Delete Supplier">🗑️</button>
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
                                <tr><th>Seed Name</th><th>Code</th><th>Price (Rs.)</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {suppliers.find(s => s.id === managingSeedsFor)?.seeds?.map(seed => (
                                    <tr key={seed.id}>
                                        <td>{editingSeedId === seed.id ? <input value={seedEditForm.name} onChange={e => setSeedEditForm({ ...seedEditForm, name: e.target.value })} /> : seed.name}</td>
                                        <td>{editingSeedId === seed.id ? <input value={seedEditForm.code} onChange={e => setSeedEditForm({ ...seedEditForm, code: e.target.value })} /> : seed.code}</td>
                                        <td>{editingSeedId === seed.id ? <input type="number" value={seedEditForm.price} onChange={e => setSeedEditForm({ ...seedEditForm, price: e.target.value })} /> : seed.price.toLocaleString()}</td>
                                        <td>
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
                                <tr><th>Name</th><th>Phone</th><th>Email</th><th>Location</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {farmers.map(f => (
                                    <tr key={f.id}>
                                        <td>{editingId === f.id ? <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /> : f.name}</td>
                                        <td>{editingId === f.id ? <input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} /> : f.phone}</td>
                                        <td>{editingId === f.id ? <input value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /> : f.email}</td>
                                        <td>{editingId === f.id ? <input value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} /> : f.location}</td>
                                        <td>
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
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Hero Title Part 1</label>
                                    <input
                                        name="heroTitle1"
                                        value={siteContent.heroTitle1}
                                        onChange={handleContentChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Hero Title Part 2</label>
                                    <input
                                        name="heroTitle2"
                                        value={siteContent.heroTitle2}
                                        onChange={handleContentChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Hero Subtitle</label>
                                    <textarea
                                        name="heroSubtitle"
                                        value={siteContent.heroSubtitle}
                                        onChange={handleContentChange}
                                        rows="4"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    ></textarea>
                                </div>
                                <button
                                    onClick={saveSiteContent}
                                    style={{ background: '#166534', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    Save Website Changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Add Modal Placeholder */}
                {showAddModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', minWidth: '300px' }}>
                            <h2>Add New {activeTab.slice(0, -1)}</h2>
                            <div style={{ display: 'grid', gap: '10px', marginTop: '1rem' }}>
                                <input placeholder="Name" onChange={e => setNewItemForm({ ...newItemForm, name: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                <input placeholder="Location" onChange={e => setNewItemForm({ ...newItemForm, location: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                <input type="number" step="0.1" placeholder="Rating (e.g. 4.5)" onChange={e => setNewItemForm({ ...newItemForm, rating: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                <textarea placeholder="Company Description" onChange={e => setNewItemForm({ ...newItemForm, desc: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}></textarea>
                            </div>
                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                                <button onClick={addSupplier} style={{ background: '#166534', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>Save Supplier</button>
                                <button onClick={() => setShowAddModal(false)} style={{ background: '#64748b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
