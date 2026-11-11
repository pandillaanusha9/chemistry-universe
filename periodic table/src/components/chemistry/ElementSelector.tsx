import React from 'react';
import { motion } from 'framer-motion';
import { SBlockElement } from './sblockData';

interface ElementSelectorProps {
  elements: SBlockElement[];
  activeSymbol: string;
  onSelect: (symbol: string) => void;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({ elements, activeSymbol, onSelect }) => (
  <div className="flex flex-wrap gap-3">
    {elements.map((element) => {
      const active = activeSymbol === element.symbol;
      return (
        <motion.button
          key={element.symbol}
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelect(element.symbol)}
          className={`h-12 min-w-14 rounded-md border font-mono text-sm font-black tracking-widest transition ${
            active
              ? 'border-cyan-300 bg-cyan-400/18 text-white shadow-[0_0_24px_rgba(34,211,238,0.38)]'
              : 'border-cyan-400/20 bg-white/[0.03] text-cyan-200 hover:border-cyan-300/70 hover:bg-cyan-400/10 hover:shadow-[0_0_18px_rgba(34,211,238,0.22)]'
          }`}
          aria-pressed={active}
        >
          {element.symbol}
        </motion.button>
      );
    })}
  </div>
);
