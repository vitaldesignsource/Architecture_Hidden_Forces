# The encyclopaedia's content

One markdown file per entry, under the directory of its division:

    src/content/phos/<division>/<NN>-<slug>.md

`<division>` is `portal` for the Portal Entrance, or the division's numeral in
lower case: `i`, `ii`, … `xxi`. `<NN>` is the entry's number in the outline,
zero-padded to two digits (it only keeps the files in order; it is ignored).
`<slug>` must be the slug the outline registered — find it in
`src/lib/phos/toc.json`, or read it off the entry's URL, which is
`/phos/<division>/<slug>`. So Grosseteste's *On Light* is

    src/content/phos/xv/83-robert-grossetestes-on-light.md

and is entry `xv-83` wherever an id is wanted.

An entry that has no file is still a page: it lists as forthcoming and its
address resolves. Writing the file is all that publishing takes.

## The file

    ---
    title: Robert Grosseteste’s On Light
    labels: [Historical Doctrine, Comparative Interpretation]
    tradition: [Medieval Latin, Neoplatonic]
    plane: [Formative, Physical]
    quality: [Diffusiveness]
    operation: [Formation]
    symbol: [Point, Sphere]
    text: [De Luce]
    period: [Medieval]
    related: [i-11, iii-2, xix-3]
    summary: Light as the first corporeal form — extension is what it does.
    epigraph: "The first corporeal form I judge to be light."
    attribution: Grosseteste, De Luce
    backdrop: crystal
    position: center 40%
    ---

    The body, in the markdown subset below.

Front matter, line by line:

- `title` — must match the outline exactly. The audit checks it.
- `labels` — one or more of the seven evidence labels. Required. The names in
  full, or their keys: `primary-text`, `historical-doctrine`,
  `scientific-finding`, `phenomenological-report`, `ahf-doctrine`,
  `comparative-interpretation`, `speculative-synthesis`.
- `tradition`, `quality`, `plane`, `operation`, `symbol`, `period` — facets
  with a fixed vocabulary, in `src/lib/phos/schema.json`. A value outside it
  fails the audit; add it to the schema if it is meant.
- `text` — a free facet: the primary texts the entry reads.
- `related` — ids of other entries. Shown at the foot, in either direction of
  the reader's choosing.
- `summary` — one line, shown wherever the entry is listed.
- `epigraph`, `attribution` — set above the body, optional.
- `backdrop` — a bare name from `public/bg` (`crystal`, not `/bg/crystal.webp`);
  `position` its object-position. Optional; a division's `_intro.md` may set a
  default for all its entries.

Lists may be inline `[a, b]` or one `- item` per line. Every facet is optional;
an entry with none is only unfindable by facet.

## The body

A deliberately small markdown:

    ## An eyebrow that opens a subsection
    ### A run-in subhead

    A paragraph. Lines inside it are joined; a blank line ends it.

    > A pull quote, one or more lines.
    > — Its attribution, on a last line beginning with a dash

    - a list
    - of items

    1. an ordered
    2. list

    :: An aside — the small muted note the treatises use for a caveat.

    ---

Inline: `*emphasis*`, `**stressed**`, `` `mono` ``, `[a link](https://…)`,
and `[[xv-83]]` — a cross-reference to another entry by id, which renders as
its title and links to it, or `[[xv-83|On Light]]` for other wording. A
reference to an unwritten entry still links: its page says it is forthcoming.

No HTML, tables, or images. A figure that matters is a component, as it is
everywhere else on the site.

## A division's introduction

`src/content/phos/<division>/_intro.md` — optional. Its body opens the
division's page; its `backdrop` and `position` become the division's, and the
default for every entry in it. It needs no labels.

## Checking

    npm run audit

fails on any file that is misfiled, mistitled, unlabelled, outside a facet's
vocabulary, or pointing at an id that does not exist, and reports how many
entries of each division are written. The outline lives in
`src/lib/phos/outline.txt`; if it changes, `npm run toc` regenerates
`toc.json`, and the audit fails until it has been run.
