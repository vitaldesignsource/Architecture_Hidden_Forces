import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { year as fmtYear, when, type Span } from "@/lib/phos/atlas";

/**
 * The Atlas's timeline: every span laid along one axis of years, in lanes
 * that follow the outline's own regions, packed into as few rows as their
 * overlaps allow. The window zooms about the pointer and pans by dragging;
 * the strip beneath shows where the window sits in the whole of recorded
 * time. A label is set beside a bar only where there is room for it, so the
 * lanes stay tight at the whole-history view and fill in as the reader
 * zooms; a bar without a label still answers to hovering.
 *
 * The year under the pointer is reported as it moves, so the map can light
 * what was alight then; a click on empty ground pins it.
 */
export type TimelineProps = {
  spans: Span[];
  lanes: string[];
  window: [number, number];
  onWindow?: (w: [number, number]) => void;
  hov?: string | null;
  sel?: string | null;
  year?: number | null;
  pinned?: number | null;
  place?: string | null;
  hovPlace?: string | null;
  onHover?: (id: string | null) => void;
  onSelect?: (id: string | null) => void;
  onYear?: (y: number | null) => void;
  onPin?: (y: number | null) => void;
  compact?: boolean;
  /** In compact mode, the span the strip is about. */
  focus?: string | null;
};

const ROW = 16, HEAD = 18, GAP = 10, AXIS = 22, STRIP = 34;
const CH = 6.4; // average width of a label character at 12px serif

type Laid = { s: Span; lane: number; row: number; x0: number; x1: number; label: boolean };

function ticks(t0: number, t1: number, width: number): number[] {
  const span = t1 - t0;
  const steps = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2000];
  const step = steps.find((st) => (span / st) * 72 <= width) ?? 2000;
  const out: number[] = [];
  for (let t = Math.ceil(t0 / step) * step; t <= t1; t += step) out.push(t);
  return out;
}

export function AtlasTimeline(p: TimelineProps) {
  const { spans, lanes, window: win, compact = false } = p;
  const [t0, t1] = win;
  const wrap = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);
  const drag = useRef<{ px: number; t0: number; t1: number; moved: boolean; strip: boolean; target: Element | null } | null>(null);
  const propsRef = useRef(p);
  propsRef.current = p;

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const x = (t: number) => ((t - t0) / (t1 - t0)) * width;
  const tOf = (px: number) => t0 + (px / width) * (t1 - t0);

  // Pack each lane's spans into rows by overlap, then decide which bars have
  // room for a label, given the bar to their right in the same row.
  const { laid, laneTops, height } = useMemo(() => {
    const laid: Laid[] = [];
    const laneTops: number[] = [];
    let y = AXIS;
    if (!width) return { laid, laneTops, height: 0 };
    lanes.forEach((lane, li) => {
      // Only what lies within the window takes a row; a bar wholly before or
      // after it is neither drawn nor labelled.
      const ss = spans.filter((s) => s.lane === lane && x(s.to) >= 0 && x(s.from) <= width).sort((a, b) => a.from - b.from || b.to - a.to);
      const rows: number[] = [];
      const placed: Laid[] = [];
      for (const s of ss) {
        const x0 = x(s.from), x1 = Math.max(x(s.to), x0 + 4);
        let row = rows.findIndex((end) => x0 >= end + 3);
        if (row < 0) { row = rows.length; rows.push(-Infinity); }
        rows[row] = x1;
        placed.push({ s, lane: li, row, x0, x1, label: false });
      }
      for (const l of placed) {
        const next = placed.filter((o) => o.row === l.row && o.x0 > l.x0).sort((a, b) => a.x0 - b.x0)[0];
        const start = Math.max(l.x0, 0);
        l.label = (next ? next.x0 : width) - start - 6 >= l.s.label.length * CH + 8;
      }
      laneTops.push(y);
      laid.push(...placed);
      y += HEAD + Math.max(1, rows.length) * ROW + GAP;
    });
    return { laid, laneTops, height: y };
  }, [spans, lanes, width, t0, t1]); // eslint-disable-line react-hooks/exhaustive-deps

  // Wheel zooms about the pointer; attached natively so the page does not scroll too.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || compact) return;
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault();
      const { window: [a, b], onWindow } = propsRef.current;
      const r = svg.getBoundingClientRect();
      const t = a + ((ev.clientX - r.left) / r.width) * (b - a);
      const f = Math.exp(ev.deltaY * 0.0014);
      const span = Math.max(20, Math.min(b - a, (b - a) * f)) ;
      const k = span / (b - a);
      const na = t - (t - a) * k;
      onWindow?.([na, na + span]);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [compact, width > 0]); // the svg exists only once the width is measured

  const pointerT = (ev: RPointerEvent<SVGElement>) => {
    const r = svgRef.current!.getBoundingClientRect();
    return tOf(ev.clientX - r.left);
  };
  const onDown = (ev: RPointerEvent<SVGSVGElement>, strip = false) => {
    if (ev.button !== 0) return;
    // Capturing the pointer retargets later events at the svg; what was pressed
    // is remembered so a click can be told from a drag and judged on release.
    drag.current = { px: ev.clientX, t0, t1, moved: false, strip, target: ev.target as Element };
    ev.currentTarget.setPointerCapture(ev.pointerId);
  };
  const onMove = (ev: RPointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (d) {
      if (compact) return;
      if (!d.moved && Math.abs(ev.clientX - d.px) < 4) return;
      d.moved = true;
      const dt = ((ev.clientX - d.px) / width) * (d.t1 - d.t0) * (d.strip ? -(1) : 1);
      p.onWindow?.([d.t0 - dt, d.t1 - dt]);
      return;
    }
    if (!compact) p.onYear?.(Math.round(pointerT(ev)));
  };
  const onUp = (ev: RPointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    drag.current = null;
    try { ev.currentTarget.releasePointerCapture(ev.pointerId); } catch { /* not captured */ }
    if (!d || d.moved) return;
    const span = (d.target?.closest?.("[data-span]") as SVGElement | null)?.dataset.span ?? null;
    if (span) { p.onSelect?.(p.sel === span ? null : span); return; }
    if (!compact) {
      const y = Math.round(pointerT(ev));
      p.onPin?.(p.pinned === y ? null : y);
    }
  };

  const active = p.hov ?? p.sel ?? null;
  const cursor = p.year ?? p.pinned ?? null;
  const tk = ticks(t0, t1, width);
  const all = useMemo(() => ({ a: Math.min(...spans.map((s) => s.from)), b: Math.max(...spans.map((s) => s.to)) }), [spans]);

  return (
    <div ref={wrap} className="relative w-full">
      {width > 0 && (
        <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`block select-none ${compact ? "" : "cursor-crosshair"}`}
             role="img" aria-label="Timeline of the encyclopaedia’s dated entries"
             onPointerDown={(ev) => onDown(ev)} onPointerMove={onMove} onPointerUp={onUp}
             onPointerLeave={(ev) => { onUp(ev); p.onYear?.(null); p.onHover?.(null); }}>
          {/* century grid and axis */}
          {tk.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={AXIS - 4} y2={height} className="aoh-tl-grid" />
              <text x={x(t) + 3} y={11} className="aoh-tl-axis">{t === 0 ? "BCE · CE" : fmtYear(t)}</text>
            </g>
          ))}
          {/* lanes */}
          {lanes.map((lane, li) => (
            <g key={lane}>
              <text x={0} y={laneTops[li] + 10} className="aoh-tl-lane">{lane}</text>
              <line x1={0} x2={width} y1={laneTops[li] + HEAD - 4} y2={laneTops[li] + HEAD - 4} className="aoh-tl-rule" />
            </g>
          ))}
          {/* bars */}
          {laid.map((l) => {
            const s = l.s;
            const y = laneTops[l.lane] + HEAD + l.row * ROW;
            const isActive = active === s.id;
            const atPlace = p.place ? s.places.includes(p.place) : true;
            const atHov = p.hovPlace ? s.places.includes(p.hovPlace) : false;
            const focused = compact && p.focus === s.id;
            const dim = (active && !isActive) || !atPlace || (compact && p.focus && !focused);
            const point = s.from === s.to;
            return (
              <g key={s.id} data-span={s.id} className={`aoh-tl-span k-${s.kind} ${isActive || atHov || focused ? "is-hot" : ""} ${s.approx ? "is-approx" : ""}`}
                 style={{ opacity: dim ? (compact ? 0.4 : 0.25) : 1 }}
                 tabIndex={compact ? -1 : 0} role="button" aria-label={`${s.label}, ${when(s)}`}
                 onPointerEnter={() => p.onHover?.(s.id)} onPointerLeave={() => p.onHover?.(null)}
                 onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); p.onSelect?.(s.id); } }}>
                {point ? (
                  <path d={`M${l.x0} ${y + 3} l5 5 l-5 5 l-5 -5 z`} className="aoh-tl-bar" />
                ) : (
                  <rect x={l.x0} y={y + 3} width={l.x1 - l.x0} height={ROW - 6} rx={s.kind === "text" ? 5 : 1.5} className="aoh-tl-bar" />
                )}
                {(l.label || isActive || focused) && (
                  <text x={Math.max(l.x0, 0) + (point ? 9 : 5)} y={y + ROW - 5} className="aoh-tl-label">{s.label}</text>
                )}
              </g>
            );
          })}
          {/* the year cursor */}
          {cursor !== null && cursor >= t0 && cursor <= t1 && (
            <g className="pointer-events-none">
              <line x1={x(cursor)} x2={x(cursor)} y1={AXIS - 8} y2={height} className={p.pinned === cursor ? "aoh-tl-cursor is-pinned" : "aoh-tl-cursor"} />
              <text x={x(cursor) + 4} y={AXIS - 10} className="aoh-tl-cursor-label">{fmtYear(cursor)}</text>
            </g>
          )}
        </svg>
      )}
      {/* the strip: the whole of recorded time, and where the window sits */}
      {!compact && width > 0 && (
        <svg width={width} height={STRIP} viewBox={`0 0 ${width} ${STRIP}`} className="mt-2 block cursor-ew-resize select-none"
             aria-hidden
             onPointerDown={(ev) => { if (ev.button !== 0) return; const r = ev.currentTarget.getBoundingClientRect(); const t = all.a + ((ev.clientX - r.left) / width) * (all.b - all.a); const span = t1 - t0; p.onWindow?.([t - span / 2, t + span / 2]); drag.current = { px: ev.clientX, t0: t - span / 2, t1: t + span / 2, moved: false, strip: true, target: null }; ev.currentTarget.setPointerCapture(ev.pointerId); }}
             onPointerMove={(ev) => { const d = drag.current; if (!d || !d.strip) return; const dt = ((ev.clientX - d.px) / width) * (all.b - all.a); p.onWindow?.([d.t0 + dt, d.t1 + dt]); }}
             onPointerUp={(ev) => { drag.current = null; try { ev.currentTarget.releasePointerCapture(ev.pointerId); } catch { /* */ } }}>
          <rect x={0} y={0} width={width} height={STRIP} className="aoh-tl-strip" />
          {lanes.map((lane, li) => spans.filter((s) => s.lane === lane).map((s) => {
            const sx = ((s.from - all.a) / (all.b - all.a)) * width;
            const sw = Math.max(1.5, ((s.to - s.from) / (all.b - all.a)) * width);
            return <rect key={s.id} x={sx} y={3 + (li / lanes.length) * (STRIP - 6)} width={sw} height={Math.max(1.2, (STRIP - 6) / lanes.length - 0.6)} className="aoh-tl-strip-mark" />;
          }))}
          <rect x={((t0 - all.a) / (all.b - all.a)) * width} y={0} width={Math.max(2, ((t1 - t0) / (all.b - all.a)) * width)} height={STRIP} className="aoh-tl-window" />
        </svg>
      )}
    </div>
  );
}
