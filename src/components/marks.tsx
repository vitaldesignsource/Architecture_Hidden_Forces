/**
 * The small drawn marks a label needs where it once used an arrow glyph.
 *
 * Cinzel carries no arrows, so → ← ↻ ⇄ ↑↓ fell out of the label face into
 * whichever font the device found next: a hairline serif arrow beside heavy
 * capitals, or a system glyph of another weight altogether. Drawn instead, in
 * the line of the CrossMark, they take the current colour and sit on the same
 * optical weight as the lettering around them.
 */
function Mark({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      focusable="false"
      className={`inline-block h-[0.72em] w-[0.72em] shrink-0 align-[0.06em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** → onward, to the next thing in a sequence or the page a card opens. */
export function ArrowMark({ className = "" }: { className?: string }) {
  return (
    <Mark className={className}>
      <path d="M1.6 6h8.6" />
      <path d="M6.8 2.6 10.2 6l-3.4 3.4" />
    </Mark>
  );
}

/** ← back, to the previous thing. */
export function BackMark({ className = "" }: { className?: string }) {
  return (
    <Mark className={className}>
      <path d="M10.4 6H1.8" />
      <path d="M5.2 2.6 1.8 6l3.4 3.4" />
    </Mark>
  );
}

/** ↺ a sequence that closes on its own beginning. */
export function CycleMark({ className = "" }: { className?: string }) {
  return (
    <Mark className={className}>
      <path d="M9.6 6.2A3.6 3.6 0 1 1 6 2.6" />
      <path d="M6 1.2v2.8H3.2" />
    </Mark>
  );
}

/** ↻ a wheel turned a step onward. */
export function TurnMark({ className = "" }: { className?: string }) {
  return (
    <Mark className={className}>
      <path d="M2.4 6.2A3.6 3.6 0 1 0 6 2.6" />
      <path d="M6 1.2v2.8h2.8" />
    </Mark>
  );
}

/** ⇄ two things exchanged. */
export function SwapMark({ className = "" }: { className?: string }) {
  return (
    <Mark className={className}>
      <path d="M1.8 4h8.4" />
      <path d="M7.8 1.8 10.2 4 7.8 6.2" />
      <path d="M10.2 8.4H1.8" />
      <path d="M4.2 6.2 1.8 8.4l2.4 2.2" />
    </Mark>
  );
}

/** ↵ the key that takes a chosen thing. */
export function EnterMark({ className = "" }: { className?: string }) {
  return (
    <Mark className={className}>
      <path d="M10 2.2v5H3.2" />
      <path d="M5.6 4.6 3 7.2l2.6 2.6" />
    </Mark>
  );
}

/** ↑↓ a direction that can be reversed. */
export function UpDownMark({ className = "" }: { className?: string }) {
  return (
    <Mark className={className}>
      <path d="M3.8 10.4V1.8" />
      <path d="M1.6 4 3.8 1.8 6 4" />
      <path d="M8.2 1.6v8.6" />
      <path d="M6 8 8.2 10.2 10.4 8" />
    </Mark>
  );
}
