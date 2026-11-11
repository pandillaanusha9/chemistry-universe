import { Outlet } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import QuizBot from "../quiz/QuizBot";

export default function AppShell() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7fbff] text-slate-950 transition-colors dark:bg-[#06111f] dark:text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(45,212,191,0.12),transparent_26%),linear-gradient(180deg,#f7fbff,#edf7ff)] dark:bg-[radial-gradient(circle_at_20%_12%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(45,212,191,0.12),transparent_28%),linear-gradient(180deg,#06111f,#081827)]" />
      <Navbar />
      <Outlet />
      <QuizBot />
    </div>
  );
}

