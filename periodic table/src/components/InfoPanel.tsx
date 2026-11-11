import React from 'react';
import { motion } from 'framer-motion';
import { ChemicalElement, CATEGORIES } from '../data/elements';

interface InfoPanelProps {
  element: ChemicalElement;
}

// Shell labels and max capacities
const SHELL_CAPACITIES = [
  { name: 'K (n=1)', max: 2 },
  { name: 'L (n=2)', max: 8 },
  { name: 'M (n=3)', max: 18 },
  { name: 'N (n=4)', max: 32 },
  { name: 'O (n=5)', max: 32 },
  { name: 'P (n=6)', max: 18 },
  { name: 'Q (n=7)', max: 8 },
];

export const InfoPanel: React.FC<InfoPanelProps> = ({ element }) => {
  const categoryConfig = CATEGORIES[element.category];

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-gray-950/85 border-l border-cyan-500/20 backdrop-blur-xl z-50 p-4 md:p-5 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-[0_0_50px_rgba(0,0,0,0.8)]"
    >
      {/* Decorative scanning line and corners */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-400" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-400" />

      {/* Main Stats Block */}
      <div className="space-y-4 md:space-y-5">
        {/* Core Header */}
        <div className="border-b border-white/10 pb-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-cyan-400 text-[10px] tracking-widest uppercase">
              // SPECTRAL CARD
            </span>
            <span className="font-mono text-gray-500 text-xs">
              NO. {element.number.toString().padStart(3, '0')}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className={`
              w-14 h-14 border rounded-lg flex items-center justify-center font-bold text-2xl font-mono shadow-md
              ${categoryConfig?.glowClass || 'border-gray-700 bg-gray-900/50 text-gray-400'}
            `}>
              {element.symbol}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide font-orbit text-white">
                {element.name}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 rounded bg-white/5 uppercase" style={{ color: categoryConfig?.color }}>
                {categoryConfig?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Quantities Section */}
        <div className="grid grid-cols-3 gap-2">
          <div className="border border-white/5 bg-white/[0.01] p-1.5 rounded text-center">
            <div className="font-mono text-[9px] text-gray-500">PROTONS</div>
            <div className="font-mono font-bold text-cyan-400 text-base glow-blue">{element.protons}</div>
          </div>
          <div className="border border-white/5 bg-white/[0.01] p-1.5 rounded text-center">
            <div className="font-mono text-[9px] text-gray-500">NEUTRONS</div>
            <div className="font-mono font-bold text-purple-400 text-base glow-purple">{element.neutrons}</div>
          </div>
          <div className="border border-white/5 bg-white/[0.01] p-1.5 rounded text-center">
            <div className="font-mono text-[9px] text-gray-500">ELECTRONS</div>
            <div className="font-mono font-bold text-emerald-400 text-base">{element.electrons}</div>
          </div>
        </div>

        {/* Technical Parameters */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-cyan-400/80 tracking-widest flex items-center gap-1.5">
            <span className="w-1 h-3 bg-cyan-400" />
            <span>TECHNICAL SPECIFICATIONS</span>
          </div>

          <div className="border border-white/5 bg-white/[0.02] rounded-lg p-2.5 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">ATOMIC MASS</span>
              <span className="text-gray-200 font-semibold">{element.mass.toFixed(4)} u</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ELECTRON CONFIG</span>
              <span className="text-cyan-300 font-semibold select-all">{element.electronConfig}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PERIOD / GROUP</span>
              <span className="text-gray-200 font-semibold">P. {element.period} // G. {element.group}</span>
            </div>
          </div>
        </div>

        {/* Bohr Shell Electron Distribution */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-cyan-400/80 tracking-widest flex items-center gap-1.5">
            <span className="w-1 h-3 bg-cyan-400" />
            <span>BOHR SHELL CONFIGURATION</span>
          </div>

          <div className="border border-white/5 bg-white/[0.02] rounded-lg p-2.5 space-y-2">
            {SHELL_CAPACITIES.slice(0, element.shells.length).map((sh, idx) => {
              const currentElectrons = element.shells[idx] || 0;
              const percent = (currentElectrons / sh.max) * 100;
              return (
                <div key={sh.name} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[9px] font-mono">
                    <span className="text-gray-400">SHELL {sh.name}</span>
                    <span className="text-cyan-400 font-bold">
                      {currentElectrons} / {sh.max} e⁻
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Description Panel Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-gray-400 leading-relaxed bg-cyan-950/10 p-2.5 rounded-lg border border-cyan-500/5">
        <span className="text-cyan-400 font-semibold block mb-0.5 uppercase tracking-wider text-[10px]">// DETECTOR NOTES:</span>
        {element.description}
      </div>
    </motion.div>

  );
};
