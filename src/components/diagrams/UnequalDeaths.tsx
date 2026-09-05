import { fs } from "./fig";

/**
 * UnequalDeaths — the death of a god-form is a sequence of unequal deaths.
 *
 * Five bars, one for each death the doctrine names — liturgical, social,
 * imaginal, aetheric, daimonic — running from the living cult at the left
 * toward the present at the right. Each breaks at a different point and
 * some do not break at all: a deity may be socially forgotten and imaginally
 * potent, a place may keep its scar after its name is lost, a power may be
 * fully real while every form once used to reach it is gone. None of the
 * deaths guarantees the others. The box runs past the present by a margin,
 * for the longest note, which grows on a phone.
 */
const DEATHS: { k: string; note: string; ends: number | null; fade?: boolean }[] = [
  { k: "liturgical", note: "the rite is no longer enacted", ends: 0.28 },
  { k: "social", note: "no community organises around the name", ends: 0.42 },
  { k: "imaginal", note: "the symbols still awaken awe", ends: null, fade: true },
  { k: "aetheric", note: "the place keeps its scar", ends: 0.86 },
  { k: "daimonic", note: "the current withdrew — or never depended on the house", ends: 0.6 },
];

export function UnequalDeaths() {
  const G = "var(--gold, #c9a227)";
  const X0 = 120, X1 = 440;
  return (
    <div className="aoh-fig aoh-fig-wide mx-auto w-full max-w-[660px]">
      <svg viewBox="0 0 500 200" className="h-auto w-full" role="img" aria-labelledby="aoh-ud-t">
        <title id="aoh-ud-t">
          Five horizontal bars labelled liturgical, social, imaginal, aetheric and daimonic, running from the
          living cult on the left toward the present on the right, each ending at a different point and one
          continuing faintly to the end.
        </title>
        <text x={X0} y={22} className="font-mono uppercase" style={{ ...fs(6.2), letterSpacing: "0.16em" }} fill={G} fillOpacity={0.8}>the living cult</text>
        <text x={X1} y={22} textAnchor="end" className="font-mono uppercase" style={{ ...fs(6.2), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.5}>the present</text>
        <line x1={X0} y1={28} x2={X0} y2={180} stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.6} />
        <line x1={X1} y1={28} x2={X1} y2={180} stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.6} strokeDasharray="2 3" />
        {DEATHS.map((d, i) => {
          const y = 44 + i * 30;
          const xe = d.ends === null ? X1 : X0 + (X1 - X0) * d.ends;
          return (
            <g key={d.k}>
              <text x={X0 - 10} y={y + 3} textAnchor="end" className="font-serif" style={fs(9.5)} fill="currentColor" fillOpacity={0.85}>{d.k}</text>
              <line x1={X0} y1={y} x2={xe} y2={y} stroke={G} strokeOpacity={d.fade ? 0.45 : 0.85} strokeWidth={d.fade ? 1.2 : 2} strokeLinecap="round" strokeDasharray={d.fade ? "6 4" : undefined} />
              {d.ends !== null && <line x1={xe} y1={y - 5} x2={xe} y2={y + 5} stroke="currentColor" strokeOpacity={0.6} strokeWidth={1} />}
              {d.ends !== null && <line x1={xe} y1={y} x2={X1} y2={y} stroke="currentColor" strokeOpacity={0.1} strokeWidth={0.6} />}
              {/* the note sits under its bar, so it can be as long as the doctrine needs */}
              <text x={X0} y={y + 13} className="font-mono uppercase" style={{ ...fs(5.4), letterSpacing: "0.12em" }} fill="currentColor" fillOpacity={0.45}>{d.note}</text>
            </g>
          );
        })}
        <text x={(X0 + X1) / 2} y={194} textAnchor="middle" className="font-serif italic" style={fs(9)} fill="currentColor" fillOpacity={0.6}>none of these guarantees the others</text>
      </svg>
    </div>
  );
}
