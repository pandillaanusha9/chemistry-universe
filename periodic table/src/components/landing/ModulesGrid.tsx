import React from 'react';
import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';

interface ModulesGridProps {
  onNavClick: (view: string) => void;
}

export const ModulesGrid: React.FC<ModulesGridProps> = ({ onNavClick }) => {
  return (
    <section id="modules" className="relative w-full max-w-6xl mx-auto px-6 pb-28 pt-12 select-none">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-purple-400 uppercase font-bold">Module Library</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wider"
        >
          Visualization Modules
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-16 h-[2px] bg-gradient-to-right from-cyan-500 to-purple-500 my-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs sm:text-sm text-gray-400 max-w-xl font-light font-sans tracking-wide leading-relaxed"
        >
          Choose a visual pathway. The periodic table opens the existing engine; block modules open clean guided learning flows.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ModuleCard
            title="Periodic Table"
            description="Open the complete existing element system."
            status="available"
            blockLabel="Core"
            onClick={() => onNavClick('periodic-table')}
            accentColor="cyan"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ModuleCard
            title="s-Block"
            description="Alkali and alkaline earth learning flow."
            status="available"
            blockLabel="Groups 1-2"
            onClick={() => onNavClick('s-block')}
            accentColor="purple"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ModuleCard
            title="p-Block"
            description="Groups 13-18 in modular visual chapters."
            status="available"
            blockLabel="Groups 13-18"
            onClick={() => onNavClick('p-block')}
            accentColor="blue"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ModuleCard
            title="d-Block"
            description="Transition and coordination chemistry."
            status="available"
            blockLabel="Transition"
            onClick={() => onNavClick('d-block')}
            accentColor="pink"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ModuleCard
            title="f-Block"
            description="Lanthanide and actinide visual flow."
            status="available"
            blockLabel="Inner Series"
            onClick={() => onNavClick('f-block')}
            accentColor="purple"
          />
        </motion.div>
      </div>

    </section>
  );
};
