import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { ChemicalElement, ELEMENTS } from '../data/elements';

export interface PeriodicTrend {
  id: string;
  name: string;
  description: string;
  scientificExplanation: string;
  exceptions: string;
  trendX: 'Increases' | 'Decreases' | 'Varies' | 'Constant';
  trendY: 'Increases' | 'Decreases' | 'Varies' | 'Constant';
  narrationText: string;
}

export const PERIODIC_TRENDS: PeriodicTrend[] = [
  {
    id: 'atomic-radius',
    name: 'Atomic Radius',
    description: 'The physical size of an atom (distance from nucleus to valence shell).',
    scientificExplanation: 'Decreases left-to-right across a period due to increasing positive effective nuclear charge pulling the outer shell closer. Increases top-to-bottom down a group as new core principal shells are added, pushing valence electrons outward.',
    exceptions: 'Noble gases are sometimes measured using Van der Waals radii, which makes them appear slightly larger than preceding halogens.',
    trendX: 'Decreases',
    trendY: 'Increases',
    narrationText: 'Atomic radius decreases from left to right across a period, and increases from top to bottom down a group as new electron shells are added.'
  },
  {
    id: 'ionization-energy',
    name: 'Ionization Energy',
    description: 'The energy required to remove an electron from a gaseous atom.',
    scientificExplanation: 'Increases left-to-right across a period because the stronger nuclear charge binds valence electrons more tightly. Decreases top-to-bottom down a group as shielding increases and outer electrons are further from the positive core.',
    exceptions: 'Group 13 (starts p-orbital) is lower than Group 2 (full s-orbital). Group 16 (first p-orbital pairing repulsions) is lower than Group 15.',
    trendX: 'Increases',
    trendY: 'Decreases',
    narrationText: 'Ionization energy increases from left to right across a period because the nuclear charge binds electrons more tightly, and decreases from top to bottom as shielding increases.'
  },
  {
    id: 'electronegativity',
    name: 'Electronegativity',
    description: "An atom's ability to attract shared bonding electrons in a compound.",
    scientificExplanation: 'Increases left-to-right across a period and decreases top-to-bottom down a group. Determined by small atomic radius and a high effective nuclear charge that strongly attracts external bonding pairs.',
    exceptions: 'Noble gases (except heavy ones) generally have no electronegativity values because they do not readily form chemical bonds.',
    trendX: 'Increases',
    trendY: 'Decreases',
    narrationText: 'Electronegativity increases from left to right across a period, and decreases from top to bottom down a group. This measures an atom\'s ability to attract shared electrons in a bond.'
  },
  {
    id: 'electron-affinity',
    name: 'Electron Affinity',
    description: 'The energy change that occurs when an electron is added to a neutral atom.',
    scientificExplanation: 'Generally increases (becomes more exothermic) left-to-right as elements approach stable noble gas configuration. Decreases top-to-bottom down groups as atomic radius grows, weakening nuclear attraction to new electrons.',
    exceptions: 'Group 2 (Be, Mg) and Group 15 (half-filled p-orbital) have very low or positive affinities. Noble gases have positive values (endothermic).',
    trendX: 'Increases',
    trendY: 'Decreases',
    narrationText: 'Electron affinity increases from left to right across a period, and decreases from top to bottom down a group.'
  },
  {
    id: 'metallic-character',
    name: 'Metallic Character',
    description: 'Reflects how easily an atom can lose valence electrons.',
    scientificExplanation: 'Decreases left-to-right across a period. Increases top-to-bottom down a group, reaching a peak at Francium/Cesium, where outer valence electrons are furthest from the nuclear pull.',
    exceptions: 'Transition metals show complex localized changes due to inner d-orbital shielding dynamics.',
    trendX: 'Decreases',
    trendY: 'Increases',
    narrationText: 'Metallic character decreases from left to right across a period, and increases from top to bottom down a group. This represents the ease with which an atom loses valence electrons.'
  },
  {
    id: 'non-metallic-character',
    name: 'Non-Metallic Character',
    description: 'An atom\'s ability to attract and gain electrons.',
    scientificExplanation: 'Increases left-to-right across a period and decreases top-to-bottom down a group. Smaller atomic sizes and higher nuclear charges at the top right of the table maximize the pull on electrons.',
    exceptions: 'Noble gases are highly unreactive rather than typical active nonmetals due to completed octets.',
    trendX: 'Increases',
    trendY: 'Decreases',
    narrationText: 'Non-metallic character increases from left to right across a period, and decreases from top to bottom down a group, reflecting an atom\'s tendency to attract and gain electrons.'
  },
  {
    id: 'reactivity',
    name: 'Chemical Reactivity',
    description: 'How readily an element undergoes chemical reactions.',
    scientificExplanation: 'Reactivity is complex: For metals (left), reactivity increases top-to-bottom. For nonmetals (right), reactivity decreases top-to-bottom.',
    exceptions: 'Noble gases are chemically inert and unreactive. Heavy metals like Gold and Platinum are highly unreactive due to relativistic shielding.',
    trendX: 'Varies',
    trendY: 'Varies',
    narrationText: 'Chemical reactivity varies across a period. Down a group, it increases for metals, but decreases for non-metals.'
  },
  {
    id: 'shielding-effect',
    name: 'Shielding Effect',
    description: 'Core electrons blocking positive nuclear charge from outer valence electrons.',
    scientificExplanation: 'Remains relatively constant left-to-right across a period because electrons are added to the same energy level. Increases significantly top-to-bottom down a group as new core principal shells are added.',
    exceptions: 'D-orbital and f-orbital filling in transition series provide poorer shielding than s and p orbitals.',
    trendX: 'Constant',
    trendY: 'Increases',
    narrationText: 'The shielding effect remains constant from left to right across a period, but increases from top to bottom down a group as new inner electron shells are added.'
  },
  {
    id: 'effective-charge',
    name: 'Effective Nuclear Charge (Zeff)',
    description: 'The net positive charge experienced by outer valence electrons.',
    scientificExplanation: 'Increases left-to-right across a period as protons are added to the nucleus while core shielding remains constant. Remains relatively constant top-to-bottom down a group.',
    exceptions: 'Slightly complex shielding variations occur during d-orbital transitions.',
    trendX: 'Increases',
    trendY: 'Constant',
    narrationText: 'Effective nuclear charge increases from left to right across a period, and remains mostly constant from top to bottom down a group.'
  }
];

/**
 * Computes a relative trend glow intensity multiplier [0.2 .. 2.2] for an element
 */
export function getTrendGlowIntensity(element: ChemicalElement, trendId: string): number {
  if (element.category === 'noble-gas') {
    if (['electronegativity', 'electron-affinity', 'reactivity'].includes(trendId)) {
      return 0.15; // Dim noble gases entirely for bonding-specific trends
    }
  }

  // Column (Group) score: 1 to 18
  const col = element.group;
  // Period (Row) score: 1 to 7. Lanthanides/Actinides are treated as period 6/7, group 3
  let row = element.period;
  if (element.category === 'lanthanide') row = 6;
  if (element.category === 'actinide') row = 7;

  switch (trendId) {
    case 'atomic-radius':
    case 'metallic-character': {
      // Increases down and to the left (highest at Fr/Cs)
      const xScore = (19 - col) / 18;
      const yScore = row / 7;
      return 0.5 + ((xScore + yScore) / 2) * 1.8;
    }
    case 'ionization-energy':
    case 'electronegativity':
    case 'electron-affinity':
    case 'non-metallic-character': {
      // Increases up and to the right (highest at F)
      const xScore = col / 18;
      const yScore = (8 - row) / 7;
      return 0.5 + ((xScore + yScore) / 2) * 1.8;
    }
    case 'reactivity': {
      // Reactivity peaks at bottom-left (metals) AND top-right (nonmetals, minus noble gas)
      if (element.category === 'noble-gas') return 0.15;
      
      const isMetal = element.group <= 12 || element.category === 'lanthanide' || element.category === 'actinide';
      if (isMetal) {
        const xScore = (13 - col) / 12;
        const yScore = row / 7;
        return 0.6 + ((xScore + yScore) / 2) * 1.7;
      } else {
        const xScore = (col - 12) / 6;
        const yScore = (8 - row) / 7;
        return 0.6 + ((xScore + yScore) / 2) * 1.7;
      }
    }
    case 'shielding-effect': {
      // Increases down a group, constant across a period
      return 0.5 + (row / 7) * 1.7;
    }
    case 'effective-charge': {
      // Increases across a period, constant down a group
      return 0.5 + (col / 18) * 1.7;
    }
    default:
      return 1.0;
  }
}

interface PeriodicTrendsButtonProps {
  onClick: () => void;
}

export const PeriodicTrendsButton: React.FC<PeriodicTrendsButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(168,85,247,0.4)' }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 border border-purple-500/40 bg-purple-950/20 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(168,85,247,0.15)] cursor-pointer text-xs font-mono font-bold tracking-[0.25em] text-purple-300 relative overflow-hidden flex items-center gap-2.5"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 opacity-50" />
      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
      PERIODIC TRENDS VISUALIZER
    </motion.button>
  );
};

interface TrendsPopupPanelProps {
  onSelectTrend: (trend: PeriodicTrend | null) => void;
  onClose: () => void;
}

export const TrendsPopupPanel: React.FC<TrendsPopupPanelProps> = ({ onSelectTrend, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <div className="w-full max-w-2xl border border-cyan-500/25 bg-gray-950/90 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,243,255,0.15)] relative overflow-hidden select-none">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-cyan-500/20 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-cyan-400">
              <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse rounded-full" />
              <span>SYSTEM SCANNER v4.1 // PERIODIC PROPERTY ENGINE</span>
            </div>
            <h2 className="text-2xl font-bold tracking-wider font-orbit text-white mt-1 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              SELECT PERIODIC TREND
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider cursor-pointer bg-gray-900/50 transition-all duration-300"
          >
            EXIT MODULE
          </button>
        </div>

        {/* Trends Grid Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PERIODIC_TRENDS.map((trend) => (
            <motion.button
              key={trend.id}
              onClick={() => onSelectTrend(trend)}
              whileHover={{ scale: 1.02, borderColor: 'rgba(0, 243, 255, 0.4)', backgroundColor: 'rgba(6, 182, 212, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="p-3 border border-white/5 bg-white/[0.02] rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-28"
            >
              <div>
                <h3 className="font-mono text-xs font-bold text-cyan-300">{trend.name}</h3>
                <p className="text-[10px] text-gray-400 mt-1.5 leading-normal line-clamp-3">
                  {trend.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 font-mono text-[8px] text-gray-500 tracking-wider">
                <span>VECTORS ACTIVE</span>
                <span className="text-cyan-400">SCAN &gt;&gt;</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface DirectionArrowSystemProps {
  trend: PeriodicTrend;
}

export const DirectionArrowSystem: React.FC<DirectionArrowSystemProps> = ({ trend }) => {
  const getArrowStyles = (dir: string) => {
    if (dir === 'Decreases') {
      return {
        gradient: "from-rose-800 via-red-600 to-red-900 shadow-[0_0_15px_rgba(220,38,38,0.4)]",
        arrowHeadX: "border-l-red-600 drop-shadow-[0_0_12px_#ef4444]",
        arrowHeadY: "border-t-red-600 drop-shadow-[0_0_12px_#ef4444]",
        label: "text-red-400 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
      };
    } else if (dir === 'Increases') {
      return {
        gradient: "from-lime-700 via-green-600 to-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.4)]",
        arrowHeadX: "border-l-emerald-600 drop-shadow-[0_0_12px_#10b981]",
        arrowHeadY: "border-t-emerald-600 drop-shadow-[0_0_12px_#10b981]",
        label: "text-lime-400 border-lime-500/40 shadow-[0_0_15px_rgba(132,204,22,0.2)]"
      };
    }
    return {
      gradient: "from-cyan-800 via-cyan-600 to-purple-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]",
      arrowHeadX: "border-l-cyan-600 drop-shadow-[0_0_12px_#06b6d4]",
      arrowHeadY: "border-t-cyan-600 drop-shadow-[0_0_12px_#06b6d4]",
      label: "text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
    };
  };

  const styleX = getArrowStyles(trend.trendX);
  const styleY = getArrowStyles(trend.trendY);

  return (
    <>
      {/* Horizontal Trend Arrow (Period 4: Left to Right) */}
      <motion.div
        style={{ gridRow: '5', gridColumn: '1 / -1' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative pointer-events-none z-[25] flex items-center justify-center w-full h-full"
      >
        <div className="absolute left-[1%] right-[1%] top-1/2 -translate-y-1/2 h-[12px] rounded-full overflow-visible">
          {/* Arrow body line */}
          <div className={`w-full h-full bg-gradient-to-r ${styleX.gradient} rounded-full relative`}>
            {/* Arrow Head (pointing Right) */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[16px] border-y-transparent right-[-6px] border-l-[24px] z-10 ${styleX.arrowHeadX}`} />
          </div>
          <div className={`absolute -top-10 left-1/2 -translate-x-1/2 font-mono text-[11px] font-bold tracking-widest uppercase bg-gray-950/90 px-4 py-1.5 rounded-full border ${styleX.label}`}>
            Period (Left ➔ Right): {trend.trendX}
          </div>
        </div>
      </motion.div>

      {/* Vertical Trend Arrow (Group 1: Top to Bottom) */}
      <motion.div
        style={{ gridColumn: '1', gridRow: '2 / 9' }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative pointer-events-none z-[25] flex items-center justify-center w-full h-full"
      >
        <div className="absolute top-[1%] bottom-[1%] left-1/2 -translate-x-1/2 w-[12px] rounded-full overflow-visible">
          {/* Arrow body line */}
          <div className={`w-full h-full bg-gradient-to-b ${styleY.gradient} rounded-full relative`}>
            {/* Arrow Head (pointing Down) */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-[16px] border-x-transparent bottom-[-6px] border-t-[24px] z-10 ${styleY.arrowHeadY}`} />
          </div>
          <div className={`absolute -right-[150px] top-1/2 -translate-y-1/2 font-mono text-[11px] font-bold tracking-widest uppercase rotate-90 origin-left select-none whitespace-nowrap bg-gray-950/90 px-4 py-1.5 rounded-full border ${styleY.label}`}>
            Group (Top ➔ Bottom): {trend.trendY}
          </div>
        </div>
      </motion.div>
    </>
  );
};

interface VoiceNarrationProps {
  text: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const VoiceNarrationManager: React.FC<VoiceNarrationProps> = ({ text, isMuted, onToggleMute }) => {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakText = useCallback(() => {
    if (!synthRef.current || isMuted) return;

    synthRef.current.cancel();
    if (synthRef.current.paused) synthRef.current.resume();
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    utterance.rate = 0.9;
    utterance.pitch = 1.08;
    utterance.volume = 1;

    const voices = synthRef.current.getVoices();
    const indianVoice =
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));

    if (indianVoice) {
      utterance.voice = indianVoice;
      utterance.lang = indianVoice.lang || 'en-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    synthRef.current.speak(utterance);
  }, [text, isMuted]);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const loadVoices = () => {
      if (!synthRef.current) return;
      synthRef.current.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (!synthRef.current) return;

    // Terminate ongoing speech instantly when a new trend is selected
    synthRef.current.cancel();

    if (isMuted) return;

    // Delay speech slightly to let the modal slide transition finish
    const timer = setTimeout(() => {
      speakText();
      if (!synthRef.current?.speaking && synthRef.current?.getVoices().length === 0) {
        window.setTimeout(speakText, 600);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [text, isMuted, speakText]);

  return (
    <div className="flex gap-2">
      <button
        onClick={speakText}
        className="px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-300 bg-cyan-950/20 hover:border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.15)] font-mono text-[10px] tracking-wider cursor-pointer transition-all duration-300"
      >
        SPEAK TREND
      </button>
      <button
        onClick={onToggleMute}
        className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] tracking-wider cursor-pointer transition-all duration-300 flex items-center gap-1.5
          ${isMuted 
            ? 'border-red-500/30 text-red-400 bg-red-950/10 hover:border-red-500/60' 
            : 'border-cyan-500/30 text-cyan-300 bg-cyan-950/20 hover:border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.15)]'}`}
      >
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isMuted ? 'bg-red-400' : 'bg-cyan-400'}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isMuted ? 'bg-red-500' : 'bg-cyan-500'}`} />
        </span>
        {isMuted ? 'MUTED' : 'VOICE ON'}
      </button>
    </div>
  );
};

interface TrendExplanationCardProps {
  trend: PeriodicTrend;
  isMuted: boolean;
  onToggleMute: () => void;
  onClose: () => void;
}

export const TrendExplanationCard: React.FC<TrendExplanationCardProps> = ({
  trend,
  isMuted,
  onToggleMute,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="absolute bottom-20 left-[5%] right-[5%] z-30 flex items-center justify-center p-2"
    >
      <div className="w-full max-w-4xl border border-cyan-500/30 bg-gray-950/95 rounded-xl p-4 md:p-5 shadow-[0_-5px_30px_rgba(0,243,255,0.15)] relative overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        {/* Title row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cyan-500/10 pb-3 mb-3 gap-2">
          <div>
            <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              <span>ACTIVE SCANNER MODULE // VECTORS ONLINE</span>
            </div>
            <h3 className="text-lg md:text-xl font-orbit font-bold text-white mt-0.5">
              {trend.name}
            </h3>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <VoiceNarrationManager 
              text={trend.narrationText} 
              isMuted={isMuted} 
              onToggleMute={onToggleMute} 
            />
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-purple-500/30 bg-purple-950/20 text-purple-300 hover:border-purple-500/60 font-mono text-[10px] tracking-widest uppercase cursor-pointer rounded-lg transition-all duration-300"
            >
              CLOSE
            </button>
          </div>
        </div>

        {/* Content rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <h4 className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">// Scientific Explanation</h4>
            <p className="text-[11px] md:text-xs text-gray-300 font-mono mt-1.5 leading-relaxed">
              {trend.scientificExplanation}
            </p>
          </div>
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-cyan-500/10 pt-3 md:pt-0 md:pl-4">
            <h4 className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider">// Key Exceptions / Notes</h4>
            <p className="text-[10px] text-gray-400 font-mono mt-1.5 leading-relaxed">
              {trend.exceptions}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
