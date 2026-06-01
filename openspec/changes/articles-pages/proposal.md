## Why

Il cuore editoriale del sito è il "diario di viaggio". Servono la **lista articoli** e
la **pagina di singolo articolo**, bilingue, che leggono i Markdown della collection e
li rendono con la chrome e le card già definite. Senza queste pagine i contenuti del CMS
non sono visibili al pubblico.

## What Changes

- **Lista articoli** (`/it/articoli`, `/en/journal`): featured `art-card wide` + griglia
  `ArticleCard`, **ordinata per data decrescente**, con paginazione e la sezione
  **storie Instagram** (`ig-rail`), portate da `articoli.html`.
- **Singolo articolo** (`/it/articoli/<slug>`, `/en/journal/<slug>`): `page-hero` con
  data/autore, **rendering Markdown** del corpo (lede/pull/figure/tick), callout storie
  IG, blocco share, CTA contatto, sezione "altri articoli", portati da `articolo.html`.
- Generazione statica delle route per ogni articolo non-bozza, per entrambe le lingue.

## Capabilities

### New Capabilities
- `articles-listing`: pagina lista bilingue, ordinamento, paginazione, sezione storie IG.
- `article-detail`: pagina di dettaglio bilingue con rendering Markdown e condivisione.

### Modified Capabilities
<!-- Nessuna spec esistente modificata. -->

## Impact

- Crea: `src/pages/it/articoli/index.astro`, `src/pages/it/articoli/[slug].astro`,
  `src/pages/en/journal/index.astro`, `src/pages/en/journal/[slug].astro` (più eventuali
  partial in `src/components/` specifici degli articoli, es. `IgStories.astro`).
- Consuma: `ArticleCard`, `Layout`, `SEOHead` (scaffolding) e lo **schema collection**
  (`articles-content-cms`).
- Fonte di design: `design-reference/project/articoli.html` e `articolo.html`.
