## Why

Oltre al diario di viaggio, il sito ha bisogno delle pagine "vetrina" che trasmettono
fiducia e spingono al contatto: **Home**, **Chi siamo** e **Contatti**, bilingue,
fedeli al design. Sono il primo punto di contatto per i turisti italiani.

## What Changes

- **Home** (`/it/`, `/en/`): hero a tutta pagina, trust band (autorizzata dal governo ·
  guida certificata · assistenza in italiano), box guida Abdelrahim, **preview ultimi
  articoli** (3 card dalla collection), CTA band. Da `home.html`.
- **Chi siamo** (`/it/chi-siamo`, `/en/about`): `page-hero`, box guida, griglia "valori",
  CTA. Da `chi-siamo.html`.
- **Contatti** (`/it/contatti`, `/en/contact`): `page-hero`, 4 contact-card
  (WhatsApp/Email/Facebook/Instagram), form preventivo, orari. Da `contatti.html`.
- **NB**: il design **non** include una pagina Escursioni/Servizi (rimossa dal cliente in
  `chat2.md`); coerentemente **non** viene creata. Vedi `openspec/DESIGN-INVENTORY.md`
  (discrepanza #1) — open question per il cliente.

## Capabilities

### New Capabilities
- `home-page`: home bilingue con hero, trust, guida, preview articoli, CTA.
- `about-page`: pagina Chi siamo bilingue.
- `contact-page`: pagina Contatti bilingue con canali e form.

### Modified Capabilities
<!-- Nessuna spec esistente modificata. -->

## Impact

- Crea: `src/pages/it/index.astro`, `src/pages/en/index.astro`,
  `src/pages/it/chi-siamo.astro`, `src/pages/en/about.astro`,
  `src/pages/it/contatti.astro`, `src/pages/en/contact.astro`.
- Consuma: `Layout`, `Header` (variante hero per la home), `Footer`, `SEOHead`,
  `ArticleCard` (preview home) e la collection `articles` (sola lettura per la preview).
- Fonte di design: `home.html`, `chi-siamo.html`, `contatti.html`.
