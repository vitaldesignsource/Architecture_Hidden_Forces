import { useEffect, useMemo, useRef, useState } from "react";
import { useViewBox } from "@/hooks/useViewBox";
import { PLACES, alive as aliveIn, when, type Geo, type Span } from "@/lib/phos/atlas";

/**
 * The Atlas's map: the Old World on one azimuthal sheet, every place a span
 * passes through set on it as a point of light. The sheet itself (coast,
 * rivers, lakes, names) was drawn at build time; here only the lights move.
 *
 * Lights answer to the page's state: a hovered or chosen span brightens its
 * places and draws the path it moved along; a year dims every place where
 * nothing was then alight; a chosen place is ringed. Sizes scale with the
 * zoom so they stay the same on screen whether the whole sheet or one
 * province is in view.
 */
export type MapProps = {
  geo: Geo;
  spans: Span[];
  hov?: string | null;
  sel?: string | null;
  year?: number | null;
  place?: string | null;
  hovPlace?: string | null;
  onHover?: (id: string | null) => void;
  onHoverPlace?: (id: string | null) => void;
  onPlace?: (id: string | null) => void;
  /** Place ids to frame when the map first shows, and again when they change. */
  focus?: string[] | null;
  compact?: boolean;
  className?: string;
};

type Mark = { id: string; x: number; y: number; spans: Span[] };

export function AtlasMap({ geo, spans, hov = null, sel = null, year = null, place = null, hovPlace = null, onHover, onHoverPlace, onPlace, focus = null, compact = false, className = "" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const vb = useViewBox(svgRef, { w: geo.w, h: geo.h }, { minW: 140, interactive: !compact });
  const [tip, setTip] = useState<{ x: number; y: number; id: string } | null>(null);

  const marks = useMemo<Mark[]>(() => {
    const by = new Map<string, Span[]>();
    for (const s of spans) for (const p of s.places) (by.get(p) ?? by.set(p, []).get(p)!).push(s);
    return [...by].flatMap(([id, ss]) => { const pt = geo.points[id]; return pt ? [{ id, x: pt[0], y: pt[1], spans: ss }] : []; });
  }, [spans, geo]);

  const focusKey = focus ? focus.join(",") : "";
  useEffect(() => {
    if (!focus || !focus.length) return;
    const pts = focus.map((p) => geo.points[p]).filter((p): p is [number, number] => !!p);
    vb.fit(pts, compact ? 90 : 120, compact ? 3.2 : 5);
  }, [focusKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const active = spans.find((s) => s.id === (hov ?? sel)) ?? null;
  const activePlaces = new Set(active?.places ?? []);
  const litNow = year === null ? null : new Set(aliveIn(year).flatMap((s) => s.places));
  const fs = vb.view.w / geo.w; // sheet units per screen-ish unit: text and lights keep their size

  const path = active && active.places.length > 1
    ? active.places.map((p) => geo.points[p]).filter(Boolean).map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")
    : "";

  const showTip = (m: Mark, ev: { clientX: number; clientY: number }) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: ev.clientX - r.left, y: ev.clientY - r.top, id: m.id });
  };
  const tipMark = tip ? marks.find((m) => m.id === tip.id) : null;
  const tipLeft = tip && boxRef.current ? Math.min(tip.x + 14, boxRef.current.clientWidth - 260) : 0;

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`${vb.view.x} ${vb.view.y} ${vb.view.w} ${vb.view.h}`}
        className={`aoh-atlas block h-auto w-full select-none ${compact ? "" : "cursor-grab active:cursor-grabbing"}`}
        style={{ aspectRatio: `${geo.w} / ${geo.h}` }}
        role="img"
        aria-label="Map of the Old World with the places of the encyclopaedia’s dated entries"
        onPointerDown={vb.onPointerDown}
        onPointerMove={(ev) => { if (vb.onPointerMove(ev)) setTip(null); }}
        onPointerUp={(ev) => {
          const { moved, pressed, wasDown } = vb.onPointerUp(ev);
          if (moved || !wasDown || compact) return;
          const id = (pressed?.closest?.("[data-place]") as HTMLElement | null)?.dataset.place ?? null;
          onPlace?.(id && id !== place ? id : null);
        }}
        onPointerLeave={(ev) => { vb.onPointerUp(ev); setTip(null); onHoverPlace?.(null); }}
      >
        <rect x={0} y={0} width={geo.w} height={geo.h} fill="var(--void)" />
        <path d={geo.graticule} className="aoh-atlas-grat" />
        <path d={geo.land} className="aoh-atlas-land" />
        <path d={geo.lakes} className="aoh-atlas-lake" />
        <path d={geo.rivers} className="aoh-atlas-river" style={{ strokeWidth: 0.7 * Math.sqrt(fs) }} />
        {geo.labels.map((l) => (
          <text key={l.t} x={l.x} y={l.y} textAnchor="middle" className={l.k === "sea" ? "aoh-atlas-sea" : "aoh-atlas-region"}
                fontSize={(l.k === "sea" ? 10.5 : 15) * fs} letterSpacing={l.k === "sea" ? 0 : 2 * fs}>
            {l.t}
          </text>
        ))}
        {path && <path d={path} className="aoh-atlas-path" style={{ strokeWidth: 1.1 * fs, strokeDasharray: `${4 * fs} ${3 * fs}` }} />}
        {marks.map((m) => {
          const n = m.spans.length;
          const r = (2.1 + Math.log2(1 + n) * 1.15) * fs;
          const hot = activePlaces.has(m.id) || hovPlace === m.id;
          const chosen = place === m.id;
          const lit = litNow ? litNow.has(m.id) : true;
          const dim = (litNow && !lit) || (active && !hot) || (place && !chosen && !hot);
          return (
            <g key={m.id} data-place={m.id} className={`aoh-atlas-mark ${hot || chosen ? "is-hot" : ""} ${litNow && lit ? "is-lit" : ""}`} style={{ opacity: dim ? 0.28 : 1 }}
               onPointerEnter={(ev) => { showTip(m, ev); onHoverPlace?.(m.id); }}
               onPointerMove={(ev) => showTip(m, ev)}
               onPointerLeave={() => { setTip(null); onHoverPlace?.(null); }}>
              <circle cx={m.x} cy={m.y} r={r * 3.2} className="aoh-atlas-halo" />
              {chosen && <circle cx={m.x} cy={m.y} r={r * 2.2} fill="none" stroke="var(--gold)" strokeWidth={0.9 * fs} />}
              <circle cx={m.x} cy={m.y} r={r} className="aoh-atlas-core" style={{ cursor: compact ? "default" : "pointer" }} />
            </g>
          );
        })}
      </svg>

      {!compact && (
        <div className="absolute right-3 top-3 flex gap-1 font-mono text-[10px] uppercase tracking-[0.12em]">
          <button onClick={() => vb.zoom(0.7)} aria-label="Zoom in" className="border border-border bg-void/70 px-2.5 py-1 text-muted-foreground backdrop-blur hover:border-gold/60 hover:text-gold">+</button>
          <button onClick={() => vb.zoom(1.45)} aria-label="Zoom out" className="border border-border bg-void/70 px-2.5 py-1 text-muted-foreground backdrop-blur hover:border-gold/60 hover:text-gold">−</button>
          <button onClick={vb.reset} className="border border-border bg-void/70 px-2.5 py-1 text-muted-foreground backdrop-blur hover:border-gold/60 hover:text-gold">Whole sheet</button>
        </div>
      )}

      {tipMark && tip && (
        <div className="pointer-events-none absolute z-10 w-64 border border-gold/40 bg-void/95 p-3 backdrop-blur" style={{ left: tipLeft, top: Math.max(0, tip.y - 12) }}>
          <p className="font-serif text-base text-bone">{PLACES[tipMark.id]?.name ?? tipMark.id}</p>
          <ul className="mt-2 space-y-1">
            {tipMark.spans.slice(0, 6).map((s) => (
              <li key={s.id} className={`text-xs leading-snug ${s.id === (hov ?? sel) ? "text-gold" : "text-bone/75"}`}>
                <span className="font-serif">{s.label}</span>
                <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.15em] text-gold-dim">{when(s)}</span>
              </li>
            ))}
            {tipMark.spans.length > 6 && <li className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">and {tipMark.spans.length - 6} more</li>}
          </ul>
          {!compact && <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-gold-dim">click to keep</p>}
        </div>
      )}
    </div>
  );
}
