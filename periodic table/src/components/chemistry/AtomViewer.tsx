import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SBlockElement } from './sblockData';

interface AtomViewerProps {
  element: SBlockElement;
  valenceOnly?: boolean;
  activeShell?: number | null;
}

const SHELL_COLORS = ['#00f5ff', '#ff2bd6', '#7cff00', '#ffb000', '#8b5cf6', '#ff3355', '#2f80ff'];

const getShellColor = (shellIndex: number) => SHELL_COLORS[shellIndex % SHELL_COLORS.length];

const ShellRing: React.FC<{ radius: number; active: boolean; dimmed: boolean; tilt: number; color: string }> = ({ radius, active, dimmed, tilt, color }) => (
  <group rotation={[tilt, 0, 0]}>
    <mesh>
      <torusGeometry args={[radius, active ? 0.018 : 0.014, 12, 120]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={active ? 0.95 : dimmed ? 0.12 : 0.52}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
    <mesh>
      <torusGeometry args={[radius + 0.012, 0.006, 8, 120]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={active ? 0.4 : dimmed ? 0.04 : 0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  </group>
);

const ElectronShell: React.FC<{
  shellIndex: number;
  electrons: number;
  radius: number;
  valenceShell: boolean;
  valenceOnly: boolean;
  activeShell: number | null;
}> = ({ shellIndex, electrons, radius, valenceShell, valenceOnly, activeShell }) => {
  const groupRef = useRef<THREE.Group>(null);
  const focusMode = activeShell !== null;
  const dimmed = focusMode ? activeShell !== shellIndex : valenceOnly && !valenceShell;
  const highlighted = focusMode ? activeShell === shellIndex : valenceShell;
  const shellColor = getShellColor(shellIndex);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * (0.35 + shellIndex * 0.11);
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + shellIndex) * 0.18;
    }
  });

  return (
    <group ref={groupRef} rotation={[shellIndex * 0.35, shellIndex * 0.22, 0]}>
      <ShellRing radius={radius} active={highlighted} dimmed={dimmed} tilt={Math.PI / 2} color={shellColor} />
      {Array.from({ length: electrons }).map((_, index) => {
        const angle = (index / electrons) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const electronIsValence = valenceShell;
        return (
          <mesh key={`${shellIndex}-${index}`} position={[x, y, 0]}>
            <sphereGeometry args={[electronIsValence ? 0.075 : 0.045, 16, 16]} />
            <meshBasicMaterial
              color={dimmed ? '#020617' : shellColor}
              transparent
              opacity={highlighted ? 1 : dimmed ? 0.08 : electronIsValence ? 0.95 : 0.5}
            />
            {highlighted && (
              <pointLight color={shellColor} intensity={0.55} distance={1.25} />
            )}
          </mesh>
        );
      })}
    </group>
  );
};

const AtomScene: React.FC<AtomViewerProps> = ({ element, valenceOnly = false, activeShell = null }) => {
  const maxShells = element.shells.length;
  const scale = maxShells > 5 ? 0.72 : maxShells > 4 ? 0.82 : 1;
  const shellData = useMemo(
    () => element.shells.map((electrons, index) => ({
      electrons,
      radius: 0.65 + index * 0.43,
      valenceShell: index === element.shells.length - 1
    })),
    [element]
  );

  return (
    <>
      <color attach="background" args={['#01040a']} />
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 4]} intensity={1.8} color="#22d3ee" />
      <group scale={scale}>
        <mesh>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshStandardMaterial color="#0f172a" emissive="#0891b2" emissiveIntensity={1.6} roughness={0.2} metalness={0.5} />
          <pointLight color="#22d3ee" intensity={1.2} distance={3} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {shellData.map((shell, index) => (
          <ElectronShell
            key={index}
            shellIndex={index}
            electrons={shell.electrons}
            radius={shell.radius}
            valenceShell={shell.valenceShell}
            valenceOnly={valenceOnly}
            activeShell={activeShell}
          />
        ))}
      </group>
      <OrbitControls enablePan={false} enableZoom minDistance={3.4} maxDistance={8} autoRotate autoRotateSpeed={0.28} />
      <EffectComposer>
        <Bloom intensity={1.6} luminanceThreshold={0.12} luminanceSmoothing={0.8} mipmapBlur />
      </EffectComposer>
    </>
  );
};

export const AtomViewer: React.FC<AtomViewerProps> = (props) => (
  <div className="h-[320px] min-h-[320px] w-full overflow-hidden rounded-lg border border-cyan-400/20 bg-black shadow-[inset_0_0_34px_rgba(34,211,238,0.08)]">
    <Canvas camera={{ position: [0, 0.4, 5.4], fov: 48 }} gl={{ antialias: true, alpha: false }}>
      <AtomScene {...props} />
    </Canvas>
  </div>
);
