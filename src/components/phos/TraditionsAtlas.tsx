import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AtlasMap } from "@/components/phos/AtlasMap";
import { AtlasTimeline } from "@/components/phos/AtlasTimeline";
import { loadGeo, spansOfTradition, type Geo, type Span } from "@/lib/phos/atlas";

const TINTS = ["t-a", "t-b", "t-c"];

/**
 * Where the compared traditions were kindled: the places of every dated
 * entry filed under each chosen tradition, tinted by tradition, and their
 * bars in one lane per tradition. An entry filed under two of them appears
 * in both lanes and wears both tints.
 */
export function TraditionsAtlas({ names }: { names: string[] }) {
  const [geo, setGeo] = useState<Geo | null>(null);
  const [hov, setHov] = useState<string | null>(null);
  const [hovPlace, setHovPlace] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { loadGeo().then(setGeo); }, []);

  const sets = useMemo(() => names.map((n, i) => ({ name: n, cls: TINTS[i], spans: spansOfTradition(n) })), [names]);
  const spans = useMemo(() => { const seen = new Set<string>(); return sets.flatMap((t) => t.spans).filter((s) => !seen.has(s.id) && seen.add(s.id)); }, [sets]);
  // One lane per tradition; a span filed under two traditions is a bar in each.
  const laned: Span[] = useMemo(() => sets.flatMap((t) => t.spans.map((s) => ({ ...s, id: `${s.id}#${t.name}`, lane: t.name }))), [sets]);
  const groups = useMemo(() => sets.map((t) => ({ id: t.name, cls: t.cls, places: new Set(t.spans.flatMap((s) => s.places)) })), [sets]);
  const a = Math.min(...spans.map((s) => s.from)), b = Math.max(...spans.map((s) => s.to));
  const pad = Math.max(40, (b - a) * 0.04);
  const [win, setWin] = useState<[number, number]>([a - pad, b + pad]);
  useEffect(() => { setWin([a - pad, b + pad]); }, [a, b, pad]);
  if (!spans.length) return null;
  const places = [...new Set(spans.flatMap((s) => s.places))];
  const bare = (id: string | null) => (id ? id.split("#")[0] : null);

  return (
    <div data-traditions-atlas>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
        {groups.map((g) => (
          <span key={g.id} className="flex items-center gap-2">
            <i className={`inline-block h-2.5 w-2.5 rounded-full ${g.cls === "t-a" ? "bg-gold" : g.cls === "t-b" ? "bg-bone" : "border border-gold"}`} />
            {g.id} · {g.places.size} {g.places.size === 1 ? "place" : "places"}
          </span>
        ))}
      </div>
      <div className="mt-4 overflow-hidden border border-border bg-void">
        {geo ? (
          <AtlasMap geo={geo} spans={spans} hov={bare(hov)} year={year} hovPlace={hovPlace} onHoverPlace={setHovPlace} focus={places} groups={groups} />
        ) : (
          <div className="aspect-[5/3]" aria-busy />
        )}
      </div>
      <div className="mt-8">
        <AtlasTimeline spans={laned} lanes={names} window={win} onWindow={setWin} hov={hov} year={year} hovPlace={hovPlace} onHover={setHov} onYear={setYear} />
      </div>
      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
        <Link to="/phos/tools/atlas" search={{}} className="hover:text-gold">The Atlas, whole →</Link>
      </p>
    </div>
  );
}
