# Project — Il Mio Viaggio in Egitto

Sito **statico bilingue (IT/EN)** di un'agenzia di viaggi locale a Luxor (Egitto).
Referente e guida: **Abdelrahim** (guida certificata/egittologo, italiano eccellente).
Agenzia **autorizzata dal governo egiziano**. Dominio: `ilmioviaggioinegitto.com`.

Questo documento è la **fonte di verità dei contratti condivisi**: ogni agente che
esegue una change DEVE rispettare struttura cartelle, design token, interfacce dei
componenti, schema frontmatter, routing i18n e convenzioni di naming qui definiti.
I contratti sono derivati dal design (`design-reference/`) e dal suo README.

## Vincoli non negoziabili

- **Manutenzione minima**: sito **statico**, nessun server, nessun database, nessun
  aggiornamento di sicurezza richiesto. Hosting gratuito.
- **Stack**: [Astro](https://astro.build) (output statico), i18n IT/EN, Markdown nel
  repo come unica sorgente di contenuto.
- **CMS**: [Sveltia CMS](https://github.com/sveltia/sveltia-cms) su `/admin`, login via
  **GitHub OAuth**, scrive Markdown nel repo (niente DB). Build automatica a ogni commit.
- **Deploy**: Cloudflare Pages **oppure** Netlify (piano gratuito).
- **Mobile-first**, immagini ottimizzate, SEO base (meta, Open Graph, hreflang IT/EN,
  sitemap), accessibilità, performance.

## Stack e versioni

- Astro `^5` (output `static`), integrazione `@astrojs/sitemap`.
- Node `>=20` (in repo è disponibile v22). Package manager: **npm** (lockfile committato).
- TypeScript in modalità `strict` (config Astro `strict`).
- Markdown articoli via **Content Collections** (`astro:content`, `glob` loader).
- Nessun framework UI client obbligatorio: preferire `.astro` puro. JS client solo dove
  serve (drawer mobile, sticky header) come piccola isola o `<script>` inline.

## Struttura completa delle cartelle

```
/                              # root repo
├─ design-reference/           # bundle di design (READ-ONLY, fonte di verità visiva)
│  ├─ project/*.html, assets/  # NON modificare: riferimento per il porting
│  └─ chats/*.md
├─ openspec/                   # questo piano (project.md, changes/, specs/)
├─ public/
│  ├─ admin/                   # Sveltia CMS
│  │  ├─ index.html            # bootstrap Sveltia
│  │  └─ config.yml            # collection + backend GitHub
│  ├─ uploads/                 # media caricati dal CMS (cover/gallery)
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ _redirects / _headers    # (Netlify) oppure equivalente Cloudflare
├─ src/
│  ├─ components/              # componenti condivisi (.astro)
│  │  ├─ Layout.astro
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  ├─ LangSwitcher.astro
│  │  ├─ SEOHead.astro
│  │  ├─ ArticleCard.astro
│  │  └─ WhatsAppFloat.astro
│  ├─ content/
│  │  ├─ config.ts             # definizione collection "articles"
│  │  └─ articles/             # file Markdown degli articoli (scritti dal CMS)
│  │     ├─ it/                # articoli in italiano
│  │     └─ en/                # articoli in inglese
│  ├─ i18n/
│  │  ├─ ui.ts                 # stringhe UI tradotte (IT/EN) + helper t()
│  │  └─ utils.ts              # helpers: getLang, localizePath, getStaticPaths langs
│  ├─ layouts/                 # (opzionale) layout di pagina specifici
│  ├─ pages/
│  │  ├─ index.astro           # redirect "/" → "/it/" (lingua di default)
│  │  ├─ it/ … en/             # vedi "Routing i18n"
│  ├─ styles/
│  │  ├─ tokens.css            # SOLO variabili :root (design token)
│  │  └─ global.css            # reset + classi condivise portate da site.css
│  └─ assets/                  # immagini ottimizzate importate da Astro (<Image/>)
├─ astro.config.mjs            # site, i18n, sitemap
├─ package.json
└─ README.md                   # in italiano: avvio, deploy, come pubblicare da /admin
```

**Regola anti-conflitto**: ogni change scrive solo nelle cartelle che le sono
assegnate (vedi tabella in "Esecuzione parallela"). I file condivisi (token, global,
componenti, layout, config i18n) sono creati **esclusivamente** da
`scaffolding-foundation` e poi solo **consumati** dalle altre.

## Design token (estratti da `design-reference/project/assets/site.css`)

Da emettere **verbatim** in `src/styles/tokens.css` dentro `:root`. Sono il contratto
visivo: nessun valore hardcoded altrove, usare sempre `var(--token)`.

```css
:root{
  /* Nile blues */
  --nile-900:#0b2433; --nile-800:#103246; --nile-700:#17475f;
  --nile-600:#1f6079; --nile-500:#2c7e96;
  /* Warm gold */
  --gold-600:#a9802f; --gold-500:#c2973c; --gold-400:#d4ad55; --gold-300:#e4c884;
  /* Sand / paper */
  --paper:#fbf7ef; --sand-50:#f6efe1; --sand-100:#efe5d2;
  --sand-200:#e4d6bd; --sand-300:#d2bf9d;
  /* Ink / text */
  --ink:#1d2329; --ink-soft:#414a52; --muted:#7c7464; --line:#e7ddca; --white:#ffffff;
  /* Typography */
  --serif:"Cormorant Garamond", Georgia, "Times New Roman", serif;
  --sans:"Mulish", system-ui, -apple-system, "Segoe UI", sans-serif;
  /* Radii */
  --r-xs:3px; --r-sm:6px; --r-md:10px; --r-lg:16px;
  /* Shadows */
  --shadow-sm:0 1px 2px rgba(11,36,51,.06), 0 2px 8px rgba(11,36,51,.05);
  --shadow-md:0 8px 24px rgba(11,36,51,.10), 0 2px 6px rgba(11,36,51,.06);
  --shadow-lg:0 24px 60px rgba(11,36,51,.18);
  /* Layout */
  --container:1180px; --ease:cubic-bezier(.22,.61,.36,1);
}
```

- **Tipografia**: base `body` 17px, `line-height` 1.65, sans `Mulish`; titoli `serif`
  `Cormorant Garamond` 600. Font caricati da Google Fonts con `preconnect` (come nel
  design) — gestiti dentro `SEOHead`/`Layout`.
- **Breakpoint** (dal design): `max-width:900px` (tablet: menu→burger, griglie a 1 col)
  e `max-width:560px` (mobile: padding ridotti, CTA full-width). Mobile-first.
- **Spaziature/ritmo**: `.section{padding:72px 0}` (52px sotto 560px); `.container`
  max `1180px`, padding laterale 22px (18px su mobile).

## Componenti condivisi (interfacce/props) — contratto

Definiti in `scaffolding-foundation`. Le altre change li **consumano** senza modificarli.
Markup e classi vanno portati 1:1 dal design (header/footer/nav/drawer/wa-float).

### `Layout.astro`
Avvolge ogni pagina: `<html lang>` + `data-lang`, `<head>` via `SEOHead`, `Header`,
`<slot/>`, `Footer`, `WhatsAppFloat`, drawer mobile, import di `tokens.css`+`global.css`.
```ts
interface Props {
  lang: 'it' | 'en';
  seo: SEOProps;            // inoltrato a SEOHead (vedi sotto)
  headerVariant?: 'transparent' | 'solid'; // 'transparent' = hero a tutta pagina (home); 'solid' = pagine interne (default 'solid')
  activeNav?: 'home' | 'about' | 'articles' | 'contact';
}
```

### `Header.astro`
Brand wordmark + marchio SVG, menu (Home/Chi siamo/Articoli/Contatti), `LangSwitcher`,
icone social, burger mobile. Stato sticky/solid come da `site.js`.
```ts
interface Props {
  lang: 'it' | 'en';
  activeNav?: 'home' | 'about' | 'articles' | 'contact';
  variant?: 'transparent' | 'solid';   // default 'solid' (classe always-solid)
}
```

### `LangSwitcher.astro`
Toggle IT/EN. **Naviga all'URL equivalente nell'altra lingua** (no `localStorage`-only:
con routing statico il cambio lingua è un link a `localizePath(currentPath, otherLang)`).
```ts
interface Props { lang: 'it' | 'en'; alternatePath: string; } // alternatePath = URL della stessa pagina nell'altra lingua
```

### `Footer.astro`
4 colonne (brand+social, Naviga, Seguici/Instagram, Contatti) + barra "autorizzata dal
governo". Social reali. Nessuna prop obbligatoria oltre a `lang`.
```ts
interface Props { lang: 'it' | 'en'; }
```

### `SEOHead.astro`
`<title>`, meta description, canonical, **Open Graph**, **hreflang IT/EN + x-default**,
preconnect+font, favicon. Consumato da tutte le pagine.
```ts
interface SEOProps {
  lang: 'it' | 'en';
  title: string;
  description: string;
  path: string;            // path canonico della pagina corrente (es. /it/articoli)
  alternates: { it: string; en: string }; // per hreflang
  ogImage?: string;        // default: og image del sito
  type?: 'website' | 'article';
  publishedTime?: string;  // ISO, solo per type 'article'
}
```

### `ArticleCard.astro`
Card articolo (classe `.art-card`, variante `.wide` per il featured). Consuma una entry
della collection.
```ts
interface Props {
  lang: 'it' | 'en';
  href: string;            // URL localizzato del singolo articolo
  title: string;
  excerpt?: string;
  date: Date;
  cover?: string;          // URL immagine copertina
  variant?: 'default' | 'wide';
  category?: string;
}
```

### `WhatsAppFloat.astro`
Pulsante flottante WhatsApp (`.wa-float`). Prop opzionale `phone` (default placeholder).

## Schema frontmatter degli articoli — contratto

Derivato da `admin-editor.html` + `admin-dashboard.html`. **Una lingua per file**;
le coppie IT/EN sono collegate da uno `slug` condiviso. File in
`src/content/articles/{it|en}/<slug>.md`. Definizione Zod in `src/content/config.ts`.

| Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|
| `title` | string | sì | Titolo articolo |
| `slug` | string | sì | Identità condivisa tra versione IT ed EN (collega le traduzioni) |
| `lang` | `'it' \| 'en'` | sì | Lingua del file |
| `date` | date (solo data) | sì | Data di pubblicazione; ordinamento desc |
| `excerpt` | string | sì | Estratto/anteprima (≤ ~200 char) |
| `cover` | image/string | sì | Immagine di copertina (`/uploads/...`) |
| `gallery` | string[] | no | Galleria immagini |
| `category` | enum | no | `Esperienze \| Karnak & Luxor \| Consigli \| Curiosità \| Guide` |
| `draft` | boolean | no (default false) | Bozza → esclusa dalla build di produzione |
| `author` | string | no (default "Abdelrahim") | Mostrato nel dettaglio |

Esempio:
```yaml
---
title: "In mongolfiera all'alba sopra Luxor: la guida completa"
slug: "mongolfiera-alba-luxor"
lang: "it"
date: 2026-05-14
excerpt: "Quanto costa, a che ora partire, cosa portare."
cover: "/uploads/mongolfiera-cover.jpg"
gallery:
  - "/uploads/valle-dei-re.jpg"
category: "Esperienze"
draft: false
author: "Abdelrahim"
---
Corpo dell'articolo in **Markdown**…
```

## Routing i18n (/it, /en) — contratto

- **Italiano = lingua di default**. `/` redirige a `/it/`.
- Astro i18n in `astro.config.mjs`:
  ```js
  i18n: { defaultLocale: 'it', locales: ['it','en'], routing: { prefixDefaultLocale: true } }
  ```
  (prefisso esplicito anche per IT → URL coerenti `/it/...` e `/en/...`).
- **Mappa delle route** (slug localizzati lato URL; la lingua è il primo segmento):

  | Pagina | IT | EN |
  |---|---|---|
  | Home | `/it/` | `/en/` |
  | Chi siamo | `/it/chi-siamo` | `/en/about` |
  | Articoli (lista) | `/it/articoli` | `/en/journal` |
  | Articolo (singolo) | `/it/articoli/<slug>` | `/en/journal/<slug>` |
  | Contatti | `/it/contatti` | `/en/contact` |

  Gli slug di sezione localizzati (`articoli`/`journal`, `chi-siamo`/`about`,
  `contatti`/`contact`) sono definiti in **`src/i18n/utils.ts`** in un'unica mappa
  `routes`, così `localizePath()` e `LangSwitcher` restano coerenti. Implementazione
  via cartelle `src/pages/it/` e `src/pages/en/` (vedi nota sotto).
- **File traduzioni UI**: `src/i18n/ui.ts` esporta `ui = { it: {...}, en: {...} }` e un
  helper `t(lang, key)`. Tutte le stringhe di chrome/navigazione/CTA passano da qui
  (sostituiscono i doppioni `data-it`/`data-en` del design).
- **Helper** in `src/i18n/utils.ts`: `getLangFromUrl(url)`, `useTranslations(lang)`,
  `localizePath(path, lang)`, `getAlternates(path)` (per hreflang e LangSwitcher).
- Nota implementativa: poiché gli slug di sezione differiscono per lingua, si usano
  cartelle esplicite `src/pages/it/*` e `src/pages/en/*` (più semplice e statico di un
  unico `[lang]` con rewrite). La lingua è comunque ricavabile dall'URL.

## Convenzioni di naming

- **Componenti**: PascalCase `.astro` (`ArticleCard.astro`).
- **Pagine/route**: kebab-case, slug localizzati come da tabella.
- **File contenuto**: `src/content/articles/{it|en}/<slug>.md`, `<slug>` kebab-case,
  **identico** tra IT ed EN per la stessa storia.
- **Chiavi i18n**: punto-namespaced, es. `nav.home`, `cta.whatsapp`, `footer.gov`.
- **Token CSS**: nomi del design (`--nile-800`…), mai reintrodurre valori grezzi.
- **Media**: in `public/uploads/` (CMS) o `src/assets/` (immagini ottimizzate Astro).
- **Branch git per change**: `change/<change-id>` (es. `change/articles-pages`).
- **Change id**: kebab-case che inizia con una lettera (vincolo OpenSpec → niente
  prefissi numerici; l'ordine è documentato, non nel nome).

## Esecuzione parallela

Flusso consigliato per far lavorare **più agenti in autonomia** senza conflitti.

### Ordine
1. **Prima di tutto**: applicare `scaffolding-foundation` (BLOCCANTE). Crea Astro, i18n,
   token, CSS globale, Header/Footer/Layout/LangSwitcher/SEOHead/ArticleCard e la
   struttura cartelle. Definisce **tutti i contratti** consumati dalle altre. Mergiare
   su `main` prima di proseguire.
2. **Poi, in parallelo** (un agente per change, ognuno in un **git worktree isolato**
   creato da `main` aggiornato):
   - `articles-content-cms`
   - `articles-pages`
   - `static-pages`
   - `deploy-seo`

### Matrice file (per evitare sovrapposizioni di merge)

| Change | Scrive in (esclusivo) | Consuma (read-only) |
|---|---|---|
| `scaffolding-foundation` | `astro.config.mjs`, `package.json`, `src/styles/`, `src/components/`, `src/i18n/`, `src/pages/index.astro`, `src/content/config.ts` (stub) | `design-reference/` |
| `articles-content-cms` | `public/admin/`, `public/uploads/.gitkeep`, `src/content/config.ts` (schema definitivo), `src/content/articles/**` (seed) | contratti `project.md`, `admin-*.html` |
| `articles-pages` | `src/pages/it/articoli*`, `src/pages/en/journal*` (lista + `[slug]`) | `ArticleCard`, `Layout`, `SEOHead`, schema collection, `articoli.html`/`articolo.html` |
| `static-pages` | `src/pages/it/index.astro`, `src/pages/en/index.astro`, `chi-siamo`/`about`, `contatti`/`contact` | `Layout`, `Header`, `Footer`, `SEOHead`, `home.html`/`chi-siamo.html`/`contatti.html` |
| `deploy-seo` | `astro.config.mjs` (solo sezione `sitemap`/`site`), `public/robots.txt`, `public/_redirects`/`_headers`, config Cloudflare/Netlify, `README.md`, rifinitura `SEOHead` | tutte le pagine, `SEOHead` |

> Punto di attenzione condiviso: `src/content/config.ts` è creato come **stub** dallo
> scaffolding e portato a schema **definitivo** da `articles-content-cms`. `articles-pages`
> ne dipende: va eseguita/mergiata **dopo** `articles-content-cms` (vedi grafo).
> `astro.config.mjs`: lo scaffolding definisce `i18n`; `deploy-seo` aggiunge solo `site`
> + integrazione `sitemap`. Sezioni distinte → merge senza conflitti se si rispettano i
> blocchi indicati nelle rispettive `design.md`.

### Grafo dipendenze

```
scaffolding-foundation  (blocca tutto)
        │
        ├─► static-pages          (parallelizzabile)
        ├─► deploy-seo            (parallelizzabile; rifinitura finale)
        └─► articles-content-cms ─► articles-pages   (pages dipende dallo schema collection)
```

- Pienamente parallele dopo lo scaffolding: `static-pages`, `articles-content-cms`,
  `deploy-seo`.
- `articles-pages` dipende dallo schema definito in `articles-content-cms`
  (può iniziare in parallelo usando lo schema-contratto di `project.md`, ma va
  **mergiata dopo**).

### Verify + archiviazione
- Prima del merge di ogni change: `npm run build` deve passare + check dei task della
  change. Usare lo skill `verify` per controllo manuale di lingua/route/responsive.
- `openspec validate <change> --strict` deve essere verde.
- Archiviare le change con `openspec archive <change>` nell'ordine:
  `scaffolding-foundation` → `articles-content-cms` → `articles-pages` →
  `static-pages` → `deploy-seo`.
