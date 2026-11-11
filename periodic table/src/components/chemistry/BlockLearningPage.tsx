import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FloatingParticlesBackground } from '../landing/FloatingParticlesBackground';

export type LearningStage = 'trend' | 'compounds' | 'preparation' | 'applications' | 'crystal';

export interface LearningChapter {
  title: string;
  subtitle: string;
  accent: 'cyan' | 'blue' | 'purple' | 'pink' | 'amber';
  stages: LearningStage[];
}

interface BlockLearningPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  chapters: LearningChapter[];
}

const stageLabels: Record<LearningStage, string> = {
  trend: 'Periodic Trends',
  compounds: 'Important Compounds',
  preparation: 'Preparation Animations',
  applications: 'Real World Applications',
  crystal: 'Crystal Field Visualizations'
};

const stageText: Record<LearningStage, string> = {
  trend: 'Atomic size, ionization behavior, oxidation states, and reactivity are shown as a clean down-series visual flow.',
  compounds: 'Important formulas and structural ideas are grouped as glowing compound profiles for quick revision.',
  preparation: 'Reaction routes are separated into clear steps so reactants, conditions, and products remain readable.',
  applications: 'Key uses connect the chemistry to materials, medicine, catalysis, energy, agriculture, and industry.',
  crystal: 'Ligand field splitting, orbital energy separation, color, and magnetic behavior are presented as a focused model.'
};

const stageChips: Record<LearningStage, string[]> = {
  trend: ['radius', 'IE', 'EN', 'reactivity'],
  compounds: ['oxides', 'halides', 'oxoacids', 'salts'],
  preparation: ['heat', 'catalyst', 'separate', 'collect'],
  applications: ['energy', 'medicine', 'alloys', 'materials'],
  crystal: ['t2g', 'Delta o', 'eg', 'color']
};

const getStageOrder = (chapter: LearningChapter): LearningStage[] => {
  const preferred: LearningStage[] = ['trend', 'compounds', 'preparation', 'crystal', 'applications'];
  return preferred.filter((stage) => chapter.stages.includes(stage));
};

const routeLabel = (eyebrow: string) => {
  const block = eyebrow.toLowerCase().replace(' page', '').replace('p-block', 'p-block').replace('d-block', 'd-block').replace('f-block', 'f-block');
  return `/inorganic/${block}`;
};

const CategoryCard: React.FC<{ chapter: LearningChapter; index: number; onClick: () => void }> = ({ chapter, index, onClick }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.035, y: -6 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group min-h-[240px] rounded-lg border border-cyan-400/25 bg-cyan-400/[0.035] p-7 text-left shadow-[0_0_30px_rgba(34,211,238,0.09)] backdrop-blur-xl transition hover:border-cyan-300/70 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]"
  >
    <div className="mb-8 flex items-center justify-between">
      <span className="rounded-full border border-cyan-400/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
        Category {String(index + 1).padStart(2, '0')}
      </span>
      <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
    </div>
    <h2 className="text-3xl font-black text-white">{chapter.title}</h2>
    <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{chapter.subtitle}</p>
  </motion.button>
);

const Section: React.FC<{ index: number; title: string; children: React.ReactNode }> = ({ index, title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45 }}
    className="rounded-lg border border-cyan-400/18 bg-black/35 p-5 shadow-[0_0_30px_rgba(34,211,238,0.07)] backdrop-blur-xl md:p-6"
  >
    <div className="mb-5 flex items-center gap-3 border-b border-cyan-400/10 pb-4">
      <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/40 bg-cyan-400/10 font-mono text-sm font-black text-cyan-200">
        {index}
      </span>
      <h2 className="font-mono text-lg font-black uppercase tracking-[0.16em] text-white">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const TrendPanel: React.FC<{ chapter: LearningChapter }> = ({ chapter }) => (
  <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
    <div className="rounded-lg border border-cyan-400/15 bg-white/[0.025] p-4">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Trend Scanner</div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{stageText.trend}</p>
    </div>
    <div className="rounded-lg border border-cyan-400/20 bg-slate-950/50 p-5 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
      <div className="relative mx-auto flex min-h-[330px] max-w-xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute left-1/2 top-7 bottom-7 z-0 w-4 origin-top -translate-x-1/2 rounded-full"
        >
          <div className="h-full w-full rounded-full bg-gradient-to-b from-lime-700 via-green-500 to-emerald-900 shadow-[0_0_18px_rgba(16,185,129,0.48)]" />
          <div className="absolute bottom-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[19px] border-t-[30px] border-x-transparent border-t-emerald-500 drop-shadow-[0_0_12px_#10b981]" />
        </motion.div>
        <div className="relative z-10 flex flex-col items-center gap-5">
          {stageChips.trend.map((chip, index) => (
            <motion.div
              key={chip}
              initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid h-14 w-32 place-items-center rounded-full border border-cyan-300/40 bg-black/80 font-mono text-sm font-black uppercase text-white shadow-[0_0_24px_rgba(34,211,238,0.22)] backdrop-blur-md"
            >
              {chip}
            </motion.div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-sm leading-6 text-slate-300">{chapter.title} trends are arranged in the same glowing vector style as the S-block module.</p>
    </div>
  </div>
);

const StageVisual: React.FC<{ stage: LearningStage }> = ({ stage }) => (
  <div className="relative min-h-[260px] overflow-hidden rounded-lg border border-cyan-400/20 bg-black/45">
    <div className="absolute inset-0 cinematic-grid opacity-40" />
    <div className="absolute inset-0 energy-wave opacity-45" />
    <motion.div
      className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35"
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute left-1/2 top-1/2 h-52 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/25"
      animate={{ rotate: -360 }}
      transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
    />
    <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/40 shadow-[0_0_28px_rgba(34,211,238,0.45)]" />
    <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {stageChips[stage].map((chip, index) => (
        <motion.div
          key={chip}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="rounded-md border border-cyan-400/15 bg-cyan-400/[0.04] px-2 py-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-100"
        >
          {chip}
        </motion.div>
      ))}
    </div>
  </div>
);

const Dashboard: React.FC<{ chapter: LearningChapter; index: number; onBack: () => void }> = ({ chapter, index, onBack }) => {
  const orderedStages = useMemo(() => getStageOrder(chapter), [chapter]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-16 pt-28 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Category {String(index + 1).padStart(2, '0')}</p>
          <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">{chapter.title}</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">{chapter.subtitle}</p>
      </div>

      {orderedStages.map((stage, stageIndex) => (
        <Section key={stage} index={stageIndex + 1} title={stageLabels[stage]}>
          {stage === 'trend' ? (
            <TrendPanel chapter={chapter} />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
              <div className="flex flex-col justify-center rounded-lg border border-cyan-400/15 bg-white/[0.025] p-5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">{chapter.title}</div>
                <h3 className="mt-3 text-2xl font-black text-white">{stageLabels[stage]}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{stageText[stage]}</p>
              </div>
              <StageVisual stage={stage} />
            </div>
          )}
        </Section>
      ))}
    </div>
  );
};

export const BlockLearningPage: React.FC<BlockLearningPageProps> = ({ eyebrow, title, subtitle, chapters }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedChapter = selectedIndex === null ? null : chapters[selectedIndex];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <FloatingParticlesBackground />
      <div className="pointer-events-none absolute inset-0 grid-bg-cyan opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(to_bottom,transparent,#000_88%)]" />

      <AnimatePresence mode="wait">
        {selectedChapter !== null && selectedIndex !== null ? (
          <motion.div key={selectedChapter.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard chapter={selectedChapter} index={selectedIndex} onBack={() => setSelectedIndex(null)} />
          </motion.div>
        ) : (
          <motion.main
            key="block-home"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-28 md:px-8"
          >
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">{routeLabel(eyebrow)}</p>
              <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">{title}</h1>
              <p className="mt-4 text-base leading-7 text-slate-400">{subtitle}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {chapters.map((chapter, index) => (
                <CategoryCard key={chapter.title} chapter={chapter} index={index} onClick={() => setSelectedIndex(index)} />
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};
