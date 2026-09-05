import { useMemo, useRef, useState, type PointerEvent as RPointerEvent, type WheelEvent as RWheelEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { DIVISIONS, entryById } from "@/lib/phos/entries";
import chart from "@/lib/phos/constellation.json";

/**
 * The Constellation — the whole encyclopaedia as one star chart.
 *
 * Every entry is a star; every citation between two entries is a line. A
 * star's brightness is how many entries cite it, so the chart is a truthful
 * picture of where the doctrine's weight actually sits rather than where the
 * outline put it. The layout was computed once (scripts/constellation.mjs)
 * and shipped as data, so this is a chart of the encyclopaedia and not a
 * simulation that settles differently on every visit; the audit fails if
 * the graph has changed since the chart was drawn.
 *
 * Drawn for cost: all three thousand lines are one <path>, the highlighted
 * lines a second <path>, and the stars are circles. Hovering changes one
 * attribute, not four thousand elements.
 */
type Node = { id: string; x: number; y: number; in: number };
const NODES = chart.nodes as Node[];
const EDGES = chart.edges as [number, number][];
const W = 1000;

export const Route = createFileRoute("/phos_/tools_/constellation")({
  validateSearch: (s: Record<string, unknown>): { d?: string; e?: string } => ({
    d: typeof s.d === "string" && s.d ? s.d : undefined,
    e: typeof s.e === "string" && s.e ? s.e : undefined,
  }),
  head: () => ({ meta: [{ title: "The Constellation — Phōs" }] }),
  component: Constellation,
});

const seg = (a: Node, b: Node) => `M${a.x} ${a.y}L${b.x} ${b.y}`;

function Constellation() {
  const { d: dParam, e: eParam } = Route.useSearch();
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);

  const [hov, setHov] = useState<number | null>(null);
  const [div, setDiv] = useState<string | null>(dParam ?? null);
  const [q, setQ] = useState("");
  const [view, setView] = useState(() => {
    const focus = eParam ? NODES.findIndex((n) => n.id === eParam) : -1;
    return focus >= 0 ? { x: NODES[focus].x - 150, y: NODES[focus].y - 150, w: 300 } : { x: 0, y: 0, w: W };
  });
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null);

  // ── derived, once ───────────────────────────────────────────────────────
  const divOf = useMemo(() => new Map(NODES.map((n) => [n.id, n.id.slice(0, n.id.lastIndexOf("-"))])), []);
  const adj = useMemo(() => {
    const m = new Map<number, number[]>();
    EDGES.forEach(([a, b]) => { (m.get(a) ?? m.set(a, []).get(a)!).push(b); (m.get(b) ?? m.set(b, []).get(b)!).push(a); });
    return m;
  }, []);
  const allPath = useMemo(() => EDGES.map(([a, b]) => seg(NODES[a], NODES[b])).join(""), []);
  const maxIn = useMemo(() => Math.max(...NODES.map((n) => n.in)), []);
  const bright = (n: Node) => 0.38 + 0.62 * Math.min(1, Math.log2(1 + n.in) / Math.log2(1 + maxIn));
  const radius = (n: Node) => 1.3 + Math.log2(1 + n.in) * 0.7;
  const twinkleAt = useMemo(() => [...NODES].sort((a, b) => b.in - a.in)[14]?.in ?? 0, []);
  const centroids = useMemo(() => {
    const acc = new Map<string, { x: number; y: number; n: number }>();
    NODES.forEach((n) => { const d = divOf.get(n.id)!; const c = acc.get(d) ?? { x: 0, y: 0, n: 0 }; c.x += n.x; c.y += n.y; c.n++; acc.set(d, c); });
    return [...acc.entries()].map(([id, c]) => ({ id, x: c.x / c.n, y: c.y / c.n }));
  }, [divOf]);
  const mostCited = useMemo(() => [...NODES].sort((a, b) => b.in - a.in).slice(0, 10), []);

  // ── derived, per interaction ────────────────────────────────────────────
  const hovPath = hov === null ? "" : (adj.get(hov) ?? []).map((j) => seg(NODES[hov], NODES[j])).join("");
  const neighbours = useMemo(() => new Set(hov === null ? [] : adj.get(hov) ?? []), [hov, adj]);
  const matches = useMemo(() => {
    const t = q.trim().toLowerCase(); if (t.length < 2) return new Set<number>();
    return new Set(NODES.map((n, i) => [n, i] as const).filter(([n]) => (entryById(n.id)?.title ?? "").toLowerCase().includes(t)).map(([, i]) => i));
  }, [q]);

  // ── pointer geometry ────────────────────────────────────────────────────
  // Screen → chart through the SVG's own matrix: exact however the element is
  // boxed, letterboxed, or zoomed, where a rect-proportional guess is not.
  const toChart = (ev: { clientX: number; clientY: number }) => {
    const svg = svgRef.current!;
    const pt = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: pt.x, y: pt.y };
  };
  const nearest = (cx: number, cy: number) => {
    const th = 11 * (view.w / W) + 1.5; let best = -1, bd = th * th;
    for (let i = 0; i < NODES.length; i++) {
      if (div && divOf.get(NODES[i].id) !== div) continue;
      const dx = NODES[i].x - cx, dy = NODES[i].y - cy, d2 = dx * dx + dy * dy;
      if (d2 < bd) { bd = d2; best = i; }
    }
    return best < 0 ? null : best;
  };
  const onMove = (ev: RPointerEvent<SVGSVGElement>) => {
    if (drag.current && ev.buttons) {
      const k = 1 / (svgRef.current!.getScreenCTM()!.a || 1);
      const nx = drag.current.vx - (ev.clientX - drag.current.x) * k, ny = drag.current.vy - (ev.clientY - drag.current.y) * k;
      if (Math.abs(ev.clientX - drag.current.x) + Math.abs(ev.clientY - drag.current.y) > 4) drag.current.moved = true;
      setView((v) => ({ ...v, x: nx, y: ny })); return;
    }
    const { x, y } = toChart(ev); setHov(nearest(x, y));
  };
  const onDown = (ev: RPointerEvent<SVGSVGElement>) => { drag.current = { x: ev.clientX, y: ev.clientY, vx: view.x, vy: view.y, moved: false }; };
  const onUp = () => {
    const was = drag.current; drag.current = null;
    if (was && !was.moved && hov !== null) {
      const e = entryById(NODES[hov].id);
      if (e) navigate({ to: "/phos/$division/$entry", params: { division: e.division.id, entry: e.slug } });
    }
  };
  const onWheel = (ev: RWheelEvent<SVGSVGElement>) => {
    const { x: cx, y: cy } = toChart(ev);
    const f = ev.deltaY > 0 ? 1.15 : 1 / 1.15;
    setView((v) => { const w = Math.min(W, Math.max(120, v.w * f)); return { w, x: cx - (cx - v.x) * (w / v.w), y: cy - (cy - v.y) * (w / v.w) }; });
  };

  const hovNode = hov === null ? null : NODES[hov];
  const hovEntry = hovNode ? entryById(hovNode.id) : null;
  const fs = (view.w / W); // scale for constant-on-screen text
  // the labels' places, with any two that would overlap pushed apart along the
  // vertical, since their capitals are wider than the clusters are spaced
  const placed = useMemo(() => {
    const size = 13 * fs + 1.5;
    const items = centroids.map((c) => {
      const t = DIVISIONS.find((x) => x.id === c.id)?.numeral || "PORTAL";
      return { ...c, x: c.x, y: c.y, w: t.length * size * 0.78 + Math.max(0, t.length - 1) * 2 * fs, h: size * 1.1 };
    });
    for (let pass = 0; pass < 4; pass++)
      for (let i = 0; i < items.length; i++)
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i], b = items[j];
          const ox = (a.w + b.w) / 2 - Math.abs(a.x - b.x), oy = (a.h + b.h) / 2 - Math.abs(a.y - b.y);
          if (ox <= 0 || oy <= 0) continue;
          const d = oy / 2 + 0.5;
          if (a.y <= b.y) { a.y -= d; b.y += d; } else { a.y += d; b.y -= d; }
        }
    return items;
  }, [centroids, fs]);

  return (
    <ToolFrame
      name="The Constellation"
      title={<>The whole encyclopaedia, <span className="italic text-gold">as a sky</span></>}
      lede="Every entry is a star and every citation between two entries is a line: six hundred and fifty-three stars, three thousand lines. A star's brightness is how many entries cite it, so what you are looking at is where the doctrine's weight actually sits. The divisions gather into constellations because most entries cite their neighbours; the long lines between constellations are where one division reaches into another. Hover a star to read it and see its lines. Click to enter. Scroll to draw closer."
      backdrop="star-trails-above-desert-wall"
      position="center 40%"
    >
      <ToolBand>
        <style>{`
          .aoh-star { transition: opacity .25s ease, r .25s ease; }
          .aoh-twinkle { animation: breathe 7s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .aoh-sky { cursor: grab; touch-action: none; }
          .aoh-sky:active { cursor: grabbing; }
          @media (prefers-reduced-motion: reduce) { .aoh-twinkle { animation: none } }
        `}</style>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>{NODES.length} stars · {EDGES.length} lines{div ? ` · ${DIVISIONS.find((x) => x.id === div)?.numeral || "Portal"} only` : ""}</Eyebrow>
          <div className="flex flex-wrap items-center gap-3">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="find a star by title…" aria-label="Find a star by title"
              className="w-56 border border-border bg-void px-3 py-1.5 font-label text-[11px] text-bone placeholder:text-muted-foreground focus:border-gold focus:outline-none" />
            {(view.w !== W || view.x !== 0 || view.y !== 0) && (
              <button onClick={() => setView({ x: 0, y: 0, w: W })} className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:border-gold/60">
                whole sky
              </button>
            )}
          </div>
        </div>

        {/* ── the sky ────────────────────────────────────────────────────── */}
        <div className="relative mt-8 overflow-hidden border border-border bg-void">
          <svg ref={svgRef} viewBox={`${view.x} ${view.y} ${view.w} ${view.w}`} className="aoh-sky mx-auto block h-auto w-full select-none"
               style={{ aspectRatio: "1 / 1", maxHeight: "82vh", maxWidth: "82vh" }} role="img" aria-label="The citation graph of the encyclopaedia drawn as a star chart"
               onPointerMove={onMove} onPointerDown={onDown} onPointerUp={onUp} onPointerLeave={() => { setHov(null); drag.current = null; }} onWheel={onWheel}>
            <defs>
              <radialGradient id="aoh-sky-g" cx="50%" cy="50%" r="60%"><stop offset="0" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.06" /><stop offset="1" stopColor="oklch(0.78 0.13 75)" stopOpacity="0" /></radialGradient>
            </defs>
            <rect x="0" y="0" width={W} height={W} fill="url(#aoh-sky-g)" />

            {/* every line, once */}
            <path d={allPath} fill="none" stroke="var(--gold)" strokeOpacity={hov === null ? 0.11 : 0.04} strokeWidth={0.55 * fs + 0.25} />
            {/* the hovered star's lines */}
            {hovPath && <path d={hovPath} fill="none" stroke="var(--gold)" strokeOpacity="0.85" strokeWidth={0.9 * fs + 0.35} />}

            {/* division names at their constellations' centres, nudged apart where
                two centres fall close enough for their capitals to overlap */}
            {placed.map((c) => {
              const dv = DIVISIONS.find((x) => x.id === c.id); if (!dv) return null;
              const on = div === c.id;
              return (
                <text key={c.id} x={c.x} y={c.y} textAnchor="middle" className="font-label" fontSize={13 * fs + 1.5} letterSpacing={2 * fs}
                      fill="var(--gold)" fillOpacity={on ? 0.95 : div ? 0.12 : 0.42} style={{ cursor: "pointer", paintOrder: "stroke" }} stroke="var(--void)" strokeWidth={3 * fs}
                      onClick={(e) => { e.stopPropagation(); setDiv(on ? null : c.id); }}>
                  {dv.numeral || "PORTAL"}
                </text>
              );
            })}

            {/* the stars */}
            {NODES.map((n, i) => {
              const inDiv = !div || divOf.get(n.id) === div;
              const isHov = i === hov, near = neighbours.has(i), hit = matches.has(i);
              const op = !inDiv ? 0.05 : isHov ? 1 : near ? 1 : hov !== null ? bright(n) * 0.35 : bright(n);
              return (
                <g key={n.id}>
                  {hit && <circle cx={n.x} cy={n.y} r={radius(n) + 4 * fs + 1.5} fill="none" stroke="var(--gold)" strokeWidth={0.8 * fs + 0.3} className="aoh-twinkle" />}
                  <circle data-id={n.id} cx={n.x} cy={n.y} r={isHov ? radius(n) * 1.9 : near ? radius(n) * 1.35 : radius(n)}
                          fill={isHov || near || hit ? "var(--gold)" : "var(--bone)"} fillOpacity={op}
                          className={`aoh-star ${n.in >= twinkleAt && !div && hov === null ? "aoh-twinkle" : ""}`}
                          style={n.in >= twinkleAt ? { animationDelay: `${(i % 9) * 0.8}s` } : undefined} />
                </g>
              );
            })}

            {/* the hovered star's name */}
            {hovNode && hovEntry && (
              <g pointerEvents="none">
                <text x={hovNode.x + 9 * fs + 3} y={hovNode.y - 3 * fs} className="font-serif" fontSize={13 * fs + 2} fill="var(--bone)" style={{ paintOrder: "stroke" }} stroke="var(--void)" strokeWidth={4 * fs + 1}>
                  {hovEntry.title}
                </text>
                <text x={hovNode.x + 9 * fs + 3} y={hovNode.y + 9 * fs + 3} className="font-label" fontSize={7.5 * fs + 1.2} letterSpacing={1 * fs} fill="var(--gold)" style={{ paintOrder: "stroke" }} stroke="var(--void)" strokeWidth={3 * fs + 1}>
                  {(hovEntry.division.numeral || "PORTAL").toUpperCase()} · {String(hovEntry.n).padStart(2, "0")} · CITED BY {hovNode.in}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* ── the divisions, as filters ──────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {DIVISIONS.map((dv) => {
            const on = div === dv.id;
            return (
              <button key={dv.id} onClick={() => setDiv(on ? null : dv.id)} aria-pressed={on} title={dv.title}
                className={`border px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.12em] transition-colors ${on ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
                {dv.numeral || "Portal"}
              </button>
            );
          })}
          {div && <button onClick={() => setDiv(null)} className="px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.12em] text-gold-dim hover:text-gold">clear</button>}
        </div>
      </ToolBand>

      {/* ── the brightest stars ───────────────────────────────────────────── */}
      <ToolBand>
        <Eyebrow>The brightest stars · the ten entries most cited by the rest</Eyebrow>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Brightness here is not importance assigned but weight accrued: an entry the rest of the encyclopaedia keeps returning to. That the discernment entries outshine the first principles is the encyclopaedia telling the truth about itself — the doctrine is a set of tests before it is a set of claims.
        </p>
        <div className="mt-8 grid gap-px lg:grid-cols-2">
          {mostCited.map((n, i) => {
            const e = entryById(n.id); if (!e) return null;
            return (
              <Link key={n.id} to="/phos/$division/$entry" params={{ division: e.division.id, entry: e.slug }}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-gold/40">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="block font-serif text-lg text-bone transition-colors group-hover:text-gold">{e.title}</span>
                  <span className="mt-0.5 block font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">{e.division.numeral || "Portal"} · {String(e.n).padStart(2, "0")}</span>
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-bone/60">cited by {n.in}</span>
              </Link>
            );
          })}
        </div>
      </ToolBand>
    </ToolFrame>
  );
}
