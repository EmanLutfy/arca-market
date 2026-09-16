import { Reveal } from "./Reveal";
import { container } from "@/lib/ui";
import { ArcaMark } from "./Navbar";

export function ArcConnection() {
  return (
    <section id="arc" className="border-t border-border bg-bg-alt py-20 sm:py-24">
      <Reveal
        className={`${container} flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center`}
      >
        <p className="max-w-lg font-display text-2xl font-medium leading-snug sm:text-[1.7rem]">
          Every position on ARCA settles on-chain,{" "}
          <span className="text-ink-muted">on Arc.</span>
        </p>
        <div className="flex items-center gap-2.5 border border-border-strong px-5 py-2.5 font-display text-sm font-medium">
          <ArcaMark size={16} />
          Built on Arc
        </div>
      </Reveal>
    </section>
  );
}
