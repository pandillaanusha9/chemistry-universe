import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ConversionsSection({ conversions }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {conversions.map(([from, reagent, to], index) => (
        <motion.div
          key={`${from}-${to}-${reagent}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="rounded-2xl border border-slate-200/80 bg-white/72 p-5 text-center dark:border-white/10 dark:bg-white/4"
        >
          <p className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm font-semibold text-slate-900 dark:bg-white/5 dark:text-white">{from}</p>
          <div className="my-3 flex flex-col items-center gap-2 text-cyan-600 dark:text-cyan-200">
            <ArrowDown size={22} />
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs dark:border-cyan-300/20 dark:bg-cyan-300/10">{reagent}</span>
          </div>
          <p className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-cyan-300 dark:text-slate-950">{to}</p>
        </motion.div>
      ))}
    </div>
  );
}
