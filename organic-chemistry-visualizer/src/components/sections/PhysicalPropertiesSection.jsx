export default function PhysicalPropertiesSection({ properties }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200/80 bg-white/72 p-4 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(14,165,233,0.12)] dark:border-white/10 dark:bg-white/4">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">{label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-cyan-200/70 bg-cyan-50/60 p-5 dark:border-cyan-300/20 dark:bg-cyan-300/10">
        <h4 className="text-sm font-semibold text-cyan-800 dark:text-cyan-100">Hydrogen Bonding Diagram</h4>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-full bg-white px-4 py-2 text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">Molecule A - H</span>
          <span className="text-cyan-600 dark:text-cyan-200">······</span>
          <span className="rounded-full bg-white px-4 py-2 text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">O / N / F of Molecule B</span>
        </div>
      </div>
    </div>
  );
}
