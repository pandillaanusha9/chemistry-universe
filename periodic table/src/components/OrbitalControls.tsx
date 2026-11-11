import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChemicalElement } from '../data/elements';
import {
  getSubshellCounts,
  getShellDetails,
  getSubshellDetails
} from '../utils/orbitHelpers';

export interface HighlightState {
  type: 'all' | 'shell' | 'subshell';
  shellIndex: number | null;
  subshellType: 's' | 'p' | 'd' | 'f' | null;
}

interface OrbitalControlsProps {
  element: ChemicalElement;
  highlightState: HighlightState;
  setHighlightState: React.Dispatch<React.SetStateAction<HighlightState>>;
}

const SHELL_LABELS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
const SUBSHELL_LABELS: ('s' | 'p' | 'd' | 'f')[] = ['s', 'p', 'd', 'f'];

export const OrbitalControls: React.FC<OrbitalControlsProps> = ({
  element,
  highlightState,
  setHighlightState
}) => {
  // Get occupied subshell electron counts for active element
  const subshellCounts = getSubshellCounts(element.electronConfig);

  // Shell handles
  const totalOccupiedShells = element.shells.length;

  const handleShellClick = (index: number) => {
    if (index >= totalOccupiedShells) return;
    setHighlightState({
      type: 'shell',
      shellIndex: index,
      subshellType: null
    });
  };

  const handleSubshellClick = (type: 's' | 'p' | 'd' | 'f') => {
    if (subshellCounts[type] <= 0) return;
    setHighlightState({
      type: 'subshell',
      shellIndex: null,
      subshellType: type
    });
  };

  const handleReset = () => {
    setHighlightState({
      type: 'all',
      shellIndex: null,
      subshellType: null
    });
  };

  // Compute Selection Stats for Info Card
  const selectionInfo = React.useMemo(() => {
    if (highlightState.type === 'shell' && highlightState.shellIndex !== null) {
      const idx = highlightState.shellIndex;
      const details = getShellDetails(idx);
      const electrons = element.shells[idx] || 0;
      return {
        title: `${details.name} Shell`,
        electrons: `${electrons} Electron${electrons === 1 ? '' : 's'}`,
        type: details.type,
        level: details.level
      };
    }

    if (highlightState.type === 'subshell' && highlightState.subshellType !== null) {
      const type = highlightState.subshellType;
      const details = getSubshellDetails(type);
      const electrons = subshellCounts[type];
      return {
        title: `${type.toUpperCase()} Subshell`,
        electrons: `${electrons} Electron${electrons === 1 ? '' : 's'}`,
        type: details.description,
        level: details.l
      };
    }

    return null;
  }, [highlightState, element, subshellCounts]);

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute top-24 left-6 w-72 bg-gray-950/70 border border-cyan-500/20 backdrop-blur-md rounded-xl p-4 z-30 shadow-[0_0_30px_rgba(0,243,255,0.1)] select-none"
    >
      {/* HUD Header */}
      <div className="flex justify-between items-center border-b border-cyan-500/10 pb-2 mb-3">
        <span className="font-mono text-[9px] text-cyan-400 tracking-wider font-semibold">// QUANTUM TUNING MODULE</span>
        <button
          onClick={handleReset}
          className={`px-2 py-0.5 text-[9px] font-mono border rounded transition-all duration-200 cursor-pointer ${
            highlightState.type === 'all'
              ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(0,243,255,0.2)]'
              : 'border-white/10 hover:border-cyan-500/50 text-gray-400 hover:text-white'
          }`}
        >
          SHOW ALL
        </button>
      </div>

      {/* Main Shell Selection */}
      <div className="space-y-1.5 mb-3">
        <div className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">ENERGY LEVELS (SHELLS)</div>
        <div className="flex gap-1.5 flex-wrap">
          {SHELL_LABELS.map((name, idx) => {
            const isOccupied = idx < totalOccupiedShells;
            const isSelected = highlightState.type === 'shell' && highlightState.shellIndex === idx;

            return (
              <button
                key={name}
                disabled={!isOccupied}
                onClick={() => handleShellClick(idx)}
                className={`
                  w-8 h-8 rounded font-mono text-xs border flex items-center justify-center transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 shadow-[0_0_10px_rgba(0,243,255,0.3)] scale-105 font-bold'
                      : isOccupied
                      ? 'border-white/10 hover:border-cyan-500/40 bg-white/5 text-gray-200 hover:text-white'
                      : 'border-white/5 bg-transparent text-gray-700 cursor-not-allowed opacity-30'
                  }
                `}
                title={isOccupied ? `Highlight Shell ${name}` : `Shell ${name} unoccupied`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subshell Selection */}
      <div className="space-y-1.5 mb-4">
        <div className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">ORBITALS (SUBSHELLS)</div>
        <div className="flex gap-1.5">
          {SUBSHELL_LABELS.map((type) => {
            const count = subshellCounts[type];
            const isOccupied = count > 0;
            const isSelected = highlightState.type === 'subshell' && highlightState.subshellType === type;

            return (
              <button
                key={type}
                disabled={!isOccupied}
                onClick={() => handleSubshellClick(type)}
                className={`
                  flex-1 h-8 rounded font-mono text-xs border flex items-center justify-center transition-all duration-200 cursor-pointer capitalize
                  ${
                    isSelected
                      ? 'border-purple-400 bg-purple-950/50 text-purple-300 shadow-[0_0_10px_rgba(189,0,255,0.3)] scale-105 font-bold'
                      : isOccupied
                      ? 'border-white/10 hover:border-purple-500/40 bg-white/5 text-gray-200 hover:text-white'
                      : 'border-white/5 bg-transparent text-gray-700 cursor-not-allowed opacity-30'
                  }
                `}
                title={isOccupied ? `Highlight Subshell ${type} (${count} e⁻)` : `Subshell ${type} unoccupied`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Target Stats Card */}
      <AnimatePresence mode="wait">
        {selectionInfo ? (
          <motion.div
            key={selectionInfo.title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="border border-cyan-500/30 bg-cyan-950/20 rounded-lg p-3 space-y-1"
          >
            <div className="flex justify-between items-baseline">
              <span className="font-mono font-bold text-xs text-white tracking-wide glow-blue">{selectionInfo.title}</span>
              <span className="font-mono text-[9px] text-cyan-400/80 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-500/10">
                {selectionInfo.level}
              </span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Occupied:</span>
              <span className="text-emerald-400 font-bold">{selectionInfo.electrons}</span>
            </div>
            <div className="text-[10px] font-mono text-gray-500 italic pt-1 border-t border-cyan-500/10 mt-1">
              {selectionInfo.type}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-white/5 bg-white/[0.01] rounded-lg p-3 text-center"
          >
            <span className="font-mono text-[10px] text-gray-600 block">NO FILTER ACTIVE</span>
            <span className="font-mono text-[8px] text-gray-600">Select shell or orbital to filter pathway</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
