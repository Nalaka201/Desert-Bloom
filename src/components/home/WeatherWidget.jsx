import React, { useState, useEffect, useCallback, Suspense } from 'react';
import WeatherScene3D from './WeatherScene3D';
import '../../styles/WeatherWidget.css';

/* ── Districts ─────────────────────────────────────────────────────── */
const DISTRICTS = [
    { name: 'Anuradhapura', lat: 8.3114, lon: 80.4037 },
    { name: 'Polonnaruwa',  lat: 7.9403, lon: 81.0188 },
    { name: 'Kurunegala',   lat: 7.4818, lon: 80.3609 },
    { name: 'Kandy',        lat: 7.2906, lon: 80.6337 },
];

/* ── High Demand Seeds (stock-ticker data) ─────────────────────────── */
const DEMAND_SEEDS = [
    { name: 'Keeri Samba Rice', variety: 'BG 352',         trend: 'up',     change: '+12%' },
    { name: 'Hybrid Tomato',    variety: 'Lanka 220',       trend: 'up',     change: '+8%'  },
    { name: 'Nadu Rice',        variety: 'AT 353',          trend: 'stable', change: '±0%'  },
    { name: 'Green Chilli',     variety: 'MI 1',            trend: 'up',     change: '+18%' },
    { name: 'Capsicum',         variety: 'Yaro F1',         trend: 'down',   change: '-5%'  },
    { name: 'Bitter Gourd',     variety: 'MC 43',           trend: 'up',     change: '+6%'  },
    { name: 'Cowpea',           variety: 'Bombay',          trend: 'up',     change: '+22%' },
    { name: 'Brinjal',          variety: 'HORDI Lenathe',   trend: 'stable', change: '+2%'  },
    { name: 'Soybean',          variety: 'PB 1',            trend: 'up',     change: '+15%' },
    { name: 'Watermelon',       variety: 'Sugar Baby',      trend: 'up',     change: '+10%' },
];

/* ── Weather code → scene type ─────────────────────────────────────── */
const getWeatherMeta = (code, isDay) => {
    if (code === 0) return { label: 'Clear Sky',      emoji: isDay ? '☀️' : '🌙', scene: isDay ? 'sunny' : 'night', rain: false };
    if (code === 1) return { label: 'Mainly Clear',   emoji: isDay ? '🌤️' : '🌙', scene: isDay ? 'sunny' : 'night', rain: false };
    if (code === 2) return { label: 'Partly Cloudy',  emoji: '⛅', scene: 'partly', rain: false };
    if (code === 3) return { label: 'Overcast',       emoji: '☁️', scene: 'cloudy', rain: false };
    if ([45, 48].includes(code))       return { label: 'Foggy',         emoji: '🌫️', scene: 'foggy',   rain: false };
    if ([51, 53, 55].includes(code))   return { label: 'Drizzle',       emoji: '🌦️', scene: 'drizzle', rain: true  };
    if ([61, 63, 65].includes(code))   return { label: 'Rain',          emoji: '🌧️', scene: 'rain',    rain: true  };
    if ([80, 81, 82].includes(code))   return { label: 'Rain Showers',  emoji: '🌧️', scene: 'rain',    rain: true  };
    if ([95, 96, 99].includes(code))   return { label: 'Thunderstorm',  emoji: '⛈️', scene: 'thunder', rain: true  };
    return { label: 'Unknown', emoji: '🌡️', scene: 'sunny', rain: false };
};

/* ── Farming advice logic ────────────────────────────────────────────── */
const getFarmingAdvice = (meta, temp, humidity) => {
    if (meta.rain) return {
        status: 'caution',
        title: 'Farming Caution',
        advice: 'Postpone spraying & sowing. Rain may wash away chemicals.',
        icon: '⚠️',
        checks: [
            { ok: false, label: 'Spraying chemicals' }, { ok: false, label: 'Sowing seeds' },
            { ok: true,  label: 'Check drainage'     }, { ok: true,  label: 'Indoor preparation' },
        ],
    };
    if (temp > 35) return {
        status: 'warning',
        title: 'High Temperature Alert',
        advice: 'Avoid farming 11am–3pm. Ensure adequate irrigation.',
        icon: '🌡️',
        checks: [
            { ok: false, label: 'Midday fieldwork'   }, { ok: true,  label: 'Early morning tasks' },
            { ok: true,  label: 'Monitor irrigation' }, { ok: true,  label: 'Apply preventive care' },
        ],
    };
    if (humidity > 85) return {
        status: 'warning',
        title: 'Disease Risk Alert',
        advice: 'High humidity – fungal disease risk. Apply fungicide preventively.',
        icon: '🍄',
        checks: [
            { ok: false, label: 'Midday fieldwork'    }, { ok: true,  label: 'Early morning tasks' },
            { ok: true,  label: 'Apply fungicide'     }, { ok: true,  label: 'Inspect for disease' },
        ],
    };
    return {
        status: 'good',
        title: 'Good Day for Farming',
        advice: 'Excellent conditions for sowing, irrigation and spraying.',
        icon: '✅',
        checks: [
            { ok: true, label: 'Sowing seeds'      }, { ok: true, label: 'Apply fertilizer' },
            { ok: true, label: 'Spray pesticides'  }, { ok: true, label: 'Harvest crops'    },
        ],
    };
};



/* ══════════════════════════════════════════════════════════════════════
   HIGH DEMAND SEED VARIETIES TICKER
   ══════════════════════════════════════════════════════════════════════ */
const SeedTicker = () => {
    const doubled = [...DEMAND_SEEDS, ...DEMAND_SEEDS];
    return (
        <div className="demand-ticker-bar">
            <div className="demand-ticker-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                </svg>
                <span>HIGH DEMAND</span>
            </div>
            <div className="demand-ticker-mask">
                <div className="demand-ticker-track">
                    {doubled.map((s, i) => (
                        <div key={i} className="demand-ticker-item">
                            <span className="dti-name">{s.name}</span>
                            <span className="dti-variety">{s.variety}</span>
                            <span className={`dti-change dti-${s.trend}`}>
                                {s.trend === 'up' ? '▲' : s.trend === 'down' ? '▼' : '—'} {s.change}
                            </span>
                            <span className="dti-sep" aria-hidden>•</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   MAIN WEATHER WIDGET
   ══════════════════════════════════════════════════════════════════════ */
const WeatherWidget = () => {
    const [activeDistrict, setActiveDistrict] = useState(0);
    const [weatherData,    setWeatherData]    = useState({});
    const [loading,        setLoading]        = useState(true);
    const [lastUpdated,    setLastUpdated]    = useState(null);
    const [locStatus,      setLocStatus]      = useState('idle');

    /* Auto-detect location */
    const detectLocation = useCallback(() => {
        if (!navigator.geolocation) return;
        setLocStatus('detecting');
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                let minD = Infinity, nearestIdx = 0;
                DISTRICTS.forEach((d, i) => {
                    const dist = Math.hypot(d.lat - latitude, d.lon - longitude);
                    if (dist < minD) { minD = dist; nearestIdx = i; }
                });
                setActiveDistrict(nearestIdx);
                setLocStatus('found');
            },
            () => setLocStatus('denied'),
            { timeout: 8000 }
        );
    }, []);

    useEffect(() => { detectLocation(); }, [detectLocation]);

    /* Fetch weather from Open-Meteo (free, no API key) */
    const fetchWeather = useCallback(async () => {
        const results = {};
        await Promise.all(DISTRICTS.map(async (d) => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day&timezone=Asia%2FColombo`;
                const json = await (await fetch(url)).json();
                const c = json.current;
                results[d.name] = {
                    temp: Math.round(c.temperature_2m),
                    humidity: c.relative_humidity_2m,
                    precip: c.precipitation,
                    wind: Math.round(c.wind_speed_10m),
                    code: c.weather_code,
                    isDay: c.is_day === 1,
                };
            } catch { results[d.name] = null; }
        }));
        setWeatherData(results);
        setLoading(false);
        setLastUpdated(new Date());
    }, []);

    useEffect(() => {
        fetchWeather();
        const iv = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(iv);
    }, [fetchWeather]);

    const district = DISTRICTS[activeDistrict];
    const data     = weatherData[district?.name];
    const meta     = data ? getWeatherMeta(data.code, data.isDay) : null;
    const advice   = data && meta ? getFarmingAdvice(meta, data.temp, data.humidity) : null;

    const fmtTime = (d) => d?.toLocaleTimeString('en-LK', { hour: '2-digit', minute: '2-digit' }) ?? '';

    return (
        <section className="weather-widget-section">

            {/* ── High Demand Varieties Ticker ── */}
            <SeedTicker />

            <div className="container">
                {/* ── Section Header ── */}
                <div className="weather-widget-header">
                    <div className="weather-section-label">
                        <span className="live-dot" />
                        <span>LIVE WEATHER — FARMING ADVISORY</span>
                    </div>
                    <h2 className="weather-section-title">
                        Today's Field Conditions
                        <span className="weather-title-accent"> for Your District</span>
                    </h2>
                    <p className="weather-section-sub">Real-time data • Open-Meteo API • Auto-refreshes every 30 min</p>
                </div>

                {/* ── Auto-location banner ── */}
                {locStatus === 'detecting' && (
                    <div className="loc-banner loc-detecting">
                        <span className="loc-spin" />
                        Detecting your nearest district...
                    </div>
                )}
                {locStatus === 'found' && (
                    <div className="loc-banner loc-found">
                        <span>📍</span>
                        Nearest district auto-selected: <strong>{district.name}</strong>
                    </div>
                )}
                {locStatus === 'denied' && (
                    <div className="loc-banner loc-denied">
                        <span>📍 Location access denied. Select district manually.</span>
                        <button className="loc-retry-btn" onClick={detectLocation}>Try Again</button>
                    </div>
                )}

                {/* ── District Tabs ── */}
                <div className="weather-district-tabs">
                    {DISTRICTS.map((d, i) => (
                        <button
                            key={d.name}
                            className={`district-tab ${activeDistrict === i ? 'active' : ''}`}
                            onClick={() => { setActiveDistrict(i); setLocStatus('idle'); }}
                        >
                            <span className="tab-name-en">{d.name}</span>
                        </button>
                    ))}
                </div>

                {/* ── Main Grid ── */}
                <div className="weather-main-grid">

                    {/* Left: Current Conditions */}
                    <div className="weather-conditions-card">
                        {/* Animated weather scene */}
                        <div className="weather-scene-panel" style={{ padding: 0, overflow: 'hidden' }}>
                            <Suspense fallback={<div className="ws-bg ws-sunny"><div className="scene-loader" /></div>}>
                                {loading
                                    ? <div className="ws-bg ws-sunny"><div className="scene-loader" /></div>
                                    : data
                                        ? <WeatherScene3D code={data.code} isDay={data.isDay} />
                                        : <WeatherScene3D code={0} isDay={true} />
                                }
                            </Suspense>
                            {meta && (
                                <div className="scene-overlay">
                                    <span className="scene-emoji-lrg">{meta.emoji}</span>
                                    <span className="scene-cond-label">{meta.label}</span>
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div className="weather-loading"><div className="weather-spinner" /><span>Loading…</span></div>
                        ) : data ? (
                            <>
                                <div className="weather-location-row">
                                    <svg className="loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <div>
                                        <span className="location-name">{district.name}</span>
                                    </div>
                                </div>

                                <div className="weather-primary-display">
                                    <div className="weather-icon-large">{meta.emoji}</div>
                                    <div className="weather-temp-block">
                                        <div className="weather-temp">{data.temp}°C</div>
                                        <div className="weather-condition-label">{meta.label}</div>
                                    </div>
                                </div>

                                <div className="weather-metrics-row">
                                    {[
                                        { icon: '💧', val: `${data.humidity}%`,  lbl: 'Humidity'   },
                                        { icon: '🌬️', val: `${data.wind} km/h`, lbl: 'Wind'       },
                                        { icon: '🌧️', val: `${data.precip} mm`, lbl: 'Rainfall'   },
                                    ].map(m => (
                                        <div key={m.lbl} className="metric-pill">
                                            <span className="metric-icon">{m.icon}</span>
                                            <div>
                                                <div className="metric-value">{m.val}</div>
                                                <div className="metric-label">{m.lbl}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="weather-footer-row">
                                    <span className="last-updated">🕐 {fmtTime(lastUpdated)}</span>
                                    <button className="refresh-btn" onClick={fetchWeather}>↻ Refresh</button>
                                </div>
                            </>
                        ) : (
                            <div className="weather-error">⚠️ Could not load weather data</div>
                        )}
                    </div>

                    {/* Right: Farming Advice */}
                    <div className={`farming-advice-card advice-${advice?.status || 'good'}`}>
                        {loading ? (
                            <div className="weather-loading"><div className="weather-spinner" /><span>Generating advice…</span></div>
                        ) : advice ? (
                            <>
                                <div className="advice-status-badge">
                                    <span className={`advice-dot dot-${advice.status}`} />
                                    <span className="advice-badge-text">
                                        { advice.status === 'good'    ? 'FARMING RECOMMENDED'
                                        : advice.status === 'caution' ? 'FARMING CAUTION'
                                        :                               'WEATHER ALERT' }
                                    </span>
                                </div>

                                <div className="advice-icon">{advice.icon}</div>
                                <h3 className="advice-title-en">{advice.title}</h3>
                                <p  className="advice-text-en">{advice.advice}</p>

                                <div className="advice-rain-indicator">
                                    <div className={`rain-status-pill ${meta?.rain ? 'raining' : 'dry'}`}>
                                        {meta?.rain ? '🌧️ Rain Expected Today' : '☀️ No Rain Expected Today'}
                                    </div>
                                </div>

                                <div className="advice-checklist">
                                    {advice.checks.map((c, i) => (
                                        <div key={i} className={`check-item ${c.ok ? 'yes' : 'no'}`}>
                                            {c.ok ? '✓' : '✕'} {c.label}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="weather-error">⚠️ No advice available</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeatherWidget;
