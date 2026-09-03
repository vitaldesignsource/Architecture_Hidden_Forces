import { Link } from "@tanstack/react-router";
import { figure } from "@/lib/phos/figures";
import { FigureFrame } from "@/components/phos/FigureFrame";
import type { ReactNode } from "react";
import { parseMarkdown, type Block, type Inline } from "@/lib/phos/markdown";
import { entryById } from "@/lib/phos/entries";

/**
 * EntryBody — an entry's markdown, set in the site's own type.
 *
 * Every block maps to a style the two treatises already use, so an entry reads
 * as a page of the same work and not as a document dropped into it. The first
 * paragraph is set larger, as the opening paragraph of a section is; "##"
 * headings become the mono-caps eyebrows that open subsections; quotes take the
 * gold hairline; asides are the small muted notes the treatises use for caveats.
 *
 * [[id]] references resolve to the entry's title and link to it. If the entry
 * is registered but not yet written, the link still lands on its page, which
 * says so — a dead reference is never silently dropped.
 */
export function EntryBody({ body, className = "" }: { body: string; className?: string }) {
  const blocks = parseMarkdown(body);
  let paragraphs = 0;
  return (
    <div className={className}>
      {blocks.map((b, i) => {
        if (b.t === "p") paragraphs++;
        return <BlockView key={i} b={b} lead={b.t === "p" && paragraphs === 1} />;
      })}
    </div>
  );
}

function BlockView({ b, lead }: { b: Block; lead: boolean }) {
  switch (b.t) {
    case "p":
      return (
        <p className={`max-w-3xl leading-relaxed text-muted-foreground ${lead ? "mt-8 text-lg" : "mt-6 text-base"}`}>
          <InlineView c={b.c} />
        </p>
      );
    case "aside":
      return (
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
          <InlineView c={b.c} />
        </p>
      );
    case "h2":
      return (
        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
          <InlineView c={b.c} />
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-10 max-w-3xl font-serif text-2xl leading-tight text-bone">
          <InlineView c={b.c} />
        </h3>
      );
    case "quote":
      return (
        <blockquote className="mt-8 max-w-3xl border-l-2 border-gold/40 pl-5">
          {b.lines.map((line, i) => (
            <p key={i} className={`font-serif text-xl leading-relaxed text-bone/85 ${i ? "mt-3" : ""}`}>
              <InlineView c={line} />
            </p>
          ))}
          {b.cite && (
            <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              — <InlineView c={b.cite} />
            </footer>
          )}
        </blockquote>
      );
    case "ul":
      return (
        <ul className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-muted-foreground">
          {b.items.map((it, i) => (
            <li key={i} className="grid grid-cols-[1rem_1fr] gap-3">
              <span className="text-gold/70">·</span>
              <span><InlineView c={it} /></span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-muted-foreground">
          {b.items.map((it, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim pt-1">
                {String(b.start + i).padStart(2, "0")}
              </span>
              <span><InlineView c={it} /></span>
            </li>
          ))}
        </ol>
      );
    case "rule":
      return <div className="my-12 h-px w-24 bg-gold/40" />;
    case "figure": {
      const f = figure(b.name);
      // A named figure that does not exist is a writing error, and the audit
      // fails on it; in the page it simply draws nothing rather than throwing.
      return f ? <FigureFrame f={f} /> : null;
    }
  }
}

function InlineView({ c }: { c: Inline[] }) {
  return (
    <>
      {c.map((n, i) => (
        <InlineNode key={i} n={n} />
      ))}
    </>
  );
}

function InlineNode({ n }: { n: Inline }): ReactNode {
  switch (n.t) {
    case "text":
      return n.v;
    case "em":
      return <em className="italic text-bone/90"><InlineView c={n.c} /></em>;
    case "strong":
      return <span className="text-bone/90"><InlineView c={n.c} /></span>;
    case "code":
      return <span className="font-mono text-[0.85em] text-gold-dim">{n.v}</span>;
    case "link":
      return <SmartLink href={n.href}><InlineView c={n.c} /></SmartLink>;
    case "ref": {
      const e = entryById(n.id);
      if (!e) return <span className="text-bone/50" title={`${n.id} is not a registered entry`}>{n.label ?? n.id}</span>;
      return (
        <Link
          to="/phos/$division/$entry"
          params={{ division: e.division.id, entry: e.slug }}
          className={`underline-offset-4 hover:underline ${e.written ? "text-gold" : "text-gold-dim"}`}
          title={e.written ? e.title : `${e.title} — forthcoming`}
        >
          {n.label ?? e.title}
        </Link>
      );
    }
  }
}

/** Internal paths become router links; anything else opens in a new tab. */
function SmartLink({ href, children }: { href: string; children: ReactNode }) {
  const cls = "text-gold underline-offset-4 hover:underline";
  const m = href.match(/^\/phos\/([a-z]+)\/([a-z0-9-]+)$/);
  if (m) return <Link to="/phos/$division/$entry" params={{ division: m[1], entry: m[2] }} className={cls}>{children}</Link>;
  const d = href.match(/^\/phos\/([a-z]+)$/);
  if (d && d[1] === "portal") return <Link to="/phos/portal" className={cls}>{children}</Link>;
  if (d && d[1] === "browse") return <Link to="/phos/browse" className={cls}>{children}</Link>;
  if (d) return <Link to="/phos/$division" params={{ division: d[1] }} className={cls}>{children}</Link>;
  if (href === "/phos") return <Link to="/phos" className={cls}>{children}</Link>;
  if (href === "/") return <Link to="/" className={cls}>{children}</Link>;
  // A section of either treatise: "/#relation" is § XLIV of the Architecture,
  // "/phos#vessel" is § VI of the volume. The hash rides the router link so the
  // page arrives already scrolled to the section.
  const t = href.match(/^\/(phos)?#([a-z-]+)$/);
  if (t && t[1]) return <Link to="/phos" hash={t[2]} className={cls}>{children}</Link>;
  if (t) return <Link to="/" hash={t[2]} className={cls}>{children}</Link>;
  if (href.startsWith("/") || href.startsWith("#")) return <a href={href} className={cls}>{children}</a>;
  return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>;
}
