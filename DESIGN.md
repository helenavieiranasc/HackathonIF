---
name: Hackathon IFSP Jacareí
description: Event site for the Semana de Tecnologia hackathon, labelled like lab equipment with embossed label-maker tape.
colors:
  bench: "#e1e4e8"
  bench-deep: "#d4d8de"
  steel: "#26292c"
  steel-face: "#31353a"
  paper: "#ffffff"
  rule: "#c2c7ce"
  rule-dark: "#4a4f55"
  ink: "#17181a"
  ink-muted: "#4a4d52"
  ink-on-steel: "#eceeef"
  ink-on-steel-muted: "#b7bcc2"
  tape-black: "#161718"
  tape-green: "#1f7f33"
  tape-red: "#cd191e"
  tape-yellow: "#f2c200"
  tape-blue: "#1f4fb5"
  tape-muted: "#5c6168"
  tape-white: "#f4f4f0"
  emboss: "#f4f4f0"
  machine-body: "#2b2e33"
  machine-well: "#17191c"
  wheel-well: "#1c1e22"
  hardware-rim: "#4b5158"
  field-placeholder: "#8a9097"
  holder-frame: "#8b9198"
  steel-post-dark: "#5b6168"
  steel-post-light: "#9aa1a8"
  steel-rod-light: "#c5cbd1"
  steel-rod-dark: "#7c838a"
  cartridge-black: "#3a3d42"
  shadow-black: "#000000"
typography:
  tape-hero:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(3.25rem, 0.6rem + 11.4vw, 14rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.1em"
  tape-hero-phone:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(3.4rem, 1rem + 19vw, 6.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.1em"
  tape-final:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(1.5rem, 0.9rem + 2.4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.14em"
  tape-plate:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(1.125rem, 0.7rem + 1.8vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.14em"
  tape-holder:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(1rem, 0.55rem + 2.2vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.14em"
  tape-m:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(1.25rem, 0.95rem + 1.2vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.14em"
  tape-l:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(1.125rem, 0.9rem + 0.9vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.14em"
  tape-s:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.14em"
  headline:
    fontFamily: "Switzer, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.1rem + 2.8vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body-large:
    fontFamily: "Switzer, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1rem + 0.7vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Switzer, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "Switzer, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  detail:
    fontFamily: "Switzer, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  numeral:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
  numeral-small:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "1rem"
    fontWeight: 700
  label-time:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  label:
    fontFamily: "Sometype Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  tape-body: "1px"
  sheet: "2px"
  tape: "3px"
  panel: "4px"
  drawer: "6px"
  cartridge: "8px"
  machine-top: "22px"
  machine-bottom: "34px"
  machine: "22px 22px 34px 34px"
  pill: "999px"
  control: "50%"
spacing:
  s1: "8px"
  s2: "16px"
  s3: "24px"
  s4: "32px"
  s5: "48px"
  s6: "64px"
  s7: "96px"
  s8: "128px"
  gutter: "clamp(1rem, 0.4rem + 2.6vw, 3rem)"
  measure: "66ch"
components:
  tape-action:
    backgroundColor: "{colors.tape-green}"
    textColor: "{colors.emboss}"
    typography: "{typography.tape-l}"
    padding: "0.7em 1.2em 0.62em"
  tape-nav:
    backgroundColor: "{colors.tape-black}"
    textColor: "{colors.emboss}"
    typography: "{typography.tape-s}"
    padding: "0.5em 0.8em 0.45em"
  tape-nav-current:
    backgroundColor: "{colors.tape-white}"
    textColor: "{colors.ink}"
  tape-deadline:
    backgroundColor: "{colors.tape-red}"
    textColor: "{colors.emboss}"
    typography: "{typography.tape-s}"
  tape-link:
    backgroundColor: "{colors.tape-blue}"
    textColor: "{colors.emboss}"
    typography: "{typography.tape-s}"
  tape-link-unpublished:
    backgroundColor: "{colors.tape-muted}"
    textColor: "{colors.emboss}"
    typography: "{typography.tape-s}"
  tape-pending:
    backgroundColor: "{colors.tape-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.tape-s}"
  placeholder-inline:
    backgroundColor: "{colors.tape-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "0.12em 0.4em"
  labeler-input:
    backgroundColor: "#17191c"
    textColor: "{colors.emboss}"
    rounded: "{rounded.drawer}"
    height: "3.25rem"
    padding: "0 16px"
  course-control:
    backgroundColor: "{colors.bench}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    size: "3.25rem"
---

# Design System: Hackathon IFSP Jacareí

## Overview

**Creative North Star: "The Rotuladora"**

The site is a lab bench where the organizers label everything with an embossed label maker. Every confirmed fact is a strip of tape with raised off-white letters punched into it; every unconfirmed fact is yellow tape still waiting for its letters. Tape is the only display voice: headings, navigation, actions, dates, statuses and the event name are all strips of vinyl, rotated a degree or two, cut with scissors, and lightly shadowed onto the surface they sit on. Running text stays quiet in Switzer on a cool laminate bench.

The world is built from four physical surfaces: the cool-gray bench (ground for most sections), a dark steel cabinet drawer for the challenge, a white punched paper sheet for the regulations, and a working label-maker machine for the final call. Depth comes from the objects themselves (tape thickness, a recessed label holder, a molded machine body), never from decorative gradients, glow or glassy layers. Density is moderate: generous section padding on an 8px module, ruled lists and tables for reference material, and tape doing the ranking by length and color.

Motion is the act of labelling: tape feeds out of the machine, letters punch in sequence, heading strips are pressed onto the surface as they arrive, the participation route is drawn as a course line while the visitor scrolls, and controls answer with one firm press. Under reduced motion nothing moves and everything is already in place.

**Key Characteristics:**
- Embossed label tape as the single display primitive, with color carrying role.
- Sometype Mono 700 uppercase for every tape; Switzer for everything a person reads at length.
- Cool bench, dark steel, white paper: three surfaces, each a real material.
- Tapes never wrap; long strips are punched as two or three stacked, counter-rotated strips.
- Placeholders are visibly unfinished: yellow tape with a dashed underline.
- Motion describes the label maker working, and is fully optional.

## Colors

A cool, neutral bench and steel palette in which saturated color appears only as tape, and every tape color is a role.

### Primary
- **IFSP Action Green** (tape-green): actions only. Registration ("Inscrever equipe") in the masthead, hero, mobile menu and final call; the cut button on the label machine; the course line and the rings of the numbered route controls. Deepened from the IFSP green so raised off-white letters hold 4.6:1.

### Secondary
- **Plate Red** (tape-red): the Semana de Tecnologia plate in the hero and deadlines ("prazo" tapes, confirmed deadline dates). Nothing else.
- **Pending Yellow** (tape-yellow): facts not yet confirmed by the organizers, status flags ("Versão provisória", "Resposta pendente", "Em breve"), inline placeholder swatches, the review pin, text selection, and the label machine's active highlights (wheel pointer, caret, selected cartridge).

### Tertiary
- **Outbound Blue** (tape-blue): tapes that leave the site (official regulation, contact and social links) and the global focus outline.
- **Unpublished Gray** (tape-muted): an outbound link tape whose URL is still a placeholder; shown disabled, followed by a yellow "Em breve" tape.

### Neutral
- **Bench Laminate** (bench): page ground, with a faint 5% fractal-noise grain; also the masthead (at 86-94% opacity) and the mobile menu sheet.
- **Bench Shadow** (bench-deep): punch holes in the paper sheet and the scrollbar track.
- **Cabinet Steel** (steel) and **Drawer Face** (steel-face): the challenge section and its drawer front; the cabinet carries a fine 6px vertical brushed line.
- **Sheet White** (paper): the regulation sheet, the IFSP logo plate and the footer.
- **Rule Gray** (rule) / **Rule Dark** (rule-dark): 1px dividers on bench/paper and on steel.
- **Bench Ink** (ink) and **Muted Ink** (ink-muted): text on light surfaces; ink also draws the 2-3px heavy rules that open lists, tables and rules.
- **Steel Ink** (ink-on-steel) and **Muted Steel Ink** (ink-on-steel-muted): text on the cabinet and the machine.
- **Black Tape** (tape-black): structure and navigation; section headings, nav, route step titles, motive titles, the FAQ toggle.
- **White Tape** (tape-white): the current nav item and tapes on dark surfaces (machine badge, menu close).
- **Raised Letter White** (emboss): the stretched-white plastic of punched letters on every dark tape.

### Hardware Materials
The label maker, the drawer hardware and the cartridges are molded plastic and pressed steel; these values shade those objects and appear nowhere else.
- **Machine Housing** (machine-body): the label-maker body, under a sheen from 6% white to 18% black.
- **Machine Well** (machine-well): the keyboard field and the cartridge bodies.
- **Wheel Well** (wheel-well): the recess holding the character wheel.
- **Hardware Rim** (hardware-rim): the field border and the cartridge rims.
- **Field Placeholder** (field-placeholder): placeholder text in the machine field.
- **Holder Frame** (holder-frame): the pressed-steel frame of the drawer label holder.
- **Bar-Pull Steel** (steel-post-dark, steel-post-light, steel-rod-light, steel-rod-dark): the gradient stops of the bar pull's posts and rod.
- **Black Cartridge Tongue** (cartridge-black): the tape tongue in the black cartridge swatch, lifted from tape-black so it reads in the dark well.
- **Shadow Black** (shadow-black): the base of every shadow and shading layer, always at an alpha (0.08-0.75, see Elevation & Depth); never an opaque fill.

### Named Rules
**The Cartridge Rule.** A tape's color is its role: black structure and navigation, green actions, red the event plate and deadlines, yellow pending, blue outbound, gray unpublished, white on dark or current. No tape takes a color for decoration.

**The Red Is Pressure Rule.** Red appears on the Semana de Tecnologia plate and on deadlines only. A second use dilutes the one word under pressure.

**The Color Lives In Tape Rule.** Surfaces stay neutral (bench, steel, paper). Saturated color enters the page only as tape, a placeholder swatch, the course line or a focus outline.

## Typography

**Display Font:** Sometype Mono 700 (with ui-monospace, Cascadia Mono, Consolas)
**Body Font:** Switzer 400/500/600 (with Segoe UI, system-ui)
**Label/Mono Font:** Sometype Mono 700, the same label-wheel face

Both families are self-hosted from `vendor/fonts` as woff2 (Sometype Mono 700 latin and latin-ext; Switzer 400, 400 italic, 500, 600), with the 700 mono and Switzer 400 preloaded.

**Character:** A fixed-pitch label-wheel face, always uppercase and widely tracked, does all the labelling; a calm neo-grotesk does all the explaining. The pairing reads as equipment tags on a technical manual.

### Hierarchy
- **Tape Hero** (700, tape-hero clamp up to 14rem, line-height 1, 0.1em tracking): the HACKATHON strip only.
- **Tape M** (700, tape-m, 0.14em): section headings and mobile menu items.
- **Tape L** (700, tape-l, 0.14em): primary actions, the hero deadline, labels in the machine tray.
- **Tape S** (700, 0.875rem, 0.14em): navigation, statuses, dates, inline tapes in lists and tables. The default tape size.
- **Fluid tape endpoints in use:** phone hero 3.4rem to 6.5rem (HACKA / THON); final-call strips 1.5rem to 3rem; Semana plate 1.125rem to 2.25rem; drawer theme tape 1rem to tape L.
- **Headline** (Switzer 500, clamp to 3.5rem, 1.35, -0.02em): the challenge question in the drawer, max 24ch.
- **Body Large** (Switzer 400, clamp to 1.5rem, 1.45): ledes, section intros, summary paragraphs; 40-52ch.
- **Body** (Switzer 400, 1.0625rem, 1.6): running text, max 66ch. Titles inside lists use Switzer 600 at 1.125-1.1875rem.
- **Title** (Switzer 600, 1.125rem; rule titles 1.1875rem): schedule slot and rule titles.
- **Detail** (Switzer 400, 0.9375rem): control details, link notes, the tray hint; mono 0.9375rem for rule numbers.
- **Numeral** (Sometype Mono 700, 1.25rem): course control numbers and machine field input; 1rem is the low end of the drawer theme tape.
- **Label Time** (Sometype Mono 700, 0.8125rem, 0.08em): schedule times and the review panel.
- **Label** (Sometype Mono 700, 0.75rem, 0.12-0.14em, uppercase, muted ink): real field and column labels only (definition terms in the hero facts, the "Tema" holder label, table headers, footer column headings, the machine field label).

### Named Rules
**The Two Voices Rule.** Sometype Mono 700 uppercase is for tape and field labels; Switzer is for sentences. Never set a paragraph in the tape face or a tape in Switzer.

**The Never Wrap Rule.** Tapes are `white-space: nowrap`. A heading strip wider than its column is re-punched as two or three strips, split by words, stacked and counter-rotated (first about -1.4deg, next about +0.9deg and indented). On phones HACKATHON becomes HACKA / THON. Narrow screens step a tape down a size rather than let it wrap or overflow.

## Layout

Sections run full width with a fluid gutter and vertical padding of clamp(64px, 2.5rem + 4vw, 96px); the final call ends on 128px. Spacing follows an 8px module (s1-s8). Body text caps at 66ch. The page is left-anchored and asymmetric: the hero is a grid with the HACKATHON strip spanning, the red plate offset under it, lede and actions on the left and a facts column (deadline first, on a steeper rotation) at the right.

Reference content is ruled, not carded: lists and tables open with a 2px ink rule and separate rows with 1px rule lines; regulations flow in two columns (min 22rem) on the paper sheet; the schedule pairs a sticky heading column with a timeline of date tape, title and time. The participation route is a 4-column grid that snakes back on the second row (7 numbered controls joined by a green course line), becoming 2 columns at 1080px and a single column with the number at the left at 600px.

Breakpoints observed: 1680px (root font 112.5%), 1080px (nav collapses to a MENU tape; route to 2 columns), 960px (schedule stacks), 900px (motives, final call and footer stack), 860px (hero stacks), 760px (drawer stacks), 640px (sheet and criteria table compact), 600px (hero splits into two strips; route single column), 560/520/480/380px (slot, tape-note, machine wheel and tape size step-downs).

## Elevation & Depth

Depth belongs to the objects, never to decoration. Tape is lifted by a two-layer `filter: drop-shadow` (a tight contact edge plus a short soft cast) so the shadow follows the scissor-cut outline; its letters are raised by an SVG lighting filter, and its vinyl carries a faint top sheen and fine grain. Surfaces use real-material shadows: the paper sheet and logo plate sit with soft contact shadows, the drawer and machine have molded inset edges and a deep cast, the label holder and exit slot are recessed with inset shadows.

### Shadow Vocabulary
- **Tape rest** (`drop-shadow(0 1px 0.6px rgb(0 0 0 / 0.35)) drop-shadow(0 5px 6px rgb(0 0 0 / 0.14))`): every tape at rest.
- **Tape lift** (`drop-shadow(0 2px 1px rgb(0 0 0 / 0.3)) drop-shadow(0 10px 12px rgb(0 0 0 / 0.18))`): hover on interactive tape, with 1px rise and brightness 1.06.
- **Tape pressed** (`drop-shadow(0 0.5px 0.4px rgb(0 0 0 / 0.4))`): active state, tape pushed 2px into the surface.
- **Hero strip** (`drop-shadow(0 2px 1px rgb(0 0 0 / 0.35)) drop-shadow(0 18px 22px rgb(0 0 0 / 0.2))`): the HACKATHON tape only.
- **Paper sheet** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 24px 40px -28px rgb(0 0 0 / 0.35)`): the regulation sheet.
- **Drawer** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08), inset 0 -2px 0 rgb(0 0 0 / 0.35), 0 18px 30px -18px rgb(0 0 0 / 0.7)`): the steel drawer front.
- **Recess** (`box-shadow: inset 0 3px 5px rgb(0 0 0 / 0.55)` to `inset 0 4px 8px rgb(0 0 0 / 0.75)`; wheel `inset 0 3px 8px rgb(0 0 0 / 0.65)`): label holder, character wheel, exit slot.
- **Machine** (`box-shadow: 0 2px 2px rgb(0 0 0 / 0.25), 0 30px 50px -28px rgb(0 0 0 / 0.65)`): the label-maker housing resting on the bench.
- **Bar pull** (`box-shadow: 0 6px 8px -3px rgb(0 0 0 / 0.65)`): the drawer rod over its posts.
- **Swatch edge** (`box-shadow: inset 0 -1px 0 rgb(0 0 0 / 0.18)`): the bottom edge of an inline placeholder swatch.
- **Review panel** (`box-shadow: 0 20px 40px -20px rgb(0 0 0 / 0.5)`): the organizer-only placeholder review panel.

### Named Rules
**The Light From Upper Left Rule.** Raised letters are lit by one distant light at azimuth 225deg through the SVG filters (#emboss-s for small tape, #emboss for default, #emboss-l and #emboss-xl with plastic-stress whitening for large tape). Tape depth never uses box-shadow or text-shadow bevels.

**The Vinyl Skin Rule.** Every tape body carries the same skin: a 96px fractal-noise grain at 9% and a sheen fading from 20% white at the top to 12% black at the bottom. Gradients elsewhere only shade a physical material (machine body, bar pull, punch holes, brushed steel); none decorates, and nothing glows.

## Shapes

Tape ends are scissor cuts: a clip-path polygon slants the left and right ends by a per-strip amount (0.06-0.36em) hashed from the tape's text, so every strip is cut differently and identically on every visit. Tape corners are near-square (1px on the body, 3px tape radius on square tape tiles such as the FAQ toggle and on the label-holder frame). Every strip sits at a small rotation, typically between -3deg and +1.6deg, alternating sign between neighbours. Paper, the logo plate and inline swatches are 2px; the review panel and the cartridge base 4px; the drawer, field and slots 6px; cartridge tops 8px; the bar-pull rod is a full pill (999px) and the character wheel a circle; the label machine is molded (22px top, 34px bottom). Route controls are circles with a 3px green ring. The paper sheet has three binder punch holes in its left margin.

## Components

### Tape (the primitive)
Embossed vinyl strip; the unit every display element is made of.
- **Anatomy:** outer tape (shadow, rotation, press state) > tape body (vinyl color, skin, scissor-cut clip-path) > tape face (letters raised by the emboss filter). main.js builds body and face around the text of every tape; without JavaScript the strip still renders as flat colored tape.
- **Type:** Sometype Mono 700, uppercase, 0.14em tracking, padding 0.34em 0.95em 0.3em, icons trail at 1em.
- **Sizes:** s (default), m (headings), l (primary actions), and the hero size.
- **Interactive tape:** hover rises 1px with tape lift; active presses down 2px with tape pressed (90ms); disabled at 55% opacity, no shadow.

### Buttons and Actions
- **Primary:** green tape at size L with an arrow icon, padding 0.7em 1.2em 0.62em, rotated about -0.6deg.
- **Secondary:** a mono uppercase text link with a 2px underline at 0.35em offset; underline turns green on hover.
- **Outbound:** blue tape with the external icon; unpublished outbound links become disabled gray tape followed by a yellow "Em breve" tape.
- **Registration while the form URL is pending:** outside the registration block the CTA reads "Como se inscrever" and leads there; inside it, the form action is disabled gray tape plus a large yellow "Em breve" strip and a note that registration is not open through the site.

### Placeholders
- **Whole-value placeholder:** a value that is entirely a placeholder renders as yellow pending tape with ink letters and a dashed underline; above 520px, tapes larger than S also carry a small dashed "a confirmar" note inside the strip.
- **Inline placeholder:** a placeholder inside a sentence renders as a yellow swatch in the tape face at 0.82em with a dashed underline, never as a full tape.

### Navigation
- **Desktop:** a row of small black tapes at right of the logo plate; the current section turns to white tape. Registration is green tape at the far right.
- **Below 1240px:** a black MENU tape opens a full-screen bench sheet listing tapes at size M, alternately rotated -1.2deg / +0.8deg, closed by a white tape.

### Lists, Tables and the Course
- Ruled rows on bench or paper; numbers and dates in the tape face with tabular figures. Rules are numbered and deep-linkable through a link icon; a targeted rule gets a faint yellow wash.
- **Course controls:** 3.25rem circles with a green ring on bench, numbered in the tape face, joined by a 3px green course line.

### Signature: Secret-Theme Drawer
Dark steel cabinet with a drawer front, a pressed-steel label holder (3px steel frame, 6px top lip, recessed black slot) holding the theme tape (red "Trancado até 26/10" before the reveal), and a bar pull on two posts. Inside the drawer: a countdown of four white tapes at size L (days, hours, minutes, seconds, tabular figures, labels in mono below), the reveal facts, and the opening agenda numbered in yellow. States: counting, "A revelação é agora" during the opening, revealed afterwards.

### Team Slots and Blank Tape
Required seats are black tapes ("Integrante 1-3"); optional seats are blank tape: no vinyl, a 2px dashed rule outline, muted letters, no emboss. Blank tape means "may stay empty", never "pending" (that is yellow).

### Panel and Awards
The confirmed judge is a black tape at size L; pending seats are small yellow pending tapes grouped below. Awards are three ruled columns: place on black tape, a green "Medalha" tape, a plus, and the pending prize.

### Signature: Regulation Sheet
White paper with three binder punch holes, two-column numbered rules each opened by a 3px ink rule.

### Signature: Label Maker
A molded dark machine with a white "Rotuladora" badge tape, a character wheel (A-Z, active letter yellow under a yellow pointer), a recessed input (2px #4b5158 border, 6px radius, yellow caret and focus outline), color cartridges (black, green, blue, red swatches; selected one framed yellow), a green cut action with a scissors icon, and a recessed exit slot from which the punched tape feeds. Cut labels drop into a tray below.

### Icons
One stroke set at 24px viewBox, stroke 2.4, square caps, mitre joins, inheriting currentColor: arrow, external, link, plus, scissors. No other icons.

### Official IFSP Logo
Only the official campus signature (`site/assets/ifsp/ifsp-jacarei-cor.svg`: Instituto Federal · São Paulo · Campus Jacareí), always on a white base (the masthead plate and the paper footer), with clear space around it; the symbol is never smaller than 30px and the mark is never recolored, redrawn or set on tape.

## Do's and Don'ts

### Do:
- **Do** make every new display element a tape and choose its color by role from the Cartridge Rule.
- **Do** keep tapes on one line; re-punch long strips as two or three stacked, counter-rotated strips, or step down one size on narrow screens.
- **Do** rotate tapes slightly (about -3deg to +1.6deg), alternating between neighbours, and let the per-strip hash cut each end.
- **Do** render every unconfirmed fact as yellow pending tape (whole value) or a yellow inline swatch (inside a sentence), always with the dashed underline as the non-color cue.
- **Do** raise letters only through the #emboss filters and lift tape only with the drop-shadow tokens.
- **Do** keep motion to the label-maker grammar: feed out, punch letters, press headings on, draw the course line, one firm press on controls; with reduced motion, show everything in place.
- **Do** place the IFSP logo, complete and uncolored, on white with clear space.

### Don't:
- **Don't** use red for anything other than the Semana de Tecnologia plate and deadlines.
- **Don't** wrap a tape onto two lines or let it overflow the viewport.
- **Don't** bevel tape with box-shadow or text-shadow, or add decorative gradients, glows or glassy layers; the only blur is the functional sticky masthead over the bench.
- **Don't** set running text in Sometype Mono or tape lettering in Switzer.
- **Don't** present a placeholder as finished copy, or invent dates, prizes, rules or sponsors to fill one.
- **Don't** recolor, crop, place on tape, or shrink the IFSP mark below a 30px symbol.
- **Don't** add icons outside the five-icon stroke set or use glyphs as icons.
