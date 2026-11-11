import React from 'react';
import { motion } from 'framer-motion';
import { ChemicalElement } from '../data/elements';

export type FilterMode = 'category' | 'group';

export interface GroupInfo {
  id: string;
  name: string;
  description: string;
  glowClass: string;
}

export const GROUP_LIST: GroupInfo[] = [
  { id: '1A', name: '1A', description: 'Alkali Metals / Hydrogen', glowClass: 'border-red-500/30 hover:border-red-400 bg-red-950/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]' },
  { id: '2A', name: '2A', description: 'Alkaline Earth Metals', glowClass: 'border-orange-500/30 hover:border-orange-400 bg-orange-950/10 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]' },
  { id: '3B', name: '3B', description: 'Scandium Group / f-Block', glowClass: 'border-pink-500/30 hover:border-pink-400 bg-pink-950/10 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.1)]' },
  { id: '4B', name: '4B', description: 'Titanium Group', glowClass: 'border-purple-500/30 hover:border-purple-400 bg-purple-950/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]' },
  { id: '5B', name: '5B', description: 'Vanadium Group', glowClass: 'border-indigo-500/30 hover:border-indigo-400 bg-indigo-950/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]' },
  { id: '6B', name: '6B', description: 'Chromium Group', glowClass: 'border-blue-500/30 hover:border-blue-400 bg-blue-950/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' },
  { id: '7B', name: '7B', description: 'Manganese Group', glowClass: 'border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' },
  { id: '8B', name: '8B', description: 'Iron-Cobalt-Nickel Groups', glowClass: 'border-teal-500/30 hover:border-teal-400 bg-teal-950/10 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]' },
  { id: '1B', name: '1B', description: 'Coinage Metals Group', glowClass: 'border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' },
  { id: '2B', name: '2B', description: 'Zinc Group', glowClass: 'border-green-500/30 hover:border-green-400 bg-green-950/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]' },
  { id: '3A', name: '3A', description: 'Boron Group', glowClass: 'border-lime-500/30 hover:border-lime-400 bg-lime-950/10 text-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.1)]' },
  { id: '4A', name: '4A', description: 'Carbon Group', glowClass: 'border-yellow-500/30 hover:border-yellow-400 bg-yellow-950/10 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.1)]' },
  { id: '5A', name: '5A', description: 'Nitrogen Group', glowClass: 'border-amber-500/30 hover:border-amber-400 bg-amber-950/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]' },
  { id: '6A', name: '6A', description: 'Chalcogens (Oxygen Group)', glowClass: 'border-orange-500/30 hover:border-orange-400 bg-orange-950/10 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]' },
  { id: '7A', name: '7A', description: 'Halogens (Fluorine Group)', glowClass: 'border-red-500/30 hover:border-red-400 bg-red-950/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]' },
  { id: '8A', name: '8A', description: 'Noble Gases (Helium Group)', glowClass: 'border-fuchsia-500/30 hover:border-fuchsia-400 bg-fuchsia-950/10 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.1)]' }
];

/**
 * Checks if an element belongs to the given Group classification (CAS notation)
 */
export function isElementInGroup(element: ChemicalElement, groupName: string | null): boolean {
  if (!groupName) return false;
  
  switch (groupName) {
    case '1A':
      return element.group === 1;
    case '2A':
      return element.group === 2;
    case '3B':
      // Group 3 includes Lanthanides and Actinides in standard layout classification
      return element.group === 3 || element.category === 'lanthanide' || element.category === 'actinide';
    case '4B':
      return element.group === 4 && element.category !== 'lanthanide' && element.category !== 'actinide';
    case '5B':
      return element.group === 5 && element.category !== 'lanthanide' && element.category !== 'actinide';
    case '6B':
      return element.group === 6 && element.category !== 'lanthanide' && element.category !== 'actinide';
    case '7B':
      return element.group === 7 && element.category !== 'lanthanide' && element.category !== 'actinide';
    case '8B':
      // CAS Group VIIIB/8B includes columns 8, 9, and 10
      return (element.group === 8 || element.group === 9 || element.group === 10) && 
             element.category !== 'lanthanide' && element.category !== 'actinide';
    case '1B':
      return element.group === 11 && element.category !== 'lanthanide' && element.category !== 'actinide';
    case '2B':
      return element.group === 12 && element.category !== 'lanthanide' && element.category !== 'actinide';
    case '3A':
      return element.group === 13;
    case '4A':
      return element.group === 14;
    case '5A':
      return element.group === 15;
    case '6A':
      return element.group === 16;
    case '7A':
      return element.group === 17;
    case '8A':
      return element.group === 18;
    default:
      return false;
  }
}

/**
 * Resolves the Group classification code (1A-8A, 1B-8B) for a given element
 */
export function getElementGroupCode(element: ChemicalElement): string | null {
  if (element.category === 'lanthanide' || element.category === 'actinide') {
    return '3B';
  }
  const group = element.group;
  if (group === 1) return '1A';
  if (group === 2) return '2A';
  if (group === 3) return '3B';
  if (group === 4) return '4B';
  if (group === 5) return '5B';
  if (group === 6) return '6B';
  if (group === 7) return '7B';
  if (group === 8 || group === 9 || group === 10) return '8B';
  if (group === 11) return '1B';
  if (group === 12) return '2B';
  if (group === 13) return '3A';
  if (group === 14) return '4A';
  if (group === 15) return '5A';
  if (group === 16) return '6A';
  if (group === 17) return '7A';
  if (group === 18) return '8A';
  return null;
}

interface FilterModeToggleProps {
  activeMode: FilterMode;
  onChange: (mode: FilterMode) => void;
}

export const FilterModeToggle: React.FC<FilterModeToggleProps> = ({ activeMode, onChange }) => {
  return (
    <div className="relative flex p-1 bg-gray-950/80 border border-cyan-500/20 backdrop-blur-md rounded-full w-80 shadow-[0_0_20px_rgba(0,243,255,0.08)] mb-6 select-none">
      {/* Sliding selection pill background */}
      <motion.div
        className="absolute inset-y-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
        initial={false}
        animate={{
          left: activeMode === 'category' ? '4px' : '158px',
          width: '158px'
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
      
      <button
        onClick={() => onChange('category')}
        className={`flex-1 relative z-10 py-1.5 text-[10px] font-mono font-bold tracking-widest text-center cursor-pointer transition-all duration-300 ${
          activeMode === 'category' ? 'text-cyan-300 glow-blue scale-105' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        ATOMIC CATEGORIES
      </button>
      
      <button
        onClick={() => onChange('group')}
        className={`flex-1 relative z-10 py-1.5 text-[10px] font-mono font-bold tracking-widest text-center cursor-pointer transition-all duration-300 ${
          activeMode === 'group' ? 'text-purple-300 glow-purple scale-105' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        GROUP FILTERS
      </button>
    </div>
  );
};

interface GroupFilterPanelProps {
  activeFilter: string | null;
  onSelectFilter: (filter: string | null) => void;
  hoveredFilter: string | null;
  setHoveredFilter: (filter: string | null) => void;
}

export const GroupFilterPanel: React.FC<GroupFilterPanelProps> = ({
  activeFilter,
  onSelectFilter,
  hoveredFilter,
  setHoveredFilter
}) => {
  const currentActive = hoveredFilter || activeFilter;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col gap-3"
    >
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {GROUP_LIST.map((group) => {
          const isSelected = activeFilter === group.id;
          const isHovered = hoveredFilter === group.id;
          const isAnyFiltered = activeFilter !== null || hoveredFilter !== null;
          const isMatch = group.id === currentActive;

          return (
            <button
              key={group.id}
              onClick={() => onSelectFilter(isSelected ? null : group.id)}
              onMouseEnter={() => setHoveredFilter(group.id)}
              onMouseLeave={() => setHoveredFilter(null)}
              className={`
                relative px-3 py-1.5 text-xs font-mono border rounded-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-w-[50px]
                ${group.glowClass}
                ${isMatch ? 'ring-2 ring-purple-400/60 scale-105 font-bold z-10' : ''}
                ${isAnyFiltered && !isMatch ? 'opacity-30' : 'opacity-100'}
              `}
            >
              <span>{group.name}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Info Readout bar describing active group under hover/selection */}
      <div className="h-6 w-full flex items-center justify-center sm:justify-start">
        {currentActive ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[10px] font-mono text-purple-400"
          >
            <span className="w-1.5 h-1.5 bg-purple-400 animate-pulse rounded-full" />
            <span className="font-bold uppercase tracking-wider">{currentActive} Group //</span>
            <span className="text-gray-400">{GROUP_LIST.find(g => g.id === currentActive)?.description}</span>
          </motion.div>
        ) : (
          <span className="text-[9px] font-mono text-gray-600 tracking-wider">
            // HOVER OR CLICK GROUP CODES TO SCAN BLOCK ALIGNMENTS
          </span>
        )}
      </div>
    </motion.div>
  );
};
