import { useParams } from "react-router-dom";
import SectionShell from "../components/sections/SectionShell";
import IntroductionSection from "../components/sections/IntroductionSection";
import PhysicalPropertiesSection from "../components/sections/PhysicalPropertiesSection";
import ImportantOrdersSection from "../components/sections/ImportantOrdersSection";
import NamedReactionsSection from "../components/sections/NamedReactionsSection";
import TestsSection from "../components/sections/TestsSection";
import ConversionsSection from "../components/sections/ConversionsSection";
import ReactionBlock from "../components/reaction/ReactionBlock";
import { getCategoryContent } from "../data/chemistryContent";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const content = getCategoryContent(categorySlug);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header
        className="mb-8 rounded-3xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-xl shadow-sm dark:border-slate-700/60 dark:bg-slate-950/85 dark:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
        style={{ backgroundImage: 'radial-gradient(circle at 15% 15%, rgba(45,212,191,0.12), transparent 28%), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.1), transparent 22%)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700 dark:text-cyan-200">Interactive Scientific Visualization System</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">{content.name}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Content follows the exact learning order: introduction, preparation, physical properties, chemical properties, important orders, named reactions, tests, and conversions.
        </p>
      </header>

      <div className="space-y-5 pb-20">
        <SectionShell number="1" title="Introduction" defaultOpen>
          <IntroductionSection content={content.introduction} />
        </SectionShell>

        <SectionShell number="2" title="Preparation Methods" defaultOpen>
          <div className="space-y-5">
            {content.preparation.map((reaction) => (
              <ReactionBlock key={reaction.title} reaction={reaction} />
            ))}
          </div>
        </SectionShell>

        <SectionShell number="3" title="Physical Properties">
          <PhysicalPropertiesSection properties={content.physical} />
        </SectionShell>

        <SectionShell number="4" title="Chemical Properties">
          <div className="space-y-5">
            {content.chemical.map((reaction) => (
              <ReactionBlock key={reaction.title} reaction={reaction} />
            ))}
          </div>
        </SectionShell>

        {content.importantOrders && content.importantOrders.length > 0 && (
          <SectionShell number="5" title="Important Orders" defaultOpen>
            <ImportantOrdersSection orders={content.importantOrders} />
          </SectionShell>
        )}

        <SectionShell number={content.importantOrders && content.importantOrders.length > 0 ? "6" : "5"} title="Named Reactions">
          <NamedReactionsSection reactions={content.named} />
        </SectionShell>

        <SectionShell number={content.importantOrders && content.importantOrders.length > 0 ? "7" : "6"} title="Tests">
          <TestsSection tests={content.tests} />
        </SectionShell>

        <SectionShell number={content.importantOrders && content.importantOrders.length > 0 ? "8" : "7"} title="Conversions">
          <ConversionsSection conversions={content.conversions} />
        </SectionShell>
      </div>
    </main>
  );
}
