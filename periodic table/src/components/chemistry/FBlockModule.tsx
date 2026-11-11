import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { FloatingParticlesBackground } from '../landing/FloatingParticlesBackground';
import { ApplicationCard } from './ApplicationCard';
import { AtomViewer } from './AtomViewer';
import { CompoundCard } from './CompoundCard';
import { ElementSelector } from './ElementSelector';
import { VoiceNarrator } from './VoiceNarrator';
import { ApplicationData, CompoundData, SBlockElement } from './sblockData';

interface ConfigToken {
  label: string;
  shellIndex: number | null;
}

interface TrendItem {
  id: string;
  label: string;
  explanation: string;
}

interface FBlockSeriesData {
  title: string;
  shortTitle: string;
  description: string;
  outerConfiguration: string;
  elements: SBlockElement[];
  trends: TrendItem[];
  generalTrends: string[];
  trendSummary: string;
  compounds: CompoundData[];
  applications: ApplicationData[];
}

type FBlockChapterId = 'lanthanides' | 'actinides';

const getConfigTokens = (configuration: string): ConfigToken[] => (
  configuration.split(/\s+/).filter(Boolean).map((label) => {
    const shell = label.match(/^(\d)/);
    return { label, shellIndex: shell ? Number(shell[1]) - 1 : null };
  })
);

const lanthanideData: FBlockSeriesData = {
  title: 'Lanthanide Series',
  shortTitle: 'Lanthanides',
  description: 'f-block elements with progressive filling of 4f orbitals, known for similar chemical properties and magnetic behavior.',
  outerConfiguration: '[Xe] 4f1-14 5d0-1 6s2',
  elements: [
    { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, fullConfiguration: '[Xe] 5d1 6s2', shells: [2, 8, 18, 18, 9, 2], valenceElectrons: 3, oxidationState: '+3', narration: 'Lanthanum begins the lanthanide region and commonly shows the plus three oxidation state.' },
    { symbol: 'Ce', name: 'Cerium', atomicNumber: 58, fullConfiguration: '[Xe] 4f1 5d1 6s2', shells: [2, 8, 18, 19, 9, 2], valenceElectrons: 4, oxidationState: '+3, +4', narration: 'Cerium has 4f1 5d1 6s2 configuration and can switch between plus three and plus four states.' },
    { symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, fullConfiguration: '[Xe] 4f3 6s2', shells: [2, 8, 18, 21, 8, 2], valenceElectrons: 5, oxidationState: '+3, +4', narration: 'Praseodymium forms colored ions and mainly shows plus three oxidation state.' },
    { symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, fullConfiguration: '[Xe] 4f4 6s2', shells: [2, 8, 18, 22, 8, 2], valenceElectrons: 6, oxidationState: '+3', narration: 'Neodymium is important for powerful permanent magnets and laser materials.' },
    { symbol: 'Pm', name: 'Promethium', atomicNumber: 61, fullConfiguration: '[Xe] 4f5 6s2', shells: [2, 8, 18, 23, 8, 2], valenceElectrons: 7, oxidationState: '+3', narration: 'Promethium is radioactive and mainly forms plus three compounds.' },
    { symbol: 'Sm', name: 'Samarium', atomicNumber: 62, fullConfiguration: '[Xe] 4f6 6s2', shells: [2, 8, 18, 24, 8, 2], valenceElectrons: 8, oxidationState: '+2, +3', narration: 'Samarium forms magnetic materials and can show plus two and plus three states.' },
    { symbol: 'Eu', name: 'Europium', atomicNumber: 63, fullConfiguration: '[Xe] 4f7 6s2', shells: [2, 8, 18, 25, 8, 2], valenceElectrons: 9, oxidationState: '+2, +3', narration: 'Europium compounds emit bright red light and europium two plus is relatively stable.' },
    { symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, fullConfiguration: '[Xe] 4f7 5d1 6s2', shells: [2, 8, 18, 25, 9, 2], valenceElectrons: 10, oxidationState: '+3', narration: 'Gadolinium has strong magnetic behavior and is used in MRI contrast agents.' },
    { symbol: 'Tb', name: 'Terbium', atomicNumber: 65, fullConfiguration: '[Xe] 4f9 6s2', shells: [2, 8, 18, 27, 8, 2], valenceElectrons: 11, oxidationState: '+3, +4', narration: 'Terbium forms luminescent compounds and magnetic materials.' },
    { symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, fullConfiguration: '[Xe] 4f10 6s2', shells: [2, 8, 18, 28, 8, 2], valenceElectrons: 12, oxidationState: '+3', narration: 'Dysprosium has strong magnetic properties useful in high-performance magnets.' },
    { symbol: 'Ho', name: 'Holmium', atomicNumber: 67, fullConfiguration: '[Xe] 4f11 6s2', shells: [2, 8, 18, 29, 8, 2], valenceElectrons: 13, oxidationState: '+3', narration: 'Holmium forms colored ions and magnetic materials.' },
    { symbol: 'Er', name: 'Erbium', atomicNumber: 68, fullConfiguration: '[Xe] 4f12 6s2', shells: [2, 8, 18, 30, 8, 2], valenceElectrons: 14, oxidationState: '+3', narration: 'Erbium ions are used in optical amplifiers and lasers.' },
    { symbol: 'Tm', name: 'Thulium', atomicNumber: 69, fullConfiguration: '[Xe] 4f13 6s2', shells: [2, 8, 18, 31, 8, 2], valenceElectrons: 15, oxidationState: '+3', narration: 'Thulium is a rare lanthanide used in specialized optical and research applications.' },
    { symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, fullConfiguration: '[Xe] 4f14 6s2', shells: [2, 8, 18, 32, 8, 2], valenceElectrons: 16, oxidationState: '+2, +3', narration: 'Ytterbium has a filled 4f subshell and can show plus two and plus three states.' },
    { symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, fullConfiguration: '[Xe] 4f14 5d1 6s2', shells: [2, 8, 18, 32, 9, 2], valenceElectrons: 17, oxidationState: '+3', narration: 'Lutetium completes the lanthanide series with a filled 4f subshell.' }
  ],
  trends: [
    { id: 'atomic-radius', label: 'Atomic Radius', explanation: 'Atomic and ionic radii decrease gradually across the series due to poor shielding by 4f electrons.' },
    { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', explanation: 'Ionization enthalpy changes gradually as nuclear charge increases across the series.' },
    { id: 'density', label: 'Density', explanation: 'Lanthanides are dense metals, with density generally increasing across the series.' },
    { id: 'magnetic-properties', label: 'Magnetic Properties', explanation: 'Many lanthanide ions are strongly paramagnetic due to unpaired 4f electrons.' },
    { id: 'oxidation-states', label: 'Oxidation States', explanation: 'Most lanthanides show plus three oxidation state because removal of 6s electrons is energetically favorable.' },
    { id: 'complex-formation', label: 'Complex Formation', explanation: 'Lanthanide ions form complexes, especially with oxygen donor ligands.' },
    { id: 'lanthanide-contraction', label: 'Lanthanide Contraction', explanation: 'Lanthanide contraction is the gradual decrease in atomic and ionic size from La to Lu.' },
    { id: 'basicity', label: 'Basicity of Hydroxides', explanation: 'Basicity of lanthanide hydroxides decreases across the series as ionic radius decreases.' }
  ],
  generalTrends: ['High electropositive nature', 'Strong magnetic behavior', 'Predominantly +3 oxidation state', 'Colored ions and compounds', 'Formation of complexes'],
  trendSummary: 'Atomic and ionic radii decrease gradually across the series due to poor shielding by 4f electrons. This is called lanthanide contraction. Most lanthanides show +3 oxidation state, and many ions are colored due to f-f electronic transitions.',
  compounds: [
    { id: 'CeO2', name: 'Cerium Dioxide', formula: 'CeO2', description: 'Important oxidizing agent and catalyst material.', prepSteps: [{ equation: '2Ce + O2 -> 2CeO2', detail: 'Cerium reacts with oxygen forming cerium dioxide.' }, { equation: 'Ce3+ <-> Ce4+', detail: 'CeO2 can easily switch between Ce3+ and Ce4+ oxidation states.' }] },
    { id: 'La2O3', name: 'Lanthanum Oxide', formula: 'La2O3', description: 'Basic oxide used in optical and ceramic materials.', prepSteps: [{ equation: '4La + 3O2 -> 2La2O3', detail: 'Lanthanum burns in oxygen producing lanthanum oxide.' }] },
    { id: 'Nd2O3', name: 'Neodymium Oxide', formula: 'Nd2O3', description: 'Oxide used in lasers and specialized glass.', prepSteps: [{ equation: '4Nd + 3O2 -> 2Nd2O3', detail: 'Neodymium reacts with oxygen forming oxide layer.' }] },
    { id: 'EuCl2', name: 'Europium(II) Chloride', formula: 'EuCl2', description: 'Lanthanide compound showing stable +2 oxidation state.', prepSteps: [{ equation: 'Eu + Cl2 -> EuCl2', detail: 'Europium combines with chlorine producing europium chloride.' }] },
    { id: 'Gd2O3', name: 'Gadolinium Oxide', formula: 'Gd2O3', description: 'Magnetic lanthanide oxide used in imaging technology.', prepSteps: [{ equation: '4Gd + 3O2 -> 2Gd2O3', detail: 'Gadolinium reacts with oxygen producing gadolinium oxide.' }] },
    { id: 'Mischmetal', name: 'Lanthanide Alloy', formula: 'Mischmetal', description: 'Mixture of lanthanide metals used in lighter flints and alloys.', prepSteps: [{ equation: 'Rare earth extraction -> mixed lanthanide alloy', detail: 'Lanthanides are separated from ores and combined into alloy mixture.' }] }
  ],
  applications: [
    { title: 'Powerful permanent magnets', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', explanation: 'Neodymium magnets produce very strong magnetic fields used in motors and headphones.', narration: 'Neodymium magnets produce very strong magnetic fields used in motors and headphones.' },
    { title: 'Catalytic converters', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80', explanation: 'Cerium oxide stores and releases oxygen helping reduce automobile emissions.', narration: 'Cerium oxide stores and releases oxygen helping reduce automobile emissions.' },
    { title: 'MRI contrast agents', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80', explanation: 'Gadolinium compounds enhance contrast in magnetic resonance imaging.', narration: 'Gadolinium compounds enhance contrast in magnetic resonance imaging.' },
    { title: 'Lighter flints', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80', explanation: 'Mischmetal produces sparks easily due to rapid oxidation of lanthanide metals.', narration: 'Mischmetal produces sparks easily due to rapid oxidation of lanthanide metals.' },
    { title: 'Lasers and optical devices', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80', explanation: 'Lanthanide ions emit characteristic light useful in lasers and optical amplifiers.', narration: 'Lanthanide ions emit characteristic light useful in lasers and optical amplifiers.' },
    { title: 'Fluorescent materials', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80', explanation: 'Europium compounds emit bright red light in television and LED displays.', narration: 'Europium compounds emit bright red light in television and LED displays.' }
  ]
};

const actinideData: FBlockSeriesData = {
  title: 'Actinide Series',
  shortTitle: 'Actinides',
  description: 'Radioactive f-block elements with progressive filling of 5f orbitals and variable oxidation states.',
  outerConfiguration: '[Rn] 5f1-14 6d0-1 7s2',
  elements: [
    { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, fullConfiguration: '[Rn] 6d1 7s2', shells: [2, 8, 18, 32, 18, 9, 2], valenceElectrons: 3, oxidationState: '+3', narration: 'Actinium begins the actinide series and commonly shows the plus three oxidation state.' },
    { symbol: 'Th', name: 'Thorium', atomicNumber: 90, fullConfiguration: '[Rn] 6d2 7s2', shells: [2, 8, 18, 32, 18, 10, 2], valenceElectrons: 4, oxidationState: '+4', narration: 'Thorium forms stable plus four compounds and is important in thorium-based nuclear fuel cycles.' },
    { symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, fullConfiguration: '[Rn] 5f2 6d1 7s2', shells: [2, 8, 18, 32, 20, 9, 2], valenceElectrons: 5, oxidationState: '+4, +5', narration: 'Protactinium shows variable oxidation states because 5f, 6d, and 7s electrons are close in energy.' },
    { symbol: 'U', name: 'Uranium', atomicNumber: 92, fullConfiguration: '[Rn] 5f3 6d1 7s2', shells: [2, 8, 18, 32, 21, 9, 2], valenceElectrons: 6, oxidationState: '+3, +4, +5, +6', narration: 'Uranium has 5f3 6d1 7s2 valence configuration and forms important nuclear fuel compounds.' },
    { symbol: 'Np', name: 'Neptunium', atomicNumber: 93, fullConfiguration: '[Rn] 5f4 6d1 7s2', shells: [2, 8, 18, 32, 22, 9, 2], valenceElectrons: 7, oxidationState: '+3, +4, +5, +6', narration: 'Neptunium is radioactive and forms several oxidation states in actinide chemistry.' },
    { symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, fullConfiguration: '[Rn] 5f6 7s2', shells: [2, 8, 18, 32, 24, 8, 2], valenceElectrons: 8, oxidationState: '+3, +4, +5, +6', narration: 'Plutonium is used in nuclear fuels and radioisotope power systems.' },
    { symbol: 'Am', name: 'Americium', atomicNumber: 95, fullConfiguration: '[Rn] 5f7 7s2', shells: [2, 8, 18, 32, 25, 8, 2], valenceElectrons: 9, oxidationState: '+3, +4', narration: 'Americium is radioactive and americium-241 is used in ionization smoke detectors.' },
    { symbol: 'Cm', name: 'Curium', atomicNumber: 96, fullConfiguration: '[Rn] 5f7 6d1 7s2', shells: [2, 8, 18, 32, 25, 9, 2], valenceElectrons: 10, oxidationState: '+3', narration: 'Curium is a radioactive actinide used mainly in research.' }
  ],
  trends: [
    { id: 'atomic-radius', label: 'Atomic Radius', explanation: 'Atomic and ionic radii gradually decrease across the series due to poor shielding by 5f electrons.' },
    { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', explanation: 'Ionization enthalpy changes gradually because 5f, 6d, and 7s energies are close.' },
    { id: 'density', label: 'Density', explanation: 'Actinides generally have high densities due to very heavy nuclei and compact metallic structures.' },
    { id: 'radioactivity', label: 'Radioactivity', explanation: 'Most actinides are radioactive because their heavy nuclei are unstable.' },
    { id: 'oxidation-states', label: 'Oxidation States', explanation: 'Many oxidation states are possible because 5f, 6d, and 7s electrons can participate in bonding.' },
    { id: 'complex-formation', label: 'Complex Formation', explanation: 'Actinide ions form complexes readily with oxygen, nitrate, fluoride, and other donor ligands.' },
    { id: 'magnetic-properties', label: 'Magnetic Properties', explanation: 'Many actinide ions are paramagnetic due to unpaired 5f electrons.' },
    { id: 'actinide-contraction', label: 'Actinide Contraction', explanation: 'Actinide contraction is the steady decrease in size caused by poor shielding of nuclear charge by 5f electrons.' }
  ],
  generalTrends: ['High density', 'Strong radioactivity', 'Variable oxidation states', 'Easy complex formation', 'Paramagnetic behavior'],
  trendSummary: 'Across the actinide series, atomic and ionic radii gradually decrease due to poor shielding by 5f electrons. This is called actinide contraction. Actinides show many oxidation states because 5f, 6d, and 7s electrons have similar energies and participate in bonding.',
  compounds: [
    { id: 'UO2', name: 'Uranium Dioxide', formula: 'UO2', description: 'Major nuclear fuel used in reactors.', prepSteps: [{ equation: 'U + O2 -> UO2', detail: 'Uranium reacts with oxygen forming uranium dioxide.' }, { equation: 'UO2 pellets -> fuel rods', detail: 'UO2 pellets are used as fuel rods in nuclear reactors.' }] },
    { id: 'UF6', name: 'Uranium Hexafluoride', formula: 'UF6', description: 'Volatile uranium compound used in isotope separation.', prepSteps: [{ equation: 'U + 3F2 -> UF6', detail: 'Uranium reacts with fluorine producing uranium hexafluoride.' }, { equation: 'volatile UF6 -> isotope enrichment', detail: 'Its volatility allows enrichment of uranium isotopes.' }] },
    { id: 'PuO2', name: 'Plutonium Dioxide', formula: 'PuO2', description: 'Radioactive oxide used in nuclear fuel and research.', prepSteps: [{ equation: 'Pu + O2 -> PuO2', detail: 'Plutonium oxidizes forming plutonium dioxide.' }, { equation: 'PuO2 -> MOX fuel', detail: 'Used in mixed oxide nuclear fuels.' }] },
    { id: 'ThO2', name: 'Thorium Dioxide', formula: 'ThO2', description: 'High melting oxide used in nuclear and ceramic applications.', prepSteps: [{ equation: 'Th + O2 -> ThO2', detail: 'Thorium reacts with oxygen producing thorium dioxide.' }, { equation: 'ThO2 -> high temperature stability', detail: 'Thorium oxide remains stable at very high temperatures.' }] },
    { id: 'AmO2', name: 'Americium Dioxide', formula: 'AmO2', description: 'Radioactive oxide of americium used in research.', prepSteps: [{ equation: 'Am + O2 -> AmO2', detail: 'Americium reacts slowly with oxygen forming oxide layer.' }] },
    { id: 'PuNO3', name: 'Plutonium(IV) Nitrate', formula: 'Pu(NO3)4', description: 'Important intermediate in nuclear fuel processing.', prepSteps: [{ equation: 'PuO2 + HNO3 -> Pu(NO3)4', detail: 'Nitric acid dissolves plutonium dioxide forming nitrate complex.' }, { equation: 'Pu nitrate -> purification', detail: 'Used in fuel reprocessing and purification.' }] }
  ],
  applications: [
    { title: 'Nuclear power generation', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80', explanation: 'Uranium and plutonium release enormous energy through nuclear fission reactions.', narration: 'Uranium and plutonium release enormous energy through nuclear fission reactions.' },
    { title: 'Smoke detectors', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80', explanation: 'Americium-241 emits alpha particles used in ionization smoke detectors.', narration: 'Americium-241 emits alpha particles used in ionization smoke detectors.' },
    { title: 'Space missions', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80', explanation: 'Radioisotope thermoelectric generators use plutonium isotopes to supply power in spacecraft.', narration: 'Radioisotope thermoelectric generators use plutonium isotopes to supply power in spacecraft.' },
    { title: 'Thorium-based reactors', image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=900&q=80', explanation: 'Thorium can be converted into fissile uranium-233 for safer nuclear fuel cycles.', narration: 'Thorium can be converted into fissile uranium-233 for safer nuclear fuel cycles.' },
    { title: 'Scientific research', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80', explanation: 'Actinides help study nuclear reactions, radioactive decay, and heavy-element chemistry.', narration: 'Actinides help study nuclear reactions, radioactive decay, and heavy-element chemistry.' },
    { title: 'Medical isotope production', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80', explanation: 'Certain actinide isotopes are used for cancer therapy and diagnostic research.', narration: 'Certain actinide isotopes are used for cancer therapy and diagnostic research.' }
  ]
};

const Section: React.FC<{ index: number; title: string; actions?: React.ReactNode; children: React.ReactNode }> = ({ index, title, actions, children }) => (
  <motion.section initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.45 }} className="rounded-2xl border border-slate-700/65 bg-slate-950/62 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6">
    <div className="mb-5 flex flex-col gap-3 border-b border-cyan-400/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/40 bg-cyan-400/10 font-mono text-sm font-black text-cyan-200">{index}</span>
        <h2 className="font-mono text-lg font-black uppercase tracking-[0.16em] text-white">{title}</h2>
      </div>
      {actions}
    </div>
    {children}
  </motion.section>
);

const TrendVisualizer: React.FC<{ data: FBlockSeriesData }> = ({ data }) => {
  const [activeTrendId, setActiveTrendId] = useState(data.trends[0].id);
  const activeTrend = data.trends.find((trend) => trend.id === activeTrendId) ?? data.trends[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {data.trends.map((trend) => (
          <button key={trend.id} type="button" onClick={() => setActiveTrendId(trend.id)} className={`shrink-0 rounded-md border px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition ${activeTrendId === trend.id ? 'border-cyan-300 bg-cyan-400/14 text-white shadow-[0_0_20px_rgba(34,211,238,0.22)]' : 'border-cyan-400/15 bg-white/[0.025] text-cyan-100/70 hover:border-cyan-300/50'}`}>
            {trend.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-cyan-400/20 bg-slate-950/50 p-5 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-cyan-400/40 bg-gray-950/90 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.22em] text-cyan-300">{data.shortTitle === 'Lanthanides' ? 'La' : 'Ac'} {'->'} {data.shortTitle === 'Lanthanides' ? 'Lu' : 'Lr'}</div>
          <VoiceNarrator label="Explain Trend" text={`${activeTrend.label}. ${activeTrend.explanation} ${data.trendSummary}`} className="rounded-full py-2 text-[10px]" />
        </div>
        <div className="grid w-full gap-4 xl:grid-cols-[1fr_260px]">
          <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden rounded-lg border border-cyan-400/10 bg-black/30">
            <div className="absolute inset-x-10 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-700 via-pink-400 to-amber-400 shadow-[0_0_24px_rgba(34,211,238,0.3)]" />
            <div className="relative z-10 grid grid-cols-4 gap-3 md:grid-cols-8">
              {data.elements.map((element, index) => (
                <motion.div key={element.symbol} initial={{ opacity: 0, y: index % 2 === 0 ? -16 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="grid h-14 w-16 place-items-center rounded-md border border-cyan-300/40 bg-black/80 font-mono text-lg font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.2)] backdrop-blur-md">
                  {element.symbol}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-lime-400/25 bg-lime-400/[0.035] p-4">
            <div className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-lime-300">Group Trends</div>
            <div className="mt-3 space-y-2">
              {data.generalTrends.map((item) => <div key={item} className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-xs font-semibold text-slate-200">{item}</div>)}
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-sm leading-6 text-slate-300">{activeTrend.explanation}</p>
      </div>
    </div>
  );
};

const SeriesDashboard: React.FC<{ data: FBlockSeriesData; defaultSymbol: string; onBack: () => void }> = ({ data, defaultSymbol, onBack }) => {
  const [activeSymbol, setActiveSymbol] = useState(defaultSymbol);
  const [valenceOnly, setValenceOnly] = useState(false);
  const [activeShell, setActiveShell] = useState<number | null>(null);
  const [activeConfigToken, setActiveConfigToken] = useState<number | null>(null);
  const [activeApplication, setActiveApplication] = useState<number | null>(null);
  const [applicationSpeechState, setApplicationSpeechState] = useState<'stopped' | 'playing' | 'paused'>('stopped');
  const applicationIndexRef = useRef(0);
  const applicationSessionRef = useRef(0);
  const applicationPausedRef = useRef(false);
  const activeElement = useMemo(() => data.elements.find((element) => element.symbol === activeSymbol) ?? data.elements[0], [activeSymbol, data]);
  const configTokens = useMemo(() => getConfigTokens(activeElement.fullConfiguration), [activeElement.fullConfiguration]);

  const stopApplications = () => {
    applicationSessionRef.current += 1;
    applicationPausedRef.current = false;
    applicationIndexRef.current = 0;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
    }
    setApplicationSpeechState('stopped');
    setActiveApplication(null);
  };

  const speakApplicationStep = (sessionId: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (sessionId !== applicationSessionRef.current || applicationPausedRef.current) return;
    const index = applicationIndexRef.current;
    if (index >= data.applications.length) {
      setApplicationSpeechState('stopped');
      setActiveApplication(null);
      applicationIndexRef.current = 0;
      return;
    }
    const application = data.applications[index];
    setActiveApplication(index);
    const utterance = new SpeechSynthesisUtterance(`${application.title}. ${application.narration}`);
    utterance.rate = 0.92;
    utterance.pitch = 1.08;
    const voices = window.speechSynthesis.getVoices() || [];
    const voice =
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
      voices[0];
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || 'en-IN';
    utterance.onend = () => {
      if (sessionId !== applicationSessionRef.current || applicationPausedRef.current) return;
      applicationIndexRef.current += 1;
      speakApplicationStep(sessionId);
    };
    utterance.onerror = utterance.onend;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => stopApplications, []);
  useEffect(() => {
    setActiveShell(null);
    setActiveConfigToken(null);
    setValenceOnly(false);
  }, [activeSymbol]);

  useEffect(() => {
    setActiveSymbol(defaultSymbol);
    setActiveShell(null);
    setActiveConfigToken(null);
    setValenceOnly(false);
    stopApplications();
  }, [defaultSymbol, data]);

  const readApplications = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (applicationSpeechState === 'playing') {
      applicationPausedRef.current = true;
      window.speechSynthesis.cancel();
      setApplicationSpeechState('paused');
      return;
    }
    if (applicationSpeechState === 'paused') {
      applicationPausedRef.current = false;
      setApplicationSpeechState('playing');
      speakApplicationStep(applicationSessionRef.current);
      return;
    }
    window.speechSynthesis.cancel();
    applicationSessionRef.current += 1;
    applicationIndexRef.current = 0;
    applicationPausedRef.current = false;
    setApplicationSpeechState('playing');
    speakApplicationStep(applicationSessionRef.current);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-16 pt-28 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{data.shortTitle}</p>
          <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">{data.title}</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">{data.description}</p>
      </div>

      <Section index={1} title="Outer Electronic Configuration">
        <ElementSelector elements={data.elements} activeSymbol={activeSymbol} onSelect={setActiveSymbol} />
        <AnimatePresence mode="wait">
          <motion.div key={activeElement.symbol} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <AtomViewer element={activeElement} valenceOnly={valenceOnly} activeShell={activeShell} />
            <div className="rounded-lg border border-cyan-400/20 bg-slate-950/60 p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">{activeElement.name}</div>
              <h3 className="mt-2 text-3xl font-black text-white">{activeElement.symbol}</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Full electronic configuration</dt>
                  <dd className="mt-2 flex flex-wrap gap-2 font-mono text-cyan-100">
                    {configTokens.map((token, index) => <motion.span key={`${token.label}-${index}`} animate={{ opacity: activeConfigToken === null || activeConfigToken === index ? 1 : 0.16, scale: activeConfigToken === index ? 1.08 : 1 }} className={`rounded border px-2 py-1 transition ${activeConfigToken === index ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.34)]' : activeConfigToken === null ? 'border-cyan-400/10 bg-cyan-400/5' : 'border-slate-800 bg-black text-slate-600'}`}>{token.label}</motion.span>)}
                  </dd>
                </div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Shells</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.shells.join(',')}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Valence Electrons</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.symbol === 'U' ? '5f3 6d1 7s2' : activeElement.symbol === 'Ce' ? '4f1 5d1 6s2' : activeElement.fullConfiguration.replace('[Rn] ', '').replace('[Xe] ', '')}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Oxidation State</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.oxidationState}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Outer Electronic Configuration</dt><dd className="mt-1 font-mono text-cyan-100">{data.outerConfiguration}</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                {configTokens.map((token, index) => <button key={`focus-${token.label}-${index}`} type="button" onClick={() => { setActiveConfigToken(index); setValenceOnly(false); setActiveShell(token.shellIndex); }} className={`rounded-md border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition ${activeConfigToken === index ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.22)]' : 'border-cyan-400/25 text-cyan-200 hover:bg-cyan-400/10'}`}>{token.label}</button>)}
                <button type="button" onClick={() => { setActiveConfigToken(null); setActiveShell(null); setValenceOnly(false); }} className="rounded-md border border-slate-500/40 bg-slate-500/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-300 hover:bg-slate-500/15">Show All</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      <Section index={2} title="Periodic Trends"><TrendVisualizer data={data} /></Section>
      <Section index={3} title="Important Compounds"><div className="grid gap-5 lg:grid-cols-2">{data.compounds.map((compound) => <CompoundCard key={compound.id} compound={compound} />)}</div></Section>
      <Section index={4} title="Real World Applications" actions={<button type="button" onClick={readApplications} className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.14)] transition hover:border-cyan-300 hover:bg-cyan-400/15"><span className="inline-flex items-center gap-2">{applicationSpeechState === 'playing' ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}{applicationSpeechState === 'playing' ? 'Pause Applications' : applicationSpeechState === 'paused' ? 'Resume Applications' : 'Read All Applications'}</span></button>}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{data.applications.map((application, index) => <ApplicationCard key={application.title} application={application} active={activeApplication === index} />)}</div>
      </Section>
    </div>
  );
};

export const FBlockModule: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<FBlockChapterId | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <FloatingParticlesBackground />
      <div className="pointer-events-none absolute inset-0 grid-bg-cyan opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(to_bottom,transparent,#000_88%)]" />
      <AnimatePresence mode="wait">
        {activeChapter ? (
          <motion.div key={activeChapter} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
            <button type="button" onClick={() => setActiveChapter(null)} className="fixed left-5 top-5 z-30 rounded-md border border-cyan-400/30 bg-black/70 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300 hover:bg-cyan-400/10">
              All f-block sections
            </button>
            <SeriesDashboard data={activeChapter === 'lanthanides' ? lanthanideData : actinideData} defaultSymbol={activeChapter === 'lanthanides' ? 'Ce' : 'U'} onBack={() => setActiveChapter(null)} />
          </motion.div>
        ) : (
          <motion.main key="f-block-home" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-28 md:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">/inorganic/f-block</p>
              <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">f-Block Visualization Flow</h1>
              <p className="mt-4 text-base leading-7 text-slate-400">Lanthanides and actinides presented as section cards with focused dashboards.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.button type="button" whileHover={{ scale: 1.035, y: -6 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveChapter('lanthanides')} className="group min-h-[240px] rounded-lg border border-cyan-400/25 bg-cyan-400/[0.035] p-7 text-left shadow-[0_0_30px_rgba(34,211,238,0.09)] backdrop-blur-xl transition hover:border-cyan-300/70 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]">
                <div className="mb-8 flex items-center justify-between"><span className="rounded-full border border-cyan-400/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Section 01</span><span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" /></div>
                <h2 className="text-3xl font-black text-white">{lanthanideData.shortTitle}</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{lanthanideData.description}</p>
              </motion.button>
              <motion.button type="button" whileHover={{ scale: 1.035, y: -6 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveChapter('actinides')} className="group min-h-[240px] rounded-lg border border-cyan-400/25 bg-cyan-400/[0.035] p-7 text-left shadow-[0_0_30px_rgba(34,211,238,0.09)] backdrop-blur-xl transition hover:border-cyan-300/70 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]">
                <div className="mb-8 flex items-center justify-between"><span className="rounded-full border border-cyan-400/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Section 02</span><span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" /></div>
                <h2 className="text-3xl font-black text-white">{actinideData.shortTitle}</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{actinideData.description}</p>
              </motion.button>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FBlockModule;
