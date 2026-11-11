import { useEffect, useRef, useState } from "react";
import { moleculeModels, applyCustomBondOrders } from "../../data/chemistryContent";

export default function MoleculeViewer({ model = "ethanol", label = "Molecule", height = 240, decorative = false }) {
  const containerRef = useRef(null);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  // Observe when the viewer enters the viewport, then lazy-load the heavy 3dmol bundle
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const el = containerRef.current;
    let obs;
    try {
      obs = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      }, { rootMargin: "200px" });
      obs.observe(el);
    } catch (e) {
      // Fallback — if IntersectionObserver is not available, load immediately
      setVisible(true);
    }
    return () => obs && obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    if (typeof window === "undefined" || !containerRef.current) return undefined;

    let viewer;
    let cancelled = false;
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
        const m = viewer.addModel(moleculeModels[model] || moleculeModels.ethanol, "xyz");
        applyCustomBondOrders(m);
        viewer.setStyle({}, { stick: { radius: 0.15, colorscheme: "Jmol" }, sphere: { scale: 0.26, colorscheme: "Jmol" } });
        
        // 1. Core Organic Backbone Elements
        viewer.setStyle({ elem: "C" }, { stick: { radius: 0.15, color: "#8A8A8A" }, sphere: { scale: 0.26, color: "#8A8A8A" } });  // Medium Grey Carbon
        viewer.setStyle({ elem: "H" }, { stick: { radius: 0.15, color: "#FFFFFF" }, sphere: { scale: 0.32, color: "#FFFFFF" } });  // White Hydrogen
        viewer.setStyle({ elem: "O" }, { stick: { radius: 0.15, color: "#FF3B30" }, sphere: { scale: 0.26, color: "#FF3B30" } });  // Bright Red Oxygen
        viewer.setStyle({ elem: "N" }, { stick: { radius: 0.15, color: "#2F80FF" }, sphere: { scale: 0.26, color: "#2F80FF" } });  // Electric Blue Nitrogen
        viewer.setStyle({ elem: "S" }, { stick: { radius: 0.15, color: "#FFD60A" }, sphere: { scale: 0.28, color: "#FFD60A" } });  // Bright Yellow Sulfur
        viewer.setStyle({ elem: "P" }, { stick: { radius: 0.15, color: "#FF9500" }, sphere: { scale: 0.28, color: "#FF9500" } });  // Neon Orange Phosphorus

        // 2. Halogens
        viewer.setStyle({ elem: "F" }, { stick: { radius: 0.15, color: "#50FA7B" }, sphere: { scale: 0.24, color: "#50FA7B" } });  // Mint Green Fluorine
        viewer.setStyle({ elem: "Cl" }, { stick: { radius: 0.15, color: "#32D74B" }, sphere: { scale: 0.26, color: "#32D74B" } }); // Lime Green Chlorine
        viewer.setStyle({ elem: "Br" }, { stick: { radius: 0.15, color: "#FF6B35" }, sphere: { scale: 0.26, color: "#FF6B35" } }); // Deep Orange-Red Bromine
        viewer.setStyle({ elem: "I" }, { stick: { radius: 0.15, color: "#B026FF" }, sphere: { scale: 0.28, color: "#B026FF" } });  // Violet Iodine

        // 3. Alkali & Alkaline Earth Metals
        viewer.setStyle({ elem: "Na" }, { stick: { radius: 0.15, color: "#00E5FF" }, sphere: { scale: 0.35, color: "#00E5FF" } }); // Bright Cyan Sodium
        viewer.setStyle({ elem: "K" }, { stick: { radius: 0.15, color: "#C77DFF" }, sphere: { scale: 0.38, color: "#C77DFF" } });  // Lavender Potassium
        viewer.setStyle({ elem: "Mg" }, { stick: { radius: 0.15, color: "#00D68F" }, sphere: { scale: 0.30, color: "#00D68F" } }); // Light Emerald Magnesium
        viewer.setStyle({ elem: "Ca" }, { stick: { radius: 0.15, color: "#FFB26B" }, sphere: { scale: 0.35, color: "#FFB26B" } }); // Peach Orange Calcium

        // 4. Transition Metals & Extra Elements
        viewer.setStyle({ elem: "Fe" }, { stick: { radius: 0.15, color: "#C56B3D" }, sphere: { scale: 0.32, color: "#C56B3D" } }); // Copper Brown Iron
        viewer.setStyle({ elem: "Cu" }, { stick: { radius: 0.15, color: "#00C2A8" }, sphere: { scale: 0.32, color: "#00C2A8" } }); // Turquoise Copper
        viewer.setStyle({ elem: "Zn" }, { stick: { radius: 0.15, color: "#AAB8FF" }, sphere: { scale: 0.32, color: "#AAB8FF" } }); // Silver Blue Zinc
        viewer.zoomTo();
        viewer.rotate(16, "y");
        viewer.render();
        setError("");
      })
      .catch(() => setError("3D unavailable"));

    return () => {
      cancelled = true;
      if (viewer) viewer.clear();
    };
  }, [visible, model]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-transparent`}
      style={{ height }}
    >
      <div className="absolute left-3 top-3 z-10 rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur dark:border-white/10 dark:bg-slate-950/45 dark:text-cyan-100">
        {label}
      </div>
      {error && <div className="grid h-full place-items-center text-sm text-slate-500 dark:text-slate-300">{error}</div>}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
