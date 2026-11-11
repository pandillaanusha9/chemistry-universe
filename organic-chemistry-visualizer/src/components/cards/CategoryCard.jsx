import { ArrowUpRight, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function MoleculeIcon({ slug }) {
  const strokeColor = "currentColor";
  const strokeWidth = 2;

  switch (slug) {
    case "haloalkanes":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 4 16 L 12 11" />
          <path d="M 12 11 L 19 15" stroke="#10b981" />
          <circle cx="19" cy="15" r="3" fill="#10b981" stroke="none" />
          <circle cx="12" cy="11" r="2" fill="currentColor" />
          <circle cx="4" cy="16" r="2" fill="currentColor" />
        </svg>
      );
    case "haloarenes":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11,5 17,8 17,14 11,17 5,14 5,8" />
          <circle cx="11" cy="11" r="3.5" stroke="currentColor" fill="none" strokeDasharray="1.5,1.5" />
          <path d="M 17 8 L 21 5" stroke="#3b82f6" />
          <circle cx="21" cy="5" r="2.5" fill="#3b82f6" stroke="none" />
        </svg>
      );
    case "alcohols":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 3 14 L 10 9 L 16 13" />
          <path d="M 16 13 L 21 10" stroke="#ef4444" />
          <circle cx="16" cy="13" r="3" fill="#ef4444" stroke="none" />
          <circle cx="21" cy="10" r="2" fill="#94a3b8" stroke="none" />
          <circle cx="10" cy="9" r="1.5" fill="currentColor" />
          <circle cx="3" cy="14" r="1.5" fill="currentColor" />
        </svg>
      );
    case "phenols":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="10,6 16,9 16,15 10,18 4,15 4,9" />
          <circle cx="10" cy="12" r="3.5" stroke="currentColor" fill="none" strokeDasharray="1.5,1.5" />
          <path d="M 16 9 L 20 6" stroke="#ef4444" />
          <circle cx="20" cy="6" r="2.5" fill="#ef4444" stroke="none" />
        </svg>
      );
    case "ethers":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 3 14 L 8 9 L 12 12" />
          <path d="M 12 12 L 16 9 L 21 14" />
          <circle cx="12" cy="12" r="3" fill="#ef4444" stroke="none" />
          <circle cx="8" cy="9" r="1.5" fill="currentColor" />
          <circle cx="16" cy="9" r="1.5" fill="currentColor" />
        </svg>
      );
    case "aldehydes":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 3 15 L 10 11 L 17 15" />
          <path d="M 16 15 L 16 7" stroke="#ef4444" strokeWidth={1.5} />
          <path d="M 18 15 L 18 7" stroke="#ef4444" strokeWidth={1.5} />
          <circle cx="17" cy="7" r="3" fill="#ef4444" stroke="none" />
          <path d="M 17 15 L 21 12" stroke="#94a3b8" />
          <circle cx="21" cy="12" r="2" fill="#94a3b8" stroke="none" />
        </svg>
      );
    case "ketones":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 3 15 L 12 10 L 21 15" />
          <path d="M 11 10 L 11 4" stroke="#ef4444" strokeWidth={1.5} />
          <path d="M 13 10 L 13 4" stroke="#ef4444" strokeWidth={1.5} />
          <circle cx="12" cy="4" r="3" fill="#ef4444" stroke="none" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" />
        </svg>
      );
    case "carboxylic-acids":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 3 15 L 10 11 L 17 15" />
          <path d="M 9 11 L 9 4" stroke="#ef4444" strokeWidth={1.5} />
          <path d="M 11 11 L 11 4" stroke="#ef4444" strokeWidth={1.5} />
          <circle cx="10" cy="4" r="3" fill="#ef4444" stroke="none" />
          <path d="M 17 15 L 21 12" stroke="#ef4444" />
          <circle cx="17" cy="15" r="3" fill="#ef4444" stroke="none" />
          <circle cx="21" cy="12" r="2" fill="#94a3b8" stroke="none" />
        </svg>
      );
    case "amines":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 3 15 L 10 11 L 17 15" />
          <circle cx="17" cy="15" r="3" fill="#3b82f6" stroke="none" />
          <path d="M 17 15 L 21 12" stroke="#94a3b8" />
          <path d="M 17 15 L 17 21" stroke="#94a3b8" />
          <circle cx="21" cy="12" r="2" fill="#94a3b8" stroke="none" />
          <circle cx="17" cy="21" r="2" fill="#94a3b8" stroke="none" />
        </svg>
      );
    case "azo-compounds":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 10 11 L 14 11" stroke="#3b82f6" strokeWidth={1.5} />
          <path d="M 10 13 L 14 13" stroke="#3b82f6" strokeWidth={1.5} />
          <path d="M 3 9 L 10 12" />
          <path d="M 14 12 L 21 15" />
          <circle cx="10" cy="12" r="2.5" fill="#3b82f6" stroke="none" />
          <circle cx="14" cy="12" r="2.5" fill="#3b82f6" stroke="none" />
        </svg>
      );
    default:
      return <FlaskConical size={20} />;
  }
}

const functionalGroups = {
  "haloalkanes": "Functional Group -X",
  "haloarenes": "Functional Group -Ar-X",
  "alcohols": "Functional Group -OH",
  "phenols": "Functional Group -Ar-OH",
  "ethers": "Functional Group -O-",
  "aldehydes": "Functional Group -CHO",
  "ketones": "Functional Group -CO-",
  "carboxylic-acids": "Functional Group -COOH",
  "amines": "Functional Group -NH₂",
  "azo-compounds": "Functional Group -N=N-"
};

export default function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.035 }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/organic/${category.slug}`}
        className="group relative block min-h-44 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:border-slate-300 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-950/75 dark:text-white dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)] dark:hover:border-slate-500 dark:hover:shadow-[0_22px_70px_rgba(0,0,0,0.45)]"
      >
        <div
          className="absolute inset-x-0 top-0 h-px opacity-70"
          style={{ background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)` }}
        />
        <div
          className="absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-20 blur-3xl transition group-hover:opacity-40"
          style={{ backgroundColor: category.accent }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(circle at 80% 20%, ${category.accent}22, transparent 30%)` }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 20% 80%, ${category.accent}12, transparent 20%)` }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100/70 text-slate-900 ring-1 ring-slate-200/80 shadow-sm transition dark:bg-slate-900/50 dark:text-white dark:ring-cyan-500/20">
            <MoleculeIcon slug={category.slug} />
          </span>
          <ArrowUpRight
            className="text-slate-400 transition group-hover:text-white"
            size={18}
          />
        </div>
        <div className="relative mt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-400 dark:text-slate-500">
            {functionalGroups[category.slug] || "Organic class"}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{category.name}</h3>
        </div>
      </Link>
    </motion.div>
  );
}
