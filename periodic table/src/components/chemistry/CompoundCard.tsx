import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoleculeViewer } from './MoleculeViewer';
import { CompoundData } from './sblockData';
import { VoiceNarrator } from './VoiceNarrator';

interface CompoundCardProps {
  compound: CompoundData;
}

export const CompoundCard: React.FC<CompoundCardProps> = ({ compound }) => {
  const [mode, setMode] = useState<'structure' | 'preparation'>('structure');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const narration = compound.prepSteps.map((step) => `${step.equation}. ${step.detail}`).join(' ');

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/72 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl transition hover:border-cyan-300/45 hover:shadow-[0_22px_70px_rgba(6,182,212,0.12)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-px opacity-80"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.75), transparent)' }}
      />
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-300/15" />
      <div className="h-[260px] p-4 pb-0">
        <MoleculeViewer moleculeId={compound.id} accentColor="#22d3ee" />
      </div>
      <div className="space-y-4 p-5 pt-4">
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">{compound.formula}</div>
          <h3 className="mt-1 text-lg font-black text-white">{compound.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{compound.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode('structure')}
            className={`rounded-md border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition ${
              mode === 'structure'
                ? 'border-cyan-200/60 bg-cyan-300/12 text-white shadow-[0_0_18px_rgba(34,211,238,0.16)]'
                : 'border-cyan-400/25 text-cyan-200 hover:bg-cyan-400/10'
            }`}
          >
            Structure
          </button>
          <button
            type="button"
            onClick={() => setMode('preparation')}
            className={`rounded-md border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition ${
              mode === 'preparation'
                ? 'border-cyan-200/60 bg-cyan-300/12 text-white shadow-[0_0_18px_rgba(34,211,238,0.16)]'
                : 'border-cyan-400/25 text-cyan-200 hover:bg-cyan-400/10'
            }`}
          >
            Preparation
          </button>
          <VoiceNarrator
            label="Explain"
            text={narration}
            steps={compound.prepSteps.map((step) => step.equation)}
            onStepChange={setActiveStep}
            className="py-2 text-[10px]"
          />
        </div>
        <AnimatePresence mode="wait">
          {mode === 'preparation' ? (
            <motion.div
              key="prep"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              {compound.prepSteps.map((step, index) => (
                <motion.div
                  key={step.equation}
                  animate={{ x: activeStep === index ? [0, 8, 0] : 0 }}
                  className={`rounded-md border p-3 transition ${
                    activeStep === index
                      ? 'border-cyan-300 bg-cyan-400/14 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                      : 'border-cyan-400/10 bg-black/30'
                  }`}
                >
                  <div className="font-mono text-sm font-black text-cyan-100">{step.equation}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{step.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="structure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs leading-5 text-slate-500"
            >
              Drag the 3D viewer to rotate. Use scroll or pinch to zoom the structure.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};
