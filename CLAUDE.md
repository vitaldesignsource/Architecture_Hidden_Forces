# Working notes

## Images

**Every image gets a descriptive, unique, hyphenated file name before it enters
the repository.** This applies to any image added from now on, whether it
arrives as a backdrop, a figure, an illustration, or anything else — rename it
on the way in, never after it has been cited.

    <subject>-<setting-or-action>-<light-or-time>.webp

    stone-basin-under-blade-of-light.webp
    colonnade-ruins-at-coloured-dawn.webp
    camera-obscura-projection-in-dark-room.webp

- Lowercase letters, digits and hyphens only. Three words at least, six or so
  at most, under 64 characters including the extension.
- Name what is actually visible. A name that promises one thing and shows
  another is wrong in the file listing, in search results, and in any alt text
  derived from it.
- Unique across the directory. Never `-2`, `-copy`, `-final`; if two images are
  close, say what differs.
- No keyword stuffing. `light` earns its place when light is the subject.

`public/bg/README.md` holds the full convention and how to add a backdrop.
`npm run audit` fails on a name that breaks the shape, on a reference to a file
that is not there, and reports any image nothing mounts.

If an image arrives with a name like `IMG_4821.png` or `chamber2.webp`, look at
it, then name it — the point of the rule is that the name is derived from the
picture, not from the upload.

## Verification

Nothing is committed without: `node scripts/audit.mjs`, `npx tsc --noEmit`,
`npx vite build`, and a Playwright smoke over whatever changed. Gate the commit
on the real exit status, not on grep of the output.
