import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { ContentsPanel } from "@/components/ContentsPanel";
import { PhosHeader, PhosFooter, useScrollTop } from "@/components/phos/PhosHeader";
import { LabelChips } from "@/components/phos/Labels";
import { divisionLabel, type PhosEntry } from "@/lib/phos/entries";
import { groupByDivision } from "@/lib/phos/tools";

/**
 * ToolFrame — the page every instrument sits in: the shared bar with a crumb
 * back to the tools index, a short header over a backdrop, the instrument
 * itself, and the footer. The instruments differ in what they ask; they
 * should not differ in how a page around them looks.
 */
export function ToolFrame({
  name,
  eyebrow = "Instrument",
  title,
  lede,
  backdrop,
  position = "center 50%",
  children,
}: {
  name?: string;
  eyebrow?: string;
  title: ReactNode;
  lede: ReactNode;
  backdrop: string;
  position?: string;
  children: ReactNode;
}) {
  useScrollTop(name ?? "tools");
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader
        crumb={<><Link to="/phos/tools" className="hover:text-gold">Instruments</Link>{name ? <> · {name}</> : null}</>}
        panel={<ContentsPanel active={null} entries={[]} groups={[]} paths={[]} volume="/phos/portal" />}
      />
      <header id="top" className="relative isolate overflow-hidden pb-12 pt-40 sm:pt-48">
        <Backdrop src={`/bg/${backdrop}.webp`} opacity={0.3} position={position} fill />
        <div className="grain" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            <Link to="/phos/tools" className="hover:underline">{eyebrow}</Link>{name ? <> · {name}</> : null}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">{lede}</p>
        </div>
      </header>
      {children}
      <PhosFooter />
    </div>
  );
}

/** A band of the page, full width, with the shared measure inside. */
export function ToolBand({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative isolate border-t border-border py-14 ${className}`}>
      <div className="relative mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{children}</p>;
}

/** Entries as rows, grouped by division — the same row the facet pages use,
 *  so an entry looks the same wherever an instrument lists it. `compact`
 *  drops the summaries for columns and side panels. */
export function EntryRows({ entries, compact = false, grouped = true }: { entries: PhosEntry[]; compact?: boolean; grouped?: boolean }) {
  if (!entries.length) return null;
  const groups = grouped ? groupByDivision(entries) : [{ d: null, rows: entries }];
  return (
    <div>
      {groups.map(({ d, rows }, gi) => (
        <div key={d?.id ?? gi} className={gi ? "mt-10" : ""}>
          {d && (
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              <Link to="/phos/$division" params={{ division: d.id }} className="hover:text-gold">
                {divisionLabel(d)}{d.numeral ? ` · ${d.title}` : ""}
              </Link>
            </p>
          )}
          <div className="mt-3 space-y-px">
            {rows.map((e) => (
              <EntryRow key={e.id} e={e} compact={compact} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EntryRow({ e, compact = false }: { e: PhosEntry; compact?: boolean }) {
  const inner = (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
        {e.division.numeral ? `${e.division.numeral}.` : ""}{e.n}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={`font-serif text-bone transition-colors group-hover:text-gold ${compact ? "text-base" : "text-lg"} ${e.written ? "" : "opacity-60"}`}>
            {e.title}
          </span>
          {!compact && e.written && <LabelChips labels={e.meta?.labels ?? []} size="xs" />}
          {!e.written && <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">forthcoming</span>}
        </span>
        {!compact && e.meta?.summary && <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{e.meta.summary}</span>}
      </span>
    </>
  );
  const cls = `group grid grid-cols-[3.5rem_1fr] items-baseline gap-3 border-b border-border transition-colors hover:border-gold/40 ${compact ? "py-2.5" : "py-4"}`;
  return e.written ? (
    <Link to="/phos/$division/$entry" params={{ division: e.division.id, entry: e.slug }} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
