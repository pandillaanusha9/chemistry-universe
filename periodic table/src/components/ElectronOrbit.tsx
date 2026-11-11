import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSubshellType } from '../utils/orbitHelpers';
import { HighlightState } from './OrbitalControls';

interface ElectronOrbitProps {
  shellIndex: number; // 0 for K, 1 for L, etc.
  electronCount: number;
  shellName: string; // K, L, M, etc.
  baseColor: string;
  highlightState: HighlightState;
}

interface ElectronProps {
  radius: number;
  angleOffset: number;
  speedMultiplier: number;
  shellIndex: number;
  electronIndex: number;
  subshellType: 's' | 'p' | 'd' | 'f';
  color: string;
  highlightState: HighlightState;
}

// Subcomponent representing an individual electron particle, memoized to prevent redundant Fiber sweep checks
const Electron = React.memo<ElectronProps>(({
  radius,
  angleOffset,
  speedMultiplier,
  shellIndex,
  electronIndex,
  subshellType,
  color,
  highlightState
}) => {
  const containerRef = useRef<THREE.Group>(null);
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Determine if this specific electron matches the highlight filter
  const isHighlighted = useMemo(() => {
    if (highlightState.type === 'all') return true;
    if (highlightState.type === 'shell') {
      return highlightState.shellIndex === shellIndex;
    }
    if (highlightState.type === 'subshell') {
      return highlightState.subshellType === subshellType;
    }
    return false;
  }, [highlightState, shellIndex, subshellType]);

  // Pre-compile small-segment geometries once per component mount (extremely cheap for GPU)
  const coreGeometry = useMemo(() => new THREE.SphereGeometry(0.08 + (7 - shellIndex) * 0.01, 8, 8), [shellIndex]);
  const glowGeometry = useMemo(() => new THREE.SphereGeometry(0.16 + (7 - shellIndex) * 0.015, 8, 8), [shellIndex]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = time * speedMultiplier + angleOffset;

    // Orbit position update
    if (containerRef.current) {
      containerRef.current.position.x = radius * Math.cos(angle);
      containerRef.current.position.y = radius * Math.sin(angle);
    }

    // Target opacity lerp (smooth fade in/out)
    const targetOpacity = isHighlighted ? 1.0 : 0.005;
    
    if (coreMatRef.current) {
      coreMatRef.current.opacity += (targetOpacity - coreMatRef.current.opacity) * 0.1;
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity += (targetOpacity * 0.25 - glowMatRef.current.opacity) * 0.1;
    }

    // Dynamic light intensity lerp
    if (lightRef.current) {
      const pulseIntensity = isHighlighted ? 1.5 + Math.sin(time * 8) * 0.5 : 0;
      lightRef.current.intensity += (pulseIntensity - lightRef.current.intensity) * 0.1;
    }

    // Dynamic sizing/scale pulse on highlights
    if (containerRef.current) {
      const pulseScale = isHighlighted ? 1.0 + Math.sin(time * 10) * 0.12 : 1.0;
      containerRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <group ref={containerRef}>
      {/* Central electron sphere */}
      <mesh geometry={coreGeometry}>
        <meshBasicMaterial
          ref={coreMatRef}
          color={color}
          transparent
          toneMapped={false}
        />
      </mesh>

      {/* Glow halo aura */}
      <mesh geometry={glowGeometry}>
        <meshBasicMaterial
          ref={glowMatRef}
          color={color}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light attachment */}
      <pointLight ref={lightRef} distance={1.5} intensity={1.5} color={color} />
    </group>
  );
});

// Subcomponent representing the animated wave ripple around highlighted shells
const EnergyRipple: React.FC<{ radius: number; color: string; visible: boolean }> = ({
  radius,
  color,
  visible
}) => {
  const lineRef = useRef<THREE.LineLoop>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  // Pre-generate angles for geometry buffer updates
  const angles = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 64; i++) {
      arr.push((i / 64) * Math.PI * 2);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Opacity lerp based on visibility toggle
    const targetOpacity = visible ? 0.45 : 0;
    if (materialRef.current) {
      materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.1;
    }

    // Mutate the points inside geometry buffer to create flowing quantum ripples
    if (lineRef.current && (visible || (materialRef.current && materialRef.current.opacity > 0.01))) {
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      
      angles.forEach((angle, idx) => {
        // High frequency micro wave oscillation
        const wave = Math.sin(angle * 7 - time * 6) * 0.12;
        const r = radius + wave;
        
        positions[idx * 3] = r * Math.cos(angle);
        positions[idx * 3 + 1] = r * Math.sin(angle);
        positions[idx * 3 + 2] = 0;
      });
      
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Prepopulate static geometry
  const geom = useMemo(() => {
    const pointsList: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      pointsList.push(new THREE.Vector3(radius, 0, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pointsList);
  }, [radius]);

  return (
    /* @ts-ignore */
    <lineLoop ref={lineRef} geometry={geom}>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </lineLoop>
  );
};

export const ElectronOrbit: React.FC<ElectronOrbitProps> = ({
  shellIndex,
  electronCount,
  shellName,
  baseColor,
  highlightState
}) => {
  const orbitsRef = useRef<THREE.Group>(null);
  const trackMatRef = useRef<THREE.LineBasicMaterial>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  // Shell radius parameters
  const radius = 1.6 + shellIndex * 1.0;
  const speedMultiplier = 1.8 / (shellIndex + 1);

  // Check if this entire shell matches highlighted parameters
  const { isTrackActive, hasActiveSubshell } = useMemo(() => {
    if (highlightState.type === 'all') {
      return { isTrackActive: true, hasActiveSubshell: true };
    }
    if (highlightState.type === 'shell') {
      const active = highlightState.shellIndex === shellIndex;
      return { isTrackActive: active, hasActiveSubshell: active };
    }
    if (highlightState.type === 'subshell' && highlightState.subshellType !== null) {
      // Check if this shell contains any electrons matching the selected subshell type
      let active = false;
      for (let i = 0; i < electronCount; i++) {
        if (getSubshellType(shellIndex, i) === highlightState.subshellType) {
          active = true;
          break;
        }
      }
      return { isTrackActive: active, hasActiveSubshell: active };
    }
    return { isTrackActive: false, hasActiveSubshell: false };
  }, [highlightState, shellIndex, electronCount]);

  // Orbit path points generator
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    const pointsList = curve.getPoints(64);
    return new THREE.BufferGeometry().setFromPoints(pointsList);
  }, [radius]);

  // Gyroscope staggered tilt angles
  const tilts = useMemo(() => {
    const angleX = (shellIndex * 35 * Math.PI) / 180;
    const angleY = (shellIndex * 45 * Math.PI) / 180;
    const angleZ = (shellIndex * 20 * Math.PI) / 180;
    return { x: angleX, y: angleY, z: angleZ };
  }, [shellIndex]);

  useFrame(() => {
    // Determine active target opacities for the track lines
    let targetTrack = 0.3;
    let targetGlow = 0.05;

    if (highlightState.type !== 'all') {
      targetTrack = isTrackActive ? 0.75 : 0.008;
      targetGlow = isTrackActive ? 0.15 : 0;
    }

    if (trackMatRef.current) {
      trackMatRef.current.opacity += (targetTrack - trackMatRef.current.opacity) * 0.1;
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity += (targetGlow - glowMatRef.current.opacity) * 0.1;
    }
  });

  if (electronCount <= 0) return null;

  return (
    <group ref={orbitsRef} rotation={[tilts.x, tilts.y, tilts.z]}>
      {/* Orbit Ring Line */}
      <lineLoop geometry={points}>
        <lineBasicMaterial
          ref={trackMatRef}
          color={baseColor}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </lineLoop>

      {/* Orbit Track glow mesh (slightly wider ring) */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color={baseColor}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Energy Wave Corona (visible when shell is highlighted) */}
      <EnergyRipple
        radius={radius}
        color={baseColor}
        visible={highlightState.type === 'shell' && highlightState.shellIndex === shellIndex}
      />

      {/* Render Individual Electrons */}
      {Array.from({ length: electronCount }).map((_, i) => {
        const subType = getSubshellType(shellIndex, i);
        const angleOffset = (i * 2 * Math.PI) / electronCount;

        return (
          <Electron
            key={i}
            radius={radius}
            angleOffset={angleOffset}
            speedMultiplier={speedMultiplier}
            shellIndex={shellIndex}
            electronIndex={i}
            subshellType={subType}
            color={baseColor}
            highlightState={highlightState}
          />
        );
      })}
    </group>
  );
};
