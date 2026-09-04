/**
 * CrossMark — the mark on a link that leaves for the other volume.
 *
 * U+2197 was doing this work, and on iOS and Android it carries emoji
 * presentation by default: a blue rounded tile beside the serif. Drawn instead,
 * it takes the current colour, sits on the same optical weight as the rest of
 * the line art, and lifts a little when the link is hovered.
 */
export function CrossMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      focusable="false"
      className={`aoh-crossmark inline-block h-[0.72em] w-[0.72em] shrink-0 align-[0.06em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.4 8.6 8.7 3.3" />
      <path d="M4.6 3.3h4.1v4.1" />
    </svg>
  );
}
