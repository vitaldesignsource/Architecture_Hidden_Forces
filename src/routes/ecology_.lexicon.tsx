import { createFileRoute, Link } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { RevealText } from "@/components/RevealText";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Arch } from "@/components/ecology/Pointers";
import { PROVINCES, STATIONS } from "@/lib/ecology";

/**
 * The Lexicon — the layer's coined vocabulary, each term defined once.
 *
 * The Architecture names processes that esoteric language leaves vague, and
 * the names are made to interlock: Cryptodynamis is what secretly has
 * power; Katadynamis is that power descending; Morphoflux is formative
 * movement; Aitherostasis its stabilisation; Hieropyrosis sacred ignition;
 * Hierostasis sacred persistence; a Morphorelic what form leaves actively
 * behind; and Vestigia the traces by which the whole hidden process becomes
 * partly knowable. Grouped by root, so the grammar shows, with the page
 * where each term is put to work.
 */
export const Route = createFileRoute("/ecology_/lexicon")({
  head: () => ({
    meta: [
      { title: "The Lexicon — The Hidden Ecology of Formation" },
      { name: "description", content: "The coined vocabulary of the Hidden Ecology, defined once and grouped by root: the morph-, aither-, pneum-, hier- and crypt- families, descent and return, and the whole condition called Ontic Weather." },
    ],
  }),
  component: Lexicon,
});

import { FAMILIES } from "@/lib/lexicon";

function Lexicon() {
  const count = FAMILIES.reduce((n, f) => n + f.terms.length, 0);
  return (
    <EcologyFrame
      page="lexicon"
      title={
        <header id="top" className="relative isolate overflow-hidden pb-24 pt-40 sm:pb-32 sm:pt-52">
          <Backdrop src="/bg/spiral-apothecary-of-lit-vials.webp" opacity={0.3} position="center 50%" scrim={0.28} fill />
          <div className="grain" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="animate-rise">
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
                The Hidden Ecology of Formation · Apparatus
              </p>
              <h1 className="mt-8 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
                <RevealText text="The Lexicon" shimmer />
              </h1>
              <p className="mt-6 font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                {count} coined terms · defined once · grouped by root
              </p>
              <p className="mt-10 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone/90 sm:text-3xl">
                A language of hidden potency, descent, transmission, formation, stabilisation,
                persistence, memory and return.
              </p>
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
                The terms are made to interlock, which is what makes them a vocabulary rather than a
                collection of neologisms. Cryptodynamis concerns what secretly possesses power;
                Katadynamis describes power descending toward manifestation; Morphoflux describes
                formative movement; Aitherostasis its stabilisation; Hieropyrosis sacred ignition;
                Hierostasis sacred persistence; a Morphorelic what form leaves actively behind; and
                Vestigia are the traces through which the whole hidden process becomes partly
                knowable. Each entry says where in the layer the term is put to work. Coinages from
                Greek roots are marked as such, as the treatise marks Morphaithēr: technical, modern,
                and not attested ancient terms.
              </p>
            </div>
          </div>
        </header>
      }
    >
      {FAMILIES.map((f) => (
        <Band key={f.id} id={f.id} backdrop={f.backdrop} opacity={f.portrait ? 0.18 : 0.14} position="center 50%" portrait={f.portrait}>
          <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{f.k}</Eyebrow>
              <p className="mt-4 font-serif text-2xl text-gold/80" lang="grc">{f.root}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
            </div>
            <div className="border-t border-border">
              {f.terms.map((t) => (
                <div key={t.k} className="grid gap-3 border-b border-border py-6 lg:grid-cols-[13rem_1fr] lg:gap-8">
                  <div>
                    <p className="font-serif text-xl text-bone">{t.k}</p>
                    {t.root && <p className="mt-1 font-serif text-sm italic text-gold/70">{t.root}</p>}
                    {t.at && (
                      <p className="mt-3 font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
                        <Link to={t.at.to} hash={t.at.hash} className="transition-colors hover:text-gold">
                          at work · {t.at.label}
                        </Link>
                      </p>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Band>
      ))}

      {/* ---- where the words belong ---- */}
      <Band id="eco-lx-where">
        <Eyebrow>Where the words belong</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Six stations, six provinces, <span className="italic text-gold">one vocabulary</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The treatise's own <Arch id="terms">five terms</Arch> — matter, form, force, field, centre —
          stand beneath all of these; the lexicon names what happens between them. Every station and
          province of the layer uses the vocabulary above, and each is the place where a handful of its
          words are put to work.
        </p>
        <div className="mt-10 grid gap-px border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {[...STATIONS, ...PROVINCES].map((s) => (
            <Link key={s.id} to={s.to} className="group flex flex-col bg-void p-5 transition-colors hover:bg-gold/5">
              <span className="font-label text-[9px] uppercase tracking-[0.25em] text-gold-dim">{s.region ?? `Station ${s.n}`}</span>
              <span className="mt-3 font-serif text-lg leading-tight text-bone transition-colors group-hover:text-gold">{s.title}</span>
              <span className="mt-2 font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{s.shorthand}</span>
            </Link>
          ))}
        </div>
      </Band>
    </EcologyFrame>
  );
}
