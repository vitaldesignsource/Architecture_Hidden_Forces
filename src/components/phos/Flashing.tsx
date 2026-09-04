import { useEffect, useMemo, useRef, useState } from "react";
import {
  ELEMENTS,
  SEPHIROTH,
  WORLDS,
  ZODIAC,
  contrastRatio,
  flashOf,
  flashStrength,
  wheelHex,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
  wheelAngleOf,
} from "@/lib/phos/colour";

/**
 * The demonstrations for the Flashing Colours instrument.
 *
 * Everything here is drawn rather than described, because the subject cannot be
 * described: whether two colours flash is settled in the reader's eye and
 * nowhere else. The figures are therefore built so the reader can put a colour
 * beside its opposite, beside a near miss, and beside a neighbour, and watch
 * the difference — which is also the only honest way to present a doctrine
 * whose evidence is perceptual.
 */

const swatchTitle = (name: string, hex: string) => `${name} — ${hex}`;

// ── the wheel ──────────────────────────────────────────────────────────────

/**
 * The painter's wheel in twelve steps, which is what the King scale of the
 * signs is. Selecting a sign draws the axis across to its opposite: the pair
 * that flashes.
 */
export function FlashWheel() {
  const [sel, setSel] = useState<number | null>(0);
  const C = 200, R_OUT = 176, R_IN = 108;
  const pt = (a: number, r: number): [number, number] => [
    C + r * Math.cos(((a - 90) * Math.PI) / 180),
    C + r * Math.sin(((a - 90) * Math.PI) / 180),
  ];
  const seg = (a0: number, a1: number, rOut: number, rIn: number) => {
    const [x0, y0] = pt(a0, rOut), [x1, y1] = pt(a1, rOut);
    const [x2, y2] = pt(a1, rIn), [x3, y3] = pt(a0, rIn);
    return `M${x0} ${y0} A${rOut} ${rOut} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${rIn} ${rIn} 0 0 0 ${x3} ${y3} Z`;
  };
  const s = sel === null ? null : ZODIAC[sel];
  const opp = sel === null ? null : ZODIAC[(sel + 6) % 12];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[400px]">
        <svg viewBox="0 0 400 400" className="h-auto w-full" role="img" aria-labelledby="aoh-fw-t">
          <title id="aoh-fw-t">
            A twelve-part painter's wheel carrying the King scale of the signs, from scarlet at
            Aries round to crimson at Pisces. Selecting one draws a line across the centre to the
            colour that flashes against it.
          </title>
          {/* the continuous wheel beneath, in one-degree steps */}
          <g>
            {Array.from({ length: 180 }, (_, i) => i * 2).map((a) => (
              <path key={a} d={seg(a - 0.6, a + 2.6, R_OUT - 10, R_IN + 10)} fill={wheelHex(a)} />
            ))}
          </g>
          {/* the twelve steps of the scale itself */}
          {ZODIAC.map((z, i) => {
            const on = sel === i;
            const isOpp = sel !== null && (sel + 6) % 12 === i;
            const [lx, ly] = pt(z.angle + 15, (R_OUT + R_IN) / 2);
            return (
              <g key={z.sign} className="cursor-pointer" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-label={`${z.sign}, ${z.name}`}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <path
                  d={seg(z.angle + 1, z.angle + 29, R_OUT, R_IN)}
                  fill={z.hex}
                  stroke={on || isOpp ? "var(--bone)" : "var(--background)"}
                  strokeWidth={on ? 2.4 : isOpp ? 1.6 : 1}
                  opacity={sel === null || on || isOpp ? 1 : 0.55}
                />
                <text x={lx} y={ly + 3} textAnchor="middle" className="pointer-events-none font-mono"
                      fontSize="8.5" letterSpacing="0.8"
                      fill={["Cancer", "Leo", "Virgo", "Aries", "Taurus", "Gemini"].includes(z.sign) ? "#1a1408" : "#f4f2ea"}>
                  {z.sign.slice(0, 3).toUpperCase()}
                </text>
              </g>
            );
          })}
          {/* the axis of the pair */}
          {sel !== null && (
            <g>
              <line
                x1={pt(ZODIAC[sel].angle + 15, R_IN - 4)[0]} y1={pt(ZODIAC[sel].angle + 15, R_IN - 4)[1]}
                x2={pt(ZODIAC[sel].angle + 195, R_IN - 4)[0]} y2={pt(ZODIAC[sel].angle + 195, R_IN - 4)[1]}
                stroke="var(--bone)" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="4 5"
              />
              <circle cx={C} cy={C} r={70} fill={ZODIAC[sel].hex} />
              <path d={`M${C - 70} ${C} A70 70 0 0 1 ${C + 70} ${C} Z`} fill={ZODIAC[(sel + 6) % 12].hex} />
              <circle cx={C} cy={C} r={70} fill="none" stroke="var(--background)" strokeWidth="1.5" />
            </g>
          )}
        </svg>
      </div>

      <div>
        {s && opp ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              The pair · {s.angle}° and {(s.angle + 180) % 360}°
            </p>
            <p className="mt-3 font-serif text-3xl text-bone">
              {s.sign} <span className="text-muted-foreground">·</span> {s.name}
            </p>
            <p className="mt-2 font-serif text-xl italic text-bone/75">
              flashes against {opp.sign}, {opp.name}
            </p>
            <div className="mt-6 flex h-24 w-full overflow-hidden border border-border">
              <div className="flex-1" style={{ background: s.hex }} title={swatchTitle(s.name, s.hex)} />
              <div className="flex-1" style={{ background: opp.hex }} title={swatchTitle(opp.name, opp.hex)} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Look at the seam rather than at either field. The edge will not settle: the eye is
              trying to hold two hues at once whose signals travel the same opponent channel, and
              the boundary appears to move. That instability is what the Order meant by a flash.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-bone/45">
              {s.hex} · {opp.hex} — contrast in light {contrastRatio(s.hex, opp.hex).toFixed(2)} : 1
            </p>
          </>
        ) : (
          <p className="text-base leading-relaxed text-muted-foreground">
            The King scale of the twelve signs is the spectrum divided by twelve, beginning at
            scarlet in Aries. Select a sign to draw the axis across the wheel to the colour that
            flashes against it — which is also the sign opposite it in the zodiac.
          </p>
        )}
      </div>
    </div>
  );
}

// ── the pair, at size ──────────────────────────────────────────────────────

type Mode = "flash" | "near" | "neighbour" | "same";

const SOURCES: { k: string; rows: { name: string; hex: string }[] }[] = [
  { k: "The twelve signs, King scale", rows: ZODIAC.map((z) => ({ name: `${z.sign} · ${z.name}`, hex: z.hex })) },
  { k: "The elements", rows: ELEMENTS.map((e) => ({ name: `${e.k} · ${e.name}`, hex: e.hex })) },
  { k: "The sephiroth, Queen scale", rows: SEPHIROTH.map((s) => ({ name: `${s.name} · ${s.scales[1].name}`, hex: s.scales[1].hex })) },
];

/** Shift a colour round the wheel by a given angle, keeping its light. */
function turned(hex: string, by: number): string {
  const a = wheelAngleOf(hex);
  const [, s, l] = rgbToHsl(hexToRgb(hex));
  if (Number.isNaN(a)) return hex;
  const [h2] = rgbToHsl(hexToRgb(wheelHex(a + by)));
  return rgbToHex(hslToRgb([h2, s, l]));
}

/**
 * A figure on a field, in a pair the reader chooses: the true flash, a near
 * miss, a neighbour, or the same hue. The point of the controls is that the
 * doctrine is falsifiable by looking — only one of the four shimmers.
 */
export function FlashPair() {
  const [srcIdx, setSrcIdx] = useState(0);
  const [rowIdx, setRowIdx] = useState(0);
  const [mode, setMode] = useState<Mode>("flash");
  const [shape, setShape] = useState<"hexagram" | "cross" | "circle">("hexagram");
  const ground = SOURCES[srcIdx].rows[Math.min(rowIdx, SOURCES[srcIdx].rows.length - 1)];
  const figure = useMemo(() => {
    if (mode === "flash") return flashOf(ground.hex);
    if (mode === "near") return turned(flashOf(ground.hex), 40);
    if (mode === "neighbour") return turned(ground.hex, 30);
    return turned(ground.hex, 0);
  }, [ground.hex, mode]);
  const strength = flashStrength(ground.hex, figure);

  const MODES: { k: Mode; label: string; note: string }[] = [
    { k: "flash", label: "The flash", note: "the wheel's opposite — the pair the Order painted" },
    { k: "near", label: "A near miss", note: "forty degrees off the opposite: almost, and inert" },
    { k: "neighbour", label: "A neighbour", note: "one step round the wheel: the edge goes quiet" },
    { k: "same", label: "The same hue", note: "no pair at all — the figure sinks into the field" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-border" style={{ background: ground.hex }}>
          <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
            {shape === "hexagram" && (
              <g fill="none" stroke={figure} strokeWidth="9" strokeLinejoin="round">
                <polygon points="200,58 288,208 112,208" />
                <polygon points="200,242 112,92 288,92" />
              </g>
            )}
            {shape === "cross" && (
              <g fill={figure}>
                <rect x="176" y="52" width="48" height="196" />
                <rect x="112" y="116" width="176" height="48" />
              </g>
            )}
            {shape === "circle" && (
              <g fill="none" stroke={figure} strokeWidth="14">
                <circle cx="200" cy="150" r="82" />
                <circle cx="200" cy="150" r="34" />
              </g>
            )}
          </svg>
        </div>
        {/* the seam, magnified: the same two colours meeting on a long edge */}
        <div className="mt-3 flex h-12 w-full overflow-hidden border border-border">
          <div className="flex-1" style={{ background: ground.hex }} />
          <div className="flex-1" style={{ background: figure }} />
          <div className="flex-1" style={{ background: ground.hex }} />
          <div className="flex-1" style={{ background: figure }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["hexagram", "cross", "circle"] as const).map((k) => (
            <button key={k} onClick={() => setShape(k)} aria-pressed={shape === k}
              className={`border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
                shape === k ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
              {k}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">The field</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SOURCES.map((s, i) => (
            <button key={s.k} onClick={() => { setSrcIdx(i); setRowIdx(0); }} aria-pressed={srcIdx === i}
              className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
                srcIdx === i ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
              {s.k.split(",")[0]}
            </button>
          ))}
        </div>
        <div className="mt-3 max-h-44 overflow-y-auto border border-border">
          {SOURCES[srcIdx].rows.map((r, i) => (
            <button key={r.name} onClick={() => setRowIdx(i)}
              className={`flex w-full items-center gap-3 border-b border-border px-3 py-2 text-left transition-colors last:border-b-0 ${
                rowIdx === i ? "bg-gold/10" : "hover:bg-bone/5"}`}>
              <span className="h-4 w-4 shrink-0 border border-bone/20" style={{ background: r.hex }} />
              <span className={`text-xs ${rowIdx === i ? "text-gold" : "text-muted-foreground"}`}>{r.name}</span>
            </button>
          ))}
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">The figure</p>
        <div className="mt-3 space-y-px">
          {MODES.map((m) => (
            <button key={m.k} onClick={() => setMode(m.k)} aria-pressed={mode === m.k}
              className={`block w-full border-b border-border py-2.5 text-left transition-colors ${
                mode === m.k ? "" : "opacity-70 hover:opacity-100"}`}>
              <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${mode === m.k ? "text-gold" : "text-bone/70"}`}>
                {m.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{m.note}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/50">
            Flash strength
          </p>
          <div className="mt-2 h-1.5 w-full bg-bone/10">
            <div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${Math.round(strength * 100)}%` }} />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {Math.round(strength * 100)} · hue opposition × saturation × nearness in light
          </p>
        </div>
      </div>
    </div>
  );
}

// ── the afterimage ─────────────────────────────────────────────────────────

/**
 * The demonstration the Order's own explanation rests on: stare, then look at
 * neutral ground, and the complement appears where nothing is. Twenty seconds
 * is enough to fatigue the opponent channel; the fixation mark matters, because
 * a wandering eye spreads the adaptation and the image never forms.
 */
export function Afterimage() {
  const [phase, setPhase] = useState<"idle" | "stare" | "after">("idle");
  const [left, setLeft] = useState(20);
  const [hex, setHex] = useState(ZODIAC[0].hex);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== "stare") return;
    setLeft(20);
    timer.current = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          window.clearInterval(timer.current!);
          setPhase("after");
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [phase]);

  const partner = flashOf(hex);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
      <div>
        <div
          className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden border border-border transition-colors duration-300"
          style={{ background: phase === "after" ? "#7e7e7e" : phase === "stare" ? hex : "#141414" }}
        >
          {phase === "stare" && (
            <>
              <svg viewBox="0 0 40 40" className="h-8 w-8 opacity-80">
                <path d="M20 8v24M8 20h24" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="absolute bottom-4 font-mono text-[11px] uppercase tracking-[0.2em] text-black/60">
                hold the cross · {left}
              </p>
            </>
          )}
          {phase === "after" && (
            <>
              <svg viewBox="0 0 40 40" className="h-8 w-8 opacity-50">
                <path d="M20 8v24M8 20h24" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="absolute bottom-4 font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                keep looking — the colour is yours, not the screen&rsquo;s
              </p>
            </>
          )}
          {phase === "idle" && (
            <button
              onClick={() => setPhase("stare")}
              className="border border-gold px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10"
            >
              Begin · twenty seconds
            </button>
          )}
        </div>
        {phase === "after" && (
          <button
            onClick={() => setPhase("idle")}
            className="mt-3 border border-border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold-dim"
          >
            Again
          </button>
        )}
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">Stare at</p>
        <div className="mt-3 grid grid-cols-6 gap-px">
          {ZODIAC.map((z) => (
            <button
              key={z.sign}
              onClick={() => { setHex(z.hex); setPhase("idle"); }}
              aria-label={`${z.sign}, ${z.name}`}
              className={`aspect-square border transition-transform ${hex === z.hex ? "border-gold" : "border-transparent hover:scale-110"}`}
              style={{ background: z.hex }}
            />
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          What appears on the grey is not on the grey. The cones and the opponent channels that
          carry the colour adapt while you hold the field, and when the field goes the channel
          rebounds past neutral into its opposite. The Order took this as evidence that the
          complement was latent in the colour all along; the physiology says the complement is
          latent in the eye.
        </p>
        <div className="mt-6 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/50">
            What the eye should supply
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-9 w-9 border border-bone/20" style={{ background: hex }} />
            <span className="font-mono text-[10px] text-muted-foreground">→</span>
            <span className="h-9 w-9 border border-bone/20" style={{ background: partner }} />
            <span className="text-xs text-muted-foreground">approximately</span>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-bone/50">
          If staring at saturated colour is uncomfortable — for anyone prone to visual migraine, or
          simply tired — read the paragraph and skip the field. Nothing later depends on it.
        </p>
      </div>
    </div>
  );
}

// ── simultaneous contrast ──────────────────────────────────────────────────

/** The same grey, on two grounds. The tradition's second effect, and Chevreul's. */
export function Contrast() {
  const [joined, setJoined] = useState(false);
  const GREY = "#8a8a8a";
  const a = ZODIAC[0].hex, b = ZODIAC[6].hex;
  return (
    <div>
      <div className="grid grid-cols-2 gap-px">
        <div className="flex aspect-[3/2] items-center justify-center transition-colors duration-500"
             style={{ background: joined ? "#2a2a2a" : a }}>
          <div className="h-1/3 w-1/3" style={{ background: GREY }} />
        </div>
        <div className="flex aspect-[3/2] items-center justify-center transition-colors duration-500"
             style={{ background: joined ? "#2a2a2a" : b }}>
          <div className="h-1/3 w-1/3" style={{ background: GREY }} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setJoined((v) => !v)}
          className="border border-gold px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
        >
          {joined ? "Put the grounds back" : "Take the grounds away"}
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Both squares are {GREY}, in every state
        </p>
      </div>
    </div>
  );
}

// ── the four scales ────────────────────────────────────────────────────────

/** The ten sephiroth in the four worlds, with the flash of any cell on demand. */
export function ScaleTable() {
  const [cell, setCell] = useState<{ s: number; w: number } | null>(null);
  const sel = cell ? SEPHIROTH[cell.s] : null;
  const selName = sel ? sel.scales[cell!.w] : null;
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-start">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse">
          <thead>
            <tr>
              <th className="border-b border-border py-3 pr-3 text-left font-mono text-[9.5px] uppercase tracking-[0.14em] text-gold-dim">
                Sephirah
              </th>
              {WORLDS.map((w) => (
                <th key={w.k} className="border-b border-border px-2 py-3 text-left font-mono text-[9.5px] uppercase tracking-[0.14em] text-gold-dim">
                  {w.k}
                  <span className="mt-0.5 block text-[8.5px] tracking-[0.1em] text-bone/40">{w.world}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEPHIROTH.map((s, si) => (
              <tr key={s.name}>
                <td className="border-b border-border py-2.5 pr-3 align-middle">
                  <span className="font-serif text-base text-bone/85">{s.name}</span>
                  <span className="ml-2 font-mono text-[9px] text-bone/35">{s.n}</span>
                </td>
                {s.scales.map((c, wi) => {
                  const on = cell?.s === si && cell?.w === wi;
                  return (
                    <td key={wi} className="border-b border-border px-2 py-2.5">
                      <button
                        onClick={() => setCell(on ? null : { s: si, w: wi })}
                        aria-label={`${s.name}, ${WORLDS[wi].k} scale: ${c.name}`}
                        className={`block h-9 w-full border transition-transform ${on ? "border-gold" : "border-bone/15 hover:scale-[1.04]"}`}
                        style={
                          s.quarters && wi >= 1 && wi <= 2
                            ? { background: `conic-gradient(from 45deg, ${s.quarters[0]} 0 25%, ${s.quarters[1]} 0 50%, ${s.quarters[2]} 0 75%, ${s.quarters[3]} 0)` }
                            : { background: c.hex }
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:border-l lg:border-border lg:pl-6">
        {sel && selName ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {sel.name} · {WORLDS[cell!.w].k} scale
            </p>
            <p className="mt-3 font-serif text-2xl text-bone">{selName.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {WORLDS[cell!.w].world} — {WORLDS[cell!.w].gloss}. The letter of the Name is{" "}
              <span className="text-bone/85">{WORLDS[cell!.w].letter}</span>.
            </p>
            <div className="mt-5 flex h-16 overflow-hidden border border-border">
              <div className="flex-1" style={{ background: selName.hex }} />
              <div className="flex-1" style={{ background: flashOf(selName.hex) }} />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {selName.hex} and its flash {flashOf(selName.hex)}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Each sephirah is given four colours, one for each world: the impulse, the light
              received, the form it takes, and the embodied, flecked colour of the world of action.
              A talisman was painted in the scale of the world it was meant to work in, and
              lettered in the flash of that colour.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Select a cell for its name, its world, and the colour that flashes against it. Malkuth
              is drawn quartered, because in two of the scales it is not one colour but four.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── the tablet ─────────────────────────────────────────────────────────────

const SIGILS = ["M24 12v24M12 24h24", "M24 12l12 24H12Z", "M12 12h24v24H12Z", "M24 11a13 13 0 1 0 .1 0Z", "M12 24h24M24 12v24M15 15l18 18M33 15L15 33"];

/**
 * How a tablet was coloured: the square in the colour of its element, the sign
 * on it in the colour that flashes against that. Hovering names the pair.
 */
export function FlashingTablet() {
  const [hot, setHot] = useState<number | null>(null);
  const cells = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const el = ELEMENTS[(i * 3 + Math.floor(i / 4)) % 4];
        return { el, sigil: SIGILS[(i * 5 + Math.floor(i / 3)) % SIGILS.length] };
      }),
    [],
  );
  return (
    <div>
      <div className="grid grid-cols-4 gap-px sm:grid-cols-6 lg:grid-cols-8">
        {cells.map((c, i) => {
          const flash = flashOf(c.el.hex);
          return (
            <button
              key={i}
              onMouseEnter={() => setHot(i)}
              onFocus={() => setHot(i)}
              onMouseLeave={() => setHot(null)}
              onBlur={() => setHot(null)}
              aria-label={`${c.el.k} square, ${c.el.name}, lettered in ${flash}`}
              className="relative aspect-square outline-none transition-transform hover:z-10 hover:scale-105 focus-visible:z-10 focus-visible:scale-105"
              style={{ background: c.el.hex }}
            >
              <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full p-[18%]">
                <path d={c.sigil} fill="none" stroke={flash} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {hot === null
          ? "Each square carries its element's colour; each letter, the colour that flashes against it"
          : `${cells[hot].el.k} — ${cells[hot].el.name} ${cells[hot].el.hex}, lettered ${flashOf(cells[hot].el.hex)}`}
      </p>
    </div>
  );
}
