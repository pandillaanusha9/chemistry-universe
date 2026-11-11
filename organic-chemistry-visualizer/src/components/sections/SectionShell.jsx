import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function SectionShell({ number, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/85 dark:shadow-[0_0_30px_rgba(6,182,212,0.08)]">
      <button className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6" onClick={() => setOpen((value) => !value)}>
        <span className="flex items-center gap-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-50 text-sm font-semibold text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-100">
            {number}
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</span>
        </span>
        <ChevronDown className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} size={20} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="border-t border-slate-200/70 p-5 dark:border-white/10 sm:p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
