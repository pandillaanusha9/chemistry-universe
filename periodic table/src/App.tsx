import React, { useState, lazy, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChemicalElement } from './data/elements';
import { PeriodicTable } from './components/PeriodicTable';
import { InfoPanel } from './components/InfoPanel';
import { CloseButton } from './components/CloseButton';
import { OrbitalControls, HighlightState } from './components/OrbitalControls';
import { LandingPage } from './components/landing/LandingPage';
import { FuturisticNavbar } from './components/landing/FuturisticNavbar';
import { SBlockModule } from './components/chemistry/SBlockModule';
import { PBlockModule } from './components/chemistry/PBlockModule';
import { DBlockModule } from './components/chemistry/DBlockModule';
import { FBlockModule } from './components/chemistry/FBlockModule';
import { InorganicQuizBot } from './components/quiz/InorganicQuizBot';

const AtomViewer = lazy(() => import('./components/AtomViewer'));

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/95 z-50 text-red-500 font-mono p-6 text-center select-text">
          <div className="text-xl font-bold border border-red-500/50 bg-red-950/20 px-4 py-2 rounded mb-4">
            3D RENDER ENGINE FAILURE
          </div>
          <p className="text-sm text-gray-300 max-w-lg mb-2">
            The WebGL rendering pipeline encountered an exception:
          </p>
          <pre className="text-xs bg-gray-950 p-4 border border-white/10 rounded max-w-xl overflow-x-auto text-left text-red-400">
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <p className="text-xs text-gray-500 mt-4">
            Check the browser developer console (F12) for detailed logs.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

type ViewState = 'landing' | 'periodic-table' | 's-block' | 'p-block' | 'd-block' | 'f-block';

const pathToView = (path: string): ViewState => {
  if (path === '/inorganic/s-block') return 's-block';
  if (path === '/inorganic/p-block') return 'p-block';
  if (path === '/inorganic/d-block') return 'd-block';
  if (path === '/inorganic/f-block') return 'f-block';
  if (path === '/inorganic/periodic-table' || path === '/periodic-table') return 'periodic-table';
  return 'landing';
};

const viewToPath = (view: ViewState): string => {
  if (view === 's-block') return '/inorganic/s-block';
  if (view === 'p-block') return '/inorganic/p-block';
  if (view === 'd-block') return '/inorganic/d-block';
  if (view === 'f-block') return '/inorganic/f-block';
  if (view === 'periodic-table') return '/inorganic/periodic-table';
  return '/inorganic';
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(() => pathToView(window.location.pathname));
  const [activeElement, setActiveElement] = useState<ChemicalElement | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Orbital highlight interaction state
  const [highlightState, setHighlightState] = useState<HighlightState>({
    type: 'all',
    shellIndex: null,
    subshellType: null
  });

  const handleSelectElement = (element: ChemicalElement | null) => {
    // Reset quantum orbital filters when changing active element
    setHighlightState({
      type: 'all',
      shellIndex: null,
      subshellType: null
    });
    setActiveElement(element);
  };

  const navigateToView = (view: ViewState) => {
    setCurrentView(view);
    const nextPath = viewToPath(view);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ view }, '', nextPath);
    }
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setActiveElement(null);
      setCurrentView(pathToView(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="inorganic-app-shell min-h-screen relative overflow-hidden bg-black text-gray-100 flex flex-col items-center justify-center">
      {/* Background Animated Tech Grid & Scanline (Only on App View, not on Landing Page to prevent collision) */}
      {currentView === 'periodic-table' && !activeElement && (
        <>
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-0" />
          <div className="absolute inset-0 scanline pointer-events-none z-0 opacity-30" />
          
          {/* Animated Sci-Fi Scanning laser light bar */}
          <div className="absolute inset-x-0 h-[2px] bg-cyan-400/20 shadow-[0_0_10px_rgba(0,243,255,0.4)] pointer-events-none z-0 scan-line-animation" />
        </>
      )}

      {/* Top Glass Navbar Overlay (Shown on main app screens) */}
      {currentView !== 'landing' && currentView === 'periodic-table' && !activeElement && (
        <FuturisticNavbar 
          onNavClick={(view) => navigateToView(view as ViewState)} 
          currentView={currentView} 
        />
      )}

      {/* Screen Transitions */}
      <AnimatePresence mode="wait">
        {activeElement ? (
          <motion.div
            key="atomic-spectroscopy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-screen h-screen z-40 bg-black overflow-hidden"
          >
            <div className="w-full h-full absolute inset-0 z-10">
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black z-30 select-none">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-cyan-400/40 rounded-full animate-spin" />
                      <span className="font-mono text-[9px] text-cyan-400 animate-pulse uppercase font-bold tracking-widest">LOADING</span>
                    </div>
                    <p className="font-mono text-[10px] text-gray-500 tracking-[0.2em] mt-4 uppercase">
                      SYNCHRONIZING SPECTRAL ENGINE...
                    </p>
                  </div>
                }>
                  <AtomViewer element={activeElement} highlightState={highlightState} />
                </Suspense>
              </ErrorBoundary>
            </div>

            <CloseButton onClick={() => handleSelectElement(null)} />

            <OrbitalControls
              element={activeElement}
              highlightState={highlightState}
              setHighlightState={setHighlightState}
            />

            <InfoPanel element={activeElement} />

            <div className="absolute top-6 left-20 z-20 pointer-events-none md:pointer-events-auto">
              <div className="font-mono text-[10px] text-cyan-400/90 border border-cyan-500/30 bg-gray-950/80 px-4 py-2.5 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.15)] backdrop-blur-md flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold">ACTIVE REGION // {activeElement.name.toUpperCase()} ({activeElement.symbol})</span>
              </div>
            </div>
          </motion.div>
        ) : currentView === 'landing' ? (
          <motion.div
            key="landing-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen relative z-10"
          >
              <LandingPage onNavClick={(v) => navigateToView(v as ViewState)} />
          </motion.div>
        ) : (
          <motion.div
            key="app-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen flex flex-col relative"
          >
            <AnimatePresence mode="wait">
              {(() => {
                if (currentView === 's-block') {
                  return (
                    <motion.div key="s-block" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="w-full h-full z-10">
                      <SBlockModule />
                    </motion.div>
                  );
                }
                if (currentView === 'p-block') {
                  return (
                    <motion.div key="p-block" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="w-full h-full z-10">
                      <PBlockModule />
                    </motion.div>
                  );
                }
                if (currentView === 'd-block') {
                  return (
                    <motion.div key="d-block" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="w-full h-full z-10">
                      <DBlockModule />
                    </motion.div>
                  );
                }
                if (currentView === 'f-block') {
                  return (
                    <motion.div key="f-block" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="w-full h-full z-10">
                      <FBlockModule />
                    </motion.div>
                  );
                }
                if (currentView === 'periodic-table') {
                  return (
                    <motion.div
                      key="periodic-matrix"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="w-full flex-grow flex items-center justify-center pt-28 pb-8 z-10"
                    >
                      <PeriodicTable
                        onSelectElement={handleSelectElement}
                        hoveredCategory={hoveredCategory}
                        setHoveredCategory={setHoveredCategory}
                      />
                    </motion.div>
                  );
                }
                return null;
              })()}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <InorganicQuizBot />
    </div>
  );
};

export default App;
