# Product

## Register

brand

## Users

Trail runners in Algeria (and the Maghreb diaspora) deciding whether to register for Trail Chrea 2026 in Chréa, Blida — plus their families and local press. Mostly on mobile, often on mid-range Android devices and variable connections. French is the primary language of race communication (Arabic and English later). The job: understand the three races, trust the organization, and register before 15 November 2026 via the external dzmoves.com page.

## Product Purpose

Official event site for Trail Chrea 2026 (6th edition of the Blida Trail, 21 November 2026, ~2,000 runners, organized by Gravir with DJS Blida). Success = a visitor picks their race and clicks "S'inscrire" to dzmoves. Everything else (parcours, programme, prize money, FAQ, résultats) supports that decision. Pure static export — no server.

## Brand Personality

Alpine, muscular, earned. The Chréa cedar forest above the Mitidja plain: cold morning air, switchbacks, national-park cedar green. UTMB / Golden Trail-level presentation applied to an Algerian mountain race — proud, not folkloric. Motion is confident and physical (climbs, reveals, altitude), never decorative confetti.

## Anti-references

- Generic SaaS landing grammar: hero-metric cards, eyebrow kickers over every section, identical icon-card grids.
- Folklore-poster clichés: flag palettes, ornamental patterns as decoration.
- Race-registration template sites (flat Bootstrap event pages with stock medal clipart).
- Editorial-magazine affectation (display serifs, drop caps) — this is athletic, not literary.

## Design Principles

1. **The mountain is the interface.** Topographic contours, elevation profiles, diagonal cuts and layered ridgelines carry the identity; UI chrome stays out of the way.
2. **Data is the drama.** 40.39 km, 1,582 m D+, 08:00 départ — huge condensed numerals do the talking; render real race data, never rounded marketing numbers.
3. **Fast on the téléphérique.** Static, light, 60fps GPU-only transforms; works on a phone halfway up the cable car. Respect prefers-reduced-motion everywhere.
4. **One CTA.** Every path funnels to "S'inscrire" (dzmoves). Urgency stated factually (clôture 15 nov), never dark-pattern.
5. **Editable by organizers.** All facts live in src/config/race.ts; strings in src/data/i18n.ts (FR now, AR/EN later).

## Accessibility & Inclusion

WCAG AA: 4.5:1 body contrast, 3:1 large type. Full prefers-reduced-motion alternatives (crossfades, static countdown). Keyboard-reachable nav, drawer, accordion, lightbox. French lang attribute; i18n structure ready for RTL Arabic later.
