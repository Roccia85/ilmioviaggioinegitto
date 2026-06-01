# Tasks — deploy-seo

> **Coordinamento parallelo**
> - **Dipendenze**: `scaffolding-foundation` (SEOHead, config i18n). Per la verifica live
>   è utile (non obbligatorio) avere le pagine delle altre change.
> - **Parallelizzabile dopo lo scaffolding**: **Sì** (con `static-pages` e
>   `articles-content-cms`). È la rifinitura finale; mergiare per ultima.
> - **File/cartelle toccati (esclusivi)**: `astro.config.mjs` (**solo** blocco `site` +
>   `integrations` sitemap), `public/robots.txt`, `public/_redirects`/`_headers` o
>   `functions/` (host), immagine OG in `public/`, `README.md`. Completa il setup OAuth
>   iniziato in `articles-content-cms` (lato host, non nel repo).
> - **File di design da implementare**: `<head>`/hreflang/OG comuni a tutte le pagine.
> - **Contratto**: **consuma** `SEOHead` e tutte le pagine. **Espone** la pipeline di
>   deploy. Coordinarsi su `astro.config.mjs`: modificare solo i blocchi indicati per non
>   confliggere con lo scaffolding.

## 1. SEO globale

- [ ] 1.1 Impostare `site: 'https://ilmioviaggioinegitto.com'` in `astro.config.mjs`
- [ ] 1.2 Aggiungere e configurare `@astrojs/sitemap` (con i18n locales it/en, default it)
- [ ] 1.3 Creare `public/robots.txt` (referenzia sitemap, esclude `/admin`)
- [ ] 1.4 Rifinire `SEOHead`: canonical, Open Graph, hreflang it/en + x-default
- [ ] 1.5 Aggiungere un'immagine OG di default in `public/`

## 2. Deploy host

- [ ] 2.1 Scegliere host (Cloudflare Pages raccomandato / Netlify) e impostare build
      (`astro build`, output `dist/`, deploy da `main`)
- [ ] 2.2 Config host: `_redirects`/`_headers` (Netlify) **oppure** Pages Function/config
      (Cloudflare); escludere `/admin` dal redirect SPA se necessario
- [ ] 2.3 Completare l'OAuth GitHub per il CMS (proxy/funzione + variabili d'ambiente host)
- [ ] 2.4 Collegare il dominio `ilmioviaggioinegitto.com`

## 3. README e checklist

- [ ] 3.1 `README.md` in italiano: avvio locale (`npm install`, `npm run dev`, `build`)
- [ ] 3.2 Sezione "Come Abdelrahim pubblica un articolo da `/admin`" (passo-passo)
- [ ] 3.3 Sezione deploy e build automatica
- [ ] 3.4 Checklist pre-lancio: sostituire `wa.me/201000000000`, email reale, foto guida

## 4. Verifica

- [ ] 4.1 `npm run build` verde; sitemap e robots presenti in `dist/`
- [ ] 4.2 Primo deploy; verificare hreflang/canonical/OG e `/admin` live
- [ ] 4.3 `openspec validate deploy-seo --strict` verde; merge su `main` (per ultima)
