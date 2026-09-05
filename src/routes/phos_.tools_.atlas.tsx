import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { EntryRow } from "@/components/phos/EntryRows";
import { AtlasMap } from "@/components/phos/AtlasMap";
import { AtlasTimeline } from "@/components/phos/AtlasTimeline";
import {
  LANES, PLACES, SPANS, YEAR_MIN, YEAR_MAX, alive, atPlace, contemporaries, entryOfSpan, loadGeo, placeName,
  spanOf, verb, when, year as fmtYear, type Geo, type Span,
} from "@/lib/phos/atlas";

/**
 * The Atlas — where a light was kindled, and when.
 *
 * One map and one timeline of every dated entry, linked: hovering a bar
 * brightens its places and draws the path it moved along; hovering a place
 * brightens its bars; moving along the years dims every place where nothing
 * was then alight. A chosen span, place, or year lives in the URL, so a view
 * can be sent.
 */
type Search = { e?: string; y?: number; p?: string };

export const Route = createFileRoute("/phos_/tools_/atlas")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    e: typeof s.e === "string" && s.e ? s.e : undefined,
    y: typeof s.y === "number" && Number.isFinite(s.y) ? Math.round(s.y)
      : typeof s.y === "string" && s.y.trim() && Number.isFinite(Number(s.y)) ? Math.round(Number(s.y)) : undefined,
    p: typeof s.p === "string" && s.p ? s.p : undefined,
  }),
  head: () => ({ meta: [{ title: "The Atlas — Phōs" }] }),
  component: Atlas,
});

const FULL: [number, number] = [YEAR_MIN - 60, YEAR_MAX + 40];

/** A window that shows a span with room on either side. */
function windowFor(s: Span): [number, number] {
  const pad = Math.max(150, (s.to - s.from) * 1.5);
  return [s.from - pad, s.to + pad];
}

function Atlas() {
  const { e, y, p } = Route.useSearch();
  const navigate = useNavigate();
  const [geo, setGeo] = useState<Geo | null>(null);
  useEffect(() => { loadGeo().then(setGeo); }, []);

  const [hov, setHov] = useState<string | null>(null);
  const [hovPlace, setHovPlace] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const sel = e && spanOf(e) ? e : null;
  const selSpan = sel ? spanOf(sel) : null;
  const pinned = y ?? null;
  const place = p && PLACES[p] ? p : null;
  const [win, setWin] = useState<[number, number]>(() => (selSpan ? windowFor(selSpan) : FULL));

  const set = (patch: Search) =>
    navigate({ to: "/phos/tools/atlas", search: (prev: Search) => ({ ...prev, ...patch }), replace: true });

  // A span chosen from a card may lie outside the window; bring it in.
  useEffect(() => {
    if (!selSpan) return;
    if (selSpan.from < win[0] || selSpan.to > win[1]) setWin(windowFor(selSpan));
  }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps

  const cur = year ?? pinned;
  const lit = cur !== null ? alive(cur) : [];
  const focus = selSpan?.places.length ? selSpan.places : place ? [place] : null;
  const entry = selSpan ? entryOfSpan(selSpan) : null;
  const here = place ? atPlace(place) : [];

  return (
    <ToolFrame
      name="The Atlas"
      title={<>Where a light was <span className="italic text-gold">kindled</span>, and when</>}
      lede="Ninety-four entries of the global history of light and twenty-four founding discoveries of its science, set where they were kindled and when. Hover a bar to find its place and hover a place to find its years; move along the years to see what was alight together, and click to hold a year. The dates are those of ordinary scholarship: where it disagrees the range is wide and marked c., and where a text’s scene is not where it was written the map says so."
      backdrop="dark-hall-with-charted-stone-floor"
      position="center 45%"
    >
      <ToolBand>
        {/* readout */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{cur !== null ? (pinned === cur && year === null ? "Held at" : "In the year") : "The year"}</Eyebrow>
            <p className="mt-2 font-serif text-4xl text-bone">
              {cur !== null ? fmtYear(cur) : <span className="text-bone/40">move along the timeline</span>}
            </p>
            {cur !== null && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                {lit.length} {lit.length === 1 ? "light" : "lights"} alight
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
            {selSpan && (
              <button onClick={() => set({ e: undefined })} className="border border-gold/60 px-3 py-1.5 text-gold hover:bg-gold/10" data-chip="span">
                {selSpan.label} <span className="ml-2 text-gold-dim">×</span>
              </button>
            )}
            {place && (
              <button onClick={() => set({ p: undefined })} className="border border-gold/60 px-3 py-1.5 text-gold hover:bg-gold/10" data-chip="place">
                {placeName(place)} <span className="ml-2 text-gold-dim">×</span>
              </button>
            )}
            {pinned !== null && (
              <button onClick={() => set({ y: undefined })} className="border border-gold/60 px-3 py-1.5 text-gold hover:bg-gold/10" data-chip="year">
                {fmtYear(pinned)} <span className="ml-2 text-gold-dim">×</span>
              </button>
            )}
            {!selSpan && !place && pinned === null && (
              <span className="text-muted-foreground">wheel to zoom · drag to pan · click the timeline to hold a year</span>
            )}
          </div>
        </div>

        {/* the map */}
        <div className="mt-8 overflow-hidden border border-border bg-void">
          {geo ? (
            <AtlasMap
              geo={geo} spans={SPANS} hov={hov} sel={sel} year={cur} place={place} hovPlace={hovPlace}
              onHoverPlace={setHovPlace} onPlace={(id) => set({ p: id ?? undefined })} focus={focus}
            />
          ) : (
            <div className="flex aspect-[5/3] items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim/70" aria-busy>
              Drawing the sheet
            </div>
          )}
        </div>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          The sheet is the Old World, where every entry but one is placed; the Theosophical Society, founded in New York, is set at Adyar, its home from 1882. Discoveries made beyond the sheet are named in their notes.
        </p>

        {/* the timeline */}
        <div className="mt-10">
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            <span><i className="mr-2 inline-block h-2 w-5 bg-gold/50 align-middle" />life</span>
            <span><i className="mr-2 inline-block h-2 w-5 rounded-full bg-gold-dim/75 align-middle" />text</span>
            <span><i className="mr-2 inline-block h-2 w-5 border border-gold/50 bg-gold/20 align-middle" />tradition</span>
            <span><i className="mr-2 inline-block h-2 w-5 bg-bone/55 align-middle" />discovery</span>
            <span><i className="mr-2 inline-block h-2 w-5 border border-dashed border-gold/60 align-middle" />c. dated roughly</span>
          </div>
          <AtlasTimeline
            spans={SPANS} lanes={LANES} window={win} onWindow={setWin}
            hov={hov} sel={sel} year={year} pinned={pinned} place={place} hovPlace={hovPlace}
            onHover={setHov} onSelect={(id) => set({ e: id ?? undefined })} onYear={setYear} onPin={(yy) => set({ y: yy ?? undefined })}
          />
          <div className="mt-3 flex gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
            <button onClick={() => setWin(FULL)} className="border border-border px-3 py-1.5 text-muted-foreground hover:border-gold/60 hover:text-gold">All of time</button>
            {selSpan && <button onClick={() => setWin(windowFor(selSpan))} className="border border-border px-3 py-1.5 text-muted-foreground hover:border-gold/60 hover:text-gold">Around {selSpan.label}</button>}
          </div>
        </div>

        {/* the cards */}
        <div className="mt-12 grid gap-px lg:grid-cols-2">
          <div className="border border-border p-6" data-card="chosen">
            {selSpan ? (
              <>
                <Eyebrow>{verb(selSpan)} · {when(selSpan)}</Eyebrow>
                <p className="mt-3 font-serif text-3xl text-bone">{selSpan.label}</p>
                <p className="mt-2 text-sm text-bone/75">
                  {selSpan.places.length === 0 ? "Where it was composed is not known." : (
                    <>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold-dim">{selSpan.setting ? "setting" : selSpan.places.length > 1 ? "moving through" : "at"}</span>{" "}
                      {selSpan.places.map((pl, i) => (
                        <span key={pl}>
                          {i > 0 && <span className="text-gold-dim"> → </span>}
                          <button onClick={() => set({ p: pl })} className="underline-offset-4 hover:text-gold hover:underline">{placeName(pl)}</button>
                        </span>
                      ))}
                    </>
                  )}
                </p>
                {selSpan.note && <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{selSpan.note}</p>}
                {entry && <div className="mt-5"><EntryRow e={entry} /></div>}
                {contemporaries(selSpan).length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">Alight at the same time</p>
                    <p className="mt-2 text-sm leading-relaxed text-bone/75">
                      {contemporaries(selSpan).slice(0, 12).map((c, i) => (
                        <span key={c.id}>
                          {i > 0 && <span className="mx-2 text-bone/30">·</span>}
                          <button onClick={() => set({ e: c.id })} onPointerEnter={() => setHov(c.id)} onPointerLeave={() => setHov(null)} className="underline-offset-4 hover:text-gold hover:underline">{c.label}</button>
                        </span>
                      ))}
                      {contemporaries(selSpan).length > 12 && <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">and {contemporaries(selSpan).length - 12} more</span>}
                    </p>
                  </div>
                )}
              </>
            ) : place ? (
              <>
                <Eyebrow>Place · {here.length} {here.length === 1 ? "light" : "lights"}</Eyebrow>
                <p className="mt-3 font-serif text-3xl text-bone">{placeName(place)}</p>
                <ul className="mt-4 divide-y divide-border">
                  {here.map((s) => (
                    <li key={s.id}>
                      <button onClick={() => set({ e: s.id })} onPointerEnter={() => setHov(s.id)} onPointerLeave={() => setHov(null)} className="group grid w-full grid-cols-[7rem_1fr] items-baseline gap-3 py-2.5 text-left">
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold-dim">{when(s)}</span>
                        <span className="font-serif text-base text-bone transition-colors group-hover:text-gold">{s.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <Eyebrow>Choose a light</Eyebrow>
                <p className="mt-3 font-serif text-2xl leading-snug text-bone/85">
                  Click a bar to read its entry and see what was alight with it; click a place to see everything kindled there.
                </p>
              </>
            )}
          </div>
          <div className="border border-border p-6" data-card="year">
            {cur !== null ? (
              <>
                <Eyebrow>Alight in {fmtYear(cur)}</Eyebrow>
                {lit.length === 0 ? (
                  <p className="mt-3 font-serif text-xl text-bone/60">Nothing this encyclopaedia dates was then alight.</p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {LANES.filter((l) => lit.some((s) => s.lane === l)).map((l) => (
                      <div key={l}>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">{l}</p>
                        <p className="mt-1 text-sm leading-relaxed text-bone/80">
                          {lit.filter((s) => s.lane === l).map((s, i) => (
                            <span key={s.id}>
                              {i > 0 && <span className="mx-2 text-bone/30">·</span>}
                              <button onClick={() => set({ e: s.id })} onPointerEnter={() => setHov(s.id)} onPointerLeave={() => setHov(null)} className="underline-offset-4 hover:text-gold hover:underline">{s.label}</button>
                            </span>
                          ))}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <Eyebrow>Any year</Eyebrow>
                <p className="mt-3 font-serif text-2xl leading-snug text-bone/85">
                  Move along the timeline to see what was alight in any year, on the map and here; click to hold it.
                </p>
              </>
            )}
          </div>
        </div>
      </ToolBand>

      {/* the same, as a list */}
      <ToolBand className="border-t border-border">
        <Eyebrow>As a list · {SPANS.length} lights in {LANES.length} lanes</Eyebrow>
        <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-2">
          {LANES.map((l) => (
            <div key={l}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">{l}</p>
              <ul className="mt-3 divide-y divide-border">
                {SPANS.filter((s) => s.lane === l).map((s) => {
                  const en = entryOfSpan(s);
                  const inner = (
                    <>
                      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold-dim">{when(s)}</span>
                      <span className="min-w-0">
                        <span className="block font-serif text-base text-bone transition-colors group-hover:text-gold">{s.label}</span>
                        {s.places.length > 0 && <span className="block text-xs text-muted-foreground">{s.places.map(placeName).join(" → ")}</span>}
                      </span>
                    </>
                  );
                  const cls = "group grid grid-cols-[8rem_1fr] items-baseline gap-3 py-2.5";
                  return (
                    <li key={s.id}>
                      {en ? <Link to="/phos/$division/$entry" params={{ division: en.division.id, entry: en.slug }} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </ToolBand>
    </ToolFrame>
  );
}
