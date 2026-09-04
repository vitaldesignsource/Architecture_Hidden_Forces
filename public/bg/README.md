# Backdrops

Every image the two volumes set behind a section, an entry, or a division
opening. They are referenced two ways and only two ways:

- from a route or component as `<Backdrop src="/bg/<name>.webp" …>`
- from an entry's front matter as `backdrop: <name>` — the bare name, no path
  and no extension. A division's `_intro.md` may set one for all its entries.

## Naming

**A file name says what is in the frame.** It is the one piece of text a search
engine, an image search, and a person scanning a directory all read, and a
name like `chamber2.webp` tells all three nothing.

    <subject>-<setting-or-action>-<light-or-time>.webp

    stone-basin-under-blade-of-light.webp
    colonnade-ruins-at-coloured-dawn.webp
    camera-obscura-projection-in-dark-room.webp

The rules, which `npm run audit` enforces:

1. **Lowercase letters, digits and hyphens.** No underscores, no spaces, no
   capitals, no `%20` waiting to happen in a URL.
2. **Three words at least**, and about six at most — long enough to describe,
   short enough to read. Under 64 characters including `.webp`.
3. **Descriptive and true.** Name what is actually visible. A name that
   promises a seraph and delivers a staircase is worse than a number, because
   it is now wrong in the alt text, the search result, and the file listing.
4. **Unique across the directory.** No `-2`, no `-copy`, no `-final`. If two
   images are close, say what differs: `sleeper-at-dawn-by-wide-window` and
   `sleeper-under-night-sky-window`.
5. **No stop words** where they add nothing (`a`, `an`, `of` between two nouns
   that already read), and no keyword stuffing. `light` earns its place when
   the light is the subject, not otherwise.
6. **`.webp`**, at a size that survives a full-bleed backdrop.

## Adding one

1. Name it by the rules above before it enters the repository — renaming later
   means touching every entry that cites it.
2. Drop it in `public/bg/`.
3. Point something at it: `backdrop: <name>` in an entry's front matter, or a
   `<Backdrop src="/bg/<name>.webp">` in a route.
4. `npm run audit` — it fails on a name that breaks the shape, on a reference
   to a file that is not here, and on a file nothing references.
