import { Navigate, Route, Routes } from "react-router-dom";
import { Component, lazy, Suspense } from "react";
import ChemistryUniverseHome from "./components/ChemistryUniverseHome.jsx";
import ChemistryDoubtBot from "./components/ChemistryDoubtBot.jsx";

const OrganicPlatform = lazy(() => import("./integrations/OrganicPlatform.jsx"));
const InorganicPlatform = lazy(() => import("./integrations/InorganicPlatform.jsx"));

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="grid min-h-screen place-items-center bg-[#03040b] px-6 text-center text-white">
          <div className="max-w-xl rounded-lg border border-cyan-300/20 bg-white/[0.04] p-6 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-cyan-200">Chemistry Universe</p>
            <h1 className="mt-3 text-2xl font-bold">A route failed to load.</h1>
            <p className="mt-3 text-sm text-slate-300">{this.state.error.message}</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

function LoadingRoute() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#03040b] text-cyan-100">
      <div className="h-12 w-12 animate-spin rounded-full border border-cyan-300/20 border-t-cyan-200" />
    </div>
  );
}

function LazyRoute({ children }) {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<LoadingRoute />}>{children}</Suspense>
    </RouteErrorBoundary>
  );
}

export default function App() {
  return (
    <>
      <ChemistryDoubtBot />
      <Routes>
        <Route path="/" element={<ChemistryUniverseHome />} />
        <Route path="/organic/*" element={<LazyRoute><OrganicPlatform /></LazyRoute>} />
        <Route path="/inorganic/*" element={<LazyRoute><InorganicPlatform /></LazyRoute>} />
        <Route path="/periodic-table" element={<Navigate to="/inorganic/periodic-table" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
