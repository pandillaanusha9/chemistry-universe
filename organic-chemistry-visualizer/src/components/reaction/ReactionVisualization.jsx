import { ArrowDown } from "lucide-react";
import MoleculeViewer from "../molecule/MoleculeViewer";

export default function ReactionVisualization({ reaction }) {
  const products = [];
  if (reaction.majorProductModel) {
    products.push({ model: reaction.majorProductModel, label: `Major: ${reaction.majorProduct}`, type: 'major' });
  }
  if (reaction.minorProductModel) {
    products.push({ model: reaction.minorProductModel, label: `Minor: ${reaction.minorProduct}`, type: 'minor' });
  }
  if (reaction.sideProductModel) {
    products.push({ model: reaction.sideProductModel, label: `Side: ${reaction.sideProducts}`, type: 'side' });
  }
  if (products.length === 0) {
    products.push({ model: reaction.productModel, label: "3D Product", type: 'main' });
  }

  return (
    <div className="relative grid gap-4 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
      <MoleculeViewer model={reaction.reactantModel} label="3D Reactant" height={280} />
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Reagent / Catalyst</p>
        <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{reaction.reagent}</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{reaction.catalyst}</p>
        <ArrowDown className="mx-auto mt-4 text-cyan-500" size={28} />
        <p className="mt-3 rounded-full bg-cyan-50 px-3 py-1 text-xs text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-100">{reaction.equation}</p>
      </div>
      <div className="grid gap-2">
        {products.map((product, index) => (
          <MoleculeViewer key={index} model={product.model} label={product.label} height={products.length > 1 ? 140 : 280} />
        ))}
      </div>
    </div>
  );
}
