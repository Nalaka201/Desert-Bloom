import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import '../styles/WelcomeScreen.css';

const SHOW_DURATION = 2200;   // how long the splash stays fully visible
const FADE_DURATION = 400;    // fade-out transition time (keep in sync with CSS)

const WelcomeScreen = ({ onFinish }) => {
    const navigate = useNavigate();
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setIsFadingOut(true), SHOW_DURATION);
        const endTimer = setTimeout(() => {
            if (onFinish) {
                onFinish();
            } else {
                navigate('/', { replace: true });
            }
        }, SHOW_DURATION + FADE_DURATION);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(endTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`welcome-screen ${isFadingOut ? 'welcome-fade-out' : ''}`}>
            <div className="welcome-glow welcome-glow-1"></div>
            <div className="welcome-glow welcome-glow-2"></div>

            <div className="welcome-content">
                <div className="welcome-logo-wrap">
                    <img src={logo} alt="Aswenna.lk Logo" className="welcome-logo" />
                </div>
                <h1 className="welcome-brand-name">Aswenna.lk</h1>
                <p className="welcome-tagline">Plant with Confidence, Harvest with Pride</p>
            </div>

            <div className="welcome-loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default WelcomeScreen;