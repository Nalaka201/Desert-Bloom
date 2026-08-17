import React, { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Stars, Sparkles } from '@react-three/drei';

// Error boundary to protect the application from WebGL / 3D Canvas crashes
export class Weather3DErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Weather3D WebGL Canvas error caught safely:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="ws-bg ws-sunny" style={{ borderRadius: '22px', width: '100%', height: '100%' }} />;
        }
        return this.props.children;
    }
}

// Procedural 3D Cloud Cluster (0 external asset dependency - immune to CDN 429 rate-limiting)
const ProceduralCloud = ({ position = [0, 0, 0], scale = [1, 1, 1], color = '#ffffff', opacity = 0.8 }) => {
    const cloudRef = useRef();

    useFrame((state) => {
        if (cloudRef.current) {
            cloudRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.15 + position[0]) * 0.3;
        }
    });

    return (
        <group ref={cloudRef} position={position} scale={scale}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[1.6, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} />
            </mesh>
            <mesh position={[1.3, 0.3, -0.2]}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} />
            </mesh>
            <mesh position={[-1.3, 0.2, -0.1]}>
                <sphereGeometry args={[1.3, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} />
            </mesh>
            <mesh position={[0.5, 0.8, 0.3]}>
                <sphereGeometry args={[1.1, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} />
            </mesh>
            <mesh position={[-0.6, 0.6, 0.2]}>
                <sphereGeometry args={[1.0, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} />
            </mesh>
        </group>
    );
};

// Robust Rain using Points (Extremely high performance)
const RainParticles = ({ heavy }) => {
    const count = heavy ? 3000 : 1200;
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30; // x
            pos[i * 3 + 1] = Math.random() * 20; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z
        }
        return pos;
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;
        const pos = pointsRef.current.geometry.attributes.position.array;
        const speed = heavy ? 0.4 : 0.2;
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] -= speed + Math.random() * 0.1; // move y down
            if (pos[i * 3 + 1] < -5) {
                pos[i * 3 + 1] = 15; // reset to top
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#a0c0d0" size={0.08} transparent opacity={0.6} />
        </points>
    );
};

// Animated Sun for clear sky
const AnimatedSky = () => {
    const sunRef = useRef([5, 1, 8]);

    useFrame((state) => {
        sunRef.current[0] = 5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
        sunRef.current[1] = 1 + Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    });

    return <Sky distance={450000} sunPosition={sunRef.current} inclination={0} azimuth={0.25} />;
};

const WeatherScene3DContent = ({ code, isDay }) => {
    const getWeatherMeta = (code, isDay) => {
        if (code === 0 || code === 1) return { scene: isDay ? 'sunny' : 'night' };
        if (code === 2) return { scene: 'partly' };
        if (code === 3) return { scene: 'cloudy' };
        if ([45, 48].includes(code)) return { scene: 'foggy' };
        if ([51, 53, 55].includes(code)) return { scene: 'drizzle' };
        if ([61, 63, 65, 80, 81, 82].includes(code)) return { scene: 'rain' };
        if ([95, 96, 99].includes(code)) return { scene: 'thunder' };
        return { scene: 'sunny' };
    };

    const { scene } = getWeatherMeta(code, isDay);

    const cloudColor = scene === 'thunder' ? '#3a3a40' : (scene === 'cloudy' || scene === 'rain' || scene === 'drizzle') ? '#9ca3af' : '#ffffff';
    const bgColor = scene === 'night' ? '#0a0f24' : ['rain', 'drizzle', 'thunder', 'cloudy', 'foggy'].includes(scene) ? '#4a5568' : '#4facfe';
    const lightIntensity = scene === 'night' ? 0.3 : ['rain', 'thunder', 'cloudy', 'foggy'].includes(scene) ? 0.7 : 1.2;

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{ background: bgColor, borderRadius: '22px' }}>
                <ambientLight intensity={lightIntensity} />
                <directionalLight position={[10, 10, 10]} intensity={lightIntensity + 0.5} color={scene === 'night' ? '#7b87c7' : '#ffffff'} />

                {scene === 'night' && <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />}

                {(scene === 'sunny' || scene === 'partly') && <AnimatedSky />}

                <Suspense fallback={null}>
                    {scene === 'sunny' && (
                        <ProceduralCloud position={[0, 4, -6]} scale={[1.2, 0.7, 1]} color="#ffffff" opacity={0.35} />
                    )}

                    {['partly', 'cloudy', 'foggy', 'drizzle', 'rain', 'thunder'].includes(scene) && (
                        <>
                            <ProceduralCloud position={[-2, 3, -4]} scale={[1.6, 0.9, 1.2]} color={cloudColor} opacity={scene === 'foggy' ? 0.4 : 0.8} />
                            <ProceduralCloud position={[4, 4.5, -6]} scale={[1.4, 0.8, 1]} color={cloudColor} opacity={scene === 'foggy' ? 0.3 : 0.6} />
                        </>
                    )}

                    {['cloudy', 'rain', 'thunder', 'drizzle'].includes(scene) && (
                        <ProceduralCloud position={[0, 5, -5]} scale={[2.0, 1.0, 1.4]} color={cloudColor} opacity={0.9} />
                    )}
                </Suspense>

                {scene === 'foggy' && (
                    <fog attach="fog" args={['#95a5a6', 5, 20]} />
                )}

                {['drizzle', 'rain', 'thunder'].includes(scene) && (
                    <>
                        <RainParticles heavy={['rain', 'thunder'].includes(scene)} />
                        {scene === 'thunder' && <Sparkles count={15} scale={20} size={50} color="#f6e58d" speed={4} noise={2} opacity={1} />}
                    </>
                )}
            </Canvas>
        </div>
    );
};

const WeatherScene3D = (props) => (
    <Weather3DErrorBoundary>
        <WeatherScene3DContent {...props} />
    </Weather3DErrorBoundary>
);

export default WeatherScene3D;
