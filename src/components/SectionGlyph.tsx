export function SectionGlyph({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.06]"
      width="800"
      height="800"
      viewBox="-400 -400 800 800"
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <circle r="380" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <circle r="260" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <polygon points="0,-340 295,170 -295,170" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <polygon points="0,340 -295,-170 295,-170" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
    </svg>
  );
}
