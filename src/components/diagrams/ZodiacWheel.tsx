import { useState } from "react";
import { ZODIAC_PATHS } from "@/components/ZodiacGlyph";

/**
 * ZodiacWheel — the twelve in their circular order, with the geometry that
 * generates them drawn on the same figure.
 *
 * The grid beside it shows that four media by three phases closes at twelve.
 * The wheel shows what that closure looks like once the twelve are laid on a
 * circle: signs of one element fall 120° apart and make a triangle, signs of one
 * modality fall 90° apart and make a cross, and each sign faces its opposite
 * across the centre. The relations are not asserted; they are consequences of
 * the ordering, so the figure draws them rather than listing them.
 *
 * Orientation follows the chart convention — 0° of Aries at the left, the signs
 * running counter-clockwise — so the equinoctial axis is horizontal and the
 * solstitial axis vertical. They are named by geometry, not by season, because
 * the March equinox is spring in one hemisphere and autumn in the other.
 */

type El = "Fire" | "Earth" | "Air" | "Water";
type Mo = "Cardinal" | "Fixed" | "Mutable";

const SIGNS: { n: string; el: El; mo: Mo; ruler: string; m: string }[] = [
  { n: "Aries", el: "Fire", mo: "Cardinal", ruler: "Mars", m: "Ignition, emergence, direct projection." },
  { n: "Taurus", el: "Earth", mo: "Fixed", ruler: "Venus", m: "Consolidation, incorporation, material retention." },
  { n: "Gemini", el: "Air", mo: "Mutable", ruler: "Mercury", m: "Differentiation, duplication, exchange." },
  { n: "Cancer", el: "Water", mo: "Cardinal", ruler: "Moon", m: "Enclosure, nourishment, memory, protection." },
  { n: "Leo", el: "Fire", mo: "Fixed", ruler: "Sun", m: "Centralisation, radiance, creative declaration." },
  { n: "Virgo", el: "Earth", mo: "Mutable", ruler: "Mercury", m: "Discrimination, refinement, adjustment." },
  { n: "Libra", el: "Air", mo: "Cardinal", ruler: "Venus", m: "Equilibration, reciprocity, relational measurement." },
  { n: "Scorpio", el: "Water", mo: "Fixed", ruler: "Mars", m: "Concentration, binding, penetration, metamorphosis." },
  { n: "Sagittarius", el: "Fire", mo: "Mutable", ruler: "Jupiter", m: "Propagation, orientation, synthesis, the projection of meaning." },
  { n: "Capricorn", el: "Earth", mo: "Cardinal", ruler: "Saturn", m: "Structuration, limitation, hierarchy, durable achievement." },
  { n: "Aquarius", el: "Air", mo: "Fixed", ruler: "Saturn", m: "Systemisation, distribution, networked reconfiguration." },
  { n: "Pisces", el: "Water", mo: "Mutable", ruler: "Jupiter", m: "Permeation, dissolution, recombination, return." },
];

const INK: Record<El, string> = {
  Fire: "#d0673a",
  Earth: "#b59247",
  Air: "#8fb2d4",
  Water: "#6d9fa8",
};

const EL_NOTE: Record<El, string> = {
  Fire: "The medium of excitation and vector — force becoming direction.",
  Earth: "The medium of density and measure — force acquiring boundary and duration.",
  Air: "The medium of relation and proportion — force compared, connected, organised.",
  Water: "The medium of cohesion and memory — force received, retained, carried beneath boundaries.",
};

const MO_NOTE: Record<Mo, string> = {
  Cardinal: "Opens the operation: initiates, selects a direction, crosses a threshold.",
  Fixed: "Gathers and holds it: concentrates, sustains, preserves.",
  Mutable: "Distributes the result: adapts, translates, releases, prepares the next turn.",
};

const C = 300;
const R_TICK = 262; // outer degree ring
const R_BAND_OUT = 250; // sign band
const R_BAND_IN = 196;
const R_CHORD = 188; // where the aspect figures are drawn
const R_NAME = 274; // sign names, outside everything

/** ecliptic longitude → screen angle in radians (0° Aries at the left, counter-clockwise) */
const rad = (lon: number) => ((180 - lon) * Math.PI) / 180;
const pt = (lon: number, r: number): [number, number] => [C + r * Math.cos(rad(lon)), C + r * Math.sin(rad(lon))];

function sector(lon0: number, lon1: number, rOut: number, rIn: number) {
  const [x0, y0] = pt(lon0, rOut);
  const [x1, y1] = pt(lon1, rOut);
  const [x2, y2] = pt(lon1, rIn);
  const [x3, y3] = pt(lon0, rIn);
  // longitudes increase counter-clockwise on screen, so the outer arc sweeps 0
  return `M${x0} ${y0} A${rOut} ${rOut} 0 0 0 ${x1} ${y1} L${x2} ${y2} A${rIn} ${rIn} 0 0 1 ${x3} ${y3} Z`;
}

const poly = (lons: number[], r: number) =>
  lons.map((l) => pt(l, r).map((v) => v.toFixed(1)).join(",")).join(" ");

export function ZodiacWheel() {
  const [sel, setSel] = useState<number | null>(null);
  const [show, setShow] = useState<{ tri: boolean; sq: boolean; opp: boolean }>({
    tri: true,
    sq: false,
    opp: true,
  });

  const s = sel === null ? null : SIGNS[sel];
  const mid = (i: number) => i * 30 + 15;
  const sameEl = (e: El) => SIGNS.map((x, i) => ({ x, i })).filter((r) => r.x.el === e);
  const sameMo = (m: Mo) => SIGNS.map((x, i) => ({ x, i })).filter((r) => r.x.mo === m);
  const opposite = (i: number) => (i + 6) % 12;
  const polarity = (i: number) => (i % 2 === 0 ? "Active" : "Receptive");

  // when a sign is chosen the figure narrows to its own relations; otherwise the
  // toggles show every triangle and cross at once
  const triSets = s ? [sameEl(s.el)] : show.tri ? (["Fire", "Earth", "Air", "Water"] as El[]).map(sameEl) : [];
  const sqSets = s ? (show.sq ? [sameMo(s.mo)] : []) : show.sq ? (["Cardinal", "Fixed", "Mutable"] as Mo[]).map(sameMo) : [];
  const oppPairs = s ? [[sel!, opposite(sel!)]] : show.opp ? [0, 1, 2, 3, 4, 5].map((i) => [i, i + 6]) : [];

  const lit = (i: number) => sel === null || sel === i || SIGNS[i].el === s?.el || SIGNS[i].mo === s?.mo;

  const T = (k: keyof typeof show, label: string) => (
    <button
      key={k}
      onClick={() => setShow((v) => ({ ...v, [k]: !v[k] }))}
      aria-pressed={show[k]}
      className={`border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
        show[k] ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold-dim"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] lg:items-start">
      <div className="mx-auto w-full max-w-[600px]">
        <svg viewBox="-46 0 692 600" className="h-auto w-full select-none" role="img" aria-labelledby="aoh-zw-t">
          <title id="aoh-zw-t">
            A twelve-sector zodiacal wheel. Aries begins at the left and the signs run
            counter-clockwise, so the equinoctial axis is horizontal and the solstitial axis
            vertical. Signs of one element stand 120 degrees apart and are joined into a triangle;
            signs of one modality stand 90 degrees apart and are joined into a cross; each sign
            faces its opposite across the centre.
          </title>

          {/* slow ornament — three arcs of unequal length, turning outside the wheel */}
          <g className="animate-slow-spin" aria-hidden="true" style={{ transformOrigin: "300px 300px" }}>
            {[[6, 46], [122, 18], [214, 70], [318, 12]].map(([a, len]) => {
              const [x0, y0] = pt(a, 282);
              const [x1, y1] = pt(a + len, 282);
              return (
                <path
                  key={a}
                  d={`M${x0} ${y0} A282 282 0 0 0 ${x1} ${y1}`}
                  fill="none"
                  stroke="var(--gold)"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
              );
            })}
          </g>

          {/* degree ring: a tick every five degrees, a longer one every ten */}
          <g aria-hidden="true">
            <circle cx={C} cy={C} r={R_TICK} fill="none" stroke="var(--border)" strokeWidth="0.8" />
            {Array.from({ length: 72 }, (_, i) => i * 5).map((a) => {
              const long = a % 10 === 0;
              const [x0, y0] = pt(a, R_TICK);
              const [x1, y1] = pt(a, R_TICK - (long ? 8 : 4.5));
              return (
                <line
                  key={a}
                  x1={x0}
                  y1={y0}
                  x2={x1}
                  y2={y1}
                  stroke="var(--gold)"
                  strokeOpacity={long ? 0.42 : 0.2}
                  strokeWidth={long ? 0.9 : 0.7}
                />
              );
            })}
          </g>

          {/* the twelve sectors */}
          {SIGNS.map((sg, i) => {
            const on = sel === i;
            const [gx, gy] = pt(mid(i), (R_BAND_OUT + R_BAND_IN) / 2 + 2);
            const [nx, ny] = pt(mid(i), R_NAME);
            return (
              <g
                key={sg.n}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${sg.n}, ${sg.el} ${sg.mo}, ruled by ${sg.ruler}`}
                className="cursor-pointer outline-none [&:focus-visible_.zw-sector]:stroke-gold"
                onClick={() => setSel(on ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSel(on ? null : i);
                  }
                  if (e.key === "ArrowRight" || e.key === "ArrowUp") setSel((i + 1) % 12);
                  if (e.key === "ArrowLeft" || e.key === "ArrowDown") setSel((i + 11) % 12);
                }}
                style={{ opacity: lit(i) ? 1 : 0.28, transition: "opacity 260ms ease" }}
              >
                <path
                  className="zw-sector"
                  d={sector(i * 30, (i + 1) * 30, R_BAND_OUT, R_BAND_IN)}
                  fill={INK[sg.el]}
                  fillOpacity={on ? 0.26 : 0.09}
                  stroke={on ? "var(--gold)" : "var(--border)"}
                  strokeWidth={on ? 1.2 : 0.7}
                />
                <g
                  transform={`translate(${gx} ${gy}) scale(1.16) translate(-12 -12)`}
                  fill="none"
                  stroke={on ? "var(--gold)" : INK[sg.el]}
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={ZODIAC_PATHS[sg.n]} />
                </g>
                <text
                  x={nx}
                  y={ny + 3}
                  textAnchor="middle"
                  className="font-mono zw-name"
                  fontSize="9"
                  letterSpacing="1.4"
                  fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                >
                  {sg.n.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* the chord circle the aspect figures are inscribed in */}
          <circle cx={C} cy={C} r={R_CHORD} fill="none" stroke="var(--border)" strokeWidth="0.7" />

          {/* triplicities — one triangle per element */}
          {triSets.map((set) => (
            <polygon
              key={`t-${set[0].x.el}`}
              points={poly(set.map((r) => mid(r.i)), R_CHORD)}
              fill={INK[set[0].x.el]}
              fillOpacity={s ? 0.07 : 0.045}
              stroke={INK[set[0].x.el]}
              strokeOpacity={s ? 0.85 : 0.5}
              strokeWidth={s ? 1.4 : 1}
            />
          ))}

          {/* quadruplicities — one cross per modality */}
          {sqSets.map((set) => (
            <polygon
              key={`q-${set[0].x.mo}`}
              points={poly(set.map((r) => mid(r.i)), R_CHORD)}
              fill="none"
              stroke="var(--gold)"
              strokeOpacity={s ? 0.7 : 0.36}
              strokeWidth="1"
              strokeDasharray="5 5"
            />
          ))}

          {/* oppositions */}
          {oppPairs.map(([a, b]) => {
            const [x0, y0] = pt(mid(a), R_CHORD);
            const [x1, y1] = pt(mid(b), R_CHORD);
            return (
              <line
                key={`o-${a}`}
                x1={x0}
                y1={y0}
                x2={x1}
                y2={y1}
                stroke="var(--bone)"
                strokeOpacity={s ? 0.5 : 0.22}
                strokeWidth="0.9"
                strokeDasharray="2 6"
              />
            );
          })}

          {/* equinoctial and solstitial geometry, named by geometry rather than season */}
          <g aria-hidden="true">
            {[[0, "EQUINOX"], [90, "SOLSTICE"], [180, "EQUINOX"], [270, "SOLSTICE"]].map(([a, lbl]) => {
              const A = a as number;
              const [x0, y0] = pt(A, R_BAND_OUT);
              const [x1, y1] = pt(A, R_TICK + 12);
              const [tx, ty] = pt(A, R_TICK + 24);
              return (
                <g key={A}>
                  <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--gold)" strokeOpacity="0.55" strokeWidth="1" />
                  <text
                    x={tx}
                    y={ty + 3}
                    textAnchor="middle"
                    className="font-mono zw-mark"
                    fontSize="7.4"
                    letterSpacing="1.6"
                    fill="var(--gold-dim)"
                  >
                    {lbl as string}
                  </text>
                </g>
              );
            })}
          </g>

          {/* the centre is kept clear of the crossing chords so the count can be read */}
          <circle cx={C} cy={C} r={108} fill="var(--background)" fillOpacity="0.88" aria-hidden="true" />
          <circle cx={C} cy={C} r={108} fill="none" stroke="var(--border)" strokeWidth="0.7" aria-hidden="true" />

          {/* centre */}
          {s ? (
            <g>
              <g
                transform={`translate(${C} ${C - 26}) scale(3.1) translate(-12 -12)`}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ZODIAC_PATHS[s.n]} />
              </g>
              <text x={C} y={C + 44} textAnchor="middle" className="font-serif zw-count" fontSize="21" fill="var(--gold)">
                {s.n}
              </text>
              <text
                x={C}
                y={C + 64}
                textAnchor="middle"
                className="font-mono zw-sub"
                fontSize="8.4"
                letterSpacing="1.6"
                fill="var(--muted-foreground)"
              >
                {`${sel! * 30}° – ${sel! * 30 + 30}°`}
              </text>
            </g>
          ) : (
            <g>
              <text
                x={C}
                y={C - 6}
                textAnchor="middle"
                className="font-mono zw-eyebrow"
                fontSize="8.6"
                letterSpacing="2.4"
                fill="var(--gold-dim)"
              >
                FOUR MEDIA × THREE PHASES
              </text>
              <text x={C} y={C + 24} textAnchor="middle" className="font-serif zw-count" fontSize="24" fill="var(--gold)">
                Twelve
              </text>
              <text
                x={C}
                y={C + 46}
                textAnchor="middle"
                className="font-mono zw-sub"
                fontSize="8"
                letterSpacing="1.5"
                fill="var(--muted-foreground)"
              >
                AND NO REMAINDER
              </text>
            </g>
          )}
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {T("tri", "Triplicities")}
          {T("sq", "Quadruplicities")}
          {T("opp", "Oppositions")}
          {sel !== null && (
            <button
              onClick={() => setSel(null)}
              className="border border-border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold-dim"
            >
              Clear
            </button>
          )}
        </div>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
          0° Aries at the left · counter-clockwise · equinoctial axis horizontal
        </p>
      </div>

      <div className="min-h-[20rem] lg:border-l lg:border-border lg:pl-8">
        {s ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {s.el} × {s.mo} · {polarity(sel!)}
            </p>
            <p className="mt-3 font-serif text-3xl text-gold">{s.n}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.m}</p>

            <dl className="mt-8 space-y-px">
              {[
                ["Medium", `${s.el} — ${EL_NOTE[s.el]}`],
                ["Phase", `${s.mo} — ${MO_NOTE[s.mo]}`],
                ["Triangle", sameEl(s.el).map((r) => r.x.n).join(" · ") + " — 120° apart"],
                ["Cross", sameMo(s.mo).map((r) => r.x.n).join(" · ") + " — 90° apart"],
                ["Opposite", `${SIGNS[opposite(sel!)].n} — the same axis read from the other end`],
                ["Classical ruler", `${s.ruler} — the older scheme, before the outer planets were assigned`],
              ].map(([a, b]) => (
                <div key={a} className="grid gap-1 border-b border-border py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              A sign is not itself a force. It is an operator applied to force — the manner in which
              force accepts form. Nothing on this wheel is elevated or base; the triangle a sign
              stands in says what medium it works through, and the cross says at what phase.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The circle is what the grid looks like once the twelve are set in order. Signs sharing
              a medium fall a third of the circle apart and close into a triangle. Signs sharing a
              phase fall a quarter apart and close into a cross. Neither figure was imposed: both
              follow from four and three running against each other around one ring.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/70">
              Because four and three have no common factor, no sign repeats a pairing and none is
              left over — the same reason the sequence takes twelve steps to return, and not six or
              twenty-four.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a sign to see its triangle, its cross, and the sign facing it across the centre.
              The alternation around the ring — active, receptive, active — is the polarity older
              sources call diurnal and nocturnal; it is a rhythm of the sequence, not a ranking.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-muted-foreground">
              Tropical frame · equinoctial and solstitial points marked by geometry, not by season
            </p>
          </>
        )}
      </div>
    </div>
  );
}
