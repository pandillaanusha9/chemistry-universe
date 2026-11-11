import MoleculeViewer from "../molecule/MoleculeViewer";

export default function NamedReactionsSection({ reactions }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reactions.map((reaction) => (
        <article key={reaction.name} className="rounded-2xl border border-slate-200/80 bg-white/72 p-5 dark:border-white/10 dark:bg-white/4">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{reaction.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{reaction.summary}</p>
          <div className="mt-4 grid gap-2">
            {reaction.resultCards.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-xl bg-slate-100/80 px-3 py-2 text-sm dark:bg-white/5">
                <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
                <span className="text-slate-500 dark:text-slate-400">{value}</span>
              </div>
            ))}
          </div>
          {reaction.reactantModel && (
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {reaction.reactantModel && <MoleculeViewer model={reaction.reactantModel} label="Reactant" height={150} />}
              {reaction.productModel && <MoleculeViewer model={reaction.productModel} label="Product" height={150} />}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
