import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ChemicalElement, CATEGORIES } from '../data/elements';
import { Nucleus } from './Nucleus';
import { ElectronOrbit } from './ElectronOrbit';
import { HighlightState } from './OrbitalControls';

interface AtomViewerProps {
  element: ChemicalElement;
  highlightState: HighlightState;
}

// Shell labels mapping
const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

// Colors for Bohr shells K-Q
const SHELL_COLORS = [
  '#00f3ff', // K: Cyber Blue
  '#39ff14', // L: Cyber Green
  '#ffe600', // M: Cyber Yellow
  '#bd00ff', // N: Cyber Purple
  '#ff007f', // O: Cyber Pink
  '#ff9000', // P: Cyber Orange
  '#ff3333'  // Q: Cyber Red
];

// Floating Quantum background particles
const AmbientQuantumCloud: React.FC<{ highlightState: HighlightState }> = ({ highlightState }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const [positions, sizes] = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Uniform random coordinates in a bounding cube
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 0.08 + 0.02;
    }
    return [pos, sz];
  }, []);

  const positionArgs = useMemo(() => [positions, 3] as [Float32Array, number], [positions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.rotation.x = time * 0.01;
    }

    // Dampen quantum background particles on filter active for better visual contrast
    const targetOpacity = highlightState.type !== 'all' ? 0.005 : 0.35;
    if (matRef.current) {
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={positionArgs}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#00f3ff"
        size={0.06}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const Scene: React.FC<AtomViewerProps> = ({ element, highlightState }) => {
  const categoryConfig = CATEGORIES[element.category];
  const themeColor = categoryConfig?.color || '#00f3ff';

  return (
    <>
      <color attach="background" args={['#020205']} />
      
      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.7} />
      <hemisphereLight args={['#ffffff', '#111111', 0.65]} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.9} />
      <pointLight position={[0, 6, 8]} intensity={0.8} color="#88f8ff" />

      {/* Floating Quantum Particles */}
      <AmbientQuantumCloud highlightState={highlightState} />

      {/* Pulsing Core Nucleus */}
      <Nucleus
        protons={element.protons}
        neutrons={element.neutrons}
        color={themeColor}
      />

      {/* Render Orbit Rings and Electrons */}
      {element.shells.map((count, idx) => (
        <ElectronOrbit
          key={idx}
          shellIndex={idx}
          electronCount={count}
          shellName={SHELL_NAMES[idx] || '?'}
          baseColor={SHELL_COLORS[idx] || themeColor}
          highlightState={highlightState}
        />
      ))}

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={15}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />

      {/* Fullscreen Post-Processing Bloom */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur={true}
        />
      </EffectComposer>
    </>
  );
};

export const AtomViewer: React.FC<AtomViewerProps> = ({ element, highlightState }) => {
  return (
    <div className="absolute inset-0">
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 5, 8], fov: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene element={element} highlightState={highlightState} />
      </Canvas>

      {/* In-Scene Sci-Fi Camera Guidance HUD overlay */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none font-mono text-[10px] text-cyan-400/60 flex flex-col gap-1.5 bg-gray-950/60 p-3 rounded border border-white/5 backdrop-blur-md">
        <div className="text-white font-bold text-xs mb-1 uppercase tracking-wider">// SYSTEM SENSORS</div>
        <div>AXIS ROTATION: ACTIVE</div>
        <div>ORBIT ZOOM: SCROLL WHEEL</div>
        <div>DRAG ROTATION: LEFT CLICK + DRAG</div>
        <div>ELECTRON SPEED: ORBIT STABILIZED</div>
      </div>
    </div>
  );
};
export default AtomViewer;
