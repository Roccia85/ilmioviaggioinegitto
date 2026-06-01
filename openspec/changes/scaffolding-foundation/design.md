## Context

Progetto vuoto, repo git su `main`. Il design (`design-reference/`) è un set di
prototipi HTML/CSS/JS con un design system completo in `assets/site.css` e
comportamento in `assets/site.js`. Tutte le pagine condividono header, footer, drawer
mobile, pulsante WhatsApp flottante e il pattern bilingue `data-it`/`data-en`.

Questa change traduce quella chrome e quel design system in un'app Astro statica,
fissando i contratti per il lavoro parallelo successivo. È **prerequisito di tutte**
le altre change.

### File di design da portare
- `design-reference/project/assets/site.css` → `src/styles/tokens.css` (`:root`) +
  `src/styles/global.css` (reset + classi `.container`, `.btn*`, `.site-header`,
  `.hero`, `.trust`, `.exc-*`, `.art-*`, `.guide`, `.cta-band`, `.site-footer`,
  `.wa-float`, `.drawer`, `.page-hero`, `.reveal`, responsive).
- `design-reference/project/assets/site.js` → logica lingua/drawer/sticky/reveal,
  riadattata al routing statico (vedi Decisioni).
- Chrome comune (header/nav/lang/social, footer, drawer, wa-float) presente in
  `home.html`, `chi-siamo.html`, `articoli.html`, `articolo.html`, `contatti.html`.

## Goals / Non-Goals

**Goals:**
- App Astro che builda statica e serve `/it/` come home di default.
- Token + global CSS identici al design (pixel-faithful), usati via `var(--*)`.
- Componenti condivisi con le **interfacce esatte** definite in `project.md`.
- i18n IT/EN funzionante con LangSwitcher che naviga alla pagina equivalente.
- Stub `src/content/config.ts` che non rompe la build (schema definitivo arriverà da
  `articles-content-cms`).

**Non-Goals:**
- Implementare le pagine di contenuto (Home/Chi siamo/Articoli/Contatti) → altre change.
- Configurare Sveltia CMS → `articles-content-cms`.
- Sitemap/robots/deploy → `deploy-seo`.

## Decisions

- **Astro statico, cartelle `it/` + `en/` esplicite** invece di un unico `[lang]`
  dinamico: gli slug di sezione sono localizzati (`articoli`/`journal`) e l'output è
  puramente statico; cartelle esplicite sono più semplici e leggibili. La lingua resta
  ricavabile dall'URL (`getLangFromUrl`). _Alternativa scartata_: `[lang]` param unico —
  complica gli slug localizzati e i `getStaticPaths`.
- **Cambio lingua come navigazione, non solo `localStorage`**: con HTML statico il
  toggle deve puntare all'URL equivalente nell'altra lingua (`alternatePath`), così
  funziona senza JS ed è SEO-friendly (coerente con hreflang). Lo stato `localStorage`
  del design diventa un "ricorda preferenza per il redirect iniziale" opzionale.
  _Alternativa scartata_: replicare il toggle JS che nasconde `data-en`/`data-it` —
  duplica i contenuti in pagina e peggiora SEO/performance.
- **i18n UI centralizzato** in `src/i18n/ui.ts` (oggetto `ui` + `t()`), eliminando i
  doppioni `data-it`/`data-en`. Le pagine renderizzano una sola lingua per route.
- **CSS globale unico** importato dal `Layout`, più eventuali `<style>` scoped nei
  componenti per parti specifiche; i token in un file separato per chiarezza.
- **JS minimo**: drawer mobile + sticky header come piccolo `<script>` nel `Layout`
  (no framework). Reveal-on-scroll con failsafe come nel design (o disattivabile via
  `prefers-reduced-motion`).
- **Stub content collection**: `src/content/config.ts` definisce una collection
  `articles` minima ma valida; `articles-content-cms` la sostituisce con lo schema
  completo (campo per campo come nel contratto di `project.md`).

## Risks / Trade-offs

- [Contratti instabili bloccano gli altri agenti] → i props in `project.md` sono il
  contratto: questa change li implementa **esattamente**; eventuali modifiche vanno
  riflesse in `project.md` prima del merge.
- [Doppia definizione di `astro.config.mjs` con `deploy-seo`] → lo scaffolding scrive
  solo `i18n`/`output`; `deploy-seo` aggiunge solo `site`+`sitemap` in blocchi separati
  documentati, per evitare conflitti di merge.
- [Stub collection vs schema reale] → lo stub deve avere gli stessi nomi di campo
  fondamentali (`title`,`slug`,`lang`,`date`,`excerpt`,`cover`) per non rompere
  `articles-pages` se parte in parallelo.
- [Drift dei font] → caricare `Cormorant Garamond` + `Mulish` con le stesse `weight`
  del design via `SEOHead`.

## Migration Plan

1. `npm create astro` (template minimo) + `git` già presente; commit su `change/scaffolding-foundation`.
2. Aggiungere config i18n e struttura cartelle.
3. Portare token e CSS globale; verificare con una pagina di prova `/it/`.
4. Implementare i componenti condivisi con le interfacce del contratto.
5. `npm run build` verde; merge su `main`. Rollback = revert del merge (nessun dato).
