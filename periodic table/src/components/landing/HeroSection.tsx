import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[82vh] px-6 pb-12 pt-24 flex flex-col items-center justify-center text-center select-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 md:h-[520px] md:w-[520px]"
        />
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 h-[220px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/10"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl text-4xl sm:text-5xl md:text-7xl font-black tracking-normal text-white leading-[1.05] uppercase hero-title-glow"
        >
          Interactive Inorganic Chemistry
          <br />
          <span className="bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text text-transparent">
            Visualization Platform
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-300/85 max-w-xl font-light tracking-wide leading-relaxed font-sans"
        >
          Explore Inorganic Chemistry with Visual Clarity
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative w-full h-[1px] max-w-[420px] bg-white/5 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ x: ['-70%', '170%'] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};
