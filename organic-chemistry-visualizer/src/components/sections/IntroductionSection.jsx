import MoleculeViewer from "../molecule/MoleculeViewer";

export default function IntroductionSection({ content }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_320px]">
      <div>
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/4">
          <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">{content.definition}</p>
          <p className="mt-4 font-mono text-sm text-cyan-700 dark:text-cyan-200">General formula: {content.generalFormula}</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <MiniGroup title="Examples" items={content.examples} />
          <MiniGroup title="Classification" items={content.classifications} />
          <MiniGroup title="Importance" items={content.importance} />
        </div>
      </div>
      <MoleculeViewer model={content.molecule} label="Decorative Molecule" height={310} decorative />
    </div>
  );
}

function MiniGroup({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/4">
      <h4 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h4>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <p key={item} className="rounded-xl bg-slate-100/80 px-3 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">{item}</p>
        ))}
      </div>
    </div>
  );
}
