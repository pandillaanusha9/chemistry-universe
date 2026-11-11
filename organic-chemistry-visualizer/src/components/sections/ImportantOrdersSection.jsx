import React from "react";

const formatChemicalString = (text) => {
  if (!text) return null;

  const tokenMap = {
    "^∘": <sup key="deg">∘</sup>,
    "^-": <sup key="minus">-</sup>,
    _3: <sub key="sub3">3</sub>,
    _2: <sub key="sub2">2</sub>,
    _5: <sub key="sub5">5</sub>,
  };

  return text.split(/(\^∘|\^\-|_3|_2|_5)/g).map((token, index) => {
    if (!token) return null;
    if (tokenMap[token]) return tokenMap[token];
    return <span key={index}>{token}</span>;
  });
};

export default function ImportantOrdersSection({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 border-dashed p-8 text-center dark:border-white/10">
        <p className="text-sm text-slate-500 dark:text-slate-400">No important orders specified for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order, idx) => (
        <div key={idx} className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(245,158,11,0.1)] dark:border-amber-500/20 dark:bg-amber-500/5 dark:hover:shadow-[0_8px_20px_rgba(245,158,11,0.05)]">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            {order.title}
          </h4>
          <div className="text-lg font-medium tracking-wide text-slate-800 dark:text-slate-100 flex flex-wrap gap-2 items-center">
            {formatChemicalString(order.sequence)}
          </div>
          {order.note && (
            <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400 border-t border-amber-200/50 pt-3 dark:border-amber-500/20">
              {order.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
