import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SBlockElement, TrendData, trends } from './sblockData';
import { VoiceNarrator } from './VoiceNarrator';

interface TrendVisualizerProps {
  elements: SBlockElement[];
}

export const TrendVisualizer: React.FC<TrendVisualizerProps> = ({ elements }) => {
  const [activeTrendId, setActiveTrendId] = useState(trends[0].id);
  const activeTrend = trends.find((trend) => trend.id === activeTrendId) as TrendData;
  const arrowStyle = activeTrend.tone === 'green'
    ? {
        body: 'from-lime-700 via-green-500 to-emerald-900 shadow-[0_0_18px_rgba(16,185,129,0.48)]',
        head: 'border-t-emerald-500 drop-shadow-[0_0_12px_#10b981]',
        label: 'text-lime-300 border-lime-400/40 shadow-[0_0_16px_rgba(132,204,22,0.22)]'
      }
    : {
        body: 'from-rose-800 via-red-500 to-red-900 shadow-[0_0_18px_rgba(220,38,38,0.48)]',
        head: 'border-t-red-500 drop-shadow-[0_0_12px_#ef4444]',
        label: 'text-red-300 border-red-400/40 shadow-[0_0_16px_rgba(239,68,68,0.22)]'
      };

  return (
    <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {trends.map((trend) => (
          <button
            key={trend.id}
            type="button"
            onClick={() => setActiveTrendId(trend.id)}
            className={`shrink-0 rounded-md border px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition ${
              activeTrendId === trend.id
                ? 'border-cyan-300 bg-cyan-400/14 text-white shadow-[0_0_20px_rgba(34,211,238,0.22)]'
                : 'border-cyan-400/15 bg-white/[0.025] text-cyan-100/70 hover:border-cyan-300/50'
            }`}
          >
            {trend.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-cyan-400/20 bg-slate-950/50 p-5 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrend.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col items-center"
          >
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <div className={`rounded-full border bg-gray-950/90 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.22em] ${arrowStyle.label}`}>
                Group top to bottom: {activeTrend.direction}
              </div>
              <VoiceNarrator
                label="Explain Trend"
                text={`${activeTrend.label}. ${activeTrend.explanation}`}
                className="rounded-full py-2 text-[10px]"
              />
            </div>
            <div className="relative flex min-h-[360px] w-full max-w-xl items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute left-1/2 top-7 bottom-7 z-0 w-4 origin-top -translate-x-1/2 rounded-full"
              >
                <div className={`h-full w-full rounded-full bg-gradient-to-b ${arrowStyle.body}`} />
                <div className={`absolute bottom-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[19px] border-t-[30px] border-x-transparent ${arrowStyle.head}`} />
              </motion.div>

              <div className="relative z-10 flex flex-col items-center gap-5">
                {elements.map((element, index) => (
                  <motion.div
                    key={element.symbol}
                    layout
                    initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid h-14 w-28 place-items-center rounded-full border border-cyan-300/40 bg-black/80 font-mono text-lg font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.22)] backdrop-blur-md"
                  >
                    {element.symbol}
                  </motion.div>
                ))}
              </div>

              <div className={`absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border bg-gray-950/90 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest md:block ${arrowStyle.label}`}>
                Down group: {activeTrend.direction}
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-center text-sm leading-6 text-slate-300">{activeTrend.explanation}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
