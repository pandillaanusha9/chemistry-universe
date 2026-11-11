import React from 'react';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  blockLabel?: string;
  onClick?: () => void;
  accentColor?: 'cyan' | 'purple' | 'blue' | 'pink';
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  status,
  blockLabel,
  onClick,
  accentColor = 'cyan'
}) => {
  const isAvailable = status === 'available';

  // Cyber styling classes based on availability and color
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-400/80',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/5',
      glow: 'shadow-[0_0_15px_rgba(0,243,255,0.05)] hover:shadow-[0_0_25px_rgba(0,243,255,0.2)]',
      accentBg: 'bg-cyan-500'
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-400/80',
      text: 'text-purple-400',
      bg: 'bg-purple-500/5',
      glow: 'shadow-[0_0_15px_rgba(189,0,255,0.05)] hover:shadow-[0_0_25px_rgba(189,0,255,0.2)]',
      accentBg: 'bg-purple-500'
    },
    blue: {
      border: 'border-blue-500/20 hover:border-blue-400/80',
      text: 'text-blue-400',
      bg: 'bg-blue-500/5',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.05)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]',
      accentBg: 'bg-blue-500'
    },
    pink: {
      border: 'border-pink-500/20 hover:border-pink-400/80',
      text: 'text-pink-400',
      bg: 'bg-pink-500/5',
      glow: 'shadow-[0_0_15px_rgba(236,72,153,0.05)] hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]',
      accentBg: 'bg-pink-500'
    }
  };

  const style = isAvailable ? colorMap[accentColor] : {
    border: 'border-white/5 hover:border-white/10',
    text: 'text-gray-500',
    bg: 'bg-white/[0.01]',
    glow: 'shadow-none',
    accentBg: 'bg-gray-700'
  };

  return (
    <motion.div
      whileHover={isAvailable ? { y: -10, scale: 1.015 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={isAvailable ? onClick : undefined}
      className={`relative w-full min-h-[260px] p-5 rounded-lg border ${style.border} ${style.bg} ${style.glow} backdrop-blur-xl transition-all duration-300 flex flex-col justify-between select-none overflow-hidden ${isAvailable ? 'cursor-pointer group' : 'cursor-not-allowed opacity-60'}`}
    >
      {isAvailable && (
        <>
          <div className="absolute inset-0 cinematic-grid opacity-20 transition-opacity duration-500 group-hover:opacity-45 pointer-events-none" />
          <div className="absolute inset-0 energy-wave opacity-0 transition-opacity duration-500 group-hover:opacity-70 pointer-events-none" />
        </>
      )}

      {/* Cyber Decor Corners */}
      {isAvailable && (
        <>
          <div className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l ${style.text} group-hover:w-3 group-hover:h-3 transition-all`} />
          <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${style.text} group-hover:w-3 group-hover:h-3 transition-all`} />
          <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l ${style.text} group-hover:w-3 group-hover:h-3 transition-all`} />
          <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r ${style.text} group-hover:w-3 group-hover:h-3 transition-all`} />
        </>
      )}

      <div className="flex items-center justify-between w-full">
        {blockLabel ? (
          <span className="font-mono text-[9px] tracking-[0.25em] text-gray-500 uppercase font-semibold">
            {blockLabel}
          </span>
        ) : (
          <div />
        )}
        
        <span className={`h-1.5 w-1.5 rounded-full ${style.accentBg} opacity-80 shadow-[0_0_12px_currentColor]`} />
      </div>

      <div className="absolute right-4 top-12 h-24 w-24 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border border-white/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          className={`absolute left-1/2 top-1/2 h-10 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border ${style.border}`}
        />
        <div className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${style.accentBg}`} />
      </div>

      <div className="relative z-10 flex flex-col flex-grow justify-end pt-24">
        <h3 className={`text-xl font-black tracking-wide uppercase transition-colors ${isAvailable ? 'text-white group-hover:text-cyan-200' : 'text-gray-500'}`}>
          {title}
        </h3>
        
        <p className="mt-3 text-xs text-gray-400 leading-relaxed font-sans font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
