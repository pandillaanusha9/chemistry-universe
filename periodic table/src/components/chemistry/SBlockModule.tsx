import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { FloatingParticlesBackground } from '../landing/FloatingParticlesBackground';
import { ApplicationCard } from './ApplicationCard';
import { AtomViewer } from './AtomViewer';
import { CompoundCard } from './CompoundCard';
import { ElementSelector } from './ElementSelector';
import { TrendVisualizer } from './TrendVisualizer';
import { SBlockGroup, sBlockGroups } from './sblockData';

interface ConfigToken {
  label: string;
  shellIndex: number | null;
}

const getConfigTokens = (configuration: string): ConfigToken[] => (
  configuration.split(/\s+/).filter(Boolean).map((label) => {
    const shell = label.match(/^(\d)/);
    return {
      label,
      shellIndex: shell ? Number(shell[1]) - 1 : null
    };
  })
);

const Section: React.FC<{ index: number; title: string; actions?: React.ReactNode; children: React.ReactNode }> = ({ index, title, actions, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45 }}
    className="rounded-2xl border border-slate-700/65 bg-slate-950/62 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6"
  >
    <div className="mb-5 flex flex-col gap-3 border-b border-cyan-400/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/40 bg-cyan-400/10 font-mono text-sm font-black text-cyan-200">
          {index}
        </span>
        <h2 className="font-mono text-lg font-black uppercase tracking-[0.16em] text-white">{title}</h2>
      </div>
      {actions}
    </div>
    {children}
  </motion.section>
);

const GroupCard: React.FC<{ group: SBlockGroup; onClick: () => void }> = ({ group, onClick }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.035, y: -6 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group min-h-[240px] rounded-lg border border-cyan-400/25 bg-cyan-400/[0.035] p-7 text-left shadow-[0_0_30px_rgba(34,211,238,0.09)] backdrop-blur-xl transition hover:border-cyan-300/70 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]"
  >
    <div className="mb-8 flex items-center justify-between">
      <span className="rounded-full border border-cyan-400/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
        {group.shortTitle}
      </span>
      <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
    </div>
    <h2 className="text-3xl font-black text-white">{group.title}</h2>
    <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{group.description}</p>
  </motion.button>
);

const Dashboard: React.FC<{ group: SBlockGroup; onBack: () => void }> = ({ group, onBack }) => {
  const [activeSymbol, setActiveSymbol] = useState(group.elements[0].symbol);
  const [valenceOnly, setValenceOnly] = useState(false);
  const [activeShell, setActiveShell] = useState<number | null>(null);
  const [activeConfigToken, setActiveConfigToken] = useState<number | null>(null);
  const [activeApplication, setActiveApplication] = useState<number | null>(null);
  const [applicationSpeechState, setApplicationSpeechState] = useState<'stopped' | 'playing' | 'paused'>('stopped');
  const applicationIndexRef = useRef(0);
  const applicationSessionRef = useRef(0);
  const applicationPausedRef = useRef(false);
  const activeElement = useMemo(
    () => group.elements.find((element) => element.symbol === activeSymbol) ?? group.elements[0],
    [activeSymbol, group.elements]
  );
  const configTokens = useMemo(() => getConfigTokens(activeElement.fullConfiguration), [activeElement.fullConfiguration]);

  const stopApplications = () => {
    applicationSessionRef.current += 1;
    applicationPausedRef.current = false;
    applicationIndexRef.current = 0;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
    }
    setApplicationSpeechState('stopped');
    setActiveApplication(null);
  };

  const speakApplicationStep = (sessionId: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (sessionId !== applicationSessionRef.current || applicationPausedRef.current) return;

    const index = applicationIndexRef.current;
    if (index >= group.applications.length) {
      setApplicationSpeechState('stopped');
      setActiveApplication(null);
      applicationIndexRef.current = 0;
      return;
    }

    const application = group.applications[index];
    setActiveApplication(index);

    const utterance = new SpeechSynthesisUtterance(`${application.title}. ${application.narration}`);
    utterance.rate = 0.92;
    utterance.pitch = 1.08;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices() || [];
    const voice =
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
      voices[0];

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || 'en-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onend = () => {
      if (sessionId !== applicationSessionRef.current || applicationPausedRef.current) return;
      applicationIndexRef.current += 1;
      speakApplicationStep(sessionId);
    };
    utterance.onerror = () => {
      if (sessionId !== applicationSessionRef.current || applicationPausedRef.current) return;
      applicationIndexRef.current += 1;
      speakApplicationStep(sessionId);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setActiveSymbol(group.elements[0].symbol);
    setValenceOnly(false);
    setActiveShell(null);
    setActiveConfigToken(null);
    setActiveApplication(null);
    stopApplications();
  }, [group]);

  useEffect(() => stopApplications, []);

  useEffect(() => {
    setActiveShell(null);
    setActiveConfigToken(null);
    setValenceOnly(false);
  }, [activeSymbol]);

  const handleConfigStep = (step: number | null) => {
    setActiveConfigToken(step);
    setValenceOnly(false);
    setActiveShell(step === null ? null : configTokens[step]?.shellIndex ?? null);
  };

  const resetConfigFocus = () => {
    setActiveConfigToken(null);
    setActiveShell(null);
    setValenceOnly(false);
  };

  const handleOuterConfiguration = () => {
    setActiveConfigToken(null);
    setActiveShell(null);
    setValenceOnly(true);
  };

  const readApplications = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (applicationSpeechState === 'playing') {
      applicationPausedRef.current = true;
      window.speechSynthesis.cancel();
      setApplicationSpeechState('paused');
      return;
    }

    if (applicationSpeechState === 'paused') {
      applicationPausedRef.current = false;
      setApplicationSpeechState('playing');
      speakApplicationStep(applicationSessionRef.current);
      return;
    }

    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.cancel();
    applicationSessionRef.current += 1;
    applicationIndexRef.current = 0;
    applicationPausedRef.current = false;
    setActiveApplication(null);
    setApplicationSpeechState('playing');
    speakApplicationStep(applicationSessionRef.current);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-16 pt-28 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{group.shortTitle}</p>
          <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">{group.title}</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">{group.description}</p>
      </div>

      <Section index={1} title="Outer Electronic Configuration">
        <ElementSelector elements={group.elements} activeSymbol={activeSymbol} onSelect={setActiveSymbol} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeElement.symbol}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
          >
            <AtomViewer element={activeElement} valenceOnly={valenceOnly} activeShell={activeShell} />
            <div className="rounded-lg border border-cyan-400/20 bg-slate-950/60 p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">{activeElement.name}</div>
              <h3 className="mt-2 text-3xl font-black text-white">{activeElement.symbol}</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Full electronic configuration</dt>
                  <dd className="mt-2 flex flex-wrap gap-2 font-mono text-cyan-100">
                    {configTokens.map((token, index) => (
                      <motion.span
                        key={`${token.label}-${index}`}
                        animate={{
                          opacity: activeConfigToken === null || activeConfigToken === index ? 1 : 0.16,
                          scale: activeConfigToken === index ? 1.08 : 1
                        }}
                        className={`rounded border px-2 py-1 transition ${
                          activeConfigToken === index
                            ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.34)]'
                            : activeConfigToken === null
                              ? 'border-cyan-400/10 bg-cyan-400/5'
                              : 'border-slate-800 bg-black text-slate-600'
                        }`}
                      >
                        {token.label}
                      </motion.span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Shells</dt>
                  <dd className="mt-1 font-mono text-cyan-100">{activeElement.shells.join(',')}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Valence Electrons</dt>
                  <dd className="mt-1 font-mono text-cyan-100">{activeElement.valenceElectrons}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Oxidation State</dt>
                  <dd className="mt-1 font-mono text-cyan-100">{activeElement.oxidationState}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                {configTokens.map((token, index) => (
                  <button
                    key={`focus-${token.label}-${index}`}
                    type="button"
                    onClick={() => handleConfigStep(index)}
                    className={`rounded-md border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition ${
                      activeConfigToken === index
                        ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.22)]'
                        : 'border-cyan-400/25 text-cyan-200 hover:bg-cyan-400/10'
                    }`}
                  >
                    {token.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={resetConfigFocus}
                  className="rounded-md border border-slate-500/40 bg-slate-500/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-300 hover:bg-slate-500/15"
                >
                  Show All
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      <Section index={2} title="Periodic Trends">
        <TrendVisualizer elements={group.elements} />
      </Section>

      <Section index={3} title="Important Compounds">
        <div className="grid gap-5 lg:grid-cols-2">
          {group.compounds.map((compound) => (
            <CompoundCard key={compound.id} compound={compound} />
          ))}
        </div>
      </Section>

      <Section
        index={4}
        title="Real World Applications"
        actions={
          <button
            type="button"
            onClick={readApplications}
            className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.14)] transition hover:border-cyan-300 hover:bg-cyan-400/15"
          >
            <span className="inline-flex items-center gap-2">
              {applicationSpeechState === 'playing' ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
              {applicationSpeechState === 'playing'
                ? 'Pause Applications'
                : applicationSpeechState === 'paused'
                  ? 'Resume Applications'
                  : 'Read All Applications'}
            </span>
          </button>
        }
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {group.applications.map((application, index) => (
            <ApplicationCard key={application.title} application={application} active={activeApplication === index} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export const SBlockModule: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<SBlockGroup['id'] | null>(null);
  const selectedGroup = sBlockGroups.find((group) => group.id === selectedGroupId) ?? null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <FloatingParticlesBackground />
      <div className="pointer-events-none absolute inset-0 grid-bg-cyan opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(to_bottom,transparent,#000_88%)]" />

      <AnimatePresence mode="wait">
        {selectedGroup ? (
          <motion.div key={selectedGroup.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" onClick={() => setSelectedGroupId(null)} className="fixed left-5 top-5 z-30 rounded-md border border-cyan-400/30 bg-black/70 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300 hover:bg-cyan-400/10">
              All s-block sections
            </button>
            <Dashboard group={selectedGroup} onBack={() => setSelectedGroupId(null)} />
          </motion.div>
        ) : (
          <motion.main
            key="s-block-home"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-28 md:px-8"
          >
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">/inorganic/s-block</p>
              <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">S-Block</h1>
              <p className="mt-4 text-base leading-7 text-slate-400">
                Explore Group 1A and Group 2A through configurations, periodic trends, compounds, and applications.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {sBlockGroups.map((group) => (
                <GroupCard key={group.id} group={group} onClick={() => setSelectedGroupId(group.id)} />
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SBlockModule;
