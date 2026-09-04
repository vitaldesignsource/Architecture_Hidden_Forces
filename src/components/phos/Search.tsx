import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DIVISIONS, ENTRIES, TOOLS, valueSlug, type PhosEntry } from "@/lib/phos/entries";
import { TOOL_ROUTES } from "@/lib/phos/tools";
import { LabelChips } from "@/components/phos/Labels";

/**
 * Search — the encyclopaedia asked a question in its own words.
 *
 * ⌘K, Ctrl+K, or / opens it from any page of the Portal. It reads what every
 * entry already carries eagerly — title, summary, division, labels, and the
 * facet values — so it costs no extra load and answers as you type. Divisions
 * and instruments answer too, and a query that is exactly a facet value offers
 * that facet's browse page. Arrow keys move, Enter enters, Escape leaves.
 */
type Hit =
  | { kind: "entry"; e: PhosEntry; score: number }
  | { kind: "division"; id: string; numeral: string; title: string; score: number }
  | { kind: "tool"; k: string; d: string; to: string; score: number }
  | { kind: "facet"; facet: string; value: string; count: number; score: number };

const FACETS = ["tradition", "plane", "operation", "symbol", "quality", "text", "period"] as const;
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

type Doc = { e: PhosEntry; title: string; summary: string; facets: string[]; labels: string };
let DOCS: Doc[] | null = null;
const docs = () =>
  (DOCS ??= ENTRIES.filter((e) => e.written && e.meta).map((e) => ({
    e, title: norm(e.title), summary: norm(e.meta!.summary),
    facets: FACETS.flatMap((f) => e.meta!.facets[f] ?? []).map(norm),
    labels: norm(e.meta!.labels.join(" ")),
  })));

function search(q: string): Hit[] {
  const t = norm(q.trim()); if (t.length < 2) return [];
  const words = t.split(/\s+/).filter(Boolean);
  const hits: Hit[] = [];
  for (const d of docs()) {
    let s = 0;
    for (const w of words) {
      if (d.title === t) s += 40;
      else if (d.title.startsWith(w)) s += 14;
      else if (new RegExp(`\\b${w}`).test(d.title)) s += 9;
      else if (d.title.includes(w)) s += 5;
      if (d.summary.includes(w)) s += 3;
      if (d.facets.some((f) => f === w)) s += 6; else if (d.facets.some((f) => f.includes(w))) s += 2;
      if (d.labels.includes(w)) s += 1;
    }
    if (s > 0 && words.every((w) => d.title.includes(w) || d.summary.includes(w) || d.facets.some((f) => f.includes(w)) || d.labels.includes(w))) hits.push({ kind: "entry", e: d.e, score: s });
  }
  for (const dv of DIVISIONS) {
    const num = norm(dv.numeral || "portal"), title = norm(dv.title);
    if (num === t || `division ${num}` === t) hits.push({ kind: "division", id: dv.id, numeral: dv.numeral || "Portal", title: dv.title, score: 50 });
    else if (title.includes(t)) hits.push({ kind: "division", id: dv.id, numeral: dv.numeral || "Portal", title: dv.title, score: 12 });
  }
  for (const tool of TOOLS) {
    const to = TOOL_ROUTES[tool.k]; if (!to) continue;
    if (norm(tool.k).includes(t)) hits.push({ kind: "tool", k: tool.k, d: tool.d, to, score: 30 });
  }
  for (const f of FACETS) {
    const seen = new Map<string, number>();
    for (const e of ENTRIES) for (const v of e.meta?.facets[f] ?? []) if (norm(v) === t) seen.set(v, (seen.get(v) ?? 0) + 1);
    for (const [value, count] of seen) hits.push({ kind: "facet", facet: f, value, count, score: 35 });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 24);
}

export function useSearchHotkey(open: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? "") || (e.target as HTMLElement)?.isContentEditable;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
      else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); open(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label="Search the encyclopaedia" aria-keyshortcuts="Meta+K Control+K /"
      className="flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold">
      <span>Search</span>
      <span className="hidden text-[9px] text-gold-dim sm:inline">⌘K</span>
    </button>
  );
}

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => search(q), [q]);

  useEffect(() => { if (open) { setQ(""); setI(0); setTimeout(() => inputRef.current?.focus(), 0); } }, [open]);
  useEffect(() => { setI(0); }, [q]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const go = (h: Hit) => {
    onClose();
    if (h.kind === "entry") navigate({ to: "/phos/$division/$entry", params: { division: h.e.division.id, entry: h.e.slug } });
    else if (h.kind === "division") navigate(h.id === "portal" ? { to: "/phos/portal" } : { to: "/phos/$division", params: { division: h.id } });
    else if (h.kind === "tool") navigate({ to: h.to });
    else navigate({ to: "/phos/browse/$facet/$value", params: { facet: h.facet, value: valueSlug(h.value) } });
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(hits.length - 1, x + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
    else if (e.key === "Enter" && hits[i]) { e.preventDefault(); go(hits[i]); }
  };
  useEffect(() => { document.getElementById(`aoh-hit-${i}`)?.scrollIntoView({ block: "nearest" }); }, [i]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-void/80 px-4 pt-[12vh] backdrop-blur-md" onMouseDown={onClose} role="presentation">
      <div role="dialog" aria-modal="true" aria-label="Search the encyclopaedia" onMouseDown={(e) => e.stopPropagation()}
           className="animate-rise w-full max-w-2xl border border-gold/40 bg-void shadow-[0_0_80px_-20px_oklch(0.78_0.13_75_/_0.5)]">
        <div className="flex items-center gap-4 border-b border-border px-6 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Search</span>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
                 placeholder="a title, a word from a summary, a tradition, a plane, a symbol, a division…"
                 aria-label="Search" aria-controls="aoh-hits" aria-activedescendant={hits[i] ? `aoh-hit-${i}` : undefined}
                 className="min-w-0 flex-1 bg-transparent font-serif text-xl italic text-bone placeholder:text-muted-foreground/70 focus:outline-none" />
          <button onClick={onClose} className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim hover:text-gold">esc</button>
        </div>

        <ul id="aoh-hits" role="listbox" className="max-h-[56vh] overflow-y-auto">
          {q.trim().length < 2 ? (
            <li className="px-6 py-8 text-sm leading-relaxed text-muted-foreground">
              Six hundred and fifty-three entries, twenty-two divisions, six instruments. Type two letters. A division's numeral goes straight to it; a facet value exactly typed offers its browse page.
            </li>
          ) : hits.length === 0 ? (
            <li className="px-6 py-8 text-sm text-muted-foreground">Nothing carries that yet.</li>
          ) : hits.map((h, n) => {
            const on = n === i;
            const row = `grid cursor-pointer gap-4 border-b border-border/60 px-6 py-3.5 transition-colors ${on ? "bg-gold/10" : "hover:bg-gold/5"}`;
            if (h.kind === "entry") return (
              <li key={h.e.id} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{h.e.division.numeral || "Portal"} · {String(h.e.n).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className={`block font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.e.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{h.e.meta?.summary}</span>
                  <span className="mt-2 block"><LabelChips labels={h.e.meta?.labels ?? []} confidence={h.e.meta?.confidence ?? []} /></span>
                </span>
              </li>
            );
            if (h.kind === "division") return (
              <li key={"d" + h.id} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Division</span>
                <span className={`font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.numeral} · {h.title}</span>
              </li>
            );
            if (h.kind === "tool") return (
              <li key={"t" + h.k} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Instrument</span>
                <span className="min-w-0"><span className={`block font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.k}</span><span className="block text-sm text-muted-foreground">{h.d}</span></span>
              </li>
            );
            return (
              <li key={"f" + h.facet + h.value} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Browse</span>
                <span className={`font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.facet} · {h.value} <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{h.count} entries</span></span>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-5 border-t border-border px-6 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
          <span>↑↓ move</span><span>↵ enter</span><span>esc close</span>
        </div>
      </div>
    </div>
  );
}
