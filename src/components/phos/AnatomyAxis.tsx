import { STATIONS } from "@/lib/phos/tools";

/**
 * AnatomyAxis — the six stations of the luminous anatomy on one vertical line,
 * spirit at the top and the material environment at the foot, the station the
 * reader stands at lit. It is an axis and not a ladder because the doctrine
 * insists on it: every station is real, and the walk downward is mediation,
 * not decline.
 */
export function AnatomyAxis({ current, onSelect }: { current: string; onSelect: (key: string) => void }) {
  const X = 34, Y0 = 34, STEP = 54;
  const yOf = (i: number) => Y0 + i * STEP;
  const last = yOf(STATIONS.length - 1);
  return (
    <svg viewBox={`0 0 340 ${last + 40}`} className="h-auto w-full max-w-[360px]" role="img" aria-labelledby="aoh-ax-t">
      <title id="aoh-ax-t">Six stations on one vertical axis, from spirit at the top to the material environment at the foot.</title>
      <line x1={X} y1={Y0} x2={X} y2={last} stroke="var(--gold)" strokeOpacity="0.35" />
      <line x1={X} y1={Y0 - 22} x2={X} y2={Y0} stroke="var(--gold)" strokeOpacity="0.35" strokeDasharray="2 4" />
      <line x1={X} y1={last} x2={X} y2={last + 22} stroke="var(--gold)" strokeOpacity="0.35" strokeDasharray="2 4" />
      {STATIONS.map((s, i) => {
        const on = s.key === current;
        const y = yOf(i);
        return (
          <g key={s.key} transform={`translate(0 ${y})`} onClick={() => onSelect(s.key)} style={{ cursor: "pointer" }}>
            <title>{`${s.name} — ${s.line}`}</title>
            <rect x="0" y="-24" width="340" height="48" fill="transparent" />
            {on && <circle cx={X} r="17" fill="var(--gold)" fillOpacity="0.18" />}
            <circle cx={X} r={on ? 8 : 5} fill={on ? "var(--gold)" : "var(--void)"} stroke="var(--gold)" strokeWidth="1.2" strokeOpacity={on ? 1 : 0.7} />
            <text x={X + 26} y="-2" fontSize="14" fontFamily="var(--font-serif)" fill={on ? "var(--gold)" : "var(--bone)"} fontStyle={on ? "italic" : "normal"}>
              {s.name}
            </text>
            <text x={X + 26} y="14" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="1.4" fill="var(--muted-foreground)">
              {s.planes.slice(0, 4).join(" · ").toUpperCase()}{s.planes.length > 4 ? " · …" : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
