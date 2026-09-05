import { useEffect, useState } from "react";
import { ArrowMark } from "@/components/marks";
import { Link, useNavigate } from "@tanstack/react-router";
import { AtlasMap } from "@/components/phos/AtlasMap";
import { AtlasTimeline } from "@/components/phos/AtlasTimeline";
import { LANES, SPANS, entryOfSpan, loadGeo, placeName, spanOf, verb, when, type Geo } from "@/lib/phos/atlas";

/**
 * Where and when — an entry's place in time and on the map, set beneath its
 * body when the Atlas has it. The strip shows the entry among its own lane's
 * neighbours; the map frames its places, with the path it moved along. Both
 * open the Atlas with the entry chosen. The sheet is fetched only here, and
 * only when the entry has somewhere to be placed.
 */
export function WhereAndWhen({ id }: { id: string }) {
  const s = spanOf(id);
  const navigate = useNavigate();
  const [geo, setGeo] = useState<Geo | null>(null);
  const wantsMap = !!s && s.places.length > 0;
  useEffect(() => { if (wantsMap) loadGeo().then(setGeo); }, [wantsMap]);
  if (!s) return null;
  const pad = Math.max(160, (s.to - s.from) * 1.2);
  const win: [number, number] = [s.from - pad, s.to + pad];
  const where = s.places.length === 0
    ? "where it was composed is not known"
    : `${s.setting ? "set at" : s.places.length > 1 ? "moving through" : "at"} ${s.places.map(placeName).join(" → ")}`;
  return (
    <section className="mt-16 border-t border-border pt-8" data-where-and-when>
      <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">Where and when</p>
      <p className="mt-3 font-serif text-xl text-bone">
        {s.label} <span className="mx-1 text-bone/40">·</span> <span className="text-gold">{when(s)}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        <span className="capitalize">{verb(s)}</span> {where}.
      </p>
      {s.note && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-bone/70">{s.note}</p>}
      <div className={`mt-6 grid gap-6 ${wantsMap ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : ""}`}>
        <div className="flex items-center border border-border p-4">
          <AtlasTimeline
            spans={SPANS} lanes={LANES.filter((l) => l === s.lane)} window={win} compact focus={s.id} sel={s.id}
            onSelect={(sid) => {
              const en = sid ? entryOfSpan(spanOf(sid)!) : null;
              if (en && sid !== s.id) navigate({ to: "/phos/$division/$entry", params: { division: en.division.id, entry: en.slug } });
            }}
          />
        </div>
        {wantsMap && (
          <div className="overflow-hidden border border-border bg-void">
            {geo ? (
              <AtlasMap geo={geo} spans={SPANS} sel={s.id} focus={s.places} compact />
            ) : (
              <div className="aspect-[5/3]" aria-busy />
            )}
          </div>
        )}
      </div>
      <p className="mt-4 font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
        <Link to="/phos/tools/atlas" search={{ e: s.id }} className="hover:text-gold">Open in the Atlas <ArrowMark /></Link>
      </p>
    </section>
  );
}
