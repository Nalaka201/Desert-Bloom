import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Clouds, Sky, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Robust Rain using Points (Extremely high performance)
const RainParticles = ({ heavy }) => {
    const count = heavy ? 4000 : 1500;
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
        // Subtle sun movement for a breathing/alive effect in clear sky
        sunRef.current[0] = 5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
        sunRef.current[1] = 1 + Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    });

    return <Sky distance={450000} sunPosition={sunRef.current} inclination={0} azimuth={0.25} />;
};

const WeatherScene3D = ({ code, isDay }) => {
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
    
    const cloudColor = scene === 'thunder' ? '#333333' : (scene === 'cloudy' || scene === 'rain' || scene === 'drizzle') ? '#7f8c8d' : '#ffffff';
    const bgColor = scene === 'night' ? '#0a0f24' : ['rain', 'drizzle', 'thunder', 'cloudy', 'foggy'].includes(scene) ? '#4a5568' : '#4facfe';
    const lightIntensity = scene === 'night' ? 0.3 : ['rain', 'thunder', 'cloudy', 'foggy'].includes(scene) ? 0.7 : 1.2;

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{ background: bgColor, borderRadius: '22px' }}>
                <ambientLight intensity={lightIntensity} />
                <directionalLight position={[10, 10, 10]} intensity={lightIntensity + 0.5} color={scene === 'night' ? '#7b87c7' : '#ffffff'} />
                
                {scene === 'night' && <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />}
                
                {(scene === 'sunny' || scene === 'partly') && <AnimatedSky />}
                
                {/* Suspense is placed INSIDE the Canvas so it doesn't unmount the 3D context while loading cloud textures */}
                <Suspense fallback={null}>
                    {/* Natural Volumetric Clouds using drei */}
                    <Clouds material={THREE.MeshLambertMaterial}>
                        {/* A very faint, slow cloud for Sunny days to add life */}
                        {scene === 'sunny' && (
                            <Cloud segments={15} bounds={[20, 2, 2]} volume={6} color="#ffffff" opacity={0.3} speed={0.1} position={[0, 4, -8]} />
                        )}
                        
                        {['partly', 'cloudy', 'foggy', 'drizzle', 'rain', 'thunder'].includes(scene) && (
                            <>
                                <Cloud segments={40} bounds={[20, 4, 4]} volume={12} color={cloudColor} opacity={scene === 'foggy' ? 0.4 : 0.8} speed={0.1} position={[-2, 3, -5]} />
                                <Cloud segments={30} bounds={[15, 3, 3]} volume={10} color={cloudColor} opacity={scene === 'foggy' ? 0.3 : 0.6} speed={0.15} position={[4, 5, -8]} />
                            </>
                        )}
                        
                        {/* Heavy weather extra clouds */}
                        {['cloudy', 'rain', 'thunder', 'drizzle'].includes(scene) && (
                            <Cloud segments={40} bounds={[25, 5, 5]} volume={15} color={cloudColor} opacity={0.9} speed={0.1} position={[0, 6, -6]} />
                        )}
                    </Clouds>
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

export default WeatherScene3D;
