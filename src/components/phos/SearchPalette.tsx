import { useEffect, useMemo, useRef, useState } from "react";
import { EnterMark, UpDownMark } from "@/components/marks";
import { useNavigate } from "@tanstack/react-router";
import { DIVISIONS, ENTRIES, TOOLS, valueSlug, type PhosEntry } from "@/lib/phos/entries";
import { TOOL_ROUTES } from "@/lib/phos/tool-routes";
import { AQUIFER, PROVINCES, STATIONS, type Station } from "@/lib/ecology";
import { TERMS } from "@/lib/lexicon";
import { ENTRIES as SECTIONS } from "@/lib/contents";
import { LabelChips } from "@/components/phos/Labels";

/**
 * Search — the encyclopaedia asked a question in its own words.
 *
 * ⌘K, Ctrl+K, or / opens it from any page of the Portal. It reads what every
 * entry already carries eagerly — title, summary, division, labels, and the
 * facet values — so it costs no extra load and answers as you type. Divisions
 * and instruments answer too, and a query that is exactly a facet value offers
 * that facet's browse page. The other two volumes answer as well — the
 * Ecology's stations and provinces, the lexicon's terms, the treatise's
 * sections — so a word found anywhere can be followed from anywhere. Arrow
 * keys move, Enter enters, Escape leaves.
 */
type Hit =

/**
 * The palette, split from the button: everything here needs the entry index.
 */
  | { kind: "entry"; e: PhosEntry; score: number }
  | { kind: "division"; id: string; numeral: string; title: string; score: number }
  | { kind: "tool"; k: string; d: string; to: string; score: number }
  | { kind: "facet"; facet: string; value: string; count: number; score: number }
  | { kind: "page"; k: string; d: string; where: string; to: PageTo; hash?: string; score: number };

/** Where a page hit can lead: the treatise, the Ecology's landing, a station, a province, the lexicon. */
type PageTo = "/" | "/ecology" | "/ecology/lexicon" | Station["to"];

/** The pages of the other two volumes, as search reads them: a name, a line, where they are. */
type PageDoc = { k: string; d: string; where: string; to: PageTo; hash?: string; title: string; text: string };
let PAGES: PageDoc[] | null = null;
const pages = (): PageDoc[] =>
  (PAGES ??= [
    ...[...STATIONS, AQUIFER, ...PROVINCES].map((st) => ({
      k: st.title, d: st.question, where: st.region ?? `The Hidden Ecology · station ${st.n}`, to: st.to,
      title: norm(st.title), text: norm(`${st.question} ${st.shorthand} ${st.definition} ${st.dimension}`),
    })),
    ...TERMS.map((t) => ({
      k: t.k, d: t.d.split(/(?<=[.:])\s/)[0], where: `Lexicon · ${t.family}`, to: "/ecology/lexicon" as const, hash: t.familyId,
      title: norm(t.k), text: norm(`${t.root ?? ""} ${t.d}`),
    })),
    ...SECTIONS.filter((e) => !e.to).map((e) => ({
      k: e.n === "—" ? e.t : `§ ${e.n} · ${e.t}`, d: e.d, where: "The Architecture", to: "/" as const, hash: e.id,
      title: norm(e.t), text: norm(e.d),
    })),
  ]);

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
  for (const pg of pages()) {
    let s = 0;
    for (const w of words) {
      if (pg.title === t) s += 40;
      else if (pg.title.startsWith(w)) s += 14;
      else if (new RegExp(`\\b${w}`).test(pg.title)) s += 9;
      else if (pg.title.includes(w)) s += 5;
      if (pg.text.includes(w)) s += 3;
    }
    if (s > 0 && words.every((w) => pg.title.includes(w) || pg.text.includes(w)))
      hits.push({ kind: "page", k: pg.k, d: pg.d, where: pg.where, to: pg.to, hash: pg.hash, score: s });
  }
  for (const f of FACETS) {
    const seen = new Map<string, number>();
    for (const e of ENTRIES) for (const v of e.meta?.facets[f] ?? []) if (norm(v) === t) seen.set(v, (seen.get(v) ?? 0) + 1);
    for (const [value, count] of seen) hits.push({ kind: "facet", facet: f, value, count, score: 35 });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 24);
}

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // whoever opened the palette gets focus back when it closes — the Search
  // button, usually — unless a hit was chosen and the page is changing anyway
  const opener = useRef<HTMLElement | null>(null);
  const hits = useMemo(() => search(q), [q]);

  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement | null;
      setQ(""); setI(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);
  const close = (navigating = false) => {
    onClose();
    if (!navigating) { const el = opener.current; setTimeout(() => el?.focus?.(), 0); }
  };
  useEffect(() => { setI(0); }, [q]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const go = (h: Hit) => {
    close(true);
    if (h.kind === "entry") navigate({ to: "/phos/$division/$entry", params: { division: h.e.division.id, entry: h.e.slug } });
    else if (h.kind === "division") navigate(h.id === "portal" ? { to: "/phos/portal" } : { to: "/phos/$division", params: { division: h.id } });
    else if (h.kind === "tool") navigate({ to: h.to });
    else if (h.kind === "page") navigate({ to: h.to, hash: h.hash });
    else navigate({ to: "/phos/browse/$facet/$value", params: { facet: h.facet, value: valueSlug(h.value) } });
  };
  // one handler on the dialog, so Escape works wherever focus is and Tab
  // stays inside: a keyboard reader once tabbed out under the veil, where
  // Escape no longer answered and the page beneath could not scroll
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(hits.length - 1, x + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
    else if (e.key === "Enter" && e.target === inputRef.current && hits[i]) { e.preventDefault(); go(hits[i]); }
    else if (e.key === "Tab") {
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('input, button, [tabindex]:not([tabindex="-1"])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  const guidance = q.trim().length < 2
    ? "Six hundred and fifty-three entries, twenty-two divisions and the instruments of Phōs; the stations, provinces and lexicon of the Hidden Ecology; the sections of the Architecture. Type two letters. A division's numeral goes straight to it; a facet value exactly typed offers its browse page."
    : hits.length === 0 ? "Nothing carries that yet." : null;
  useEffect(() => { document.getElementById(`aoh-hit-${i}`)?.scrollIntoView({ block: "nearest" }); }, [i]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-void/80 px-4 pt-[12vh] backdrop-blur-md" onMouseDown={() => close()} role="presentation">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Search the three volumes" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}
           className="animate-rise w-full max-w-2xl border border-gold/40 bg-void shadow-[0_0_80px_-20px_oklch(0.78_0.13_75_/_0.5)]">
        <div className="flex items-center gap-4 border-b border-border px-6 py-4">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">Search</span>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="a title, a word from a summary, a tradition, a station, a term of the lexicon…"
                 role="combobox" aria-label="Search" aria-autocomplete="list" aria-haspopup="listbox" aria-expanded={hits.length > 0}
                 aria-controls="aoh-hits" aria-activedescendant={hits[i] ? `aoh-hit-${i}` : undefined} aria-describedby="aoh-search-help"
                 className="min-w-0 flex-1 bg-transparent font-serif text-xl italic text-bone placeholder:text-muted-foreground/70 focus:outline-none" />
          <button onClick={() => close()} className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim hover:text-gold">esc</button>
        </div>

        {/* the guidance lives outside the list, so the list holds options and
            nothing else, and the input can point to the guidance by id */}
        <p id="aoh-search-help" className={guidance ? "px-6 py-8 text-sm leading-relaxed text-muted-foreground" : "sr-only"}>
          {guidance ?? "Arrow keys move through the hits; Enter opens one; Escape closes."}
        </p>
        <ul id="aoh-hits" role="listbox" aria-label="Hits" className="max-h-[56vh] overflow-y-auto">
          {hits.map((h, n) => {
            const on = n === i;
            const row = `grid cursor-pointer gap-4 border-b border-border/60 px-6 py-3.5 transition-colors ${on ? "bg-gold/10" : "hover:bg-gold/5"}`;
            if (h.kind === "entry") return (
              <li key={h.e.id} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{h.e.division.numeral || "Portal"} · {String(h.e.n).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className={`block font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.e.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{h.e.meta?.summary}</span>
                  <span className="mt-2 block"><LabelChips labels={h.e.meta?.labels ?? []} confidence={h.e.meta?.confidence ?? []} /></span>
                </span>
              </li>
            );
            if (h.kind === "division") return (
              <li key={"d" + h.id} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold">Division</span>
                <span className={`font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.numeral} · {h.title}</span>
              </li>
            );
            if (h.kind === "page") return (
              <li key={"p" + h.to + (h.hash ?? "")} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold">{h.where.startsWith("Lexicon") ? "Lexicon" : h.where === "The Architecture" ? "Treatise" : "Ecology"}</span>
                <span className="min-w-0">
                  <span className={`block font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.k}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{h.d}</span>
                  <span className="mt-1 block font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">{h.where}</span>
                </span>
              </li>
            );
            if (h.kind === "tool") return (
              <li key={"t" + h.k} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold">Instrument</span>
                <span className="min-w-0"><span className={`block font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.k}</span><span className="block text-sm text-muted-foreground">{h.d}</span></span>
              </li>
            );
            return (
              <li key={"f" + h.facet + h.value} id={`aoh-hit-${n}`} role="option" aria-selected={on} onMouseEnter={() => setI(n)} onClick={() => go(h)} className={`${row} grid-cols-[4.5rem_1fr]`}>
                <span className="pt-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold">Browse</span>
                <span className={`font-serif text-lg ${on ? "text-gold" : "text-bone"}`}>{h.facet} · {h.value} <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{h.count} entries</span></span>
              </li>
            );
          })}
        </ul>
        <div className="hidden gap-5 border-t border-border px-6 py-3 font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim pointer-fine:flex">
          <span className="inline-flex items-center gap-1.5"><UpDownMark /> move</span><span className="inline-flex items-center gap-1.5"><EnterMark /> enter</span><span>esc close</span>
        </div>
      </div>
    </div>
  );
}
