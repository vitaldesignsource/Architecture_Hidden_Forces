import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealVariant = "coalesce" | "rise" | "shimmer";

export interface RevealTextProps {
  /** The text to reveal. Split by spaces into words, then into characters. */
  text: string;
  /** HTML tag to render as. Defaults to <span>. */
  as?: ElementType;
  /** Extra classes applied to the outer element. */
  className?: string;
  /** Delay (seconds) before the first character animates in. */
  startDelay?: number;
  /** Delay (seconds) added per character. */
  perChar?: number;
  /** Duration (seconds) of each character animation. */
  duration?: number;
  /** Motion preset. */
  variant?: RevealVariant;
  /** Apply a slow gold shimmer sweep across the text after reveal. */
  shimmer?: boolean;
  /** Draw a thin underline beneath the text. */
  underline?: boolean;
  /** Starting blur amount in px (motion tuning). */
  blur?: number;
  /** Starting Y translate, e.g. "0.5em" or "20px". */
  translateY?: string;
  /** Starting scale factor. */
  scale?: number;
  /** Starting rotation in degrees. */
  rotate?: number;
  /** Starting letter-spacing (e.g. "0.4em"). */
  letterSpacing?: string;
  /** Extra inline styles. */
  style?: CSSProperties;
  /** Optional element rendered after the text (e.g. custom underline). */
  children?: ReactNode;
}

/**
 * RevealText — a configurable letter-by-letter reveal animation.
 *
 * Motion is driven by CSS custom properties so callers can tune the effect
 * without writing new keyframes. Safe for accessibility: the full text is
 * exposed via aria-label while individual chars are aria-hidden.
 */
export function RevealText({
  text,
  as: Tag = "span",
  className = "",
  startDelay = 0.15,
  perChar = 0.045,
  duration = 1.4,
  variant = "coalesce",
  shimmer = false,
  underline = false,
  blur = 18,
  translateY = "0.5em",
  scale = 1.35,
  rotate = -6,
  letterSpacing = "0.4em",
  style,
  children,
}: RevealTextProps) {
  const words = text.split(" ");
  let idx = 0;
  const totalChars = text.replace(/\s/g, "").length;
  const revealDoneAt = startDelay + totalChars * perChar + duration * 0.5;

  const cssVars = {
    "--rt-blur": `${blur}px`,
    "--rt-translate-y": translateY,
    "--rt-scale": String(scale),
    "--rt-rotate": `${rotate}deg`,
    "--rt-letter-spacing": letterSpacing,
    "--rt-duration": `${duration}s`,
  } as CSSProperties;

  const shimmerStyle: CSSProperties = shimmer
    ? { animationDelay: `${revealDoneAt.toFixed(2)}s` }
    : {};

  const underlineStyle: CSSProperties = underline
    ? { animationDelay: `${(revealDoneAt - 0.4).toFixed(2)}s` }
    : {};

  const inner = (
    <span
      className={`reveal-title rt-variant-${variant}${shimmer ? " title-shimmer" : ""}`}
      aria-label={text}
      style={{ ...cssVars, ...shimmerStyle }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="rt-word">
          {Array.from(word).map((ch) => {
            const delay = startDelay + idx * perChar;
            idx += 1;
            return (
              <span
                key={idx}
                className="rt-char"
                style={{ animationDelay: `${delay.toFixed(3)}s` }}
                aria-hidden="true"
              >
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="rt-space" aria-hidden="true" />}
        </span>
      ))}
    </span>
  );

  return (
    <Tag className={className} style={style}>
      {inner}
      {underline && (
        <span
          className="title-underline mt-3 block h-px w-24 origin-left bg-gold/70"
          style={underlineStyle}
          aria-hidden="true"
        />
      )}
      {children}
    </Tag>
  );
}

export default RevealText;
