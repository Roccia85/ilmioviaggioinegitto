## Why

Il progetto è vuoto. Prima di poter implementare in parallelo pagine, CMS e deploy,
serve lo scheletro Astro con i contratti condivisi (token, chrome, i18n, componenti)
derivati dal design. Questa change è **BLOCCANTE**: è la "fase 0" da completare e
mergiare prima di ogni altra, perché definisce le interfacce che tutte le altre
consumano.

## What Changes

- Inizializzazione progetto **Astro** statico (TypeScript strict, npm, Node ≥20).
- Configurazione **i18n IT/EN** (`defaultLocale: it`, prefisso esplicito), redirect
  `/` → `/it/`, helper di routing e file traduzioni UI (`src/i18n/`).
- **Design token** portati verbatim da `site.css` in `src/styles/tokens.css` e CSS
  globale (reset + classi condivise) in `src/styles/global.css`.
- **Chrome condivisa** portata dal design in componenti Astro: `Layout`, `Header`
  (con stato sticky/solid), `Footer` (social reali), `LangSwitcher`, `SEOHead`,
  `ArticleCard`, `WhatsAppFloat`, drawer mobile.
- **Struttura cartelle** completa del repo e stub `src/content/config.ts`.
- Definizione dei contratti (props/interfacce) che le altre change devono rispettare.

## Capabilities

### New Capabilities
- `project-scaffolding`: progetto Astro statico, struttura cartelle, build, config base.
- `design-system`: design token e CSS globale condivisi, portati dal design.
- `i18n-routing`: routing IT/EN, lingua di default IT, file traduzioni UI, helper.
- `shared-components`: Layout, Header, Footer, LangSwitcher, SEOHead, ArticleCard,
  WhatsAppFloat con interfacce stabili.

### Modified Capabilities
<!-- Nessuna: progetto nuovo, nessuno spec esistente. -->

## Impact

- Crea: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/`,
  `src/components/`, `src/i18n/`, `src/pages/index.astro`, `src/content/config.ts` (stub),
  `public/favicon.svg`.
- Nessuna dipendenza esterna runtime oltre ad Astro + `@astrojs/sitemap` (quest'ultima
  configurata in `deploy-seo`).
- Fonte visiva: `design-reference/project/assets/site.css`, `site.js` e la chrome comune
  di tutte le pagine HTML.
