import React from 'react';
import { FloatingParticlesBackground } from './FloatingParticlesBackground';
import { HeroSection } from './HeroSection';
import { ModulesGrid } from './ModulesGrid';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onNavClick: (view: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavClick }) => {
  return (
    <div className="relative w-full min-h-screen bg-black text-gray-100 flex flex-col items-center overflow-x-hidden">
      <FloatingParticlesBackground />

      <main className="w-full flex-grow flex flex-col items-center relative z-10">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full relative"
        >
          <ModulesGrid onNavClick={onNavClick} />
        </motion.div>
      </main>
    </div>
  );
};
