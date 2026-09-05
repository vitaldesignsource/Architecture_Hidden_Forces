import { useMemo, useState } from "react";
import { BEINGS, PLANES, shortKind, type Being, type Plane } from "@/lib/phos/beings";

/**
 * The field: every being in the register placed at once on the two axes that
 * matter — its tradition across, and the plane the volume assigns it down.
 *
 * The page says in prose that the comparison's whole value is seeing where a
 * population is dense and where it is thin. This is that sentence drawn. The
 * marks dim as the strata descend, which is the volume's own claim about light
 * and not a decorative gradient; a filter dims what it excludes rather than
 * removing it, so the shape of the whole stays legible while you narrow.
 *
 * The field is a way in, not the record. Everything it does — filtering by
 * plane or tradition, opening a being — the keyboard-reachable controls and
 * rows beneath it do too, which is why the marks are not each a tab stop.
 */

/** Two geometries. Wide: plane names in a left gutter, columns roomy enough to
 *  read a cluster's shape. Compact: the whole field inside a phone's width, the
 *  tradition names turned on their side and the plane names set into the top of
 *  each stratum — because a field that scrolls sideways loses its own axis
 *  labels the moment you move, which is worse than small type. */
const WIDE = { COL: 96, ROW: 62, GUTTER: 124, HEAD: 52, PER_ROW: 4, STEP: 13, R: 3.1, LABEL: 9, MARK_TOP: 0 };
const COMPACT = { COL: 34, ROW: 42, GUTTER: 4, HEAD: 72, PER_ROW: 4, STEP: 7.2, R: 2.1, LABEL: 6.4, MARK_TOP: 7 };

const OPACITY: Record<string, number> = { firm: 0.95, probable: 0.68, contested: 0.46 };

/** Beside the name: the transliteration where it says something the name does
 *  not, and otherwise the tradition's own word for the kind. */
function gloss(b: Being) {
  const tr = b.native?.tr;
  if (tr && tr.toLowerCase() !== b.name.toLowerCase()) return tr;
  return shortKind(b.kind);
}

export function RegisterField({
  traditions,
  visible,
  tradition,
  plane,
  compact = false,
  onPick,
  onPlane,
  onTradition,
}: {
  traditions: string[];
  visible: Set<string>;
  tradition: string | null;
  plane: Plane | null;
  compact?: boolean;
  onPick: (id: string) => void;
  onPlane: (p: Plane) => void;
  onTradition: (t: string) => void;
}) {
  const [hover, setHover] = useState<{ b: Being; x: number; y: number } | null>(null);
  const { COL, ROW, GUTTER, HEAD, PER_ROW, STEP, R, LABEL, MARK_TOP } = compact ? COMPACT : WIDE;

  // Only the planes the register actually populates, in the volume's own order.
  const planes = useMemo(() => PLANES.filter((p) => BEINGS.some((b) => b.plane === p)), []);

  const marks = useMemo(() => {
    const out: { b: Being; x: number; y: number }[] = [];
    planes.forEach((p, pi) => {
      traditions.forEach((t, ti) => {
        const cell = BEINGS.filter((b) => b.plane === p && b.tradition === t);
        const rows = Math.ceil(cell.length / PER_ROW);
        cell.forEach((b, i) => {
          const r = Math.floor(i / PER_ROW);
          const inRow = Math.min(PER_ROW, cell.length - r * PER_ROW);
          const c = i % PER_ROW;
          out.push({
            b,
            x: GUTTER + ti * COL + COL / 2 + (c - (inRow - 1) / 2) * STEP,
            y: HEAD + pi * ROW + MARK_TOP + (ROW - MARK_TOP) / 2 + (r - (rows - 1) / 2) * STEP,
          });
        });
      });
    });
    return out;
  }, [planes, traditions, COL, ROW, GUTTER, HEAD, PER_ROW, STEP, MARK_TOP]);

  const w = GUTTER + traditions.length * COL;
  const h = HEAD + planes.length * ROW + 8;

  return (
    <div className="mt-8">
      {/* The reading line. Fixed height and fixed place: a label that floats in
          the plot collides with the column heads, and this can be set in the
          page's own type rather than in SVG text. */}
      <div className="flex min-h-[3.25rem] flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-3">
        {hover ? (
          <>
            <p className="font-serif text-xl text-gold">
              {hover.b.name}
              {gloss(hover.b) && (
                <span className="ml-3 font-serif text-sm italic text-bone/55">{gloss(hover.b)}</span>
              )}
            </p>
            <p className="font-label text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              {hover.b.tradition} · {hover.b.plane} · {hover.b.confidence}
            </p>
          </>
        ) : (
          <p className="font-label text-[9px] uppercase tracking-[0.16em] text-bone/35">
            Ten traditions across · the volume's planes down · one mark for each being
          </p>
        )}
      </div>
      <div className={compact ? "" : "overflow-x-auto"}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        style={compact ? undefined : { minWidth: `${w / 16}rem` }}
        className="w-full"
        role="img"
        aria-label={`${BEINGS.length} beings placed by tradition and plane; the same filtering is available from the controls above and the rows below.`}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="rf-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold, #c9a227)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--gold, #c9a227)" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* the strata */}
        {planes.map((p, i) => {
          const dim = plane && plane !== p;
          return (
            <g key={p} opacity={dim ? 0.34 : 1}>
              {i % 2 === 1 && (
                <rect x={GUTTER} y={HEAD + i * ROW} width={w - GUTTER} height={ROW} fill="currentColor" opacity={0.022} />
              )}
              <line x1={GUTTER} y1={HEAD + i * ROW} x2={w} y2={HEAD + i * ROW} stroke="currentColor" opacity={0.14} strokeWidth={0.5} />
              <text
                x={compact ? GUTTER + 4 : GUTTER - 14}
                y={compact ? HEAD + i * ROW + 8 : HEAD + i * ROW + ROW / 2}
                textAnchor={compact ? "start" : "end"}
                dominantBaseline="central"
                className="cursor-pointer font-label uppercase"
                style={{ fontSize: LABEL, letterSpacing: "0.14em" }}
                fill="currentColor"
                fillOpacity={plane === p ? 1 : 0.55 - i * 0.03}
                onClick={() => onPlane(p)}
              >
                {p}
              </text>
              {!compact && (
                <rect
                  x={GUTTER - 8}
                  y={HEAD + i * ROW + ROW / 2 - 5}
                  width={3}
                  height={10}
                  fill="url(#rf-fade)"
                  opacity={1 - i * 0.09}
                />
              )}
            </g>
          );
        })}
        <line x1={GUTTER} y1={HEAD + planes.length * ROW} x2={w} y2={HEAD + planes.length * ROW} stroke="currentColor" opacity={0.14} strokeWidth={0.5} />

        {/* the columns */}
        {traditions.map((t, i) => (
          <g key={t} opacity={tradition && tradition !== t ? 0.34 : 1}>
            <text
              x={GUTTER + i * COL + COL / 2}
              y={HEAD - (compact ? 8 : 20)}
              textAnchor={compact ? "start" : "middle"}
              transform={compact ? `rotate(-90 ${GUTTER + i * COL + COL / 2} ${HEAD - 8})` : undefined}
              className="cursor-pointer font-label uppercase"
              style={{ fontSize: LABEL, letterSpacing: "0.12em" }}
              fill="currentColor"
              fillOpacity={tradition === t ? 1 : 0.55}
              onClick={() => onTradition(t)}
            >
              {t.split(" ")[0]}
            </text>
            {!compact && (
              <text
                x={GUTTER + i * COL + COL / 2}
                y={HEAD - 8}
                textAnchor="middle"
                className="font-label"
                style={{ fontSize: 8 }}
                fill="currentColor"
                fillOpacity={0.3}
              >
                {BEINGS.filter((b) => b.tradition === t).length}
              </text>
            )}
            {i > 0 && (
              <line x1={GUTTER + i * COL} y1={HEAD} x2={GUTTER + i * COL} y2={HEAD + planes.length * ROW} stroke="currentColor" opacity={0.07} strokeWidth={0.5} />
            )}
          </g>
        ))}

        {/* the population */}
        {marks.map((m) => {
          const on = visible.has(m.b.id);
          const lit = hover?.b.id === m.b.id;
          return (
            <circle
              key={m.b.id}
              cx={m.x}
              cy={m.y}
              r={lit ? R * 1.5 : R}
              fill="var(--gold, #c9a227)"
              opacity={on ? OPACITY[m.b.confidence] ?? 0.7 : 0.1}
              className="cursor-pointer transition-[r,opacity] duration-150"
              onMouseEnter={() => setHover(m)}
              onClick={() => onPick(m.b.id)}
            >
              <title>{`${m.b.name} — ${m.b.tradition}, ${m.b.plane}`}</title>
            </circle>
          );
        })}

        {/* what the cursor is on: a leader back to the stratum, the name is set above */}
        {hover && (
          <g pointerEvents="none">
            <line x1={GUTTER} y1={hover.y} x2={hover.x - 7} y2={hover.y} stroke="var(--gold, #c9a227)" opacity={0.3} strokeWidth={0.5} />
            <line x1={hover.x} y1={HEAD} x2={hover.x} y2={hover.y - 7} stroke="var(--gold, #c9a227)" opacity={0.16} strokeWidth={0.5} />
            <circle cx={hover.x} cy={hover.y} r={R * 2.6} fill="none" stroke="var(--gold, #c9a227)" opacity={0.45} strokeWidth={0.75} />
          </g>
        )}
      </svg>
      </div>
    </div>
  );
}
