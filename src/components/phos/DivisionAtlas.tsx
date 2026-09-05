import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AtlasMap } from "@/components/phos/AtlasMap";
import { AtlasTimeline } from "@/components/phos/AtlasTimeline";
import { LANES, entryOfSpan, loadGeo, spanOf, spansOfDivision, type Geo } from "@/lib/phos/atlas";

/**
 * A division's own sheet and timeline, opening the page of a division the
 * Atlas places: every entry of it as a light and a bar, linked as on the
 * Atlas, with a bar opening its entry. The sheet is fetched only here.
 */
export function DivisionAtlas({ division }: { division: string }) {
  const navigate = useNavigate();
  const spans = spansOfDivision(division);
  const lanes = LANES.filter((l) => spans.some((s) => s.lane === l));
  const [geo, setGeo] = useState<Geo | null>(null);
  const [hov, setHov] = useState<string | null>(null);
  const [hovPlace, setHovPlace] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const a = Math.min(...spans.map((s) => s.from)), b = Math.max(...spans.map((s) => s.to));
  const pad = Math.max(40, (b - a) * 0.03);
  const [win, setWin] = useState<[number, number]>([a - pad, b + pad]);
  useEffect(() => { loadGeo().then(setGeo); }, []);
  if (!spans.length) return null;
  const places = [...new Set(spans.flatMap((s) => s.places))];
  return (
    <section className="relative isolate border-t border-border py-16" data-division-atlas>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
            Where and when · {spans.length} entries placed · {places.length} places
          </p>
          <Link to="/phos/tools/atlas" search={{}} className="font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim hover:text-gold">
            The Atlas, whole →
          </Link>
        </div>
        <div className="mt-6 overflow-hidden border border-border bg-void">
          {geo ? (
            <AtlasMap geo={geo} spans={spans} hov={hov} year={year} hovPlace={hovPlace} onHoverPlace={setHovPlace} focus={places} />
          ) : (
            <div className="aspect-[5/3]" aria-busy />
          )}
        </div>
        <div className="mt-8">
          <AtlasTimeline
            spans={spans} lanes={lanes} window={win} onWindow={setWin}
            hov={hov} year={year} hovPlace={hovPlace}
            onHover={setHov} onYear={setYear}
            onSelect={(id) => {
              const en = id ? entryOfSpan(spanOf(id)!) : null;
              if (en) navigate({ to: "/phos/$division/$entry", params: { division: en.division.id, entry: en.slug } });
            }}
          />
          <p className="mt-3 font-label text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            Hover a bar to find its place, or a place to find its years · wheel to zoom, drag to pan · click a bar to open its entry
          </p>
        </div>
      </div>
    </section>
  );
}
