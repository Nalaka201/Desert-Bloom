import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SupplierSection from '../components/home/SupplierSection';
import FeatureSection from '../components/home/FeatureSection';
import TestimonialSection from '../components/home/TestimonialSection';
import WeatherWidget from '../components/home/WeatherWidget';
import Footer from '../components/common/Footer';
import farmerImg from '../assets/farmer.png';
import '../styles/Home.css';

const frameUrls = import.meta.glob('../assets/Hero frame/*.jpg', { eager: true, import: 'default' });
const sortedFrameUrls = Object.keys(frameUrls).sort().map(key => frameUrls[key]);

const Home = () => {
    const { t } = useTranslation();
    const canvasRef = useRef(null);
    const heroRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef([]);

    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages = await Promise.all(
                sortedFrameUrls.map(url => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => resolve(img);
                        img.src = url;
                    });
                })
            );
            imagesRef.current = loadedImages;
            setImagesLoaded(true);
        };
        preloadImages();
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const hero = heroRef.current;
        const images = imagesRef.current;
        const totalFrames = images.length;
        
        const render = () => {
            if (!hero) return;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
            drawImage(Math.min(totalFrames - 1, Math.floor(Math.max(0, Math.min(1, window.scrollY / (hero.offsetHeight || window.innerHeight))) * totalFrames)));
        };

        const drawImage = (index) => {
            if (!images[index] || !context) return;
            const img = images[index];
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth, drawHeight;
            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
            } else {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
            }
            const x = (canvas.width - drawWidth) / 2;
            const y = (canvas.height - drawHeight) / 2;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, x, y, drawWidth, drawHeight);
        };

        render();

        const handleScroll = () => {
            if (!hero) return;
            const fraction = Math.max(0, Math.min(1, window.scrollY / (hero.offsetHeight || window.innerHeight)));
            const frameIndex = Math.min(totalFrames - 1, Math.floor(fraction * totalFrames));
            drawImage(frameIndex);
        };

        window.addEventListener('resize', render);
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial draw
        handleScroll();

        return () => {
            window.removeEventListener('resize', render);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [imagesLoaded]);

    return (
        <div className="home-page">
            <section className="hero-section" ref={heroRef}>
                <canvas 
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        pointerEvents: 'none',
                        opacity: imagesLoaded ? 0.6 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                    }}
                />
                {/* Ambient glow mesh background */}
                <div className="hero-mesh-overlay"></div>
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
                
                <div className="container hero-grid-container">
                    <div className="hero-content-left">
                        <div className="hero-top-badge">
                            <span className="live-status-pulse"></span>
                            <span className="badge-text">{t('hero.badge')}</span>
                        </div>

                        <h1 className="hero-title">
                            {t('hero.title_part1')}<br />
                            <span className="gradient-text-emerald">{t('hero.title_part2')}</span>
                        </h1>

                        <p className="hero-subtitle">
                            {t('hero.subtitle')}
                        </p>

                        <div className="hero-actions-group">
                            <a href="#suppliers" className="primary-cta-btn">
                                <span>{t('hero.cta')}</span>
                                <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                            <a href="#features" className="secondary-cta-btn">
                                <svg className="shield-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    <polyline points="9 12 11 14 15 10"></polyline>
                                </svg>
                                <span>{t('hero.why_us')}</span>
                            </a>
                        </div>

                        <div className="hero-feature-pills">
                            <div className="pill-item">
                                <svg className="pill-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>{t('hero.iso_seeds')}</span>
                            </div>
                            <div className="pill-item">
                                <svg className="pill-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" rx="2"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                                <span>{t('hero.island_dispatch')}</span>
                            </div>
                            <div className="pill-item">
                                <svg className="pill-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                                <span>{t('hero.direct_rates')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual-right">
                        <div className="glass-visual-card">
                            <div className="visual-image-wrapper">
                                <img src={farmerImg} alt="Modern Farmer" className="hero-visual-img" />
                                <div className="image-gradient-overlay"></div>
                            </div>

                            {/* Floating Telemetry Badges */}
                            <div className="floating-card-badge top-badge">
                                <div className="badge-icon-bg">🌱</div>
                                <div>
                                    <div className="badge-title">{t('hero.germination_title')}</div>
                                    <div className="badge-sub">{t('hero.germination_sub')}</div>
                                </div>
                            </div>

                            <div className="floating-card-badge bottom-badge">
                                <div className="badge-icon-bg">🚜</div>
                                <div>
                                    <div className="badge-title">{t('hero.yala_title')}</div>
                                    <div className="badge-sub">{t('hero.yala_sub')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Stats Bar */}
                <div className="stats-container container">
                    <div className="stat-box">
                        <div className="stat-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18"></path>
                                <path d="M9 8h1"></path>
                                <path d="M9 12h1"></path>
                                <path d="M9 16h1"></path>
                                <path d="M14 8h1"></path>
                                <path d="M14 12h1"></path>
                                <path d="M14 16h1"></path>
                                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                            </svg>
                        </div>
                        <div className="stat-details">
                            <div className="stat-number">6+</div>
                            <div className="stat-text">{t('stats.companies')}</div>
                        </div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                <path d="M12 8v8"></path>
                                <path d="M8 12c2 0 4-2 4-4"></path>
                                <path d="M16 12c-2 0-4-2-4-4"></path>
                            </svg>
                        </div>
                        <div className="stat-details">
                            <div className="stat-number">1000+</div>
                            <div className="stat-text">{t('stats.seeds')}</div>
                        </div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div className="stat-details">
                            <div className="stat-number">100+</div>
                            <div className="stat-text">{t('stats.farmers')}</div>
                        </div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className="stat-details">
                            <div className="stat-number">90%</div>
                            <div className="stat-text">{t('stats.rate')}</div>
                        </div>
                    </div>
                </div>
            </section>


            <WeatherWidget />
            <SupplierSection />
            <FeatureSection />
            <TestimonialSection />
            <Footer />
        </div>
    );
};

export default Home;


