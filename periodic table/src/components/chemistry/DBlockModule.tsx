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

interface TransitionData {
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

type DBlockChapterId = 'transition' | 'coordination';

const getConfigTokens = (configuration: string): ConfigToken[] => (
  configuration.split(/\s+/).filter(Boolean).map((label) => {
    const shell = label.match(/^(\d)/);
    return {
      label,
      shellIndex: shell ? Number(shell[1]) - 1 : null
    };
  })
);

const transitionData: TransitionData = {
  title: 'd-Block Transition Metals',
  shortTitle: 'Transition Elements',
  description: 'Elements with partially filled d-orbitals in their atoms or common oxidation states, showing variable valency, colored compounds, and catalytic behavior.',
  outerConfiguration: '(n-1)d1-10 ns1-2',
  elements: [
    { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, fullConfiguration: '[Ar] 3d1 4s2', shells: [2, 8, 9, 2], valenceElectrons: 2, oxidationState: '+3', narration: 'Scandium begins the first transition series with one d electron and commonly forms the plus three state.' },
    { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, fullConfiguration: '[Ar] 3d2 4s2', shells: [2, 8, 10, 2], valenceElectrons: 2, oxidationState: '+2, +3, +4', narration: 'Titanium has two d electrons and forms stable plus four compounds such as titanium dioxide.' },
    { symbol: 'V', name: 'Vanadium', atomicNumber: 23, fullConfiguration: '[Ar] 3d3 4s2', shells: [2, 8, 11, 2], valenceElectrons: 2, oxidationState: '+2, +3, +4, +5', narration: 'Vanadium shows several oxidation states because both d and s electrons participate in bonding.' },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, fullConfiguration: '[Ar] 3d5 4s1', shells: [2, 8, 13, 1], valenceElectrons: 1, oxidationState: '+2, +3, +6', narration: 'Chromium has a half-filled d subshell and forms important chromate and dichromate compounds.' },
    { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, fullConfiguration: '[Ar] 3d5 4s2', shells: [2, 8, 13, 2], valenceElectrons: 2, oxidationState: '+2, +4, +7', narration: 'Manganese shows many oxidation states, including plus seven in permanganate.' },
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, fullConfiguration: '1s2 2s2 2p6 3s2 3p6 3d6 4s2', shells: [2, 8, 14, 2], valenceElectrons: 2, oxidationState: '+2, +3', narration: 'Iron has 4s electrons and variable d electrons available for bonding, commonly forming plus two and plus three states.' },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, fullConfiguration: '[Ar] 3d7 4s2', shells: [2, 8, 15, 2], valenceElectrons: 2, oxidationState: '+2, +3', narration: 'Cobalt forms colored and magnetic compounds with plus two and plus three oxidation states.' },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, fullConfiguration: '[Ar] 3d8 4s2', shells: [2, 8, 16, 2], valenceElectrons: 2, oxidationState: '+2, 0', narration: 'Nickel forms coordination complexes such as nickel tetracarbonyl and is useful in plating.' },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, fullConfiguration: '[Ar] 3d10 4s1', shells: [2, 8, 18, 1], valenceElectrons: 1, oxidationState: '+1, +2', narration: 'Copper has a filled d subshell and forms blue copper two plus compounds.' },
    { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, fullConfiguration: '[Ar] 3d10 4s2', shells: [2, 8, 18, 2], valenceElectrons: 2, oxidationState: '+2', narration: 'Zinc has a filled d subshell and mainly forms plus two compounds.' }
  ],
  trends: [
    { id: 'atomic-radius', label: 'Atomic Radius', explanation: 'Across the transition series, atomic size changes only slightly because added d electrons shield the nuclear charge poorly.' },
    { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', explanation: 'Ionization enthalpy generally increases gradually across the series with small irregularities from d subshell stability.' },
    { id: 'density', label: 'Density', explanation: 'Density is high because transition metals have high atomic masses and compact metallic structures.' },
    { id: 'melting-point', label: 'Melting Point', explanation: 'Melting points are generally high due to strong metallic bonding involving s and d electrons.' },
    { id: 'boiling-point', label: 'Boiling Point', explanation: 'Boiling points are high because strong metallic bonds require large energy to break.' },
    { id: 'oxidation-states', label: 'Oxidation States', explanation: 'Variable oxidation states arise because both ns and (n-1)d electrons can participate in bonding.' },
    { id: 'complex-formation', label: 'Complex Formation', explanation: 'Small metal ions with available d orbitals and high charge density form coordination complexes readily.' },
    { id: 'catalytic-activity', label: 'Catalytic Activity', explanation: 'Transition metals catalyze reactions through variable oxidation states and surface adsorption.' },
    { id: 'magnetic-properties', label: 'Magnetic Properties', explanation: 'Many transition metals and ions are paramagnetic because they contain unpaired d electrons.' }
  ],
  generalTrends: [
    'High melting and boiling points',
    'Variable oxidation states',
    'Formation of colored ions',
    'Strong catalytic activity',
    'Paramagnetic behavior'
  ],
  trendSummary: 'Across the transition series, atomic size changes only slightly due to poor shielding by d-electrons. Variable oxidation states arise because both ns and (n-1)d electrons participate in bonding.',
  compounds: [
    { id: 'KMnO4', name: 'Potassium Permanganate', formula: 'KMnO4', description: 'Strong oxidizing agent with deep purple color.', prepSteps: [{ equation: '2KOH + MnO2 + O2 -> K2MnO4 + H2O', detail: 'Fusion of manganese dioxide with alkali in air forms manganate.' }, { equation: '3MnO4^2- + 4H+ -> 2MnO4^- + MnO2 + 2H2O', detail: 'Disproportionation converts manganate into permanganate.' }] },
    { id: 'K2Cr2O7', name: 'Potassium Dichromate', formula: 'K2Cr2O7', description: 'Orange oxidizing agent used in laboratories and industry.', prepSteps: [{ equation: '2K2CrO4 + H2SO4 -> K2Cr2O7 + K2SO4 + H2O', detail: 'Acidification of chromate solution forms dichromate.' }] },
    { id: 'Fe2O3', name: 'Ferric Oxide', formula: 'Fe2O3', description: 'Reddish iron oxide commonly found as rust and ore hematite.', prepSteps: [{ equation: '4Fe + 3O2 -> 2Fe2O3', detail: 'Iron reacts with oxygen forming ferric oxide.' }] },
    { id: 'CuSO4', name: 'Copper Sulfate', formula: 'CuSO4.5H2O', description: 'Blue crystalline salt used in electroplating and fungicides.', prepSteps: [{ equation: 'CuO + H2SO4 -> CuSO4 + H2O', detail: 'Copper oxide reacts with sulfuric acid producing copper sulfate.' }] },
    { id: 'TiO2', name: 'Titanium Dioxide', formula: 'TiO2', description: 'White pigment with high refractive index and UV resistance.', prepSteps: [{ equation: 'TiCl4 + O2 -> TiO2 + 2Cl2', detail: 'Oxidation of titanium tetrachloride forms titanium dioxide.' }] },
    { id: 'NiCO4', name: 'Nickel Tetracarbonyl', formula: 'Ni(CO)4', description: 'Volatile nickel complex used in metal purification.', prepSteps: [{ equation: 'Ni + 4CO -> Ni(CO)4', detail: 'Nickel reacts with carbon monoxide forming volatile carbonyl complex.' }] },
    { id: 'FeSO4', name: 'Ferrous Sulfate', formula: 'FeSO4.7H2O', description: 'Green crystalline salt used in medicine and water treatment.', prepSteps: [{ equation: 'Fe + H2SO4 -> FeSO4 + H2', detail: 'Iron reacts with dilute sulfuric acid producing ferrous sulfate.' }] }
  ],
  applications: [
    { title: 'Iron in construction', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80', explanation: 'Iron and steel provide high tensile strength for buildings, bridges, and machinery.', narration: 'Iron and steel provide high tensile strength for buildings, bridges, and machinery.' },
    { title: 'Catalysts in industries', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80', explanation: 'Transition metals accelerate reactions due to variable oxidation states and surface adsorption.', narration: 'Transition metals accelerate reactions due to variable oxidation states and surface adsorption.' },
    { title: 'Electroplating', image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=900&q=80', explanation: 'Copper, chromium, and nickel coatings improve corrosion resistance and appearance.', narration: 'Copper, chromium, and nickel coatings improve corrosion resistance and appearance.' },
    { title: 'Titanium dioxide in paints', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80', explanation: 'Titanium dioxide provides bright whiteness and UV protection in paints and cosmetics.', narration: 'Titanium dioxide provides bright whiteness and UV protection in paints and cosmetics.' },
    { title: 'Potassium permanganate disinfectant', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80', explanation: 'Permanganate oxidizes organic matter and microorganisms effectively.', narration: 'Permanganate oxidizes organic matter and microorganisms effectively.' },
    { title: 'Magnetic materials', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', explanation: 'Iron, cobalt, and nickel exhibit strong magnetic properties useful in motors and electronics.', narration: 'Iron, cobalt, and nickel exhibit strong magnetic properties useful in motors and electronics.' }
  ]
};

const coordinationData: TransitionData = {
  title: 'Coordination Chemistry',
  shortTitle: 'Coordination Compounds',
  description: 'Compounds formed by central metal atoms or ions bonded to surrounding ligands through coordinate covalent bonds.',
  outerConfiguration: '(n-1)d1-10 ns1-2',
  elements: [
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, fullConfiguration: '1s2 2s2 2p6 3s2 3p6 3d6 4s2', shells: [2, 8, 14, 2], valenceElectrons: 2, oxidationState: '+2, +3', narration: 'Iron forms many biologically important coordination compounds, including the iron center in hemoglobin.' },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, fullConfiguration: '1s2 2s2 2p6 3s2 3p6 3d7 4s2', shells: [2, 8, 15, 2], valenceElectrons: 9, oxidationState: '+2, +3', narration: 'Cobalt commonly forms stable octahedral complexes in plus two and plus three oxidation states.' },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, fullConfiguration: '[Ar] 3d8 4s2', shells: [2, 8, 16, 2], valenceElectrons: 10, oxidationState: '0, +2', narration: 'Nickel forms tetrahedral, square planar, and carbonyl coordination compounds.' },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, fullConfiguration: '[Ar] 3d10 4s1', shells: [2, 8, 18, 1], valenceElectrons: 11, oxidationState: '+1, +2', narration: 'Copper two plus forms deep blue ammine complexes because of d-d electronic transitions.' },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, fullConfiguration: '[Ar] 3d5 4s1', shells: [2, 8, 13, 1], valenceElectrons: 6, oxidationState: '+2, +3, +6', narration: 'Chromium forms colored coordination compounds and stable octahedral complexes.' },
    { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, fullConfiguration: '[Xe] 4f14 5d9 6s1', shells: [2, 8, 18, 32, 17, 1], valenceElectrons: 10, oxidationState: '+2, +4', narration: 'Platinum forms square planar complexes such as cisplatin, an important anticancer drug.' }
  ],
  trends: [
    { id: 'coordination-number', label: 'Coordination Number', explanation: 'Coordination number depends on metal ion size, charge, ligand size, and electronic arrangement.' },
    { id: 'ligand-strength', label: 'Ligand Strength', explanation: 'Weak ligands like fluoride and water produce small splitting, while strong ligands like cyanide and carbon monoxide produce large splitting.' },
    { id: 'magnetic-nature', label: 'Magnetic Nature', explanation: 'High-spin complexes often have unpaired electrons and are paramagnetic, while low-spin complexes may be diamagnetic.' },
    { id: 'color', label: 'Color of Complexes', explanation: 'Complexes show colors because electrons absorb visible light during d-d transitions between split d orbitals.' },
    { id: 'hybridization', label: 'Hybridization', explanation: 'Hybridization models describe common shapes such as octahedral, tetrahedral, square planar, and linear complexes.' },
    { id: 'crystal-field-splitting', label: 'Crystal Field Splitting', explanation: 'Ligands split d orbitals into different energy levels depending on geometry and ligand strength.' },
    { id: 'stability-constant', label: 'Stability Constant', explanation: 'Stability constants measure how strongly ligands bind to a metal center.' },
    { id: 'chelate-effect', label: 'Chelate Effect', explanation: 'Multidentate ligands form ring structures and usually create more stable complexes than similar monodentate ligands.' }
  ],
  generalTrends: [
    'Octahedral splitting: t2g lower, eg higher',
    'Tetrahedral splitting: e lower, t2 higher',
    'Square planar splitting is large',
    'Weak ligands form high-spin complexes',
    'Strong ligands form low-spin complexes'
  ],
  trendSummary: 'Weak ligands like F- and H2O produce small crystal field splitting, forming high-spin complexes. Strong ligands like CN- and CO produce large crystal field splitting, forming low-spin complexes. Transition metal complexes show colors due to d-d transitions.',
  compounds: [
    { id: 'FeCN6', name: 'Potassium Ferrocyanide', formula: 'K4[Fe(CN)6]', description: 'Stable coordination compound with strong-field cyanide ligands.', prepSteps: [{ equation: 'FeSO4 + KCN -> K4[Fe(CN)6]', detail: 'Ferrous ions combine with cyanide ligands forming ferrocyanide complex.' }, { equation: 'CN- ligand field -> low spin complex', detail: 'Strong CN- ligands cause large crystal field splitting resulting in low-spin configuration.' }] },
    { id: 'CuNH3', name: 'Tetraammine Copper(II) Sulfate', formula: '[Cu(NH3)4]SO4', description: 'Deep blue copper-ammonia complex.', prepSteps: [{ equation: 'CuSO4 + NH3 -> [Cu(NH3)4]SO4', detail: 'Ammonia ligands coordinate with copper ion producing intense blue complex.' }, { equation: 'd-d transition -> blue color', detail: 'Color arises due to d-d electronic transitions.' }] },
    { id: 'CoNH3', name: 'Hexaammine Cobalt(III) Chloride', formula: '[Co(NH3)6]Cl3', description: 'Classic Werner coordination compound.', prepSteps: [{ equation: 'CoCl3 + NH3 -> [Co(NH3)6]Cl3', detail: 'Cobalt ion coordinates with six ammonia ligands forming octahedral complex.' }, { equation: 'Large splitting -> paired electrons', detail: 'Large splitting energy stabilizes paired electrons.' }] },
    { id: 'AgNH3', name: 'Diammine Silver Complex', formula: '[Ag(NH3)2]+', description: 'Tollens reagent used in aldehyde detection reactions.', prepSteps: [{ equation: 'AgNO3 + NH3 -> [Ag(NH3)2]+', detail: 'Silver ion forms soluble ammine complex in aqueous ammonia.' }, { equation: 'Aldehyde + Ag complex -> Ag mirror', detail: 'Aldehydes reduce silver complex producing metallic silver mirror.' }] },
    { id: 'Cisplatin', name: 'Cisplatin', formula: 'cis-[Pt(NH3)2Cl2]', description: 'Important chemotherapy drug used in cancer treatment.', prepSteps: [{ equation: 'PtCl2 + NH3 -> cis-[Pt(NH3)2Cl2]', detail: 'Controlled ligand substitution forms cisplatin.' }, { equation: 'Square planar cis geometry -> activity', detail: 'Square planar geometry is essential for biological activity.' }] },
    { id: 'NiCO4', name: 'Nickel Tetracarbonyl', formula: '[Ni(CO)4]', description: 'Volatile metal carbonyl complex used in nickel purification.', prepSteps: [{ equation: 'Ni + 4CO -> [Ni(CO)4]', detail: 'Nickel coordinates with carbon monoxide ligands.' }, { equation: 'CO strong field -> electron pairing', detail: 'CO acts as strong-field ligand causing electron pairing.' }] }
  ],
  applications: [
    { title: 'Hemoglobin oxygen transport', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80', explanation: 'Iron coordination complex in hemoglobin reversibly binds oxygen for transport in blood.', narration: 'Iron coordination complex in hemoglobin reversibly binds oxygen for transport in blood.' },
    { title: 'Chlorophyll in photosynthesis', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80', explanation: 'Magnesium coordination complex absorbs sunlight during photosynthesis.', narration: 'Magnesium coordination complex absorbs sunlight during photosynthesis.' },
    { title: 'Cisplatin in chemotherapy', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80', explanation: 'Cisplatin binds DNA in cancer cells preventing replication and cell division.', narration: 'Cisplatin binds DNA in cancer cells preventing replication and cell division.' },
    { title: 'Electroplating and metallurgy', image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=900&q=80', explanation: 'Metal complexes help controlled deposition and purification of metals.', narration: 'Metal complexes help controlled deposition and purification of metals.' },
    { title: 'Analytical chemistry', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80', explanation: 'Colored coordination complexes are used in qualitative and quantitative chemical analysis.', narration: 'Colored coordination complexes are used in qualitative and quantitative chemical analysis.' },
    { title: 'Photography and silver complexes', image: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=900&q=80', explanation: 'Silver thiosulfate complexes dissolve unreacted silver halides during film fixing.', narration: 'Silver thiosulfate complexes dissolve unreacted silver halides during film fixing.' },
    { title: 'Biological enzymes', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80', explanation: 'Many enzymes contain metal coordination centers essential for catalysis and electron transfer.', narration: 'Many enzymes contain metal coordination centers essential for catalysis and electron transfer.' }
  ]
};

const Section: React.FC<{ index: number; title: string; actions?: React.ReactNode; children: React.ReactNode }> = ({ index, title, actions, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45 }}
    className="rounded-2xl border border-slate-700/65 bg-slate-950/62 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6"
  >
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

const CrystalFieldDiagram: React.FC = () => (
  <div className="grid gap-4 lg:grid-cols-3">
    {[
      { title: 'Octahedral Field', lower: 't2g lower energy', upper: 'eg higher energy', bars: ['bottom-10', 'bottom-10', 'bottom-10', 'bottom-28', 'bottom-28'] },
      { title: 'Tetrahedral Field', lower: 'e lower energy', upper: 't2 higher energy', bars: ['bottom-10', 'bottom-10', 'bottom-26', 'bottom-26', 'bottom-26'] },
      { title: 'Square Planar Field', lower: 'large splitting', upper: 'paired electrons', bars: ['bottom-8', 'bottom-14', 'bottom-22', 'bottom-32', 'bottom-40'] }
    ].map((field) => (
      <div key={field.title} className="rounded-lg border border-cyan-400/20 bg-black/35 p-4">
        <div className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{field.title}</div>
        <div className="relative mt-4 h-44 rounded-md border border-white/10 bg-slate-950/70">
          {field.bars.map((bottom, index) => (
            <div key={`${field.title}-${index}`} className={`absolute h-1 w-12 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.45)] ${bottom}`} style={{ left: `${18 + index * 15}%` }} />
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-400">{field.lower}; {field.upper}.</p>
      </div>
    ))}
  </div>
);

const TrendVisualizer: React.FC<{ data: TransitionData; variant?: DBlockChapterId }> = ({ data, variant = 'transition' }) => {
  const [activeTrendId, setActiveTrendId] = useState(data.trends[0].id);
  const activeTrend = data.trends.find((trend) => trend.id === activeTrendId) ?? data.trends[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {data.trends.map((trend) => (
          <button
            key={trend.id}
            type="button"
            onClick={() => setActiveTrendId(trend.id)}
            className={`shrink-0 rounded-md border px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition ${
              activeTrendId === trend.id
                ? 'border-cyan-300 bg-cyan-400/14 text-white shadow-[0_0_20px_rgba(34,211,238,0.22)]'
                : 'border-cyan-400/15 bg-white/[0.025] text-cyan-100/70 hover:border-cyan-300/50'
            }`}
          >
            {trend.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-cyan-400/20 bg-slate-950/50 p-5 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-cyan-400/40 bg-gray-950/90 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.22em] text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.18)]">
            Sc {'->'} Zn
          </div>
          <VoiceNarrator label="Explain Trend" text={`${activeTrend.label}. ${activeTrend.explanation} ${data.trendSummary}`} className="rounded-full py-2 text-[10px]" />
        </div>
        <div className="grid w-full gap-4 xl:grid-cols-[1fr_260px]">
          <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden rounded-lg border border-cyan-400/10 bg-black/30">
            <div className="absolute inset-x-10 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-700 via-cyan-400 to-emerald-500 shadow-[0_0_24px_rgba(34,211,238,0.3)]" />
            <div className="relative z-10 grid grid-cols-5 gap-3">
              {data.elements.map((element, index) => (
                <motion.div
                  key={element.symbol}
                  initial={{ opacity: 0, y: index % 2 === 0 ? -16 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="grid h-14 w-16 place-items-center rounded-md border border-cyan-300/40 bg-black/80 font-mono text-lg font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.2)] backdrop-blur-md"
                >
                  {element.symbol}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-lime-400/25 bg-lime-400/[0.035] p-4">
            <div className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-lime-300">General Trends</div>
            <div className="mt-3 space-y-2">
              {data.generalTrends.map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-xs font-semibold text-slate-200">{item}</div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-sm leading-6 text-slate-300">{activeTrend.explanation}</p>
        {variant === 'coordination' && (
          <div className="mt-5">
            <CrystalFieldDiagram />
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ data: TransitionData; chapterId: DBlockChapterId; defaultSymbol: string }> = ({ data, chapterId, defaultSymbol }) => {
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
    utterance.volume = 1;
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
    resetConfigFocus();
    stopApplications();
  }, [defaultSymbol, data]);

  const handleConfigStep = (step: number) => {
    setActiveConfigToken(step);
    setValenceOnly(false);
    setActiveShell(configTokens[step]?.shellIndex ?? null);
  };

  const resetConfigFocus = () => {
    setActiveConfigToken(null);
    setActiveShell(null);
    setValenceOnly(false);
  };

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
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.cancel();
    applicationSessionRef.current += 1;
    applicationIndexRef.current = 0;
    applicationPausedRef.current = false;
    setActiveApplication(null);
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
                    {configTokens.map((token, index) => (
                      <motion.span key={`${token.label}-${index}`} animate={{ opacity: activeConfigToken === null || activeConfigToken === index ? 1 : 0.16, scale: activeConfigToken === index ? 1.08 : 1 }} className={`rounded border px-2 py-1 transition ${activeConfigToken === index ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.34)]' : activeConfigToken === null ? 'border-cyan-400/10 bg-cyan-400/5' : 'border-slate-800 bg-black text-slate-600'}`}>
                        {token.label}
                      </motion.span>
                    ))}
                  </dd>
                </div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Shells</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.shells.join(',')}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Valence Electrons</dt><dd className="mt-1 font-mono text-cyan-100">{chapterId === 'coordination' && activeElement.symbol === 'Co' ? '3d7 4s2' : activeElement.symbol === 'Fe' ? '2 (4s) + variable d electrons' : `${activeElement.valenceElectrons} + variable d electrons`}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Oxidation State</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.oxidationState}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Outer Electronic Configuration</dt><dd className="mt-1 font-mono text-cyan-100">{data.outerConfiguration}</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                {configTokens.map((token, index) => (
                  <button key={`focus-${token.label}-${index}`} type="button" onClick={() => handleConfigStep(index)} className={`rounded-md border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition ${activeConfigToken === index ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.22)]' : 'border-cyan-400/25 text-cyan-200 hover:bg-cyan-400/10'}`}>
                    {token.label}
                  </button>
                ))}
                <button type="button" onClick={resetConfigFocus} className="rounded-md border border-slate-500/40 bg-slate-500/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-300 hover:bg-slate-500/15">Show All</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      <Section index={2} title={chapterId === 'coordination' ? 'Periodic Trends & Crystal Field Theory' : 'Periodic Trends'}>
        <TrendVisualizer data={data} variant={chapterId} />
      </Section>

      <Section index={3} title="Important Compounds">
        <div className="grid gap-5 lg:grid-cols-2">
          {data.compounds.map((compound) => <CompoundCard key={compound.id} compound={compound} />)}
        </div>
      </Section>

      <Section index={4} title="Real World Applications" actions={
        <button type="button" onClick={readApplications} className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.14)] transition hover:border-cyan-300 hover:bg-cyan-400/15">
          <span className="inline-flex items-center gap-2">
            {applicationSpeechState === 'playing' ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
            {applicationSpeechState === 'playing' ? 'Pause Applications' : applicationSpeechState === 'paused' ? 'Resume Applications' : 'Read All Applications'}
          </span>
        </button>
      }>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.applications.map((application, index) => <ApplicationCard key={application.title} application={application} active={activeApplication === index} />)}
        </div>
      </Section>
    </div>
  );
};

export const DBlockModule: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<DBlockChapterId | null>(null);
  const activeData = activeChapter === 'coordination' ? coordinationData : transitionData;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <FloatingParticlesBackground />
      <div className="pointer-events-none absolute inset-0 grid-bg-cyan opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(to_bottom,transparent,#000_88%)]" />
      <AnimatePresence mode="wait">
        {activeChapter ? (
          <motion.div key={activeChapter} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
            <button type="button" onClick={() => setActiveChapter(null)} className="fixed left-5 top-5 z-30 rounded-md border border-cyan-400/30 bg-black/70 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300 hover:bg-cyan-400/10">
              All d-block sections
            </button>
            <Dashboard data={activeData} chapterId={activeChapter} defaultSymbol={activeChapter === 'coordination' ? 'Co' : 'Fe'} />
          </motion.div>
        ) : (
          <motion.main key="d-block-home" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-28 md:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">/inorganic/d-block</p>
              <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">d-Block Visualization Flow</h1>
              <p className="mt-4 text-base leading-7 text-slate-400">Choose a d-block section, then explore configurations, trends, compounds, and real-world applications.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { id: 'transition' as const, data: transitionData },
                { id: 'coordination' as const, data: coordinationData }
              ].map((chapter, index) => (
                <motion.button key={chapter.id} type="button" whileHover={{ scale: 1.035, y: -6 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveChapter(chapter.id)} className="group min-h-[240px] rounded-lg border border-cyan-400/25 bg-cyan-400/[0.035] p-7 text-left shadow-[0_0_30px_rgba(34,211,238,0.09)] backdrop-blur-xl transition hover:border-cyan-300/70 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full border border-cyan-400/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Section {String(index + 1).padStart(2, '0')}</span>
                    <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">{chapter.data.shortTitle}</h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{chapter.data.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DBlockModule;
