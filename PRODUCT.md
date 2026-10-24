# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: static HTML/CSS with minimal vanilla JS. The site only explains the event, needs no accounts, data or server, and its content is still unwritten, so a single static page with no build step is the fastest to edit and deploys to any static host (GitHub Pages, Netlify, Vercel). Revisit only if the scope grows to registration or submissions.

## Users

Students of the Federal Institute of São Paulo (IFSP), including many who have never taken part in a hackathon. Two moments of use:
- Discovery: a student lands on the site, possibly from social media, and decides whether to join. Many need a plain explanation of what a hackathon is.
- Reference: a registered contestant comes back to check the challenge, schedule, or a rule.

## Product Purpose

The digital identity and main promotional experience of a student hackathon held during the 23ª Semana Nacional de Ciência e Tecnologia (SNCT) at IFSP campus Jacareí. It is where students discover the event, understand the challenge and rules, explore the schedule, and get excited to take part. Success: a student who had never considered a hackathon decides to join, and a contestant can find any rule or date without asking the organizers.

## Context

- Campus: IFSP campus Jacareí. Host event: the 23ª Semana Nacional de Ciência e Tecnologia (2026). The site uses the official campus Jacareí signature of the IF mark.
- Organized within IFSP (Instituto Federal de Educação, Ciência e Tecnologia de São Paulo), a public federal institution. The official IFSP visual identity must be respected: logo used only in official variants, not distorted or recolored.
- There was a previous edition: https://hackathon.ifsp.dev/regulamento. It is a content and functional reference only. The new site must not reproduce its layout, navigation, type, color treatment or aesthetic.

## Operating Context

- Language: Brazilian Portuguese (pt-BR) for all user-facing copy. Set `lang="pt-BR"` on the page.
- Informational only. The site does not handle registration, team sign-up, submissions, or accounts. Registration and the official regulation live at external URLs the site links to (placeholders until supplied).
- Sections the site must carry: hero/identity, what a hackathon is, challenge and theme, how participation works, schedule, regulations, evaluation and recognition, FAQ, final invitation, footer.
- All event facts live in one content file so organizers can edit them without touching layout code. Items not yet confirmed render as visibly provisional.
- Contestants are likely to return to it during the event to re-check a rule, so rules must be easy to find and scan, not buried in narrative.

## Capabilities and Constraints

Confirmed:
- One informational web surface, in pt-BR, explaining the event's objective and rules.

Confirmed by the organizers (October 2026 brief):
- Event week: 23ª Semana Nacional de Ciência e Tecnologia, IFSP campus Jacareí, 26 to 30 October 2026.
- Theme is secret until the opening on Monday 26 October 2026, 8:00 to 9:30, Sala 2 do Bloco 1, presented by Prof. Olavo. The site must never reveal, guess or invent it.
- Registration: one team leader submits the official form for the whole team by Wednesday 28 October 2026, 23:59. Late or incomplete registrations are not approved.
- Eligibility: teams of 3 to 5, every member regularly enrolled at IFSP campus Jacareí; students from other IFSP campuses or other institutions cannot take part. All courses welcome; programming expertise is not required.
- AI tools are allowed (optional); projects must still be original and built during the event. Any technology/format; open-source libraries and public APIs allowed.
- Final pitches: Friday 30 October 2026, 8:00 to 11:40, campus auditorium. STAR is a suggested (not mandatory) structure.
- Judging: panel scores each criterion 0 to 10, all criteria equally weighted. Confirmed judge: Prof. Raul Castanhari.
- Awards: medal for 1st, 2nd and 3rd place, plus prizes still to be defined.

Open decisions (not yet decided by the organizers; do not invent):
- Registration form URL and opening date; development period; submission rules and deadline.
- Pitch duration and question time; evaluation criteria; judges 2 to 5; prizes beyond the medals; results date; what to bring.
- Contact details, organizing team name, social media, official regulation URL, SNCT page.

Pre-announcement phase (until the organizers release it): the published site carries only public facts (what a hackathon is, team formation, the reveal meeting, countdown, label maker, 3D week model). Rules, project instructions, full schedule, pitch, judges, criteria, awards and FAQ are shown as locked drawers and their content is kept out of `site/` entirely (`conteudo-pos-anuncio/content-completo.js`). Release is an organizer flag (`publicacao.liberado`), never the visitor's clock. The site does not suggest registering through it until an official registration link exists.

Until these are supplied, future work uses clearly marked placeholders (e.g. `[NOME DO EVENTO]`, `[REGRA A DEFINIR]`) that are obviously unfinished, never plausible-looking invented content.

## Brand Commitments

None yet. No name, logo, or visual identity exists.

## Evidence on Hand

Nothing. There is no copy, logo, sponsor list, past-edition material, photography, or testimonial in the project. Future work must not fabricate sponsors, partners, prize amounts, participant counts, dates, or quotes.

## Product Principles

1. Clarity over hype: the page exists so contestants understand the rules and objective; anything that slows that down is cost, not decoration.
2. Rules are reference material: structured, scannable, and findable on return visits, with nothing important hidden in prose.
3. Nothing invented: every fact on the page comes from the organizers; gaps stay visibly marked as gaps.
4. Native pt-BR: copy is written in Brazilian Portuguese from the start, not translated from English.
