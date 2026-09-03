import type { ReactNode } from "react";

/**
 * SymbolGlyph — the symbol facet's vocabulary, drawn.
 *
 * One small line drawing per symbol, in the volume's gold on the void, so the
 * atlas reads as a set of sigils rather than a list of words. Each is the
 * simplest figure that is still unmistakably that symbol: the menorah has its
 * seven flames, the barque carries its disc, the black sun is the one filled
 * shape in the set.
 */
export function SymbolGlyph({ name, size = 56, className = "" }: { name: string; size?: number; className?: string }) {
  const body = GLYPHS[name];
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={name}
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {body ?? <circle cx="32" cy="32" r="18" strokeDasharray="3 4" />}
    </svg>
  );
}

const rays = (cx: number, cy: number, r0: number, r1: number, n: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + offset;
    return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} />;
  });

const GLYPHS: Record<string, ReactNode> = {
  Point: <circle cx="32" cy="32" r="3.5" fill="var(--gold)" stroke="none" />,
  Ray: (
    <>
      <line x1="12" y1="52" x2="50" y2="14" />
      <path d="M40 14 H50 V24" />
    </>
  ),
  Circle: <circle cx="32" cy="32" r="20" />,
  "Solar Disc": (
    <>
      <circle cx="32" cy="32" r="11" />
      {rays(32, 32, 16, 24, 8, Math.PI / 8)}
    </>
  ),
  Sphere: (
    <>
      <circle cx="32" cy="32" r="20" />
      <ellipse cx="32" cy="32" rx="20" ry="7" opacity="0.6" />
      <ellipse cx="32" cy="32" rx="7" ry="20" opacity="0.6" />
    </>
  ),
  Triangle: <path d="M32 12 L54 50 H10 Z" />,
  Vesica: (
    <>
      <circle cx="24" cy="32" r="16" opacity="0.5" />
      <circle cx="40" cy="32" r="16" opacity="0.5" />
      <path d="M32 18.1 A16 16 0 0 1 32 45.9 A16 16 0 0 1 32 18.1 Z" strokeWidth="2" />
    </>
  ),
  Spiral: <path d="M32 32 c0 -3 4 -3 4 0 c0 5 -8 5 -8 0 c0 -8 12 -8 12 0 c0 11 -16 11 -16 0 c0 -14 20 -14 20 0 c0 17 -24 17 -24 0" />,
  Prism: (
    <>
      <path d="M32 14 L50 46 H14 Z" />
      <line x1="6" y1="28" x2="22" y2="35" />
      <line x1="42" y1="37" x2="58" y2="30" opacity="0.9" />
      <line x1="42" y1="38" x2="58" y2="38" opacity="0.7" />
      <line x1="42" y1="39" x2="58" y2="46" opacity="0.5" />
    </>
  ),
  Rainbow: (
    <>
      <path d="M12 46 A20 20 0 0 1 52 46" />
      <path d="M18 46 A14 14 0 0 1 46 46" opacity="0.7" />
      <path d="M24 46 A8 8 0 0 1 40 46" opacity="0.45" />
    </>
  ),
  Eye: (
    <>
      <path d="M8 32 Q32 10 56 32 Q32 54 8 32 Z" />
      <circle cx="32" cy="32" r="7" />
      <circle cx="32" cy="32" r="2.5" fill="var(--gold)" stroke="none" />
    </>
  ),
  Lamp: (
    <>
      <path d="M12 38 H52 L46 48 H18 Z" />
      <path d="M52 38 L58 34" />
      <path d="M32 36 C26 30 30 26 32 20 C34 26 38 30 32 36 Z" />
      <line x1="22" y1="54" x2="42" y2="54" />
    </>
  ),
  Torch: (
    <>
      <path d="M26 30 H38 L34 56 H30 Z" />
      <path d="M32 30 C24 22 30 16 32 8 C34 16 40 22 32 30 Z" />
    </>
  ),
  Flame: <path d="M32 8 C24 20 19 30 22 42 C24 50 40 50 42 42 C44 32 38 26 35 20 C36 28 30 32 32 8 Z" />,
  "Lightning Bolt": <path d="M36 6 L20 36 H32 L26 58 L46 26 H34 Z" />,
  Crown: <path d="M12 46 V22 L24 34 L32 16 L40 34 L52 22 V46 Z" />,
  Halo: (
    <>
      <ellipse cx="32" cy="18" rx="14" ry="4" />
      <circle cx="32" cy="36" r="10" />
      <path d="M16 58 C18 48 46 48 48 58" />
    </>
  ),
  Mandorla: (
    <>
      <path d="M32 6 C18 18 18 46 32 58 C46 46 46 18 32 6 Z" />
      <line x1="32" y1="22" x2="32" y2="44" opacity="0.6" />
    </>
  ),
  Star: <path d="M32 8 L35 29 L56 32 L35 35 L32 56 L29 35 L8 32 L29 29 Z" />,
  "Winged Solar Disc": (
    <>
      <circle cx="32" cy="30" r="8" />
      <path d="M24 30 C16 20 8 24 4 34 C12 30 18 31 24 34" />
      <path d="M40 30 C48 20 56 24 60 34 C52 30 46 31 40 34" />
    </>
  ),
  "Solar Barque": (
    <>
      <path d="M8 40 Q32 52 56 40 L50 47 H14 Z" />
      <circle cx="32" cy="27" r="7" />
      <line x1="32" y1="34" x2="32" y2="42" opacity="0.6" />
    </>
  ),
  Lotus: (
    <>
      <path d="M32 52 C20 46 15 33 19 20 C26 28 30 38 32 52 Z" />
      <path d="M32 52 C44 46 49 33 45 20 C38 28 34 38 32 52 Z" />
      <path d="M32 52 C26 42 26 24 32 12 C38 24 38 42 32 52 Z" />
    </>
  ),
  Menorah: (
    <>
      <line x1="20" y1="56" x2="44" y2="56" />
      <line x1="32" y1="56" x2="32" y2="22" />
      <path d="M32 44 C32 32 12 32 12 22" />
      <path d="M32 44 C32 32 52 32 52 22" />
      <path d="M32 40 C32 31 19 31 19 22" />
      <path d="M32 40 C32 31 45 31 45 22" />
      <path d="M32 36 C32 30 26 30 26 22" />
      <path d="M32 36 C32 30 38 30 38 22" />
      {[12, 19, 26, 32, 38, 45, 52].map((x) => (
        <circle key={x} cx={x} cy="17" r="1.8" fill="var(--gold)" stroke="none" />
      ))}
    </>
  ),
  "Cross of Light": (
    <>
      <path d="M32 8 V56 M8 32 H56" />
      <path d="M18 18 L24 24 M46 18 L40 24 M18 46 L24 40 M46 46 L40 40" opacity="0.6" />
    </>
  ),
  "Radiant Heart": (
    <>
      <path d="M32 52 C18 40 12 32 14 24 C16 16 26 16 32 24 C38 16 48 16 50 24 C52 32 46 40 32 52 Z" />
      <path d="M32 10 V4 M16 12 L12 8 M48 12 L52 8" opacity="0.7" />
    </>
  ),
  Mirror: (
    <>
      <ellipse cx="32" cy="26" rx="14" ry="18" />
      <path d="M32 44 V54 M22 56 H42" />
    </>
  ),
  Crystal: <path d="M32 6 L42 16 V44 L32 58 L22 44 V16 Z M22 16 L32 22 L42 16 M32 22 V58" />,
  Gold: (
    <>
      <circle cx="32" cy="32" r="16" />
      <circle cx="32" cy="32" r="3" fill="var(--gold)" stroke="none" />
    </>
  ),
  "Black Sun": (
    <>
      <circle cx="32" cy="32" r="11" fill="var(--void)" />
      {rays(32, 32, 14, 24, 12)}
    </>
  ),
  Cave: (
    <>
      <path d="M6 56 H58" />
      <path d="M12 56 V34 A20 20 0 0 1 52 34 V56" />
      <path d="M22 56 V40 A10 10 0 0 1 42 40 V56 Z" fill="var(--void)" />
    </>
  ),
  Crypt: (
    <>
      <path d="M6 24 H58" />
      <path d="M14 52 V34 A18 12 0 0 1 50 34 V52 Z" />
      <path d="M26 24 V30 H32 V36 H38" opacity="0.7" />
    </>
  ),
  Temple: (
    <>
      <path d="M8 24 L32 10 L56 24 Z" />
      <path d="M10 24 H54 V30 H10 Z" />
      {[14, 23, 32, 41, 50].map((x) => (
        <line key={x} x1={x} y1="30" x2={x} y2="50" />
      ))}
      <path d="M8 50 H56 V56 H8 Z" />
    </>
  ),
};
