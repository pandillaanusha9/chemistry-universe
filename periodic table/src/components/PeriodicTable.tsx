import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ELEMENTS, CATEGORIES, ChemicalElement } from '../data/elements';
import { ElementTile } from './ElementTile';

import {
  PeriodicTrendsButton,
  TrendsPopupPanel,
  DirectionArrowSystem,
  TrendExplanationCard,
  getTrendGlowIntensity,
  PeriodicTrend
} from './PeriodicTrends';

interface PeriodicTableProps {
  onSelectElement: (element: ChemicalElement) => void;
  hoveredCategory: string | null;
  setHoveredCategory: (category: string | null) => void;
}

const GROUP_HEADERS = [
  '1A', '2A', '3B', '4B', '5B', '6B', '7B', '8B', '8B', '8B', '1B', '2B', '3A', '4A', '5A', '6A', '7A', '8A'
];

export const PeriodicTable: React.FC<PeriodicTableProps> = ({
  onSelectElement,
  hoveredCategory,
  setHoveredCategory
}) => {
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);

  // Periodic trends visualization states
  const [isTrendsPopupOpen, setIsTrendsPopupOpen] = useState(false);
  const [activeTrend, setActiveTrend] = useState<PeriodicTrend | null>(null);
  const [isNarrationMuted, setIsNarrationMuted] = useState(false);

  const currentCategoryFilter = hoveredCategory || clickedCategory;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="periodic-table-view w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center select-none"
    >
      {/* Sci-Fi Control Center HUD Header */}
      <header className="w-full flex flex-col md:flex-row justify-between items-center border-b border-cyan-500/20 pb-4 mb-8">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs text-cyan-400 tracking-[0.25em]">SPECTRAL CORE ACTIVE</span>
          </div>
          <div className="mt-1 flex flex-col items-center gap-3 md:flex-row md:items-center">
            <h1 className="text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-500 font-orbit glow-blue">
              COSMOS ELEMENTS
            </h1>
            <button
              type="button"
              onClick={() => {
                setClickedCategory(null);
                setHoveredCategory(null);
                setActiveTrend(null);
              }}
              className="rounded-md border border-cyan-400/30 bg-cyan-950/20 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.12)] transition hover:border-cyan-300 hover:bg-cyan-400/10"
            >
              Show Full Table
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-mono tracking-wide">
            SYSTEM CONTROL V1.0.8 // QUANTUM ELECTRON VISUALIZER
          </p>
        </div>

        {/* HUD Info Readouts */}
        <div className="flex gap-6 text-[10px] font-mono border border-cyan-500/10 bg-cyan-950/10 p-3 rounded-lg backdrop-blur-md">
          <div>
            <div className="text-gray-500">DATABASE STATUS</div>
            <div className="text-cyan-400 glow-blue">ONLINE // 118 ELEMENTS</div>
          </div>
          <div className="border-l border-cyan-500/20 pl-4">
            <div className="text-gray-500">VISUAL MODE</div>
            <div className="text-purple-400 glow-purple">3D ATOM ORBITAL MODEL</div>
          </div>
          <div className="border-l border-cyan-500/20 pl-4">
            <div className="text-gray-500">GRID PATTERN</div>
            <div className="text-emerald-400">18-COLUMN / IUPAC SYSTEM</div>
          </div>
        </div>
      </header>

      {/* Atomic Categories Control Center */}
      <div className="w-full mb-6 flex flex-col items-center select-none">
        <div className="w-full p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          <AnimatePresence mode="wait">
              <motion.div
                key="category-panel"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="w-full flex flex-col gap-3"
              >
                <div className="text-xs font-mono text-cyan-400/80 mb-1 flex items-center gap-1.5 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 bg-cyan-500" />
                  <span>FILTER BY ATOMIC REGION</span>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {Object.entries(CATEGORIES).map(([key, value]) => {
                    const isSelected = clickedCategory === key;
                    const isHovered = hoveredCategory === key;
                    const isAnyFiltered = clickedCategory !== null || hoveredCategory !== null;
                    const isMatch = key === currentCategoryFilter;

                    return (
                      <button
                        key={key}
                        onClick={() => setClickedCategory(isSelected ? null : key)}
                        onMouseEnter={() => setHoveredCategory(key)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className={`
                          px-3 py-1.5 text-xs font-mono border rounded-md transition-all duration-300 cursor-pointer
                          ${value.colorClass}
                          ${isMatch ? 'ring-2 ring-cyan-400/60 scale-105 font-bold z-10' : ''}
                          ${isAnyFiltered && !isMatch ? 'opacity-30' : 'opacity-100'}
                        `}
                      >
                        {value.name}
                      </button>
                    );
                  })}
                </div>
                
                {/* Floating Info Readout bar describing active category */}
                <div className="h-6 w-full flex items-center justify-center sm:justify-start">
                  {currentCategoryFilter ? (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-[10px] font-mono text-cyan-400"
                    >
                      <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse rounded-full" />
                      <span className="font-bold uppercase tracking-wider">{CATEGORIES[currentCategoryFilter as keyof typeof CATEGORIES]?.name} //</span>
                      <span className="text-gray-400">Classified family block of elements</span>
                    </motion.div>
                  ) : (
                    <span className="text-[9px] font-mono text-gray-600 tracking-wider">
                      // HOVER OR CLICK FAMILIES TO SCAN CHEMICAL PROPERTIES
                    </span>
                  )}
                </div>
              </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Grid Wrapper with responsive scroll overflow */}
      <div className="w-full overflow-x-auto no-scrollbar pb-16 relative">
        <div className="min-w-[1000px] grid grid-cols-18 gap-1 md:gap-1.5 relative py-2 pl-16 pr-14 pb-12">
          {/* Futuristic grid background lines */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none rounded-lg border border-cyan-500/10" />

          {/* Render Vector Arrows overlay when trend is active */}
          {activeTrend && <DirectionArrowSystem trend={activeTrend} />}

          {/* Render Period Numbers down the left side */}
          {[1, 2, 3, 4, 5, 6, 7].map((period) => (
            <div
              key={`period-${period}`}
              style={{ gridColumn: 1, gridRow: period + 1 }}
              className="relative pointer-events-none flex items-center h-full w-full"
            >
              <div className="absolute -left-6 text-[10px] md:text-[12px] font-mono font-bold text-cyan-400/80">
                {period}
              </div>
              {period === 4 && (
                <div className="absolute -left-[40px] top-1/2 -translate-y-1/2 -rotate-90 text-[9px] md:text-[10px] text-gray-500 tracking-wider font-mono">
                  Period
                </div>
              )}
            </div>
          ))}

          {/* Render Group Headers (1-18 and 1A-8A) across top row */}
          {GROUP_HEADERS.map((header, index) => (
            <div 
              key={`header-${index}`}
              style={{ gridColumn: index + 1, gridRow: 1 }}
              className="flex flex-col items-center justify-end pb-1 text-[10px] md:text-[11px] font-mono font-bold text-cyan-400/80 relative"
            >
              {index === 0 && (
                <span className="absolute -top-4 text-[9px] text-gray-500 tracking-wider">Group</span>
              )}
              <span>{index + 1}</span>
              <span className="text-gray-500">{header}</span>
            </div>
          ))}

          {/* Periodic Elements */}
          {ELEMENTS.map((element) => {
            // Calculate dim state and intensity based on active trend or current filters
            let isDimmed = false;
            let intensity = 1.0;

            if (activeTrend) {
              intensity = getTrendGlowIntensity(element, activeTrend.id);
              isDimmed = intensity < 0.6;
            } else {
              isDimmed = currentCategoryFilter !== null && element.category !== currentCategoryFilter;
            }

            return (
              <ElementTile
                key={element.number}
                element={element}
                onClick={() => onSelectElement(element)}
                isDimmed={isDimmed}
                glowIntensity={intensity}
                onMouseEnter={() => {
                  if (activeTrend) return; // Disable hover scan filters during active educational trends
                  setHoveredCategory(element.category);
                }}
                onMouseLeave={() => {
                  if (activeTrend) return;
                  setHoveredCategory(null);
                }}
              />
            );
          })}

          {/* Spacer labels for Groups and Periods (sci-fi visual touches & trends buttons) */}
          <div className="col-start-3 col-end-13 row-start-3 row-end-5 flex flex-col justify-center items-center text-center p-4 border border-cyan-500/5 bg-cyan-950/5 rounded-xl self-center mx-4 z-30 gap-3">
            <PeriodicTrendsButton onClick={() => setIsTrendsPopupOpen(true)} />
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-cyan-400/60 tracking-wider">ELEMENT VISUALIZATION TERMINAL</span>
              <span className="font-mono text-[9px] text-gray-500 max-w-[280px] mt-1 leading-normal">
                Select any chemical element from the matrix below to generate a real-time cinematic 3D atomic orbital rendering.
              </span>
            </div>
          </div>

          {/* Separator Line for Inner Transition Series (plotted directly in row 9, spanning all columns) */}
          <div 
            style={{ gridColumn: '1 / -1', gridRowStart: 9 }}
            className="flex items-center justify-center my-4 gap-4"
          >
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <span className="text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase">// Inner Transition Series</span>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>
        </div>

        {/* Floating trends explanation panel absolute-positioned on the active grid wrapper */}
        <AnimatePresence>
          {activeTrend && (
            <TrendExplanationCard
              trend={activeTrend}
              isMuted={isNarrationMuted}
              onToggleMute={() => setIsNarrationMuted(!isNarrationMuted)}
              onClose={() => setActiveTrend(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Select Trend Dialog modal */}
      <AnimatePresence>
        {isTrendsPopupOpen && (
          <TrendsPopupPanel
            onSelectTrend={(trend) => {
              setActiveTrend(trend);
              setIsTrendsPopupOpen(false);
            }}
            onClose={() => setIsTrendsPopupOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
