## Why

Il sito deve andare online su hosting **gratuito** con **build automatica a ogni commit**,
essere trovabile dai motori di ricerca (SEO base + hreflang IT/EN) e avere una
documentazione in italiano che permetta ad Abdelrahim di pubblicare e gestire il sito in
autonomia. Questa change chiude il cerchio: deploy + SEO globale + README.

## What Changes

- **Configurazione SEO globale**: `site` in `astro.config.mjs`, integrazione
  `@astrojs/sitemap`, `robots.txt`, rifinitura di `SEOHead` (canonical, OG, **hreflang
  IT/EN + x-default**) e immagine OG di default.
- **Deploy**: configurazione per **Cloudflare Pages** *oppure* **Netlify** (piano
  gratuito), con comando build `astro build`, output `dist/`, build a ogni push su `main`.
- **OAuth GitHub per il CMS**: completare il flusso OAuth lato host (proxy/funzione) e
  documentare i segreti.
- **README in italiano**: avvio locale, deploy, e **guida passo-passo "come Abdelrahim
  pubblica da /admin"** + checklist pre-lancio (sostituire placeholder WhatsApp/foto).

## Capabilities

### New Capabilities
- `seo`: meta, Open Graph, hreflang IT/EN, canonical, sitemap, robots.
- `deployment`: hosting gratuito con build automatica, OAuth CMS, README operativo.

### Modified Capabilities
<!-- Nessuna spec esistente modificata; SEOHead è esteso ma definito qui a livello di
     requisiti globali (lo scaffolding ne crea il componente). -->

## Impact

- Modifica (blocco dedicato): `astro.config.mjs` (`site` + integrazione `sitemap`).
- Crea: `public/robots.txt`, file di config host (`public/_redirects`/`_headers` per
  Netlify o `wrangler`/`functions/` per Cloudflare), eventuale immagine OG in `public/`,
  `README.md` in italiano.
- Consuma: tutte le pagine e `SEOHead`; il setup OAuth completa `articles-content-cms`.
- Fonte: `<head>`/hreflang/OG presenti in tutte le pagine del design.
