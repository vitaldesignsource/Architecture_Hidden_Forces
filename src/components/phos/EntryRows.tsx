import { Link } from "@tanstack/react-router";
import { LabelChips } from "@/components/phos/Labels";
import { divisionLabel, type PhosEntry } from "@/lib/phos/entries";
import { groupByDivision } from "@/lib/phos/tools";

/**
 * Split out of ToolFrame, which every instrument imports: these two need the
 * Portal's entry index, and that index eagerly holds the front matter of seven
 * hundred files. An instrument that lists no entries — the register, the
 * flashing colours, the atlas, the diagrams, the index of instruments itself —
 * should not fetch a hundred and fifty kilobytes to draw a frame.
 */
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
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
      <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
        {e.division.numeral ? `${e.division.numeral}.` : ""}{e.n}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={`font-serif text-bone transition-colors group-hover:text-gold ${compact ? "text-base" : "text-lg"} ${e.written ? "" : "opacity-60"}`}>
            {e.title}
          </span>
          {!compact && e.written && <LabelChips labels={e.meta?.labels ?? []} size="xs" />}
          {!e.written && <span className="font-label text-[9px] uppercase tracking-[0.14em] text-muted-foreground">forthcoming</span>}
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
