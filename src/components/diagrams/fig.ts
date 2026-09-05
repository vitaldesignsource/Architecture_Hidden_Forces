import type { CSSProperties } from "react";

/**
 * Drawings letter themselves in user units, so a label that reads at 10px on
 * a desktop shrinks with the figure on a phone until it cannot be read at
 * all. `fs` sizes a label through one custom property, `--aoh-k`, which
 * styles.css raises on narrow screens for any figure that carries the
 * `aoh-fig` class — and leaves at 1 everywhere else, so a drawing that
 * cannot afford larger lettering simply does not opt in.
 */
export const fs = (n: number): CSSProperties => ({ fontSize: `calc(${n}px * var(--aoh-k, 1))` });
