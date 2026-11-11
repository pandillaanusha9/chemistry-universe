import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full border-t border-white/5 bg-gray-950/20 py-12 px-6 select-none overflow-hidden">
      {/* Top glowing cyan line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-right from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Side: Brand name and technical tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-mono text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">
            INTERACTIVE INORGANIC CHEMISTRY VISUALIZATION PLATFORM
          </span>
          <span className="text-[10px] text-gray-500 tracking-wider font-light mt-1.5 font-sans">
            A premium immersive educational portal designed for advanced scientific simulation.
          </span>
        </div>

        {/* Right Side: Sci-fi system signatures */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right font-mono text-[9px] text-gray-600 gap-1.5">
          <span>COSMOS CORE // ENGINE COMPILATION OK</span>
          <span>© {new Date().getFullYear()} CHEM-VIZ ENGINE. ALL SYSTEMS REGISTERED.</span>
        </div>

      </div>
    </footer>
  );
};
