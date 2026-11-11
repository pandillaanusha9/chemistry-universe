import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, FlaskConical, Sparkles } from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

function AtomModel({ position, color = "#22d3ee", scale = 1 }) {
  const group = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.28;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.18;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.5}>
      <group ref={group} position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.25} />
        </mesh>
        {[0, Math.PI / 3, -Math.PI / 3].map((rotation) => (
          <mesh key={rotation} rotation={[Math.PI / 2, rotation, 0]}>
            <torusGeometry args={[0.82, 0.01, 12, 96]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} transparent opacity={0.72} />
          </mesh>
        ))}
        {[0, 2.1, 4.2].map((angle) => (
          <mesh key={angle} position={[Math.cos(angle) * 0.82, 0, Math.sin(angle) * 0.82]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#67e8f9" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function BenzeneRing({ position, scale = 1 }) {
  const group = useRef();
  const points = useMemo(() => {
    return Array.from({ length: 6 }, (_, index) => {
      const angle = (index / 6) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
    });
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = clock.elapsedTime * 0.16;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.35;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={group} position={position} scale={scale}>
        <Line points={[...points, points[0]]} color="#34d399" lineWidth={2} transparent opacity={0.8} />
        {points.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#a7f3d0" emissive="#10b981" emissiveIntensity={1.1} />
          </mesh>
        ))}
        <mesh>
          <torusGeometry args={[0.5, 0.008, 8, 80]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.7} transparent opacity={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

function DnaFragment({ position, scale = 1 }) {
  const group = useRef();
  const steps = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.18;
    group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5) * 0.16;
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={[0.35, 0.2, -0.2]}>
      {steps.map((step) => {
        const y = (step - 8.5) * 0.16;
        const angle = step * 0.8;
        const left = [Math.cos(angle) * 0.35, y, Math.sin(angle) * 0.35];
        const right = [Math.cos(angle + Math.PI) * 0.35, y, Math.sin(angle + Math.PI) * 0.35];
        return (
          <group key={step}>
            <Line points={[left, right]} color="#818cf8" lineWidth={1.2} transparent opacity={0.55} />
            <mesh position={left}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} />
            </mesh>
            <mesh position={right}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function ElementCard3D({ position, label, color }) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.28;
    mesh.current.rotation.x = Math.cos(clock.elapsedTime * 0.28) * 0.12;
  });

  return (
    <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.35}>
      <group ref={mesh} position={position}>
        <mesh>
          <boxGeometry args={[0.75, 0.92, 0.035]} />
          <meshStandardMaterial color="#08111f" emissive={color} emissiveIntensity={0.18} metalness={0.35} roughness={0.2} transparent opacity={0.72} />
        </mesh>
        <Text position={[0, 0.03, 0.04]} fontSize={0.24} color={color} anchorX="center" anchorY="middle">
          {label}
        </Text>
      </group>
    </Float>
  );
}

function ChemistryScene() {
  const rig = useRef();

  useFrame(({ pointer }) => {
    if (!rig.current) return;
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.08, 0.03);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.05, 0.03);
  });

  return (
    <>
      <color attach="background" args={["#03040b"]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 3, 4]} intensity={2.4} color="#22d3ee" />
      <pointLight position={[-4, -2, 2]} intensity={1.8} color="#a855f7" />
      <Stars radius={80} depth={45} count={1100} factor={4} saturation={0} fade speed={0.25} />
      <group ref={rig}>
        <AtomModel position={[-4.35, 1.75, -2.2]} color="#22d3ee" scale={0.74} />
        <AtomModel position={[4.05, -1.3, -1.7]} color="#a855f7" scale={0.62} />
        <BenzeneRing position={[3.95, 1.75, -2.7]} scale={0.66} />
        <BenzeneRing position={[-3.85, -1.9, -2.4]} scale={0.54} />
        <DnaFragment position={[0, 2.25, -3.15]} scale={0.68} />
        <ElementCard3D position={[-4.65, -0.25, -2.5]} label="C" color="#34d399" />
        <ElementCard3D position={[4.6, 0.45, -2.8]} label="Ne" color="#60a5fa" />
        <ElementCard3D position={[0, -2.35, -2.9]} label="Fe" color="#c084fc" />
      </group>
    </>
  );
}

function PortalButton({ to, theme, children }) {
  const classes =
    theme === "organic"
      ? "border-fuchsia-300/80 from-fuchsia-500/16 via-violet-500/8 to-fuchsia-500/12 text-fuchsia-100 shadow-[0_0_34px_rgba(255,64,241,0.38),inset_0_0_24px_rgba(255,64,241,0.08)] hover:border-fuchsia-100 hover:shadow-[0_0_58px_rgba(255,64,241,0.56),inset_0_0_30px_rgba(255,64,241,0.14)]"
      : "border-cyan-300/80 from-cyan-500/18 via-blue-500/10 to-violet-500/14 text-cyan-100 shadow-[0_0_34px_rgba(0,208,255,0.4),inset_0_0_24px_rgba(0,208,255,0.08)] hover:border-cyan-100 hover:shadow-[0_0_58px_rgba(0,208,255,0.58),inset_0_0_30px_rgba(0,208,255,0.14)]";

  return (
    <motion.div whileHover={{ scale: 1.045, y: -3 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={to}
        className={`group relative flex h-32 w-[min(14.5rem,calc(100vw-3rem))] flex-col items-center justify-center gap-2 overflow-hidden rounded-[1rem] border bg-gradient-to-br px-4 py-4 font-[Orbitron] text-center text-sm font-black uppercase leading-tight tracking-[0.04em] backdrop-blur-2xl transition duration-300 sm:w-56 ${classes}`}
      >
        <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
        <span className="relative">{children}</span>
        <span className="relative max-w-40 font-[Space_Grotesk] text-[11px] font-medium normal-case leading-4 tracking-normal text-white/78">
          {theme === "organic" ? "Discover the chemistry of life" : "Explore the building blocks of matter"}
        </span>
        <span className="relative text-sm leading-none">-&gt;</span>
      </Link>
    </motion.div>
  );
}

export default function ChemistryUniverseHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="chemistry-universe relative min-h-screen overflow-hidden bg-[#03040b] text-white">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#03040b]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="relative grid h-28 w-28 place-items-center">
              <div className="absolute inset-0 rounded-full border border-cyan-300/15" />
              <div className="absolute inset-2 rounded-full border-t border-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.35)] animate-spin" />
              <Atom className="text-cyan-200 drop-shadow-[0_0_18px_rgba(34,211,238,0.75)]" size={34} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-95">
        <Canvas camera={{ position: [0, 0, 5.8], fov: 48 }} dpr={[1, 1.7]}>
          <Suspense fallback={null}>
            <ChemistryScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,20,38,0.12),rgba(3,4,11,0.58)_64%,rgba(3,4,11,0.92))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-cyan-400/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 chemistry-particles" />

      <header className="pointer-events-none absolute left-5 top-6 z-20 flex items-center gap-4 sm:left-12">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-fuchsia-300/30 bg-violet-500/10 text-fuchsia-200 shadow-[0_0_22px_rgba(168,85,247,0.58)] backdrop-blur-xl">
          <FlaskConical size={28} />
        </span>
        <span className="font-[Space_Grotesk] text-lg font-medium text-white sm:text-2xl">Pandilla Anusha</span>
      </header>

      <section className="relative z-10 grid min-h-screen place-items-center px-5 pb-24 pt-28 sm:pb-28 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 26 : 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.42em] text-white/84 sm:text-base">
            <Sparkles size={16} className="text-fuchsia-300 drop-shadow-[0_0_12px_rgba(255,64,241,0.75)]" />
            Explore <span className="text-cyan-100">•</span> Learn <span className="text-cyan-100">•</span> Understand
          </div>

          <h1 className="universe-title text-balance font-[Orbitron] text-5xl font-black uppercase leading-[0.92] tracking-[0.06em] sm:text-7xl lg:text-[7.4rem]">
            <span className="universe-title-pink block">Chemistry</span>
            <span className="universe-title-blue block">Universe</span>
          </h1>

          <p className="mt-7 max-w-2xl font-[Space_Grotesk] text-base leading-7 text-cyan-50/82 sm:text-2xl">
            Your interactive gateway to Organic and Inorganic Chemistry
          </p>

          <motion.div
            className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:gap-7"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 22 : 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
          >
            <PortalButton to="/inorganic" theme="inorganic">
              Inorganic Chemistry
            </PortalButton>
            <PortalButton to="/organic" theme="organic">
              Organic Chemistry
            </PortalButton>
          </motion.div>
        </motion.div>
      </section>

      <footer className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex items-center justify-center gap-3 px-5 text-center font-[Space_Grotesk] text-sm text-white/78 sm:text-base">
        <FlaskConical size={28} className="text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
        <span>Designed and Developed by <span className="text-fuchsia-300">Pandilla Anusha</span></span>
      </footer>
    </main>
  );
}
