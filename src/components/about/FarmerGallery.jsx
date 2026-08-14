import React from 'react';
import '../../styles/FarmerGallery.css';

const FarmerGallery = () => {
    const galleryItems = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=800&auto=format&fit=crop",
            name: "Saman Kumara",
            role: "Increased yield by 40% with Hybrid Paddy",
            location: "Anuradhapura"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
            name: "Nihal Perera",
            role: "Expanded farm using Premium Carrot Seeds",
            location: "Nuwara Eliya"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop",
            name: "Ranjith Silva",
            role: "Exporting quality Maize to international markets",
            location: "Polonnaruwa"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1589923188651-268a976f0c43?q=80&w=800&auto=format&fit=crop",
            name: "Sunil Rathnayake",
            role: "Record breaking Onion harvest this Yala season",
            location: "Dambulla"
        }
    ];

    return (
        <section className="farmer-gallery-section container">
            <div className="gallery-header">
                <span className="eyebrow">Success Stories</span>
                <h2 className="gallery-title">Farmers Who Grew With Us</h2>
                <p className="gallery-subtitle">
                    Meet the inspiring farmers who transformed their lives and boosted their harvests 
                    using our premium quality seeds and dedicated agronomy support.
                </p>
            </div>

            <div className="gallery-grid">
                {galleryItems.map((item) => (
                    <div className="gallery-card" key={item.id}>
                        <div className="gallery-image-wrapper">
                            <img src={item.image} alt={item.name} className="gallery-image" />
                            <div className="gallery-overlay">
                                <span className="location-pin">📍 {item.location}</span>
                            </div>
                        </div>
                        <div className="gallery-info">
                            <h3 className="gallery-name">{item.name}</h3>
                            <p className="gallery-role">{item.role}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="cta-wrapper">
                <div className="cta-box">
                    <div className="cta-content">
                        <h3>Ready to Transform Your Harvest?</h3>
                        <p>Join thousands of successful farmers experiencing higher yields and better profits.</p>
                    </div>
                    <button className="cta-button">Join Our Community</button>
                </div>
            </div>
        </section>
    );
};

export default FarmerGallery;
