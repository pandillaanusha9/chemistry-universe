import { Atom, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import { categories, moleculeModels, applyCustomBondOrders } from "../data/chemistryContent";

function Floating3DMolecule({ model = "methane", label = "Alkane", className, delay = 0 }) {
  const containerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let viewer;
    let cancelled = false;
    let animationFrameId;

    if (!containerRef.current) return undefined;
    containerRef.current.innerHTML = "";

    const load3Dmol = () => {
      if (typeof window !== "undefined" && window["3Dmol"]?.createViewer) {
        return Promise.resolve(window["3Dmol"]);
      }

      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector("script[data-chemistry-universe-3dmol]");
        const finish = () => {
          if (window["3Dmol"]?.createViewer) resolve(window["3Dmol"]);
          else reject(new Error("3Dmol browser bundle did not initialize"));
        };

        if (existingScript) {
          existingScript.addEventListener("load", finish, { once: true });
          existingScript.addEventListener("error", reject, { once: true });
          finish();
          return;
        }

        const script = document.createElement("script");
        script.src = "/vendor/3Dmol-min.js";
        script.async = true;
        script.dataset.chemistryUniverse3dmol = "true";
        script.onload = finish;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    load3Dmol()
      .then((module) => {
        if (cancelled || !containerRef.current) return;
        const $3Dmol = module;
        viewer = $3Dmol.createViewer(containerRef.current, { backgroundColor: "rgba(0,0,0,0)" });
        viewer.setBackgroundColor(0x000000, 0);
        
        const modelData = moleculeModels[model] || moleculeModels.methane;
        const m = viewer.addModel(modelData, "xyz");
        applyCustomBondOrders(m);
        viewer.setStyle({}, { 
          stick: { radius: 0.18, colorscheme: "Jmol" }, 
          sphere: { scale: 0.32, colorscheme: "Jmol" } 
        });

        // 1. Core Organic Backbone Elements
        viewer.setStyle({ elem: "C" }, { stick: { radius: 0.18, color: "#8A8A8A" }, sphere: { scale: 0.32, color: "#8A8A8A" } });  // Medium Grey Carbon
        viewer.setStyle({ elem: "H" }, { stick: { radius: 0.18, color: "#FFFFFF" }, sphere: { scale: 0.32, color: "#FFFFFF" } });  // White Hydrogen
        viewer.setStyle({ elem: "O" }, { stick: { radius: 0.18, color: "#FF3B30" }, sphere: { scale: 0.32, color: "#FF3B30" } });  // Bright Red Oxygen
        viewer.setStyle({ elem: "N" }, { stick: { radius: 0.18, color: "#2F80FF" }, sphere: { scale: 0.32, color: "#2F80FF" } });  // Electric Blue Nitrogen
        viewer.setStyle({ elem: "S" }, { stick: { radius: 0.18, color: "#FFD60A" }, sphere: { scale: 0.32, color: "#FFD60A" } });  // Bright Yellow Sulfur
        viewer.setStyle({ elem: "P" }, { stick: { radius: 0.18, color: "#FF9500" }, sphere: { scale: 0.32, color: "#FF9500" } });  // Neon Orange Phosphorus

        // 2. Halogens
        viewer.setStyle({ elem: "F" }, { stick: { radius: 0.18, color: "#50FA7B" }, sphere: { scale: 0.32, color: "#50FA7B" } });  // Mint Green Fluorine
        viewer.setStyle({ elem: "Cl" }, { stick: { radius: 0.18, color: "#32D74B" }, sphere: { scale: 0.32, color: "#32D74B" } }); // Lime Green Chlorine
        viewer.setStyle({ elem: "Br" }, { stick: { radius: 0.18, color: "#FF6B35" }, sphere: { scale: 0.32, color: "#FF6B35" } }); // Deep Orange-Red Bromine
        viewer.setStyle({ elem: "I" }, { stick: { radius: 0.18, color: "#B026FF" }, sphere: { scale: 0.32, color: "#B026FF" } });  // Violet Iodine

        // 3. Alkali & Alkaline Earth Metals
        viewer.setStyle({ elem: "Na" }, { stick: { radius: 0.18, color: "#00E5FF" }, sphere: { scale: 0.38, color: "#00E5FF" } }); // Bright Cyan Sodium
        viewer.setStyle({ elem: "K" }, { stick: { radius: 0.18, color: "#C77DFF" }, sphere: { scale: 0.40, color: "#C77DFF" } });  // Lavender Potassium
        viewer.setStyle({ elem: "Mg" }, { stick: { radius: 0.18, color: "#00D68F" }, sphere: { scale: 0.35, color: "#00D68F" } }); // Light Emerald Magnesium
        viewer.setStyle({ elem: "Ca" }, { stick: { radius: 0.18, color: "#FFB26B" }, sphere: { scale: 0.38, color: "#FFB26B" } }); // Peach Orange Calcium

        // 4. Transition Metals & Extra Elements
        viewer.setStyle({ elem: "Fe" }, { stick: { radius: 0.18, color: "#C56B3D" }, sphere: { scale: 0.35, color: "#C56B3D" } }); // Copper Brown Iron
        viewer.setStyle({ elem: "Cu" }, { stick: { radius: 0.18, color: "#00C2A8" }, sphere: { scale: 0.35, color: "#00C2A8" } }); // Turquoise Copper
        viewer.setStyle({ elem: "Zn" }, { stick: { radius: 0.18, color: "#AAB8FF" }, sphere: { scale: 0.35, color: "#AAB8FF" } }); // Silver Blue Zinc
        viewer.zoomTo();
        viewer.render();
        setError("");

        const spin = () => {
          if (viewer) {
            viewer.rotate(0.35, "y");
            viewer.rotate(0.12, "x");
            viewer.render();
          }
          animationFrameId = requestAnimationFrame(spin);
        };
        spin();
      })
      .catch(() => setError("3D unavailable"));

    return () => {
      cancelled = true;
      if (viewer) viewer.clear();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [model]);

  return (
    <motion.div
      className={`absolute select-none pointer-events-none z-10 ${className}`}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: 180, height: 180 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-cyan-400/30 bg-transparent shadow-[0_0_30px_rgba(6,182,212,0.25)] dark:border-cyan-400/20 dark:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
        <div ref={containerRef} className="h-full w-full opacity-95" />
        
        {/* Label Badge */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full border border-cyan-200/50 bg-white/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-cyan-800 shadow-sm dark:border-cyan-500/20 dark:bg-slate-900/80 dark:text-cyan-200">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden py-20 text-center">
          <Floating3DMolecule model="methane" label="Alkyl" className="left-2 top-20 opacity-45 sm:left-4 sm:opacity-70 md:top-24 md:opacity-100" />
          <Floating3DMolecule model="benzene" label="Aryl" className="bottom-16 right-2 opacity-40 sm:right-8 sm:opacity-70 md:bottom-20 md:opacity-100" delay={1.5} />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-300/10"
            animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative max-w-4xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/70 bg-white/70 text-cyan-600 shadow-[0_0_45px_rgba(14,165,233,0.18)] backdrop-blur-xl dark:border-cyan-300/20 dark:bg-white/10 dark:text-cyan-100">
              <Atom size={26} />
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Explore organic chemistry with visual clarity.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              A minimal scientific learning space for discovering functional groups, reaction families, and molecular patterns through a premium futuristic interface.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-white/5">
                <Sparkles size={15} /> Clean visual learning
              </span>
              <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-white/5">
                Scientific atmosphere
              </span>
            </div>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="border-t border-slate-200/70 py-16 dark:border-white/10 sm:py-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700 dark:text-cyan-200">Explore</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Explore Categories</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
              Start with a functional group and move through organic chemistry with a calm, uncluttered visual flow.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </motion.section>
      <div className="h-10" />
    </main>
  );
}
