/**
 * The markdown subset the encyclopaedia's entries are written in.
 *
 * Deliberately small: the site has one typographic system and every block here
 * maps onto one of its existing styles, so an entry cannot drift from the two
 * treatises by formatting alone. What is supported:
 *
 *   ## Heading          the mono-caps eyebrow that opens a subsection
 *   ### Heading         a serif run-in subhead
 *   paragraph           blank-line separated; a line break inside is a space
 *   > quote             a pull quote; a final "> — Name" line is its attribution
 *   - item / 1. item    lists
 *   :: aside            a small, muted paragraph — a caveat or a note
 *   ---                 a hairline rule
 *
 *   *em*  **strong**  `mono`  [text](url)  [[xv-83]]  [[xv-83|On Light]]
 *
 * [[id]] is a cross-reference to another entry by its id; the renderer looks
 * the title up. Everything else is text. No HTML, no tables, no images —
 * a figure that matters is a component, as it is everywhere else on the site.
 */

export type Inline =
  | { t: "text"; v: string }
  | { t: "em"; c: Inline[] }
  | { t: "strong"; c: Inline[] }
  | { t: "code"; v: string }
  | { t: "link"; href: string; c: Inline[] }
  | { t: "ref"; id: string; label: string | null };

export type Block =
  | { t: "p"; c: Inline[] }
  | { t: "aside"; c: Inline[] }
  | { t: "h2"; c: Inline[] }
  | { t: "h3"; c: Inline[] }
  | { t: "quote"; lines: Inline[][]; cite: Inline[] | null }
  | { t: "ul"; items: Inline[][] }
  | { t: "ol"; items: Inline[][]; start: number }
  | { t: "rule" }
  | { t: "figure"; name: string };

const INLINE =
  /(`[^`\n]+`)|(\[\[([a-z]+-\d+)(?:\|([^\]]+))?\]\])|(\[([^\]\n]+)\]\(([^)\s]+)\))|(\*\*([^*\n](?:[^\n]*?[^*\n])?)\*\*)|(\*([^*\s](?:[^*\n]*?[^*\s])?)\*)|(_([^_\s](?:[^_\n]*?[^_\s])?)_)/;

export function parseInline(s: string): Inline[] {
  const out: Inline[] = [];
  let rest = s;
  while (rest.length) {
    const m = INLINE.exec(rest);
    if (!m) { out.push({ t: "text", v: rest }); break; }
    if (m.index > 0) out.push({ t: "text", v: rest.slice(0, m.index) });
    if (m[1]) out.push({ t: "code", v: m[1].slice(1, -1) });
    else if (m[2]) out.push({ t: "ref", id: m[3], label: m[4] ?? null });
    else if (m[5]) out.push({ t: "link", href: m[7], c: parseInline(m[6]) });
    else if (m[8]) out.push({ t: "strong", c: parseInline(m[9]) });
    else if (m[10]) out.push({ t: "em", c: parseInline(m[11]) });
    else if (m[12]) out.push({ t: "em", c: parseInline(m[13]) });
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

export function parseMarkdown(body: string): Block[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  const flushPara = (buf: string[], aside: boolean) => {
    const text = buf.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push(aside ? { t: "aside", c: parseInline(text) } : { t: "p", c: parseInline(text) });
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    if (/^---+$/.test(trimmed)) { blocks.push({ t: "rule" }); i++; continue; }

    // `::figure <Name>` — a drawn figure from the Diagram Library, set into the
    // entry. Distinct from the `:: ` aside by having no space after the colons.
    const fig = trimmed.match(/^::figure\s+(.+)$/);
    if (fig) { blocks.push({ t: "figure", name: fig[1].trim() }); i++; continue; }

    if (trimmed.startsWith("### ")) { blocks.push({ t: "h3", c: parseInline(trimmed.slice(4)) }); i++; continue; }
    if (trimmed.startsWith("## ")) { blocks.push({ t: "h2", c: parseInline(trimmed.slice(3)) }); i++; continue; }

    if (trimmed.startsWith(">")) {
      const raw: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) { raw.push(lines[i].trim().replace(/^>\s?/, "")); i++; }
      let cite: Inline[] | null = null;
      const last = raw[raw.length - 1] ?? "";
      if (raw.length > 1 && /^[—–-]\s*\S/.test(last)) { cite = parseInline(last.replace(/^[—–-]\s*/, "")); raw.pop(); }
      // blank ">" lines separate stanzas; runs of text are joined
      const stanzas: string[] = [];
      let cur: string[] = [];
      for (const r of raw) { if (!r.trim()) { if (cur.length) { stanzas.push(cur.join(" ")); cur = []; } } else cur.push(r); }
      if (cur.length) stanzas.push(cur.join(" "));
      blocks.push({ t: "quote", lines: stanzas.map((s) => parseInline(s.replace(/\s+/g, " ").trim())), cite });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) { items.push(parseInline(lines[i].trim().replace(/^[-*]\s+/, ""))); i++; }
      blocks.push({ t: "ul", items });
      continue;
    }

    const ol = trimmed.match(/^(\d+)\.\s+/);
    if (ol) {
      const items: Inline[][] = [];
      const start = Number(ol[1]);
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) { items.push(parseInline(lines[i].trim().replace(/^\d+\.\s+/, ""))); i++; }
      blocks.push({ t: "ol", items, start });
      continue;
    }

    const aside = trimmed.startsWith(":: ");
    const buf: string[] = [aside ? trimmed.slice(3) : trimmed];
    i++;
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t || /^(---+|##? |### |>|[-*]\s+|\d+\.\s+|:: |::figure )/.test(t)) break;
      buf.push(t);
      i++;
    }
    flushPara(buf, aside);
  }
  return blocks;
}

/** Plain text of an inline run — for titles in link labels and the like. */
export function inlineText(c: Inline[]): string {
  return c
    .map((n) => (n.t === "text" || n.t === "code" ? n.v : n.t === "ref" ? (n.label ?? n.id) : inlineText(n.c)))
    .join("");
}
