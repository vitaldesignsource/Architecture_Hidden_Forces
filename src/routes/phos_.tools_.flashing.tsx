import { createFileRoute, Link } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import {
  Afterimage,
  Contrast,
  FlashPair,
  FlashWheel,
  FlashingTablet,
  ScaleTable,
} from "@/components/phos/Flashing";

/**
 * Flashing Colours — the instrument the section on the boundary where colour
 * arises opens onto.
 *
 * Goethe's boundary gives the treatise its claim that colour is an event at an
 * edge. The Golden Dawn worked the same edge for a different purpose: a colour
 * set beside its complement is unstable to look at, and the Order took that
 * instability as the sign of a figure that had been made live. The page sets
 * out the tables, lets the reader test the pairs, and separates what is seen
 * from what is claimed about what is seen.
 */
export const Route = createFileRoute("/phos_/tools_/flashing")({
  head: () => ({ meta: [{ title: "Flashing Colours — Instruments — Phōs" }] }),
  component: Flashing,
});

function Flashing() {
  return (
    <ToolFrame
      name="Flashing Colours"
      title={<>The colour that will not <span className="italic text-gold">hold still</span></>}
      lede="Set a colour beside its opposite on the painter's wheel and the seam between them refuses to settle. The Hermetic Order of the Golden Dawn built a working practice on that instability — four scales of colour for the four worlds, talismans painted in one colour and lettered in its flash, elemental tablets whose every square carries its own opposite. Here are the tables, the demonstrations that show what the eye actually does, and a plain account of where the seeing ends and the claim begins."
      backdrop="prismtable"
      position="center 45%"
    >
      {/* ── the wheel ─────────────────────────────────────────────────── */}
      <ToolBand>
        <Eyebrow>The wheel · the pairs</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight">
          Opposites on the painter&rsquo;s wheel, not the screen&rsquo;s
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          A flashing pair is a complementary pair, and which colours are complementary depends on
          the wheel you are standing on. On the painter&rsquo;s wheel — red, yellow and blue as the
          three that cannot be mixed from anything else — red faces green, blue faces orange and
          yellow faces violet. Those are the pairs the Order actually used, because those are the
          pairs that came out of a paintbox. Invert red on a screen instead and you get cyan, which
          no adept ever painted.{" "}
          <span className="text-bone/90">
            So the wheel below is the red–yellow–blue wheel in twelve pigment steps, and every
            complement on this page is read across it.
          </span>
        </p>
        <div className="mt-12">
          <FlashWheel />
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-bone/60">
          The King scale of the twelve signs is the spectrum divided by twelve from scarlet at
          Aries, so the wheel is also a zodiac: each sign&rsquo;s flashing partner is the sign
          across from it. Aries and Libra, Taurus and Scorpio, Gemini and Sagittarius. The
          opposition an astrologer draws and the pair a painter mixes are the same line.
        </p>
      </ToolBand>

      {/* ── the demonstration ─────────────────────────────────────────── */}
      <ToolBand>
        <Eyebrow>The demonstration · figure and field</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight">
          One of these four shimmers. The other three do not.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          This is the practice at working size: a figure drawn on a ground in a chosen relation. The
          Order&rsquo;s rule was to paint the ground in the colour of the force and the figure in
          its flash — a talisman in the scale of its world, lettered in the opposite; the lotus wand
          banded in the twelve; the elemental tablets squared and lettered so that every character
          stood against its own complement.
        </p>
        <div className="mt-12">
          <FlashPair />
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-bone/60">
          Change the figure from the flash to a near miss and the shimmer goes out, which is the
          useful thing about this doctrine: it makes a claim that fails when you break the
          condition. A near miss is forty degrees from the opposite and looks almost identical in
          a swatch; on the edge it is inert.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/50">
          Screens weaken all of it. These are emitted colours on a dark ground, not pigment on
          white card under daylight, and the eye is adapting to a dark page. The effect is real
          here and stronger there.
        </p>
      </ToolBand>

      {/* ── the mechanism ─────────────────────────────────────────────── */}
      <ToolBand>
        <Eyebrow>The mechanism · what the eye is doing</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight">
          The complement is in the eye before it is on the card
        </h2>
        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              One · the afterimage
            </p>
            <div className="mt-6">
              <Afterimage />
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Two · simultaneous contrast
            </p>
            <div className="mt-6">
              <Contrast />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              A neutral grey takes on the opposite of whatever surrounds it. Chevreul, running the
              Gobelins dye works in the 1830s, was sent to explain why threads of the same dye
              looked wrong in different weaves; the answer was that no colour is seen alone, and
              every ground pushes its neighbour toward the ground&rsquo;s own opposite. The Order
              was founded half a century later into a culture that had absorbed this.
            </p>
          </div>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {[
            ["Opponent channels",
             "Colour leaves the retina coded as differences, not as three separate reports: red against green, blue against yellow, light against dark. A channel held at one end fatigues and rebounds past neutral when released — which is the afterimage, and why the rebound is always the opposite and never some other colour."],
            ["Equal light, unequal hue",
             "A flashing pair is usually near in brightness and far in hue. The luminance system, which draws the edges, finds almost no edge; the colour system insists there is one. The seam is where two systems disagree, and it appears to crawl."],
            ["The eye's own lens",
             "Long and short wavelengths do not focus in the same plane, so a red field and a blue-green field cannot both be sharp at once. Part of the shimmer at a flashing edge is the eye hunting focus between them."],
          ].map(([h, d]) => (
            <div key={h} className="border-t border-border pt-5">
              <p className="font-serif text-xl text-bone/90">{h}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </ToolBand>

      {/* ── the scales ────────────────────────────────────────────────── */}
      <ToolBand>
        <Eyebrow>The tables · four scales for four worlds</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight">
          The same sephirah, four times over
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The Order assigned each sephirah and each path four colours rather than one, following the
          four letters of the divine Name and the four worlds they govern: King for Atziluth, Queen
          for Briah, Emperor — printed in some editions as Prince — for Yetzirah, and Empress, or
          Princess, for Assiah. A working was coloured in the scale of the world it was meant to
          reach. The lower the world, the more the colour is compounded, flecked and rayed, until in
          Assiah it is hardly a colour at all but a mixture with something else showing through it.
        </p>
        <div className="mt-12">
          <ScaleTable />
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-bone/60">
          The tables are those printed in Crowley&rsquo;s <span className="italic">777</span> and in
          Regardie&rsquo;s edition of the Order&rsquo;s papers, which is where nearly everyone meets
          them; wording varies between printings, and the hexes here are this site&rsquo;s
          renderings of words like &ldquo;amber&rdquo; and &ldquo;russet&rdquo;. No screen value is
          authoritative, and the originals were pigment.
        </p>
      </ToolBand>

      {/* ── the tablet ────────────────────────────────────────────────── */}
      <ToolBand>
        <Eyebrow>The practice · a coloured tablet</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight">
          Every square against its own opposite
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The elemental tablets were painted square by square: the ground of each square in the
          colour of the element it belonged to — fire red, water blue, air yellow, earth in the four
          dark colours — and the letter on it in the colour that flashes against that ground. Hover a
          square for the pair.
        </p>
        <div className="mt-10">
          <FlashingTablet />
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-bone/60">
          The signs here are the site&rsquo;s own marks, not Enochian letters, and the arrangement is
          not any tablet&rsquo;s arrangement. What is reproduced is the rule: nothing is written in a
          colour that sits quietly on its ground.
        </p>
      </ToolBand>

      {/* ── the honest part ───────────────────────────────────────────── */}
      <ToolBand>
        <Eyebrow>What is seen, and what is claimed</Eyebrow>
        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
          <div className="max-w-3xl">
            <p className="border-l-2 border-gold pl-6 font-serif text-2xl leading-relaxed text-bone/90">
              That the pair flashes is a fact about vision. That the flash marks a figure as charged
              is a claim of the tradition, and this page keeps the two apart.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The perceptual half is settled and old: complementary afterimages, simultaneous
              contrast, the instability of an equiluminant edge. None of it was discovered by the
              Order, and all of it was available to any educated Victorian who had read Chevreul or
              looked at a Turner. What the Order added was a use — a rule for painting implements so
              that they would not let the eye rest, on the reasoning that a figure the attention
              cannot settle on is a figure the attention keeps returning to.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Read through this volume, that is a claim about attention and vessel rather than about
              pigment. A flashing lamen is a device for holding regard on a form long enough for the
              form to work on the one regarding it, which is the same structure as{" "}
              <Link to="/phos" hash="colour" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                § VIII
              </Link>{" "}
              gives to colour itself: nothing is happening in either field, and everything is
              happening at the boundary.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              What the volume does not grant is the step that is usually taken silently — that
              because the effect is involuntary, it is therefore spiritual. An involuntary
              perceptual effect is evidence of a shared nervous system, not of a shared world. The
              tradition&rsquo;s claim may still be true; it is simply not what the shimmer shows.
            </p>
            <p className="mt-8 border-l-2 border-bone/30 pl-5 text-sm leading-relaxed text-bone/70">
              A practical caution, since the instruction is old and repeated uncritically: prolonged
              staring at saturated complementary fields is tiring, and for some people a reliable
              migraine trigger. The tradition treated visual strain as a threshold being crossed.
              It is a threshold being crossed, in the retina. Stop when it hurts.
            </p>
          </div>

          <div className="lg:border-l lg:border-border lg:pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Where this sits
            </p>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <Link to="/phos" hash="colour" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                  § VIII · The Boundary Where Colour Arises
                </Link>{" "}
                — Goethe&rsquo;s primal phenomenon, and the treatise&rsquo;s claim that qualities
                arise at boundaries.
              </p>
              <p>
                <Link to="/phos/$division/$entry" params={{ division: "iv", entry: "color" }}
                      className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                  Colour
                </Link>{" "}
                and{" "}
                <Link to="/phos/$division/$entry" params={{ division: "xiv", entry: "pigments-and-sacred-colors" }}
                      className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                  Pigments and Sacred Colours
                </Link>{" "}
                in the Portal.
              </p>
              <p>
                <Link to="/phos/$division/$entry" params={{ division: "xv", entry: "goethes-theory-of-colors" }}
                      className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                  Goethe&rsquo;s Theory of Colours
                </Link>{" "}
                — the text the treatise reads there.
              </p>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Sources for the tables
            </p>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-bone/55">
              <li>Crowley, <span className="italic">777</span> — the four scales, tabulated.</li>
              <li>Regardie, ed., <span className="italic">The Golden Dawn</span> — the Order&rsquo;s own papers on colour, the implements and the tablets.</li>
              <li>Chevreul, <span className="italic">De la loi du contraste simultané des couleurs</span>, 1839 — the contrast effects, half a century before the Order.</li>
              <li>Hering&rsquo;s opponent-process account of colour vision, and its modern confirmation, for the afterimage.</li>
            </ul>
          </div>
        </div>
      </ToolBand>
    </ToolFrame>
  );
}
