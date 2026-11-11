import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactionVisualization from "./ReactionVisualization";
import VoiceButton from "../voice/VoiceButton";
import { stopSpeaking } from "../voice/SpeechController";

const detailLabels = [
  ["Reactants", "reactants"],
  ["Reagents", "reagent"],
  ["Catalyst", "catalyst"],
  ["Conditions", "conditions"],
  ["Temperature", "temperature"],
  ["Side Products", "sideProducts"],
];

export default function ReactionBlock({ reaction, compact = false }) {
  const [highlightedKey, setHighlightedKey] = useState(null);

  useEffect(() => {
    const handleHighlight = (e) => {
      setHighlightedKey(e.detail.key);
    };

    window.addEventListener("reaction-speech-highlight", handleHighlight);
    
    return () => {
      window.removeEventListener("reaction-speech-highlight", handleHighlight);
      stopSpeaking();
    };
  }, [reaction]);

  return (
    <article className={`rounded-3xl border transition-all duration-500 p-5 shadow-sm backdrop-blur-xl ${
      highlightedKey === "title" 
        ? "border-cyan-500/50 bg-cyan-50/5 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400 dark:border-cyan-400/40 dark:bg-cyan-500/5 dark:ring-cyan-500" 
        : "border-slate-200/80 bg-white/72 dark:border-white/10 dark:bg-white/5.5"
    }`}>
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">{reaction.type}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{reaction.title}</h3>
        </div>
        <VoiceButton reaction={reaction} />
      </div>
      {!compact && <ReactionVisualization reaction={reaction} />}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {detailLabels.map(([label, key]) => (
          <div 
            key={key} 
            className={`rounded-2xl border p-4 transition-all duration-500 transform ${
              highlightedKey === key 
                ? "border-cyan-500/80 bg-cyan-50/20 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.02] ring-2 ring-cyan-400 dark:border-cyan-400/80 dark:bg-cyan-500/10 dark:ring-cyan-500" 
                : "border-slate-200/70 bg-slate-50/70 dark:border-white/10 dark:bg-white/4"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{reaction[key]}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className={`rounded-2xl border p-4 transition-all duration-500 transform ${
          highlightedKey === "majorProduct" 
            ? "border-cyan-500/80 bg-cyan-50/20 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.02] ring-2 ring-cyan-400 dark:border-cyan-400/80 dark:bg-cyan-500/10 dark:ring-cyan-500" 
            : "border-cyan-200/70 bg-cyan-50/70 shadow-[0_0_35px_rgba(14,165,233,0.12)] dark:border-cyan-300/20 dark:bg-cyan-300/10"
        }`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-100">Major Product</p>
          <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{reaction.majorProduct}</p>
        </div>
        <div className={`rounded-2xl border p-4 transition-all duration-500 transform ${
          highlightedKey === "minorProduct" 
            ? "border-cyan-500/80 bg-cyan-50/20 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.02] ring-2 ring-cyan-400 dark:border-cyan-400/80 dark:bg-cyan-500/10 dark:ring-cyan-500" 
            : "border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-white/4"
        }`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Minor Product</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{reaction.minorProduct}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className={`rounded-2xl border transition-all duration-500 transform p-0.5 ${
          highlightedKey === "observations" 
            ? "border-cyan-500/60 bg-cyan-50/5 shadow-[0_0_25px_rgba(6,182,212,0.15)] scale-[1.01] ring-1 ring-cyan-400 dark:border-cyan-400/50 dark:bg-cyan-500/5 dark:ring-cyan-500" 
            : "border-transparent"
        }`}>
          <Panel title="Color Change Panel">
            {reaction.colorChanges.map((change) => (
              <div key={change.label} className="flex items-center justify-between gap-3 rounded-xl bg-slate-100/80 px-3 py-2 text-sm dark:bg-white/5">
                <span className="font-medium text-slate-700 dark:text-slate-200">{change.label}</span>
                <span className="text-slate-500 dark:text-slate-400">{change.from} {"->"} {change.to}</span>
              </div>
            ))}
          </Panel>
        </div>
        <div className={`rounded-2xl border transition-all duration-500 transform p-0.5 ${
          highlightedKey === "observations" 
            ? "border-cyan-500/60 bg-cyan-50/5 shadow-[0_0_25px_rgba(6,182,212,0.15)] scale-[1.01] ring-1 ring-cyan-400 dark:border-cyan-400/50 dark:bg-cyan-500/5 dark:ring-cyan-500" 
            : "border-transparent"
        }`}>
          <Panel title="Observation Panel">
            {reaction.observations.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200/70 bg-white/65 px-3 py-2 text-sm text-slate-700 dark:border-white/10 dark:bg-white/4 dark:text-slate-200">
                {item}
              </div>
            ))}
          </Panel>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">Mechanism</h4>
        <div className="grid gap-3 md:grid-cols-4">
          {reaction.mechanism.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.05 }}
              className={`rounded-2xl border p-4 transition-all duration-500 transform ${
                highlightedKey === `mechanism_${index}` 
                  ? "border-cyan-500/80 bg-cyan-50/20 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.04] ring-2 ring-cyan-400 dark:border-cyan-400/80 dark:bg-cyan-500/10 dark:ring-cyan-500" 
                  : "border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-white/4"
              }`}
            >
              <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-200">Step {index + 1}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </article>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-4 dark:border-white/10 dark:bg-white/3.5">
      <h4 className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
