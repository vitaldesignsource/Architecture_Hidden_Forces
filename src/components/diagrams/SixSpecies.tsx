import { fs } from "./fig";

/**
 * SixSpecies — the counterfeit flowers of the Garden, one glyph each.
 *
 * The Mirror Flower, which grows around the beholder's expectation; the
 * Relic Bloom, kept flowering after its root has died; the Grafted Flower,
 * a true head on an alien stem; the Orphan Flower, a real encounter with
 * its name lost; the Hungry Flower, whose beauty is an organ of intake; and
 * the Premature Flower, forced open before its season. Six small drawings,
 * one grammar: what the petals say, and what the stem and root admit. Three
 * to a row at most, so the lettering keeps a size that can be read.
 */
const G = "var(--gold, #c9a227)";

function Petals({ cx, cy, open = 1, faint = false }: { cx: number; cy: number; open?: number; faint?: boolean }) {
  return (
    <>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx={cx} cy={cy - 9 * open} rx={4.5 * open} ry={10 * open} fill={G} fillOpacity={faint ? 0.05 : 0.12} stroke={G} strokeOpacity={faint ? 0.35 : 0.8} strokeWidth={0.8} transform={`rotate(${a} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r={2.4} fill={G} fillOpacity={faint ? 0.4 : 0.9} />
    </>
  );
}

export function SixSpecies() {
  const cap = { ...fs(7), letterSpacing: "0.16em" };
  const sub = { ...fs(5.6), letterSpacing: "0.12em" };
  const species: { k: string; sub: [string, string]; title: string; draw: React.ReactNode }[] = [
    {
      k: "the Mirror", sub: ["grown round", "the beholder"], title: "A flower and, across a mirror line, its reflection facing a small figure.",
      draw: (
        <>
          <line x1={60} y1={20} x2={60} y2={108} stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.7} strokeDasharray="2 3" />
          <circle cx={26} cy={62} r={4} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} />
          <path d="M 26 66 L 26 84 M 18 74 L 34 74" stroke="currentColor" strokeOpacity={0.6} strokeWidth={0.8} />
          <Petals cx={88} cy={62} />
          <path d="M 88 74 L 88 100" stroke="currentColor" strokeOpacity={0.6} strokeWidth={0.9} />
        </>
      ),
    },
    {
      k: "the Relic", sub: ["kept flowering,", "root dead"], title: "A flower on a stem whose root beneath the ground is drawn broken and faint.",
      draw: (
        <>
          <Petals cx={60} cy={50} />
          <path d="M 60 62 L 60 90" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.9} />
          <line x1={20} y1={90} x2={100} y2={90} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.7} />
          <path d="M 60 90 L 58 98 M 56 104 L 52 110" stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.7} strokeDasharray="2 2" />
        </>
      ),
    },
    {
      k: "the Grafted", sub: ["true head,", "alien stem"], title: "A flower whose stem is joined by a graft mark to a different, thicker stem.",
      draw: (
        <>
          <Petals cx={60} cy={48} />
          <path d="M 60 60 L 60 76" stroke="currentColor" strokeOpacity={0.8} strokeWidth={0.9} />
          <path d="M 52 76 L 68 78 M 52 80 L 68 82" stroke={G} strokeOpacity={0.8} strokeWidth={0.8} />
          <path d="M 60 82 C 58 92, 64 100, 60 110" stroke="currentColor" strokeOpacity={0.9} strokeWidth={2.2} fill="none" />
        </>
      ),
    },
    {
      k: "the Orphan", sub: ["real,", "its name lost"], title: "A flower with an empty label tied to its stem.",
      draw: (
        <>
          <Petals cx={60} cy={48} />
          <path d="M 60 60 L 60 108" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.9} />
          <path d="M 60 80 L 76 84" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.6} />
          <rect x={76} y={78} width={26} height={12} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={0.7} />
          <line x1={80} y1={84} x2={98} y2={84} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.6} strokeDasharray="1 2" />
        </>
      ),
    },
    {
      k: "the Hungry", sub: ["beauty", "as intake"], title: "A flower whose centre draws a ring of small dots inward.",
      draw: (
        <>
          <Petals cx={60} cy={54} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r = 26, x = 60 + r * Math.cos((a * Math.PI) / 180), y = 54 + r * Math.sin((a * Math.PI) / 180);
            const x2 = 60 + 9 * Math.cos((a * Math.PI) / 180), y2 = 54 + 9 * Math.sin((a * Math.PI) / 180);
            return <g key={a}><circle cx={x} cy={y} r={1.2} fill="currentColor" fillOpacity={0.6} /><line x1={x} y1={y} x2={x2} y2={y2} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5} /></g>;
          })}
          <path d="M 60 66 L 60 108" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.9} />
        </>
      ),
    },
    {
      k: "the Premature", sub: ["forced open", "too soon"], title: "A bud, drawn closed, with its petals prised apart at the top.",
      draw: (
        <>
          <Petals cx={60} cy={56} open={0.55} faint />
          <path d="M 52 44 L 46 30 M 68 44 L 74 30" stroke={G} strokeOpacity={0.8} strokeWidth={0.9} />
          <path d="M 60 66 L 60 108" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.9} />
          <path d="M 54 92 q 6 -8 12 0" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.7} />
        </>
      ),
    },
  ];
  return (
    <div className="aoh-fig mx-auto grid w-full max-w-[720px] grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
      {species.map((s, i) => (
        <svg key={s.k} viewBox="0 0 120 148" className="h-auto w-full" role="img" aria-labelledby={`aoh-ss-t${i}`}>
          <title id={`aoh-ss-t${i}`}>{s.title}</title>
          {s.draw}
          <text x={60} y={124} textAnchor="middle" className="font-mono uppercase" style={cap} fill={G} fillOpacity={0.85}>{s.k}</text>
          <text x={60} y={134} textAnchor="middle" className="font-mono uppercase" style={sub} fill="currentColor" fillOpacity={0.45}>
            <tspan x={60}>{s.sub[0]}</tspan>
            <tspan x={60} dy={8}>{s.sub[1]}</tspan>
          </text>
        </svg>
      ))}
    </div>
  );
}
