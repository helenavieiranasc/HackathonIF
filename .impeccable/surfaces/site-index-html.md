---
version: 1
slug: "site-index-html"
primary_target: "site/index.html"
related_targets: []
---

# Surface: event site (site/index.html)

Mode: Persuade. Single page, pt-BR. Audience: IFSP Jacareí students, many new to hackathons, mostly on phones. Action: understand the event, find dates and rules fast, register a team (external URL, placeholder). Proof on hand: none; every unconfirmed fact is a visible placeholder from content.js. Constraints: official IFSP campus Jacareí logo only on a white base with clear space; no invented dates, prizes, rules, sponsors; official information in content.js is never edited by the redesign.

## Direction contract

THESIS: The event is presented as a technical drawing of its own week. The hero is a drawing sheet whose Fig. 1 is a 3D axonometric model of Monday 26 to Friday 30 October, where only the three confirmed days rise as solid volumes; the label-maker tape survives as the signature (HACKATHON strip, chapter numbers, countdown digits, schedule dates, the label maker) and nowhere else. Refuses the giant-wordmark hero that crowds out facts, and the stack of identical tape-headed sections.

OWN-WORLD: Rotuladora world evolved into a drawing office. Light drawing sheet with a faint grid and registration marks for the hero; cool-gray bench, white paper, dark steel and one full-bleed IFSP-green section for content surfaces. Bespoke Stencil 800 for editorial headlines in sentence case; Switzer for running text at 18px; Sometype Mono only on tape, times and dates. Tape roles unchanged (black structure, green action, red deadlines and the Semana plate, yellow pending, blue outbound). Placeholders in running text are a sentence-case yellow marker, never mono caps.

STORY: A student lands on the drawing, reads in one look what it is (Hackathon, Semana de Tecnologia, IFSP Jacareí, 26 to 30/10), sees the three facts that matter (todos os cursos, equipes de 3 a 5, IA permitida), watches the countdown to the theme reveal, then follows numbered chapters: what it is, who takes part, the secret theme, AI and the project, how it works, the week schedule, the pitch, judges and prizes, FAQ, rules, and finally punches the team name on the label maker before registering.

FIRST VIEWPORT: Masthead with the white logo plate, plain nav links, a green tape CTA and a measuring-ruler progress line. Left column: meta line, HACKATHON tape strip, stencil statement "Tema na segunda. Pitch na sexta." (changed from "Uma semana. Uma equipe. Um problema de verdade." because that line repeated the content lede word for word; the new one carries the two confirmed dates), the countdown in tape digits directly under it, the content lede, a ruled three-row fact list, and the CTA with a text link. Right column: Fig. 1, the 3D week model on a ground grid with leader-line labels for Seg 26/10 (revelação, 8h), Qua 28/10 (inscrições até 23h59, red) and Sex 30/10 (pitch, 8h–11h40); Ter and Qui as dashed wireframes. Registration marks at the sheet corners.

FORM: Maquete da semana v1, surface composition locked by the user on the decision page. seed:85b3e9b90da96124. Signature interactions: the 3D model rises on load, turns with scroll and leans toward the pointer (static SVG drawing when WebGL, wide screens or motion are unavailable); the countdown to Seg 26/10 8h (America/Sao_Paulo) in the hero and as the centrepiece of the theme drawer; the label maker in the final call. Motion grammar: tape feeds and punches, headlines rise word by word, technical lines draw (diagram, week ruler, course line), the progress ruler measures the scroll; nothing essential waits for motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
