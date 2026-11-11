import React from 'react';
import { motion } from 'framer-motion';
import { ApplicationData } from './sblockData';

interface ApplicationCardProps {
  application: ApplicationData;
  active?: boolean;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, active = false }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80';

  return (
    <motion.article
      animate={active ? { y: -6, scale: 1.02 } : { y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      className={`group overflow-hidden rounded-lg border bg-slate-950/55 transition ${
        active
          ? 'border-cyan-300 shadow-[0_0_34px_rgba(34,211,238,0.32)]'
          : 'border-cyan-400/20 shadow-[0_0_24px_rgba(34,211,238,0.08)]'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={application.image}
          alt={application.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
          animate={{ scale: active ? 1.06 : 1, rotate: active ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          className="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
      </div>
      <div className="space-y-4 p-5">
        <h3 className="text-lg font-black text-white">{application.title}</h3>
        <motion.p
          animate={{ opacity: active ? [0.6, 1, 0.85] : 1 }}
          className="min-h-12 text-sm leading-6 text-slate-400"
        >
          {active ? application.narration : application.explanation}
        </motion.p>
      </div>
    </motion.article>
  );
};
