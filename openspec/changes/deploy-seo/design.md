## Context

Il sito è statico (Astro `output: 'static'`). Per il go-live servono: dominio
`ilmioviaggioinegitto.com`, hosting gratuito con CI integrata, SEO base e la
documentazione operativa per il cliente. Il CMS (Sveltia, da `articles-content-cms`)
richiede un endpoint OAuth GitHub che dipende dall'host scelto.

Dipende da `scaffolding-foundation` (SEOHead, config i18n). È una **rifinitura finale**:
si applica meglio quando le pagine esistono, ma è sviluppabile in parallelo.

## Goals / Non-Goals

**Goals:**
- Build automatica a ogni commit su `main`, su piano gratuito.
- `site` + sitemap + robots; hreflang IT/EN + x-default + canonical su tutte le pagine.
- Immagine Open Graph di default e per-articolo.
- OAuth GitHub funzionante per `/admin`.
- README in italiano comprensibile a un non-tecnico, con la procedura di pubblicazione.
- Checklist pre-lancio: sostituire numero WhatsApp e foto reali della guida.

**Non-Goals:**
- Analytics/consenso cookie (eventuale change futura).
- Form contatti con backend (resta dimostrativo).
- Logica delle pagine (già nelle altre change).

## Decisions

- **Host: scelta tra Cloudflare Pages e Netlify** — entrambi gratuiti con CI. Decisione:
  raccomandare **Cloudflare Pages** (CDN veloce, build da Git, Pages Functions per
  l'OAuth proxy) ma fornire anche la config Netlify equivalente (`_redirects`, deploy da
  Git, OAuth integrato). _Trade-off_: Netlify ha OAuth CMS più "out of the box"; Cloudflare
  richiede una piccola Pages Function ma è più performante. La scelta finale è del cliente.
- **OAuth GitHub**: usare un proxy minimale (Cloudflare Pages Function o l'integrazione
  Netlify) con `client_id`/`client_secret` come **variabili d'ambiente dell'host** (mai
  nel repo). `config.yml` del CMS punta al `base_url` del proxy.
- **hreflang/canonical**: emessi da `SEOHead` usando `getAlternates(path)`; `x-default`
  → versione italiana. `site` in `astro.config.mjs` = `https://ilmioviaggioinegitto.com`.
- **Sitemap**: `@astrojs/sitemap` con `i18n` (locales it/en, default it) per generare le
  alternates nella sitemap.
- **README in italiano**: sezioni "Avvio locale", "Come pubblicare un articolo da /admin",
  "Deploy e build automatica", "Checklist pre-lancio".

## Risks / Trade-offs

- [Conflitto su `astro.config.mjs` con lo scaffolding] → modificare **solo** il blocco
  `site` e l'array `integrations` (sitemap), lasciando intatto `i18n`/`output`; blocchi
  separati e documentati.
- [Segreti OAuth] → mai committare; istruzioni per impostarli nel pannello host.
- [Dominio non ancora puntato] → README spiega come collegare il dominio; il deploy
  funziona anche sul sottodominio dell'host nel frattempo.
- [Immagini OG mancanti] → fornire un OG di default in `public/` finché non ci sono cover.

## Migration Plan

1. Branch `change/deploy-seo` da `main` (idealmente dopo le altre, o in parallelo).
2. Aggiungere `site` + `@astrojs/sitemap`; creare `robots.txt`.
3. Rifinire `SEOHead` (hreflang/canonical/OG) e OG di default.
4. Aggiungere config host scelto (Cloudflare Pages o Netlify) + OAuth proxy.
5. Scrivere `README.md` in italiano + checklist pre-lancio.
6. `npm run build` verde; primo deploy; verificare sitemap/hreflang live.
