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
  edgeFade = 13,
}: {
  src: string;
  opacity?: number;
  position?: string;
  /** Tall sources. A 4:5 frame loses 55% of its height to the wide band, so a
   *  portrait backdrop is a side panel matching the source aspect instead —
   *  uncropped, faded into the void along its inner edge. */
  portrait?: boolean;
  /** How far the left and right edges dissolve into the void, as a percentage of
   *  width. Without it a full-bleed band ends in a hard vertical cut wherever the
   *  source has content at its frame edge. 0 keeps the edges sharp. */
  edgeFade?: number;
  /** Void wash over the image. Bright sources need it to stay legible; dark,
   *  high-contrast sources are only flattened by it, so they take less. */
  scrim?: number;
  /** Cover the whole section even on narrow viewports. Only the hero wants this. */
  fill?: boolean;
}) {
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
               : portrait ? "aoh-bd-por absolute top-0 right-0"
                          : "aoh-bd absolute inset-x-0 top-0"
        }
        style={{ "--bd-o": opacity } as React.CSSProperties}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
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
