import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { Term } from "@/components/Term";
import {
  BEINGS,
  CLASSES,
  KINDS,
  classLabel,
  type Being,
  type ClassKey,
} from "@/lib/phos/beings";

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
export const Route = createFileRoute("/phos_/tools_/beings")({
  head: () => ({ meta: [{ title: "The Register of Beings — Instruments — Phōs" }] }),
  component: Register,
});

function Register() {
  const [tradition, setTradition] = useState<string | null>(null);
  const [cls, setCls] = useState<ClassKey | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const traditions = useMemo(() => [...new Set(BEINGS.map((b) => b.tradition))].sort(), []);
  const rows = useMemo(
    () => BEINGS.filter((b) => (!tradition || b.tradition === tradition) && (!cls || b.cls === cls)),
    [tradition, cls],
  );
  const kinds = KINDS.filter((k) => !tradition || k.tradition === tradition);

  return (
    <ToolFrame
      name="The Register of Beings"
      title={<>Who populates the <span className="italic text-gold">middle of the world</span></>}
      lede="Every tradition here fills the space between the first principle and the body, and each fills it its own way and sorts it with its own words. The register sets ten of those populations side by side — each name in the script it was written in, each kind named as its own tradition names it, from cuneiform and hieroglyphs through Hebrew, Greek, Coptic, Avestan, Devanagari, Chinese and Arabic — without letting the comparison collapse them into one another."
      backdrop="archons"
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
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
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
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                tradition === t ? "border-gold bg-gold/10 text-gold" : "border-gold/40 text-bone/85 hover:border-gold/70 hover:text-gold"
              }`}
            >
              {t}
              <span className="ml-2 text-gold-dim">{BEINGS.filter((b) => b.tradition === t).length}</span>
            </button>
          ))}
        </div>
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
                className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
                  cls === c.k ? "border-gold text-gold" : n ? "border-border text-muted-foreground hover:border-gold/40" : "border-border/50 text-bone/25"
                }`}
              >
                {c.label} <span className="ml-1.5 opacity-70">{n}</span>
              </button>
            );
          })}
        </div>
      </ToolBand>

      {/* the register */}
      <ToolBand>
        <div className="border-t border-border">
          {rows.map((b) => (
            <Row key={b.id} b={b} open={open === b.id} onToggle={() => setOpen(open === b.id ? null : b.id)} />
          ))}
          {!rows.length && (
            <p className="py-10 text-sm text-muted-foreground">
              Nothing is filed under that pair yet.
            </p>
          )}
        </div>
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
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold-dim">{k.tradition}</p>
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
          Ten populations are in, and none of them is complete: a tradition with a thousand named
          beings is represented here by the fifteen or so that carry its argument. Where a spelling
          could not be confirmed the entry stands in transliteration alone and says so rather than
          showing a plausible guess — the Manichaean names, Zurvan, the Egyptian Ogdoad.
        </p>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Every name was gathered against scholarly sources and then checked a second time by a
          reader whose only task was to break it. What that check could confirm is set; what it
          could not, is not. Several entries therefore carry an office and a class and no narrative:
          the account offered did not survive the second reading, and a blank is more honest than a
          paragraph.{" "}
          <span className="text-bone/90">
            The notes say which script a name is in, what scheme its transliteration follows, and
            what was actually verified — not what would have been nice to claim.
          </span>
        </p>
      </ToolBand>
    </ToolFrame>
  );
}

function Row({ b, open, onToggle }: { b: Being; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
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
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-bone/35">
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
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-gold">{b.tradition}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            {classLabel(b.cls)} · {b.plane}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/35">
            {b.confidence}
          </p>
        </div>
      </button>
      {open && (
        <div className="grid gap-6 pb-8 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
          <div className="hidden sm:block" />
          <div className="max-w-3xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              Its own tradition calls it
            </p>
            <p className="mt-2 text-sm leading-relaxed text-bone/85">{b.kind}</p>
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
          </div>
        </div>
      )}
    </div>
  );
}
