import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { ContentsPanel } from "@/components/ContentsPanel";
import { CrossMark } from "@/components/CrossMark";
import { RevealText } from "@/components/RevealText";
import { useActiveSection, usePauseOffscreen, useReveal } from "@/hooks/useSectionEffects";
import { AQUIFER, STATIONS, type Station } from "@/lib/ecology";
import type { Entry } from "@/lib/contents";

/**
 * EcologyFrame — the page every station of the Hidden Ecology sits in.
 *
 * The header is the circulation itself: the six stations in the order the
 * ecology runs, the one you are on lit, and a return mark after the sixth,
 * because the sixth leads back to the first. Navigating the layer is meant to
 * reproduce its logic, so the frame does not offer a table of contents where
 * a reader expects one — it offers the next station.
 */

/** A small drawn return mark — the circulation closing — in the line weight
 *  of the CrossMark rather than a glyph the phone might set as an emoji. */
export function ReturnMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden focusable="false"
         className={`inline-block h-[0.72em] w-[0.72em] shrink-0 align-[0.06em] ${className}`}
         fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.6 6.2A3.6 3.6 0 1 1 6 2.6" />
      <path d="M6 1.2v2.8H3.2" />
    </svg>
  );
}

/** A drawn descent mark — a line finding the waterline — in the weight of
 *  the CrossMark and the ReturnMark, for the way beneath the stations. */
export function DescentMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden focusable="false"
         className={`inline-block h-[0.72em] w-[0.72em] shrink-0 align-[0.06em] ${className}`}
         fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 1.2v7.4" />
      <path d="M3.2 5.9 6 8.6l2.8-2.7" />
      <path d="M2 11h8" strokeOpacity="0.5" />
    </svg>
  );
}

/** The same mark rising: the way back up. */
export function AscentMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden focusable="false"
         className={`inline-block h-[0.72em] w-[0.72em] shrink-0 align-[0.06em] ${className}`}
         fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9.6V2.2" />
      <path d="M3.2 4.9 6 2.2l2.8 2.7" />
      <path d="M2 11h8" strokeOpacity="0.5" />
    </svg>
  );
}

const ROWS: Entry[] = [
  { n: "—", id: "top", t: "The Hidden Ecology of Formation", d: "The layer as a whole: the circulation, the spiral, the laws.", to: "/ecology" },
  ...STATIONS.map((s) => ({ n: s.n, id: s.id, t: s.title, d: s.dimension, to: s.to })),
  { n: AQUIFER.n, id: AQUIFER.id, t: AQUIFER.title, d: AQUIFER.dimension, to: AQUIFER.to },
];
const GROUPS = [
  { at: "top", k: "The layer" },
  { at: "morphaither", k: "The circulation, in order" },
  { at: "aquifer", k: "Beneath the circulation" },
];

export function EcologyFrame({
  station,
  title,
  children,
}: {
  /** The station this page is; undefined on the landing. */
  station?: Station;
  /** The landing's own title block, when there is no station. */
  title?: ReactNode;
  children: ReactNode;
}) {
  const active = useActiveSection();
  useReveal();
  usePauseOffscreen();
  const here = station?.id ?? "top";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-void/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:flex sm:justify-between">
          <Link to="/ecology" className="min-w-0">
            {/* The name gives way before the circulation does: the six stations keep their
                room at every desktop width, and the title shortens as the row fills. */}
            <div className="truncate font-serif text-base italic tracking-wide sm:text-lg">
              <span className="lg:hidden xl:inline">The Hidden </span>Ecology<span className="lg:hidden 2xl:inline"> of Formation</span>
            </div>
          </Link>
          <div className="flex shrink-0 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] 2xl:gap-6 2xl:tracking-[0.25em]">
            <div className="hidden items-center gap-4 lg:flex 2xl:gap-6">
              {STATIONS.map((s, i) => (
                <Link
                  key={s.id}
                  to={s.to}
                  aria-current={here === s.id ? "page" : undefined}
                  className={`whitespace-nowrap transition-colors hover:text-gold ${here === s.id ? "text-gold" : ""}`}
                  title={s.title}
                >
                  {i > 0 && <span className="mr-4 hidden text-bone/25 xl:inline 2xl:mr-6" aria-hidden>→</span>}
                  {s.title.replace(/^The /, "").replace(/ of .*$/, "")}
                </Link>
              ))}
              <Link to="/ecology/morphaither" className="text-gold-dim transition-colors hover:text-gold" title="The circulation returns to Morphaithēr">
                <ReturnMark />
              </Link>
              <Link
                to={AQUIFER.to}
                aria-current={here === AQUIFER.id ? "page" : undefined}
                className={`hidden whitespace-nowrap border-l border-border pl-4 transition-colors hover:text-gold xl:inline-flex xl:items-baseline xl:gap-2 2xl:pl-6 ${here === AQUIFER.id ? "text-gold" : "text-bone/70"}`}
                title="Beneath the stations: the Black Aquifer"
              >
                <DescentMark className="text-gold/60" />
                Aquifer
              </Link>
            </div>
            <Link
              to="/"
              className="hidden shrink-0 border-l border-border pl-4 font-serif text-sm normal-case tracking-normal text-bone/80 transition-colors hover:text-gold lg:block 2xl:pl-6"
            >
              The Architecture <CrossMark className="text-gold/70" />
            </Link>
            <ContentsPanel active={here} entries={ROWS} groups={GROUPS} paths={[]} indexHref="#top" volume="/ecology" />
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim lg:hidden">
            {station ? (station.beneath ? "Beneath" : `${station.n} · VI`) : "ΟΙΚΟΣ"}
          </div>
        </div>
        <div className="border-t border-border/50 lg:hidden">
          <div className="aoh-navstrip mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            {STATIONS.map((s) => (
              <Link key={s.id} to={s.to} aria-current={here === s.id ? "page" : undefined}
                    className={`whitespace-nowrap py-1 transition-colors hover:text-gold ${here === s.id ? "text-gold" : ""}`}>
                {s.title.replace(/^The /, "").replace(/ of .*$/, "")}
              </Link>
            ))}
            <Link to={AQUIFER.to} aria-current={here === AQUIFER.id ? "page" : undefined}
                  className={`inline-flex items-baseline gap-1.5 whitespace-nowrap border-l border-border py-1 pl-4 transition-colors hover:text-gold ${here === AQUIFER.id ? "text-gold" : "text-bone/70"}`}>
              <DescentMark className="text-gold/60" />
              Aquifer
            </Link>
            <Link to="/" className="ml-auto whitespace-nowrap border-l border-border py-1 pl-4 font-serif text-xs normal-case tracking-normal text-bone/80 transition-colors hover:text-gold">
              Architecture <CrossMark className="text-gold/70" />
            </Link>
          </div>
        </div>
      </nav>

      {station ? (
        <header id="top" className="relative isolate overflow-hidden pb-24 pt-40 sm:pb-32 sm:pt-52">
          <Backdrop src={`/bg/${station.backdrop}.webp`} opacity={0.34} position={station.position} scrim={0.26} fill />
          <div className="grain" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="animate-rise">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                The Hidden Ecology of Formation · {station.beneath ?? `Station ${station.n} of VI`}
              </p>
              <h1 className="mt-8 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
                <RevealText text={station.title} shimmer />
                {station.greek && (
                  <span className="mt-3 block font-serif text-2xl text-gold/70 sm:text-3xl" lang="grc">
                    {station.greek}
                  </span>
                )}
              </h1>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">{station.dimension}</p>
              <p className="mt-10 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone/90 sm:text-3xl">
                {station.question}
              </p>
              {/* thirty seconds: the whole station on one card */}
              <div className="mt-14 grid max-w-5xl gap-px border border-gold/30 bg-border/60 sm:grid-cols-[2fr_1fr]">
                <div className="bg-void/80 p-6 sm:p-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">In thirty seconds</p>
                  <p className="mt-4 text-base leading-relaxed text-bone/90">{station.definition}</p>
                </div>
                <div className="bg-void/80 p-6 sm:p-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">In one word</p>
                  <p className="mt-4 font-serif text-2xl text-gold">{station.shorthand}</p>
                  <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Read on for</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Five minutes in the sections; half an hour in what opens beneath them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        title
      )}

      {children}

      <footer className="border-t border-border bg-void py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:flex sm:justify-between">
          <div className="min-w-0 truncate font-serif text-sm italic text-muted-foreground">
            The Hidden Ecology of Formation — a layer of{" "}
            <Link to="/" className="underline-offset-4 hover:text-gold hover:underline">
              The Architecture of Hidden Forces
            </Link>
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.4em] text-gold-dim">MMXXVI</div>
        </div>
      </footer>
    </div>
  );
}

/** A section of a station page: isolated so its backdrop stays inside it. */
export function Band({
  id,
  backdrop,
  position = "center 50%",
  opacity = 0.22,
  scrim = 0.22,
  portrait = false,
  className = "",
  children,
}: {
  id: string;
  backdrop?: string;
  position?: string;
  opacity?: number;
  scrim?: number;
  portrait?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative isolate border-t border-border py-24 sm:py-32 ${className}`}>
      {backdrop && <Backdrop src={`/bg/${backdrop}.webp`} opacity={opacity} position={position} scrim={scrim} portrait={portrait} />}
      <div className="relative mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{children}</p>;
}
