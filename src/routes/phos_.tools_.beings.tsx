import { describe } from "@/lib/seo";
import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { entryRef } from "@/lib/phos/refs";
import { Term } from "@/components/Term";
import { SCRIPTS, type ScriptKey } from "@/lib/scripts";
import { RegisterField } from "@/components/phos/RegisterField";
import { KinGraph } from "@/components/phos/KinGraph";
// The vocabularies come from the module that holds no entries: the route's
// validateSearch runs when the app loads, so anything it touches ships to every
// page. The register itself is only ever reached from inside the component.
import { CLASSES, PLANES, TRADITION_ORDER, classLabel, type ClassKey, type Plane } from "@/lib/phos/being-kinds";
import { BEINGS, KINDS, type Being } from "@/lib/phos/beings";

/**
 * The Register of Beings — who populates the middle of the world, tradition by
 * tradition, in the scripts the traditions wrote them in.
 *
 * The instrument's whole difficulty is comparison. Set a seraph beside a yazata
 * beside an apkallu and the eye starts equating them, which is exactly what the
 * encyclopaedia's rule against flattening forbids. So the register shows each
 * being's own tradition's word for its kind first and largest, gives the
 * volume's comparative class second and marks it as the volume's, and says
 * plainly in the opening band that the classes are a finding aid.
 */
/**
 * The register's whole state lives in the URL. A narrowed view — the Iranian
 * adversaries, everything on the angelic plane, a search in cuneiform — is a
 * link someone can send, and the back button walks the filters rather than
 * leaving the instrument. ?being= additionally opens one row.
 */
type BeingsSearch = {
  being?: string;
  tradition?: string;
  cls?: ClassKey;
  plane?: Plane;
  q?: string;
};

/** The volume spells small numbers in its prose and sets them as figures in a
 *  table; a counted number that lands in a sentence should follow the prose. */
const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const spell = (n: number) => {
  const w = WORDS[n];
  return w ? w[0].toUpperCase() + w.slice(1) : String(n);
};

export const Route = createFileRoute("/phos_/tools_/beings")({
  // Every value is checked against what the register actually holds: a hand-
  // edited URL narrows to nothing rather than rendering a filter that no
  // control can clear.
  validateSearch: (search: Record<string, unknown>): BeingsSearch => {
    const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
    const one = <T extends string>(v: unknown, all: readonly T[]) =>
      (all as readonly string[]).includes(String(v)) ? (v as T) : undefined;
    return {
      being: str(search.being),
      tradition: one(search.tradition, TRADITION_ORDER),
      cls: one(search.cls, CLASSES.map((c) => c.k)),
      plane: one(search.plane, PLANES),
      q: str(search.q),
    };
  },
  head: () => ({ meta: describe("The Register of Beings — Instruments — Phōs", "The Register of Beings: ten traditions' populations of the middle of the world, each named in its own script and set side by side.") }),
  component: Register,
});

function Register() {
  const { being, tradition = null, cls = null, plane = null, q = "" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  /** Filters are navigation: a chip click is a step back, typing is not. */
  const set = (patch: BeingsSearch, replace = false) =>
    navigate({ search: (prev: BeingsSearch) => ({ ...prev, ...patch }), replace });
  const setTradition = (t: string | null) => set({ tradition: t ?? undefined });
  const setCls = (c: ClassKey | null) => set({ cls: c ?? undefined });
  const setPlane = (pl: Plane | null) => set({ plane: pl ?? undefined });
  // Typing should cost one history entry, not one per letter: entering a search
  // is a step back to the unfiltered view, and every letter after it is not.
  const setQ = (text: string) => set({ q: text || undefined }, Boolean(q) && Boolean(text));
  const clear = () => set({ tradition: undefined, cls: undefined, plane: undefined, q: undefined });

  const [open, setOpen] = useState<string | null>(being ?? null);
  const asked = useRef<string | null>(null);

  // A being asked for by name is opened and brought into view — once, so that
  // closing the row again does not fight the URL.
  useEffect(() => {
    if (!being || asked.current === being) return;
    asked.current = being;
    if (!BEINGS.some((b) => b.id === being)) return;
    setOpen(being);
    set({ tradition: undefined, cls: undefined, plane: undefined, q: undefined }, true);
    // After the frame in which the tool frame puts the page back at the top,
    // and instantly: a deep link should arrive at its row, not travel to it.
    requestAnimationFrame(() =>
      document.getElementById(`being-${being}`)?.scrollIntoView({ block: "center" }),
    );
  }, [being]);

  const traditions = useMemo(() => [...new Set(BEINGS.map((b) => b.tradition))].sort(), []);
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return BEINGS.filter(
      (b) =>
        (!tradition || b.tradition === tradition) &&
        (!cls || b.cls === cls) &&
        (!plane || b.plane === plane) &&
        (!needle ||
          [b.name, b.native?.tr ?? "", b.native?.orig ?? "", b.kind, b.office]
            .join(" ")
            .toLowerCase()
            .includes(needle)),
    );
  }, [tradition, cls, plane, q]);
  // What the filters keep, for the field: it dims the rest rather than dropping it.
  const shown = useMemo(() => new Set(rows.map((b) => b.id)), [rows]);
  // The field's columns. TRADITION_ORDER first, then anything the register holds
  // that the order has not been told about — a being should never be drawn
  // nowhere because a column was forgotten.
  const columns = useMemo(
    () => [...TRADITION_ORDER, ...traditions.filter((t) => !(TRADITION_ORDER as readonly string[]).includes(t))],
    [traditions],
  );
  const kinds = KINDS.filter((k) => !tradition || k.tradition === tradition);
  // The register's account of itself, counted rather than asserted.
  const state = useMemo(() => {
    const byScript = new Map<ScriptKey, number>();
    for (const b of BEINGS) if (b.native?.orig) byScript.set(b.native.script, (byScript.get(b.native.script) ?? 0) + 1);
    return {
      total: BEINGS.length,
      traditions: new Set(BEINGS.map((b) => b.tradition)).size,
      scripts: byScript.size,
      noScript: BEINGS.filter((b) => !b.native?.orig).length,
      contested: BEINGS.filter((b) => b.confidence === "contested").length,
      noContext: BEINGS.filter((b) => !b.context).length,
      byScript: [...byScript.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, []);

  return (
    <ToolFrame
      name="The Register of Beings"
      title={<>Who populates the <span className="italic text-gold">middle of the world</span></>}
      lede="Every tradition here fills the space between the first principle and the body, and each fills it its own way and sorts it with its own words. The register sets ten of those populations side by side — each name in the script it was written in, each kind named as its own tradition names it, from cuneiform and hieroglyphs through Hebrew, Greek, Coptic, Avestan, Devanagari, Chinese and Arabic — without letting the comparison collapse them into one another."
      backdrop="hall-of-throned-archons-in-light-beams"
      position="center 40%"
    >
      {/* how to read it */}
      <ToolBand>
        <Eyebrow>How the register classifies</Eyebrow>
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {[
            ["The tradition's own word",
             "Given first, and in its own script: diĝir, nṯr, daimōn, malʾakh, deva, shén. This is the only classification the sources themselves make, and where a tradition draws no line the register does not draw one for it."],
            ["The plane",
             "Where the being stands in the volume's own vertical — Divine, Noetic, Angelic, Daimonic, Astral, Ancestral. This is a comparative claim, made by the volume and not by the tradition."],
            ["The class",
             "A finding aid, so the register can be read across traditions at all: deity, emanation, messenger, intermediary, adversary, guardian, ancestor, personified power. It is not doctrine, and nothing follows from two beings sharing one."],
          ].map(([h, d]) => (
            <div key={h} className="border-t border-border pt-5">
              <p className="font-serif text-xl text-bone/90">{h}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-gold/40 pl-5 text-base leading-relaxed text-bone/85">
          A seraph and a yazata and an apkallu are not one being under three names. What the register
          shows is where each tradition's population is dense and where it is thin, and how
          differently the same region of the world gets cut up.
        </p>
      </ToolBand>

      {/* the filters */}
      <ToolBand>
        <Eyebrow>Filter · {rows.length} of {BEINGS.length}</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setTradition(null)}
            aria-pressed={tradition === null}
            className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] transition-colors ${
              tradition === null ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/50"
            }`}
          >
            Every tradition
          </button>
          {traditions.map((t) => (
            <button
              key={t}
              onClick={() => setTradition(tradition === t ? null : t)}
              aria-pressed={tradition === t}
              className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] transition-colors ${
                tradition === t ? "border-gold bg-gold/10 text-gold" : "border-gold/40 text-bone/85 hover:border-gold/70 hover:text-gold"
              }`}
            >
              {t}
              <span className="ml-2 text-gold-dim">{BEINGS.filter((b) => b.tradition === t).length}</span>
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a name, a script, an office…"
          className="mt-6 w-full max-w-md border border-border bg-transparent px-3 py-2 font-sans text-sm text-bone placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {CLASSES.map((c) => {
            const n = BEINGS.filter((b) => b.cls === c.k && (!tradition || b.tradition === tradition)).length;
            return (
              <button
                key={c.k}
                onClick={() => setCls(cls === c.k ? null : c.k)}
                aria-pressed={cls === c.k}
                disabled={!n}
                title={c.d}
                className={`border px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.14em] transition-colors ${
                  cls === c.k ? "border-gold text-gold" : n ? "border-border text-muted-foreground hover:border-gold/40" : "border-border/50 text-bone/25"
                }`}
              >
                {c.label} <span className="ml-1.5 text-muted-foreground">{n}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PLANES.map((pl) => {
            const n = rows.filter((b) => b.plane === pl).length + (plane && plane !== pl ? 0 : 0);
            const total = BEINGS.filter(
              (b) => b.plane === pl && (!tradition || b.tradition === tradition) && (!cls || b.cls === cls),
            ).length;
            return (
              <button
                key={pl}
                onClick={() => setPlane(plane === pl ? null : pl)}
                aria-pressed={plane === pl}
                disabled={!total}
                className={`border px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.14em] transition-colors ${
                  plane === pl
                    ? "border-gold text-gold"
                    : total
                      ? "border-border text-muted-foreground hover:border-gold/40"
                      : "border-border/50 text-bone/25"
                }`}
              >
                {pl} <span className="ml-1.5 text-muted-foreground">{total}</span>
              </button>
            );
          })}
          {(tradition || cls || plane || q) && (
            <button
              onClick={clear}
              className="border border-gold/50 px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/10"
            >
              Clear
            </button>
          )}
        </div>
      </ToolBand>

      {/* the field */}
      <ToolBand>
        <Eyebrow>The field · every being on both axes at once</Eyebrow>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Traditions across, the volume's planes down, one mark for each being. The filters above
          dim what they exclude rather than removing it, so the shape of the whole stays visible
          while you narrow; a mark's strength is the register's confidence in the entry, and the
          strata fade as they descend because that is what the volume claims about light rather
          than a decoration. Touch a mark for the name and again to open its row below, or take a
          label to filter by that plane or tradition.
        </p>
        {/* Two geometries rather than one that scrolls: on a phone a sideways
            field would carry its plane labels off the screen. */}
        {([true, false] as const).map((compact) => (
          <div key={String(compact)} className={compact ? "sm:hidden" : "hidden sm:block"}>
            <RegisterField
              compact={compact}
              traditions={columns}
              visible={shown}
              tradition={tradition}
              plane={plane}
              onPick={(id) => {
                // A dimmed mark has no row to open — the filters excluded it — so
                // taking one clears them rather than doing nothing.
                if (!shown.has(id)) clear();
                setOpen(id);
                requestAnimationFrame(() =>
                  document.getElementById(`being-${id}`)?.scrollIntoView({ block: "center", behavior: "smooth" }),
                );
              }}
              onPlane={(p) => setPlane(plane === p ? null : p)}
              onTradition={(t) => setTradition(tradition === t ? null : t)}
            />
          </div>
        ))}
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
          The empty ground is the reading. No tradition here populates every stratum, and the ones
          that crowd the middle — the Greek daimonic, the Islamic and the Jewish angelic — are the
          traditions that built an explicit doctrine of what stands between. Where a band is bare
          the tradition is not silent; it has drawn its verticals somewhere else.
        </p>
      </ToolBand>

      {/* one tradition's own structure — only when a tradition is chosen, since
          the whole point is that these graphs do not join across traditions */}
      {tradition && (
        <ToolBand>
          <Eyebrow>Inside {tradition} · how its beings stand to one another</Eyebrow>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The one graph the register draws, and it stops at the tradition&rsquo;s edge. Every tie
            here is a relation the tradition&rsquo;s own sources make — a parentage, a rank, a god
            brought in against another, two names the texts move between — and none of them reaches
            out to another column of the field above, because a line drawn there would assert the
            identification this whole instrument exists to refuse. Take a node for its ties; take it
            again to open its row.
          </p>
          <KinGraph
            tradition={tradition}
            onPick={(id) => {
              setOpen(id);
              requestAnimationFrame(() =>
                document.getElementById(`being-${id}`)?.scrollIntoView({ block: "center", behavior: "smooth" }),
              );
            }}
          />
        </ToolBand>
      )}

      {/* the register */}
      <ToolBand>
        <div className="border-t border-border">
          {rows.map((b) => (
            <Row
              key={b.id}
              b={b}
              open={open === b.id}
              asked={being === b.id}
              onToggle={() => setOpen(open === b.id ? null : b.id)}
            />
          ))}
          {!rows.length && (
            <p className="py-10 text-sm text-muted-foreground">
              Nothing is filed under that pair yet.
            </p>
          )}
        </div>
      </ToolBand>

      {/* read across */}
      <ToolBand>
        <Eyebrow>Read across · one office, several traditions</Eyebrow>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The register's one comparative move, made carefully. Each row is a class of the volume's
          own devising, and the columns are what each tradition files there. Some cells are crowded
          and some are empty, and the empty ones are the finding:{" "}
          <span className="text-bone/90">
            a tradition with no adversaries is telling you something about its cosmology, not
            leaving a gap for a later editor to fill.
          </span>
        </p>
        <div className="mt-10 aoh-scroll-x overflow-x-auto">
          <table className="aoh-sticky-col w-full min-w-[52rem] border-collapse">
            <thead>
              <tr>
                <th className="border-b border-border py-3 pr-4 text-left font-label text-[9px] uppercase tracking-[0.14em] text-gold-dim">
                  Class
                </th>
                {TRADITION_ORDER.map((t) => (
                  <th key={t} className="border-b border-border px-2 py-3 text-left font-label text-[9px] uppercase tracking-[0.12em] text-gold-dim">
                    {t.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLASSES.map((c) => (
                <tr key={c.k}>
                  <td className="border-b border-border py-3 pr-4 align-top">
                    <button
                      onClick={() => set({ cls: cls === c.k ? undefined : c.k, tradition: undefined })}
                      className={`text-left font-serif text-base transition-colors ${cls === c.k ? "text-gold" : "text-bone/85 hover:text-gold"}`}
                    >
                      {c.label}
                    </button>
                  </td>
                  {TRADITION_ORDER.map((t) => {
                    const n = BEINGS.filter((b) => b.cls === c.k && b.tradition === t).length;
                    return (
                      <td key={t} className="border-b border-border px-2 py-3 align-top">
                        {n ? (
                          <button
                            onClick={() => set({ cls: c.k, tradition: t })}
                            className="font-label text-xs text-bone/80 transition-colors hover:text-gold"
                            aria-label={`${n} ${c.label} in the ${t} tradition`}
                          >
                            {"·".repeat(Math.min(n, 8))}
                            <span className="ml-1.5 text-muted-foreground">{n}</span>
                          </button>
                        ) : (
                          <span className="font-label text-xs text-bone/15">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
          Read the rows and the differences are structural. The messengers are an Abrahamic
          speciality and are thin everywhere else; the intermediary middle is where the Greek,
          Islamic and Indian populations are dense; and the personified powers — me, melammu, the
          Glory — are a category two traditions build on and most do not have at all.
        </p>
      </ToolBand>

      {/* the class vocabulary */}
      <ToolBand>
        <Eyebrow>The words each tradition sorts with</Eyebrow>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Before any comparison, this: the terms the sources themselves use for kinds of being. They
          do not line up, and the places where they refuse to line up are the most informative thing
          on this page.
        </p>
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {kinds.map((k) => (
            <div key={k.tr + k.tradition} className="border-t border-border pt-5">
              <div className="flex flex-wrap items-baseline gap-x-4">
                {k.orig && (
                  <Term script={k.script} orig={k.orig} label={`${k.tr} — ${k.gloss}`} className="text-2xl text-gold" />
                )}
                <p className="font-serif text-base italic text-bone/85">{k.tr}</p>
                <p className="font-label text-[9px] uppercase tracking-[0.15em] text-gold-dim">{k.tradition}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{k.gloss}</p>
              {k.note && <p className="mt-2 text-xs leading-relaxed text-bone/45">{k.note}</p>}
            </div>
          ))}
        </div>
      </ToolBand>

      {/* what is still missing */}
      <ToolBand>
        <Eyebrow>What the register does not yet hold</Eyebrow>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {spell(state.traditions)} populations are in, and none of them is complete: a tradition with a
          thousand named beings is represented here by the fifteen or so that carry its argument.
          Where a spelling could not be confirmed the entry stands in transliteration alone and says
          so rather than showing a plausible guess.
        </p>
        {/* Counted from the register itself rather than written down, so the page
            cannot quietly become wrong about its own state as entries are filled in. */}
        <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [state.total, "beings, across " + state.traditions + " traditions"],
            [state.scripts, "scripts, and " + state.noScript + " names that stand in transliteration alone"],
            [state.contested, "entries the sources themselves contest"],
            [state.noContext,
             state.noContext === 0
               ? "left with an office and no account — every entry now carries one"
               : "that carry an office and no account yet"],
          ].map(([n, label]) => (
            <div key={String(label)} className="border-t border-border pt-4">
              <p className="font-serif text-3xl text-gold">{n}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {state.byScript.map(([k, n]) => (
            <p key={k} className="font-label text-[9px] uppercase tracking-[0.14em] text-bone/45">
              {SCRIPTS[k].label} <span className="text-gold-dim">{n}</span>
            </p>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Every name was gathered against scholarly sources and then checked a second time by a
          reader whose only task was to break it. What that check could confirm is set; what it
          could not, is not. The figures above are counted from the register itself, not written
          down beside it, so the fourth of them falls as accounts are filled in and rises the moment
          one is withdrawn: an entry that carries an office and no narrative is one whose account
          did not survive the second reading, and a blank is more honest than a paragraph.{" "}
          <span className="text-bone/90">
            The notes say which script a name is in, what scheme its transliteration follows, and
            what was actually verified — not what would have been nice to claim.
          </span>
        </p>
      </ToolBand>
    </ToolFrame>
  );
}

function Row({ b, open, asked, onToggle }: { b: Being; open: boolean; asked: boolean; onToggle: () => void }) {
  return (
    <div
      id={`being-${b.id}`}
      className={`border-b border-border ${asked ? "border-l-2 border-l-gold pl-4 sm:pl-5" : ""}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="grid w-full grid-cols-[minmax(0,1fr)] gap-3 py-5 text-left transition-colors hover:bg-bone/[0.03] sm:grid-cols-[13rem_minmax(0,1fr)_9rem] sm:gap-6"
      >
        <div>
          {b.native?.orig ? (
            <Term
              script={b.native.script}
              orig={b.native.orig}
              label={`${b.native.tr} — ${b.name}`}
              className="block text-2xl text-gold"
            />
          ) : (
            <span className="font-label text-[9px] uppercase tracking-[0.15em] text-bone/60">
              spelling not set
            </span>
          )}
          <p className="mt-2 font-serif text-lg text-bone/90">{b.name}</p>
        </div>
        <div className="min-w-0">
          <p className="font-serif text-base italic text-gold-dim">{b.native?.tr}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.office}</p>
        </div>
        <div className="sm:text-right">
          <p className="font-label text-[9px] uppercase tracking-[0.14em] text-gold">{b.tradition}</p>
          <p className="mt-1 font-label text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            {classLabel(b.cls)} · {b.plane}
          </p>
          <p className="mt-1 font-label text-[9px] uppercase tracking-[0.14em] text-bone/60">
            {b.confidence}
          </p>
        </div>
      </button>
      {open && (
        <div className="grid gap-6 pb-8 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
          {/* The column the name hangs in carries where the being stands: the
              volume's own placement, and then the ties its tradition draws.
              The prose keeps the wider column to itself. */}
          <div className="hidden sm:block">
            {b.kin?.length ? (
              <div className="border-t border-gold/25 pt-4">
                <p className="font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
                  In its tradition
                </p>
                <ul className="mt-3 space-y-3">
                  {b.kin.map((k) => {
                    const other = BEINGS.find((x) => x.id === k.to);
                    if (!other) return null;
                    return (
                      <li key={k.to} className="text-xs leading-relaxed text-muted-foreground">
                        <Link
                          to="/phos/tools/beings"
                          search={{ being: other.id }}
                          className="block font-serif text-sm text-bone/90 underline-offset-4 transition-colors hover:text-gold hover:underline"
                        >
                          {other.name}
                        </Link>
                        {k.as}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="border-t border-border pt-4">
                <p className="font-label text-[9px] uppercase tracking-[0.2em] text-bone/30">
                  No tie recorded inside its own tradition
                </p>
              </div>
            )}
          </div>
          <div className="max-w-3xl">
            <p className="font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              Its own tradition calls it
            </p>
            <p className="mt-2 text-sm leading-relaxed text-bone/85">{b.kind}</p>
            {/* On a phone there is one column, so the ties follow the kind. */}
            {b.kin?.length ? (
              <div className="mt-6 border-l border-gold/25 pl-4 sm:hidden">
                <p className="font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
                  In its tradition
                </p>
                <ul className="mt-2 space-y-1.5">
                  {b.kin.map((k) => {
                    const other = BEINGS.find((x) => x.id === k.to);
                    if (!other) return null;
                    return (
                      <li key={k.to} className="text-sm leading-relaxed text-muted-foreground">
                        <Link
                          to="/phos/tools/beings"
                          search={{ being: other.id }}
                          className="font-serif text-bone/90 underline-offset-4 transition-colors hover:text-gold hover:underline"
                        >
                          {other.name}
                        </Link>
                        <span className="mx-2 text-bone/30">—</span>
                        {k.as}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{b.context}</p>
            {b.light && (
              <p className="mt-4 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-bone/80">
                {b.light}
              </p>
            )}
            {b.native?.note && (
              <p className="mt-4 text-xs leading-relaxed text-bone/45">{b.native.note}</p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-bone/45">{b.sources}</p>
            {b.entries?.length ? (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                <span className="font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
                  In the Portal
                </span>
                <span className="mt-2 block">
                  {b.entries.map((id, i) => {
                    const e = entryRef(id);
                    if (!e) return null;
                    return (
                      <span key={id}>
                        {i > 0 && <span className="mx-2 text-bone/30">·</span>}
                        <Link
                          to="/phos/$division/$entry"
                          params={{ division: e.division, entry: e.slug }}
                          className="text-gold-dim underline-offset-4 hover:text-gold hover:underline"
                        >
                          {e.title}
                        </Link>
                      </span>
                    );
                  })}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
