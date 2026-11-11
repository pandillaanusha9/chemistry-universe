export default function TestsSection({ tests }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tests.map((test) => (
        <article key={test.name} className="rounded-2xl border border-slate-200/80 bg-white/72 p-5 dark:border-white/10 dark:bg-white/4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{test.name}</h3>
              <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-200">{test.reagent}</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-100">Test</span>
          </div>
          <div className="mt-4 grid gap-2">
            <Badge label="Observation" value={test.observation} />
            <Badge label="Color Change" value={test.colorChange} />
            <Badge label="Interpretation" value={test.interpretation} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Badge({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  );
}
