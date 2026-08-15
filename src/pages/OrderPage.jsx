import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import OrderPDF from '../components/OrderPDF';
import '../styles/OrderPage.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaEdit, FaTrashAlt, FaPlus, FaTruck, FaExclamationTriangle, FaRedoAlt, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../services/api';
import { suppliers as staticSuppliers } from '../data/suppliers';

const OrderPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const pdfRef = React.useRef();
    const [farmer, setFarmer] = useState({ id: 1, name: 'K.H. Somathilaka', phone: '071 3244 232' });
    const [dbSuppliers, setDbSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await api.get('/suppliers');
                setDbSuppliers(res.data);
            } catch (err) { console.error(err); }
        };
        fetchSuppliers();
    }, []);

    useEffect(() => {
        const savedProfile = localStorage.getItem('farmer_profile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            setAddress({
                line1: profile.addressLine1,
                line2: profile.addressLine2,
                zip: profile.zip
            });
            setFarmer({ name: profile.name, phone: profile.phone });
        }
    }, []);

    // Clear cart and state when productId changes to ensure a fresh start for each product
    useEffect(() => {
        setCartItems([]);
        setDownPayment(0);
        setQuantity('');
        setAddress({ line1: '', line2: '', zip: '' });
    }, [productId]);

    let currentSupplier = null;
    let currentProduct = null;

    // Find the supplier and the specific seed product
    for (const sup of dbSuppliers) {
        const found = sup.seeds?.find(s => String(s.id) === String(productId));
        if (found) {
            currentSupplier = sup;
            currentProduct = found;
            break;
        }
    }

    // Fallback product if not found
    const product = currentProduct || {
        name: 'Sweet Corn',
        rating: 4.5,
        reviews: 20,
        available: '700kg',
        deliveryTime: '3-5 Business Days',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400&auto=format&fit=crop',
        desc: 'Premium quality sweet corn seeds perfect for small-scale and large-scale farming. High yield variety with excellent disease resistance.'
    };

    const [cartItems, setCartItems] = useState([]);

    const varietyPrices = {
        '999 Corn': 2000,
        '894 Corn': 1800,
        '822 Corn': 1500
    };

    const [selectedVariety, setSelectedVariety] = useState('999 Corn');
    const [quantity, setQuantity] = useState('');
    const pricePerKg = varietyPrices[selectedVariety] || 1500;

    const handleAddToCart = () => {
        if (!quantity || isNaN(quantity)) {
            alert("Please enter a valid quantity");
            return;
        }

        const newItem = {
            id: Date.now(),
            type: selectedVariety,
            quantity: `${quantity}kg`,
            price: pricePerKg,
            total: Number(quantity) * pricePerKg
        };

        setCartItems([...cartItems, newItem]);
        setQuantity('');
    };

    const handleDeleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const [address, setAddress] = useState({
        line1: '',
        line2: '',
        zip: ''
    });
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const [downPayment, setDownPayment] = useState(0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);
    const lastPayment = downPayment;
    const remainingBalance = totalAmount - downPayment;

    const handleGeneratePDF = async () => {
        const element = pdfRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false
        });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const canvasHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF('p', 'mm', 'a4');

        // Page 1
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pageHeight, undefined, 'FAST', 0);

        // Page 2
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, -pageHeight, imgWidth, pageHeight, undefined, 'FAST', 0);

        const orderId = `ORD-${Date.now()}`;
        pdf.save(`${orderId}.pdf`);

        // Prepare order data for local storage (Admin Panel sync)
        const newOrder = {
            orderId: orderId,
            farmerName: farmer.name,
            supplier: currentSupplier?.name || 'Local Store',
            total: totalAmount,
            remainingBalance: remainingBalance,
            items: cartItems.map(item => ({
                type: item.type,
                quantity: item.quantity,
                price: item.price,
                total: item.total
            })),
            date: new Date().toISOString()
        };

        // Save order to history via API
        try {
            await api.post('/orders', {
                farmer_id: farmer.id,
                supplier_name: newOrder.supplier,
                total_amount: totalAmount,
                remaining_balance: remainingBalance,
                items: newOrder.items // Assuming API supports items
            });
        } catch (err) {
            console.error("Failed to save order to DB, using local storage fallback", err);
        }

        // Always save to localStorage for Admin Panel fallback
        const existingOrders = JSON.parse(localStorage.getItem('farmer_orders') || '[]');
        localStorage.setItem('farmer_orders', JSON.stringify([newOrder, ...existingOrders]));

        // Redirect to success page
        navigate('/order-success', { state: { orderId } });
    };

    const handleResetOrder = () => {
        if (window.confirm("Are you sure you want to clear all items?")) {
            setCartItems([]);
            setDownPayment(0);
            setQuantity('');
            setSelectedVariety('999 Corn');
            setAddress({
                line1: '',
                line2: '',
                zip: ''
            });
        }
    };

    return (
        <div className="order-page">
            <div className="order-container">
                {currentSupplier && (
                    <div className="order-top-branding">
                        <img src={currentSupplier.logo} alt={currentSupplier.name} className="top-company-logo" />
                        <div className="top-company-info">
                            <h2 className="top-company-name">{currentSupplier.name}</h2>
                            <p className="top-company-tag">Verified Seed Supplier</p>
                        </div>
                    </div>
                )}

                {/* Product Summary Card */}
                <div className="order-card product-summary">
                    <div className="summary-layout">
                        <img src={product.image} alt={product.name} className="order-product-img" />
                        <div className="order-product-info">
                            <h1 className="order-product-name">{product.name}</h1>
                            <div className="order-product-meta">
                                <span className="order-stars">★★★★★</span>
                                <span className="order-reviews">({product.reviews} Reviews)</span>
                            </div>
                            <p className="order-product-desc">{product.desc}</p>
                            <div className="order-tags">
                                <span className="tag-green">High Yield</span>
                                <span className="tag-green">Disease Resistance</span>
                            </div>
                        </div>
                        <div className="order-stock-info">
                            <div className="stock-box">
                                <span className="stock-label">{t('order.available_stock')}</span>
                                <span className="stock-value">{product.available}</span>
                                <span className="stock-delivery">{t('order.estimated_delivery')}: {product.deliveryTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Place the Order Card */}
                <div className="order-card">
                    <h2 className="card-title-line">{t('order.place_title')}</h2>
                    <div className="order-form-grid">
                        <div className="form-left">
                            <div className="form-group">
                                <label>{t('order.select_type')}</label>
                                <div className="select-wrapper">
                                    <select
                                        className="order-select"
                                        value={selectedVariety}
                                        onChange={(e) => setSelectedVariety(e.target.value)}
                                    >
                                        <option value="999 Corn">999 Corn</option>
                                        <option value="894 Corn">894 Corn</option>
                                        <option value="822 Corn">822 Corn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{t('order.select_qty')}</label>
                                <div className="qty-input-wrapper">
                                    <input
                                        type="text"
                                        placeholder={t('order.qty_placeholder')}
                                        className="order-input"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <span className="qty-unit">kg</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="price-display-box">
                                <span className="price-label">{t('order.price_per_kg')}</span>
                                <span className="price-value">Rs. {pricePerKg.toLocaleString()}</span>
                            </div>
                            <button className="btn-add-to-cart-large" onClick={handleAddToCart}>
                                <FaPlus /> {t('order.add_to_cart')}
                            </button>
                        </div>
                    </div>

                    <div className="order-table-container">
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>{t('order.table_type')}</th>
                                    <th>{t('order.table_qty')}</th>
                                    <th>{t('order.table_price')}</th>
                                    <th>{t('order.table_total')}</th>
                                    <th>{t('order.table_action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="cell-strong">{item.type}</td>
                                        <td>{item.quantity}</td>
                                        <td>Rs. {item.price.toLocaleString()}</td>
                                        <td className="cell-strong">Rs. {item.total.toLocaleString()}</td>
                                        <td>
                                            <div className="action-btns">
                                                <button className="icon-btn-small"><FaEdit /></button>
                                                <button
                                                    className="icon-btn-small delete"
                                                    onClick={() => handleDeleteItem(item.id)}
                                                ><FaTrashAlt /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {cartItems.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="empty-cart-row">{t('order.empty_cart')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Card */}
                <div className="order-card">
                    <h2 className="card-title-line">{t('order.payment_summary')}</h2>
                    <div className="payment-summary">
                        <div className="payment-total-hero">
                            <span className="payment-total-label">{t('order.total_amount')}</span>
                            <span className="payment-total-value">Rs. {totalAmount.toLocaleString()}</span>
                        </div>

                        <div className="down-payment-box">
                            <p>{t('order.downpayment_question')}</p>

                            <div className="quick-amount-row">
                                {[25, 50, 100].map(pct => {
                                    const amt = Math.round(totalAmount * pct / 100);
                                    return (
                                        <button
                                            key={pct}
                                            type="button"
                                            className={`quick-amount-chip ${downPayment === amt && totalAmount > 0 ? 'active' : ''}`}
                                            onClick={() => setDownPayment(amt)}
                                        >
                                            <span className="chip-pct">{pct === 100 ? t('order.pay_full', 'Full') : `${pct}%`}</span>
                                            <span className="chip-amt">Rs. {amt.toLocaleString()}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="or-divider">{t('order.or_enter_custom', 'Or enter a custom amount')}</p>

                            <div className="amount-input-wrapper">
                                <span className="input-currency-prefix">Rs.</span>
                                <input
                                    type="text"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                                    className="down-payment-input"
                                />
                            </div>

                            {totalAmount > 0 && (
                                <div className="payment-progress-track">
                                    <div
                                        className="payment-progress-fill"
                                        style={{ width: `${Math.min((downPayment / totalAmount) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        <div className="payment-details-mini">
                            <div className="pay-mini-row">
                                <span>{t('order.down_payment_paid', 'Paying Now')}</span>
                                <span>Rs. {lastPayment.toLocaleString()}</span>
                            </div>
                            <div className="pay-mini-row balance-highlight">
                                <span>{t('order.remaining')}</span>
                                <span>Rs. {remainingBalance.toLocaleString()}</span>
                            </div>
                        </div>

                        <button className="btn-cod-entry">
                            <FaTruck /> {t('order.cod_btn')}
                        </button>
                    </div>
                </div>

                {/* Delivery Address Card */}
                <div className="order-card">
                    <h2 className="card-title-line">{t('order.delivery_title')}</h2>
                    <div className="address-box">
                        {isEditingAddress ? (
                            <div className="address-edit-form">
                                <div className="address-edit-grid">
                                    <input
                                        type="text"
                                        className="order-input"
                                        value={address.line1}
                                        onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                                        placeholder={t('order.address_line1')}
                                    />
                                    <input
                                        type="text"
                                        className="order-input"
                                        value={address.line2}
                                        onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                                        placeholder={t('order.address_line2')}
                                    />
                                    <input
                                        type="text"
                                        className="order-input"
                                        value={address.zip}
                                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                                        placeholder={t('order.zip_placeholder')}
                                    />
                                </div>
                                <button
                                    className="btn-save-address"
                                    onClick={() => setIsEditingAddress(false)}
                                >
                                    <FaCheckCircle /> {t('order.save_address')}
                                </button>
                            </div>
                        ) : address.line1 || address.line2 || address.zip ? (
                            <div className="address-display">
                                <div className="address-icon-badge">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="address-content">
                                    {address.line1 && <p className="address-line-main">{address.line1}</p>}
                                    {address.line2 && <p>{address.line2}</p>}
                                    {address.zip && <p className="address-zip">{address.zip}</p>}
                                </div>
                                <button className="btn-edit-address" onClick={() => setIsEditingAddress(true)}>
                                    <FaEdit /> {t('order.edit_address', 'Edit')}
                                </button>
                            </div>
                        ) : (
                            <div className="address-empty-state" onClick={() => setIsEditingAddress(true)}>
                                <div className="address-icon-badge">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="address-empty-text">
                                    <p className="address-empty-title">{t('order.no_address', 'No delivery address added yet')}</p>
                                    <p className="address-empty-sub">{t('order.add_address_prompt', 'Click to add your address')}</p>
                                </div>
                                <button className="btn-edit-address">
                                    <FaEdit /> {t('order.add_address', 'Add')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Terms and Conditions Card */}
                <div className="order-card">
                    <h2 className="card-title-line">{t('order.terms_title')}</h2>
                    <div className="terms-content">
                        <h4>{t('order.payment_agreement_terms')}:</h4>
                        <ol>
                            <li>{t('order.term1')}</li>
                            <li>{t('order.term2')}</li>
                            <li>{t('order.term3')}</li>
                            <li>{t('order.term4')}</li>
                            <li>{t('order.term5')}</li>
                            <li>{t('order.term6')}</li>
                            <li>{t('order.term7')}</li>
                        </ol>
                        <div className="warning-note">
                            <FaExclamationTriangle /> <strong>Important:</strong> {t('order.legal_warning')}
                        </div>
                        <label className="agreement-checkbox">
                            <input type="checkbox" /> {t('order.checkbox_label')}
                        </label>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="order-footer-btns">
                    <button className="btn-reset-order" onClick={handleResetOrder}>
                        <FaRedoAlt /> {t('order.footer_reset')}
                    </button>
                    <button className="btn-submit-order" onClick={handleGeneratePDF}>
                        <FaCheckCircle /> {t('order.footer_submit')}
                    </button>
                </div>

                {/* Hidden PDF content */}
                <OrderPDF
                    ref={pdfRef}
                    farmer={farmer}
                    supplier={currentSupplier}
                    address={address}
                    cartItems={cartItems}
                    totalAmount={totalAmount}
                    downPayment={downPayment}
                    remainingBalance={remainingBalance}
                />
            </div>
            <Footer />
        </div>
    );
};

export default OrderPage;