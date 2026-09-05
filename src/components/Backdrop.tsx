import { useEffect, useRef } from "react";
import type React from "react";

/**
 * Backdrop — a photographic ground behind a section.
 * The palette is near-black (--void is oklch 0.06), so the image carries as
 * atmosphere rather than picture: dimmed, scrimmed, and faded at top and bottom
 * so the section borders still read as rules rather than as photo edges.
 * Self-contained (-z-10 + its own overflow clip), so no section class changes.
 */
export function Backdrop({
  src,
  opacity = 0.3,
  position = "center",
  fill = false,
  scrim = 0.4,
  portrait = false,
  anchor = "right",
  edgeFade = 13,
  priority = false,
}: {
  src: string;
  opacity?: number;
  position?: string;
  /** Tall sources. A 4:5 frame loses 55% of its height to the wide band, so a
   *  portrait backdrop is a side panel matching the source aspect instead —
   *  uncropped, faded into the void along its inner edge. */
  portrait?: boolean;
  /** Which edge a portrait panel is pinned to. A left-anchored panel spans the
   *  full height of its block and fades out rightward across the text, rather
   *  than sitting beside it. */
  anchor?: "left" | "right";
  /** How far the left and right edges dissolve into the void, as a percentage of
   *  width. Without it a full-bleed band ends in a hard vertical cut wherever the
   *  source has content at its frame edge. 0 keeps the edges sharp. */
  edgeFade?: number;
  /** Void wash over the image. Bright sources need it to stay legible; dark,
   *  high-contrast sources are only flattened by it, so they take less. */
  scrim?: number;
  /** Cover the whole section even on narrow viewports. Only the hero wants this. */
  fill?: boolean;
  /** The first screen's image, fetched eagerly and first. One per page: the
   *  four full-height backdrops far down the treatise are not it. */
  priority?: boolean;
}) {
  // A band or a panel is drawn far smaller than its 1920px source, and on a
  // phone at three device pixels per CSS pixel still needs no more than 1320
  // of them, so each source has an 800 and a 1320 wide sibling written at
  // build (scripts/backdrops.mjs) and the browser picks by the box it fills.
  // The hero keeps the whole file: on a phone it is bound by height and a
  // narrower candidate would only blur.
  const w800 = src.replace("/bg/", "/bg/w800/");
  const w1320 = src.replace("/bg/", "/bg/w1320/");
  const sizes = portrait
    ? anchor === "left" ? "(min-width: 1024px) min(54vw, 46rem), 100vw" : "(min-width: 1024px) min(59.2vh, 688px), min(36.8vh, 344px)"
    : "100vw";
  // `-z-10` escapes to the root stacking context unless the containing section
  // isolates. Relying on an author to remember `isolate` has failed four times in
  // this file — every recurrence made a backdrop silently invisible. So the
  // component guarantees it instead of trusting the call site. The classes stay on
  // the sections too, which keeps the guarantee free of any first-paint flash.
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = host.current?.parentElement;
    if (parent && getComputedStyle(parent).isolation !== "isolate") {
      parent.style.isolation = "isolate";
    }
  }, []);

  return (
    <div
      ref={host}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
        fill ? "" : "aoh-bd-host"
      }`}
      aria-hidden
    >
      {/*
        Sources are all 16:9. On wide viewports a section is broad enough that
        object-cover crops gently. On tablet and below the same section is many
        thousands of pixels tall, so cover scales to the HEIGHT and shows a sliver
        of the source width — measured at a median of 10%, and 5% on § IV. So below
        lg the backdrop stops covering and becomes a band at the top of the section,
        showing the whole composition at its own scale before dissolving into void.
      */}
      <div
        className={
          fill ? "aoh-bd-fill absolute inset-0"
               : portrait
                 ? anchor === "left"
                   ? "aoh-bd-por-l absolute top-0 left-0"
                   : "aoh-bd-por absolute top-0 right-0"
                          : "aoh-bd absolute inset-x-0 top-0"
        }
        style={{ "--bd-o": opacity } as React.CSSProperties}
      >
        <img
          src={src}
          srcSet={fill ? undefined : `${w800} 800w, ${w1320} 1320w, ${src} 1920w`}
          sizes={fill ? undefined : sizes}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="aoh-bd-img h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-0 bg-void" style={{ opacity: scrim }} />
        {edgeFade > 0 && !portrait && !fill && (
          <div
            className="aoh-bd-scrim absolute inset-0"
            style={{
              background: `linear-gradient(to right, var(--void) 0%, transparent ${edgeFade}%, transparent ${100 - edgeFade}%, var(--void) 100%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * WuxingCycles — the Five Phases as the two diagrams they actually are.
 * Generating runs clockwise round the rim; regulating cuts across as a pentagram,
 * each phase checking the one two steps on. Fire sits at the top, as in the
 * traditional arrangement where south is up.
 */
