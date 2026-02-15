import React from 'react';
import { useTranslation } from 'react-i18next';
import './OrderPDF.css';

const OrderPDF = React.forwardRef(({ orderData, farmer, supplier, address, cartItems, totalAmount, downPayment, remainingBalance }, ref) => {
    const { t } = useTranslation();
    const today = new Date();
    const dateFormatted = today.toLocaleDateString();
    const timeFormatted = today.toLocaleTimeString();

    return (
        <div style={{ position: 'absolute', left: '-9999px', top: '0' }}>
            <div ref={ref} className="pdf-container">
                {/* PAGE 1: Order Confirmation */}
                <div className="pdf-page">
                    <div className="pdf-header">
                        <div className="header-top">
                            <span className="logo-icon">🌱</span>
                            <div className="header-titles">
                                <h1>Desert Bloom</h1>
                                <p>{t('pdf.slogan')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pdf-content">
                        <h2 className="main-title">{t('pdf.title')}</h2>

                        <div className="details-box">
                            <h3>{t('pdf.order_details')}</h3>
                            <p><strong>Order ID:</strong> ORD-{Math.floor(Math.random() * 1000000000)}</p>
                            <p><strong>{t('nav.company')}:</strong> {supplier?.name}</p>
                            <p><strong>{t('pdf.date')}:</strong> {dateFormatted}</p>
                            <p><strong>{t('pdf.time')}:</strong> {timeFormatted}</p>
                            <p><strong>{t('pdf.status')}:</strong> {t('pdf.confirmed')}</p>
                        </div>

                        <div className="farmer-details">
                            <h3>{t('pdf.farmer_details')}</h3>
                            <p><strong>{t('pdf.name')}:</strong> {farmer?.name}</p>
                            <p><strong>{t('pdf.address')}:</strong> {address.line1}, {address.line2}, {address.zip}</p>
                            <p><strong>{t('pdf.phone')}:</strong> {farmer?.phone}</p>
                        </div>

                        <div className="order-items-section">
                            <h3>{t('pdf.order_items')}</h3>
                            <table className="pdf-table">
                                <thead>
                                    <tr>
                                        <th>{t('pdf.product')}</th>
                                        <th>{t('pdf.qty')}</th>
                                        <th>{t('pdf.price')}</th>
                                        <th>{t('order.table_total')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.type}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rs.{item.price.toLocaleString()}</td>
                                            <td>Rs.{item.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="payment-details-section">
                            <h3>{t('pdf.payment_details')}</h3>
                            <div className="payment-row">
                                <span>{t('pdf.total_price')}</span>
                                <span>Rs.{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="payment-row">
                                <span>{t('pdf.pay_on_delivery')}</span>
                                <span>Rs.{downPayment.toLocaleString()}</span>
                            </div>
                            <div className="payment-row final">
                                <span>{t('pdf.remaining')}</span>
                                <span>Rs.{remainingBalance.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="payment-note">
                            {t('pdf.payment_note')}
                        </div>
                    </div>

                    <div className="pdf-footer">
                        <p>Desert Bloom Seeds | www.desertbloom.lk</p>
                        <p>{t('pdf.official_note')}</p>
                    </div>
                </div>

                {/* PAGE 2: Agreement */}
                <div className="pdf-page page-break">
                    <div className="pdf-header">
                        <div className="header-top">
                            <span className="logo-icon">🌱</span>
                            <div className="header-titles">
                                <h1>Desert Bloom</h1>
                                <p>{t('pdf.slogan')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pdf-content">
                        <h2 className="main-title">{t('pdf.agreement')}</h2>

                        <div className="terms-section">
                            <h3>{t('order.terms_title')}</h3>
                            <ol className="pdf-terms">
                                <li>{t('order.term1')}</li>
                                <li>{t('order.term2')}</li>
                                <li>{t('order.term3')}</li>
                                <li>{t('order.term4')}</li>
                                <li>{t('order.term5')}</li>
                                <li>{t('order.term6')}</li>
                                <li>{t('order.term7')}</li>
                            </ol>

                            <p className="legal-disclaimer">
                                {t('pdf.legal_disclaimer')}
                            </p>
                        </div>

                        <div className="signature-area">
                            <div className="sig-row">
                                <div className="sig-block">
                                    <div className="sig-line">..........................................</div>
                                    <p>{t('pdf.date')}</p>
                                </div>
                                <div className="sig-block">
                                    <div className="sig-line">..........................................</div>
                                    <p>{t('pdf.signature')}</p>
                                </div>
                            </div>

                            <div className="sig-row">
                                <div className="sig-block">
                                    <div className="sig-line">..........................................</div>
                                    <p>{t('pdf.date')}</p>
                                </div>
                                <div className="sig-block">
                                    <div className="sig-line">..........................................</div>
                                    <p>{t('pdf.manager_sig')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pdf-footer">
                        <p>Desert Bloom Seeds | www.desertbloom.lk</p>
                        <p>{t('pdf.official_note')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default OrderPDF;
