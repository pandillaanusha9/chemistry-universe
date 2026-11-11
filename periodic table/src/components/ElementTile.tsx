import React from 'react';
import { motion } from 'framer-motion';
import { ChemicalElement, CATEGORIES } from '../data/elements';

interface ElementTileProps {
  element: ChemicalElement;
  onClick: () => void;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  glowIntensity?: number; // optional relative value between 0 and 1 for trend glowing
}

export const ElementTile = React.memo<ElementTileProps>(({
  element,
  onClick,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
  glowIntensity = 1
}) => {
  const categoryConfig = CATEGORIES[element.category];

  // Determine grid positioning
  const gridStyle: React.CSSProperties = {
    gridColumnStart: element.group,
    gridRowStart: element.period + 1
  };

  // Adjust positioning for lanthanides and actinides
  // Lanthanides: period 6, group 3 (plotted in row 10, columns 4 to 18)
  // Actinides: period 7, group 3 (plotted in row 11, columns 4 to 18)
  if (element.category === 'lanthanide') {
    gridStyle.gridRowStart = 10;
    gridStyle.gridColumnStart = element.group + 1; // shift slightly to match standard tables
  } else if (element.category === 'actinide') {
    gridStyle.gridRowStart = 11;
    gridStyle.gridColumnStart = element.group + 1;
  }

  // Calculate dynamic styling for the periodic trends glow intensities
  const activeColor = categoryConfig?.color || '#00f3ff';
  const customGlowStyle: React.CSSProperties = {
    ...gridStyle,
    boxShadow: glowIntensity > 1.2
      ? `0 0 ${(glowIntensity - 1) * 16}px ${activeColor}, inset 0 0 ${(glowIntensity - 1) * 8}px ${activeColor}`
      : undefined,
    borderColor: glowIntensity > 1.2 ? activeColor : undefined,
    borderWidth: glowIntensity > 1.2 ? '1.5px' : undefined
  };

  return (
    <motion.button
      id={`element-tile-${element.number}`}
      style={customGlowStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.08, zIndex: 30 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        opacity: isDimmed ? 0.15 : 1,
        scale: glowIntensity > 1.2 ? 1.04 : 1
      }}
      transition={{ duration: 0.2 }}
      className={`
        relative flex flex-col justify-between p-1.5 md:p-2 border rounded-md text-left cursor-pointer transition-all duration-300 select-none aspect-square
        ${categoryConfig?.glowClass || 'border-gray-700 bg-gray-900/40 text-gray-400 shadow-neon-gray'}
      `}
    >
      {/* Subtle Scan Lines Inside Active Element */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none rounded-md" />

      {/* Header Info */}
      <div className="flex justify-between items-start w-full">
        <span className="font-mono text-[9px] md:text-[11px] font-semibold opacity-70">
          {element.number}
        </span>
        <span className="hidden sm:inline font-mono text-[8px] md:text-[9px] opacity-60">
          {element.mass.toFixed(2)}
        </span>
      </div>

      {/* Chemical Symbol */}
      <div className="text-center font-bold text-base md:text-xl tracking-tight leading-none glow-text">
        {element.symbol}
      </div>

      {/* Name */}
      <div className="text-[8px] md:text-[10px] truncate capitalize opacity-80 text-center font-medium font-mono">
        {element.name}
      </div>
    </motion.button>
  );
});
