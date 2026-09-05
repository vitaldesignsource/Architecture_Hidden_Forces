import { fs } from "./fig";

/**
 * CounterfeitBloom — every flower makes an argument through its anatomy.
 *
 * One flower, labelled by what each part argues: the petals' colour is its
 * correspondence, the fragrance above it its affect, the nectar at its
 * centre the reward it offers, the thorns on its stem the penalty on doubt.
 * Below the ground line, the two parts the argument does not show — the
 * root it actually feeds from, and the fruit it bears. Only the fruit
 * reveals the whole plant.
 */
export function CounterfeitBloom() {
  const G = "var(--gold, #c9a227)";
  const lbl = { ...fs(6.4), letterSpacing: "0.16em" };
  const cx = 200, cy = 84;
  return (
    <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 400 260" className="h-auto w-full" role="img" aria-labelledby="aoh-cb-t">
        <title id="aoh-cb-t">
          A single flower with its parts labelled — fragrance above, petals as colour, nectar at the centre,
          thorns on the stem — and beneath the ground line its root, drawing from the left, and a fruit
          hanging to the right.
        </title>
        {/* fragrance */}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${cx - 24 + i * 24} ${cy - 46} q 4 -6 0 -12 t 0 -12`} fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.7} />
        ))}
        {/* petals */}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx={cx} cy={cy - 16} rx={7} ry={17} fill={G} fillOpacity={0.12} stroke={G} strokeOpacity={0.8} strokeWidth={0.9} transform={`rotate(${a} ${cx} ${cy})`} />
        ))}
        {/* nectar */}
        <circle cx={cx} cy={cy} r={4.5} fill={G} fillOpacity={0.95} />
        {/* stem and thorns */}
        <path d={`M ${cx} ${cy + 18} L ${cx} 178`} fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={1.1} />
        {[124, 146, 166].map((y, i) => (
          <path key={y} d={`M ${cx} ${y} l ${i % 2 ? 8 : -8} -6`} fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={1} strokeLinecap="round" />
        ))}
        {/* the ground */}
        <line x1={40} y1={178} x2={360} y2={178} stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8} />
        <rect x={40} y={178} width={320} height={70} fill="currentColor" fillOpacity={0.05} />
        {/* the root, feeding from elsewhere */}
        <path d={`M ${cx} 178 C ${cx} 200, ${cx - 30} 206, ${cx - 60} 214 C ${cx - 90} 222, ${cx - 110} 220, ${cx - 130} 232`} fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1} strokeDasharray="3 3" />
        <path d={`M ${cx} 178 C ${cx + 4} 196, ${cx - 10} 204, ${cx - 16} 216`} fill="none" stroke={G} strokeOpacity={0.4} strokeWidth={0.7} strokeDasharray="2 3" />
        <circle cx={cx - 132} cy={234} r={3} fill={G} fillOpacity={0.6} />
        {/* the fruit */}
        <path d={`M ${cx} 178 C ${cx + 20} 190, ${cx + 50} 196, ${cx + 70} 216`} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={0.8} />
        <ellipse cx={cx + 74} cy={224} rx={7} ry={9} fill="none" stroke="currentColor" strokeOpacity={0.85} strokeWidth={1} />
        {/* labels with leaders */}
        <text x={cx - 60} y={cy - 60} textAnchor="end" className="font-mono uppercase" style={lbl} fill="currentColor" fillOpacity={0.55}>fragrance · affect</text>
        <text x={cx + 46} y={cy - 24} className="font-mono uppercase" style={lbl} fill="currentColor" fillOpacity={0.55}>colour · correspondence</text>
        <text x={cx + 46} y={cy + 4} className="font-mono uppercase" style={lbl} fill={G} fillOpacity={0.85}>nectar · the reward</text>
        <text x={cx + 22} y={150} className="font-mono uppercase" style={lbl} fill="currentColor" fillOpacity={0.55}>thorns · penalty on doubt</text>
        <text x={cx - 138} y={250} className="font-mono uppercase" style={lbl} fill={G} fillOpacity={0.85}>the root · where it feeds</text>
        <text x={cx + 90} y={228} className="font-mono uppercase" style={lbl} fill="currentColor" fillOpacity={0.85}>the fruit</text>
        <text x={cx + 90} y={238} className="font-mono uppercase" style={{ ...fs(6.2), letterSpacing: "0.14em" }} fill="currentColor" fillOpacity={0.45}>
          <tspan x={cx + 90}>only this reveals</tspan>
          <tspan x={cx + 90} dy={8}>the whole plant</tspan>
        </text>
      </svg>
    </div>
  );
}
