import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NucleusProps {
  protons: number;
  neutrons: number;
  color: string;
}

export const Nucleus: React.FC<NucleusProps> = ({ protons, neutrons, color }) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerCoreRef = useRef<THREE.Mesh>(null);

  // Generate particle coordinate offsets for protons and neutrons in a packed sphere cluster
  const particles = useMemo(() => {
    const list: { pos: [number, number, number]; isProton: boolean }[] = [];
    const totalRepresented = Math.min(protons + neutrons, 45); // cap cluster size for performance
    
    // Simple spherical packing approximation
    for (let i = 0; i < totalRepresented; i++) {
      const isProton = i % 2 === 0 ? list.filter(p => p.isProton).length < protons : !(list.filter(p => !p.isProton).length < neutrons);
      
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.15 + Math.random() * 0.45; // tight cluster radius
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      list.push({ pos: [x, y, z], isProton });
    }
    return list;
  }, [protons, neutrons]);

  // Shared/Cached geometries and materials to avoid duplicate compilation inside the loops
  const protonGeometry = useMemo(() => new THREE.SphereGeometry(0.12, 10, 10), []);
  const neutronGeometry = useMemo(() => new THREE.SphereGeometry(0.12, 10, 10), []);
  
  const protonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8
  }), [color]);

  const neutronMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#475569',
    emissive: '#334155',
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8
  }), []);

  const outerCoreGeometry = useMemo(() => new THREE.SphereGeometry(0.8, 24, 24), []);
  const glowAuraGeometry = useMemo(() => new THREE.SphereGeometry(0.75, 24, 24), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow rotational motion of the nucleus core
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.z = time * 0.1;
    }

    // High energy outer pulsing core shell
    if (outerCoreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.08;
      outerCoreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Central packed core group of protons and neutrons */}
      <group ref={groupRef}>
        {particles.map((p, idx) => (
          <mesh 
            key={idx} 
            position={p.pos}
            geometry={p.isProton ? protonGeometry : neutronGeometry}
            material={p.isProton ? protonMaterial : neutronMaterial}
          />
        ))}
      </group>

      {/* Futuristic glowing outer energy field shell */}
      <mesh ref={outerCoreRef} geometry={outerCoreGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main core glow aura */}
      <mesh geometry={glowAuraGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light representing glow radiation */}
      <pointLight distance={10} intensity={3} color={color} />
    </group>
  );
};
