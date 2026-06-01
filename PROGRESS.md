# Il Mio Viaggio in Egitto — PROGRESS

Sito bilingue (IT/EN) statico per un'agenzia di viaggi locale a Luxor (Egitto).
Guida di riferimento: **Abdelrahim** · Dominio: **ilmioviaggioinegitto.com**.

Costruzione **a tappe sequenziali**. Questo file documenta lo stato e fa da
riferimento per le tappe successive.

---

## ✅ Tappa 1 — Scaffold (COMPLETATA)

Fondamenta + chrome condivisa. **Nessuna pagina di contenuto** (Home completa,
Chi siamo, Articoli, Contatti) e **nessun CMS**: arrivano nelle tappe successive.

### Stack
- **Astro 6** (statico, output `static`).
- **i18n nativo Astro**: `locales: ['it','en']`, `defaultLocale: 'it'`,
  `routing.prefixDefaultLocale: true` → ogni lingua è sotto prefisso (`/it`, `/en`).
  La root `/` reindirizza a `/it` (`redirects` in `astro.config.mjs`).
- **Solo CSS** + variabili CSS. Nessun framework UI.
- Font: **Cormorant Garamond** (serif) + **Mulish** (sans) via Google Fonts.

### Comandi
```bash
npm install      # dipendenze
npm run dev      # sviluppo (http://localhost:4321 → /it)
npm run build    # build statica in dist/  (passa: /it, /en, redirect /)
npm run preview  # anteprima della build
npx astro check  # type-check (0 errori)
```

---

## Struttura cartelle

```
.
├─ astro.config.mjs        # config + i18n + redirect "/" → "/it"
├─ tsconfig.json
├─ public/
│  └─ favicon.svg          # marchio SVG dell'agenzia
├─ src/
│  ├─ config.ts            # costanti sito: dominio, email, WhatsApp, social
│  ├─ i18n/
│  │  ├─ it.json           # stringhe UI italiane
│  │  ├─ en.json           # stringhe UI inglesi
│  │  └─ utils.ts          # helper i18n (t, getLangFromUrl, localizePath, …)
│  ├─ styles/
│  │  ├─ tokens.css        # DESIGN TOKEN (variabili :root)
│  │  └─ global.css        # reset, tipografia, helper, CHROME (header/footer/…)
│  ├─ layouts/
│  │  └─ BaseLayout.astro  # wrapper pagina (head + Header + slot + Footer + WA)
│  ├─ components/
│  │  ├─ SEOHead.astro     # meta, hreflang, Open Graph, font
│  │  ├─ Header.astro      # logo, menu, LangSwitcher, social, drawer mobile
│  │  ├─ LangSwitcher.astro# selettore IT/EN (mantiene la pagina)
│  │  └─ Footer.astro      # brand, navigazione, social, contatti, copyright
│  └─ pages/
│     └─ [lang]/
│        └─ index.astro    # Home SEGNAPOSTO (genera /it e /en)
├─ design-reference/       # bundle di design (fonte di verità visiva) — non in build
├─ openspec/               # piano/spec del progetto
└─ PROGRESS.md
```

> La fonte di verità visiva è `design-reference/project/assets/site.css` +
> i mockup HTML. Token e chrome sono stati portati **fedelmente**, non ridisegnati.

---

## Design token (`src/styles/tokens.css`)

Tutti come variabili CSS in `:root`. Estratti dal design.

| Gruppo | Token |
|---|---|
| **Blu Nilo** | `--nile-900 #0b2433` · `--nile-800 #103246` · `--nile-700 #17475f` · `--nile-600 #1f6079` · `--nile-500 #2c7e96` |
| **Oro caldo** | `--gold-600 #a9802f` · `--gold-500 #c2973c` · `--gold-400 #d4ad55` · `--gold-300 #e4c884` |
| **Sabbia / carta** | `--paper #fbf7ef` · `--sand-50 #f6efe1` · `--sand-100 #efe5d2` · `--sand-200 #e4d6bd` · `--sand-300 #d2bf9d` |
| **Inchiostro / testo** | `--ink #1d2329` · `--ink-soft #414a52` · `--muted #7c7464` · `--line #e7ddca` · `--white #ffffff` |
| **Tipografia** | `--serif` (Cormorant Garamond) · `--sans` (Mulish) · `--text-base 17px` · `--leading-base 1.65` |
| **Raggi** | `--r-xs 3px` · `--r-sm 6px` · `--r-md 10px` · `--r-lg 16px` |
| **Ombre** | `--shadow-sm` · `--shadow-md` · `--shadow-lg` |
| **Layout** | `--container 1180px` · `--header-h 74px` · `--ease` (cubic-bezier) |
| **Breakpoint** | `--bp-md 900px` · `--bp-sm 560px` (usati nelle `@media`) |

`global.css` contiene: reset, tipografia, `.container/.eyebrow/.section`, bottoni
(`.btn` + varianti primary/dark/ghost/outline/wa/lg), header sticky
(trasparente→`.solid` / `.always-solid`), `.hero` + `.page-hero`, footer, drawer
mobile, `.wa-float`, animazione `.reveal`, e i due breakpoint responsive.
Le classi delle **pagine di contenuto** (card articoli, trust band, box guida,
cta-band) **non** sono ancora incluse: verranno con le rispettive tappe.

---

## Componenti condivisi e loro props

| Componente | Props | Descrizione |
|---|---|---|
| **BaseLayout** | `lang: 'it'\|'en'` (req) · `title?` · `description?` · `image?` · `noindex?` · `solidHeader?` | Wrapper pagina: imposta `<html lang>`, monta `SEOHead`, `Header`, `<slot>`, `Footer`, bottone WhatsApp e lo script di chrome (sticky header, drawer, reveal). `solidHeader=true` per pagine senza hero in cima. |
| **SEOHead** | `lang` (req) · `title?` · `description?` · `image?` · `noindex?` | `<head>`: charset/viewport, `<title>` (con suffisso brand), description, canonical, **hreflang it/en/x-default**, **Open Graph + Twitter** (struttura pronta), favicon, font. Default da `i18n` se le props mancano. |
| **Header** | `lang` (req) · `solid?` | Logo+marchio, menu (Home · Chi siamo · Articoli · Contatti) con stato `active`, `LangSwitcher`, icone social, burger + **drawer mobile**. `solid=true` ⇒ `always-solid`. |
| **LangSwitcher** | `lang` (req) · `variant?: 'pill'\|'drawer'` | Due link IT/EN che puntano alla **stessa pagina** nell'altra lingua (`switchLangPath`). Marca `aria-current` sulla lingua attiva. `variant='drawer'` per il menu mobile. |
| **Footer** | `lang` (req) | Brand+descrizione, social, colonna "Naviga", colonna "Seguici" (storie Instagram), contatti (email/WhatsApp/luogo), copyright e badge "autorizzata dal governo". |

Social reali (in `src/config.ts`, usati da Header/Footer):
- Facebook → `https://www.facebook.com/ilmioviaggoinEgitto/`
- Instagram → `https://www.instagram.com/il_mio_viaggo_in_egitto`

---

## Come funziona l'i18n

1. **Routing** — i18n nativo Astro con prefisso lingua. Una sola pagina
   `src/pages/[lang]/index.astro` genera `/it` e `/en` via `getStaticPaths`.
   Le tappe successive seguiranno lo stesso schema `src/pages/[lang]/…`.
2. **Stringhe UI** — tutte in `src/i18n/it.json` e `en.json` (struttura a chiavi
   annidate: `nav.*`, `footer.*`, `seo.*`, `home.*`, …). **Niente testo hardcoded**
   nei componenti.
3. **Helper** (`src/i18n/utils.ts`):
   - `useTranslations(lang)` → funzione `t('a.b.c')` (fallback alla chiave).
   - `getLangFromUrl(url)` / `isLang(x)` → lingua dal prefisso di rotta.
   - `localizePath(path, lang)` → antepone il prefisso (`/contatti` → `/it/contatti`).
   - `unlocalizePath(path)` → rimuove il prefisso.
   - `switchLangPath(url, lang)` → stessa pagina nell'altra lingua (usato da LangSwitcher).
4. **Contenuti vs UI** — le stringhe d'interfaccia stanno negli `i18n/*.json`;
   le costanti non traducibili (email, WhatsApp, social, dominio) in `src/config.ts`.

---

## Note, scelte e punti aperti

- **Menu finale = Home · Chi siamo · Articoli · Contatti** (nessuna "Escursioni").
  Deciso seguendo il design (`chat2.md`: il cliente ha rimosso Escursioni a favore
  delle storie Instagram). Vedi `openspec/DESIGN-INVENTORY.md §3.1`.
- **Cambio lingua basato su rotte**, non più sul toggle client-side `data-it/data-en`
  del prototipo: ogni pagina rende **una sola** lingua (meglio per SEO/hreflang).
  Lo script condiviso conserva solo header sticky, drawer e reveal-on-scroll.
- **Design non raggiungibile via URL.** Il link fornito
  (`api.anthropic.com/v1/design/h/…`) rispondeva **404**: ho usato il bundle locale
  `design-reference/` (stesso contenuto) come fonte di verità — confermato da
  `DESIGN-BUNDLE-README.md` e `openspec/DESIGN-INVENTORY.md`.
- **Placeholder da sostituire prima del go-live** (tracciati anche nell'inventory):
  telefono/WhatsApp `+20 100 000 0000` → `wa.me/201000000000`; foto della guida;
  immagine OG di default (`/og-default.jpg`, non ancora presente).
- **Home attuale = segnaposto**: hero minimale (verifica header trasparente),
  CTA WhatsApp/àncora, nota scaffold. Niente sezioni di contenuto definitive.

### Punti del design non del tutto chiari
- Il **marchio (logo SVG)** nell'header usa `currentColor` per il cerchio esterno:
  sopra l'hero scuro resta inchiostro (poco visibile), come nel prototipo. Portato
  fedelmente; da valutare un'eventuale variante chiara in una tappa successiva.
- **Immagini hero/articoli** nel prototipo sono Unsplash/Loremflickr remote:
  per lo scaffold ho riusato l'hero Unsplash di Karnak; in produzione andranno
  asset locali ottimizzati (tappa asset/deploy).

---

## ✅ Tappa 2 — Modello contenuti + CMS (COMPLETATA)

Modello articoli (Astro Content Collections) e pannello **Sveltia CMS** su `/admin`.
**Nessuna pagina di contenuto** ancora: gli helper sono pronti per la Tappa 3.
Guida operativa completa (incl. **OAuth GitHub** e collaboratori) in **[README.md](./README.md)**.

### Schema definitivo articoli (`src/content.config.ts`)

Collection `articoli`, glob loader su `src/content/articoli`, validazione zod:

| Campo | Tipo zod | Obbligatorio | Default |
|---|---|---|---|
| `title` | `z.string()` | ✅ | — |
| `date` | `z.coerce.date()` | ✅ | — (solo data) |
| `cover` | `z.string()` | ✅ | — (percorso pubblico) |
| `gallery` | `z.array(z.string())` | — | `[]` |
| `excerpt` | `z.string().optional()` | — | — |
| `draft` | `z.boolean()` | — | `false` |
| *corpo* | Markdown (`entry.body`/`render()`) | ✅ | — |

> `import { z } from 'astro/zod'` (in Astro 6 `z` da `astro:content` è deprecato).

### Gestione i18n dei contenuti

**Una cartella per lingua, stesso slug** → coerente col routing `/it`·`/en` (Tappa 1)
e con la modalità `multiple_folders` di Sveltia:

```
src/content/articoli/
├─ it/<slug>.md
└─ en/<slug>.md      # id entry = "<lang>/<slug>"
```

Seed di collaudo (chiaramente fittizi, `draft: false`): `volo-in-mongolfiera-allalba`
e `karnak-5-cose-che-non-sai`, entrambi in IT + EN (4 file).

### CMS (Sveltia) e media
- Rotta Astro `src/pages/admin/index.astro` (Sveltia da CDN, script **classico**
  + `<link rel="cms-config-url">`) + config statico `public/admin/config.yml`.
  Così `/admin` funziona in **dev e produzione** (servirlo come file statico in
  `public/admin/index.html` dava 404 in `astro dev`).
- Backend GitHub `Roccia85/ilmioviaggioinegitto` @ `main`; `local_backend: true` per il test locale.
- i18n CMS `multiple_folders`, `locales: [it, en]`, `default_locale: it`.
- Widget allineati allo schema: `string` (title) · `datetime` solo data (date) ·
  `text` (excerpt) · `image` (cover) · `list[image]` (gallery) · `boolean` (draft) ·
  `markdown` (body). i18n per campo: `true` (traducibili) tranne `date` (`duplicate`).
- **Media**: upload in `public/uploads/` (`media_folder`), public path `/uploads` (`public_folder`).
- Verifica: `build` OK con i seed; `/admin` e `/admin/` rispondono 200 in dev e in
  produzione e caricano il pannello. `astro check`: 0 errori.

### Helper contenuti (`src/lib/articles.ts`) — firme per la Tappa 3
- `articleLang(entry): Lang` · `articleSlug(entry): string`
- `getPublishedArticles(lang): Promise<Articolo[]>` — data desc, no draft
- `getArticle(slug, lang): Promise<Articolo | undefined>`
- `getPublishedSlugs(lang): Promise<string[]>`

### Scelte e punti che richiedono una tua decisione
- **Immagini come stringhe** (percorsi `/uploads/...`), non asset importati da Astro:
  massima semplicità col CMS, ma **niente ottimizzazione build-time** delle immagini.
  Alternativa (per una tappa futura): media in `src/assets` + `image()` schema →
  ottimizzazione automatica, ma gestione media nel CMS più complessa. **Confermi `public/uploads`?**
- **`category` non incluso**: il mockup admin lo prevedeva (Esperienze, Karnak & Luxor,
  Consigli…), ma non era nello schema richiesto per questa tappa. Facile da aggiungere
  (campo `select` + `z.enum`) se lo vuoi.
- **`draft` per-lingua** (`i18n: true`): si può pubblicare IT prima di EN. Se preferisci
  che lo stato bozza sia unico per articolo, si imposta `duplicate`.

---

## ✅ Tappa 3 — Pagine del sito (COMPLETATA)

Tutte le pagine pubbliche in IT + EN, dai file di design (fonte di verità visiva).
Build verde con i seed (14 pagine), `astro check` 0 errori/warning/hint, 0 link morti,
cambio lingua coerente ovunque (con fallback per gli articoli mono-lingua).

### Pagine create (mapping design → pagina Astro)

| File di design | Pagina Astro | Route generate |
|---|---|---|
| `home.html` | `src/pages/[lang]/index.astro` | `/it`, `/en` |
| `chi-siamo.html` | `src/pages/[lang]/chi-siamo.astro` | `/it/chi-siamo`, `/en/chi-siamo` |
| `articoli.html` | `src/pages/[lang]/articoli/index.astro` | `/it/articoli`, `/en/articoli` |
| `articolo.html` | `src/pages/[lang]/articoli/[slug].astro` | `/{lang}/articoli/{slug}` (per articolo pubblicato) |
| `contatti.html` | `src/pages/[lang]/contatti.astro` | `/it/contatti`, `/en/contatti` |
| *(nessuno)* | — | **Escursioni: assente nel design** (vedi sotto) |

Nuovi file di supporto (riuso, non ridefinizione):
- `src/components/ArticleCard.astro` — card articolo (default + `wide`/`featured`), riusata da Home, lista e correlati.
- `src/styles/content.css` — classi delle sezioni di contenuto (trust, art-card, guide, cta-band, corpo articolo, ig-rail, contatti, valori); importata da `BaseLayout` dopo `global.css`.
- Helper aggiunti a `src/lib/articles.ts`: `getRelatedArticles(slug, lang, limit=3)`, `readingTime(body)`.
- Formattazione date in `src/i18n/utils.ts`: `formatDateNumeric(date)` ("14 · 05 · 2026"), `formatDateLong(date, lang)`.

### Sezione articoli (dinamica, dagli helper Tappa 2)
- **Lista**: articolo più recente in evidenza (`art-card wide`) + griglia dei restanti;
  esclude i draft, ordina per data desc; stato "nessun articolo" (`.empty-state`);
  sezione storie Instagram dal design.
- **Dettaglio**: cover, data localizzata, autore + tempo di lettura, **corpo Markdown
  renderizzato** (`render()`), galleria (se presente), callout Instagram, condivisione
  (FB/IG/WA/email), CTA, articoli correlati. Route per slug+lingua via `getStaticPaths`.
- **Cambio lingua sul dettaglio**: porta alla traduzione se esiste ed è pubblicata,
  altrimenti **fallback alla lista** nell'altra lingua. `hreflang` include l'altra
  lingua **solo** se la traduzione esiste (verificato con un articolo mono-lingua).

### Componenti condivisi — modifiche (retro-compatibili)
- `LangSwitcher` / `Header` / `BaseLayout`: nuova prop opzionale `langAlternates`
  (mappa lang→href) per il cambio lingua per-pagina; `BaseLayout` accetta anche
  `seoAlternates` per i `hreflang`. Le pagine che non la passano mantengono il
  comportamento precedente (swap automatico della rotta).
- `SEOHead`: prop opzionale `alternates`; title/description per pagina via i18n
  (`seo.<pagina>`), Open Graph/Twitter con `og:image` = cover dell'articolo nel dettaglio.

### Stringhe i18n
Aggiunte le sezioni `common`, `home`, `about`, `articles`, `article`, `contact` e
`seo.<pagina>` in `src/i18n/{it,en}.json`. Nessun testo UI hardcoded nei componenti.

### ⚠️ Discrepanza brief ↔ design: ESCURSIONI
Il brief della Tappa 3 chiede una pagina **Escursioni/Servizi** e una sezione
escursioni in Home. **Il design non le contiene**: il cliente le ha rimosse in
Tappa 2 (chat2) a favore delle storie Instagram; il menu è Home · Chi siamo ·
Articoli · Contatti. Per non "ridisegnare" (il design è la fonte di verità visiva)
**non** è stata creata una pagina Escursioni. Le classi `.exc-*` restano nel design
non usate. → **Decisione richiesta al cliente** (vedi report): reintrodurre Escursioni?

### Segnaposto [DA COMPLETARE] in attesa di contenuti reali
- ~~Numero WhatsApp~~ ✅ **fornito**: `+20 101 009 0109` → `wa.me/201010090109` (in `src/config.ts`).
- **Foto reale della guida** (Abdelrahim): box segnaposto in Home e Chi siamo
  (in attesa della foto reale).
- **Immagini hero / cta-band / storie Instagram**: usano foto Unsplash/Loremflickr
  del design → sostituire con asset di proprietà ottimizzati.
- **Immagine OG di default** `/og-default.jpg`: non ancora presente (gli articoli usano la cover).
- **Articoli reali**: i 2 seed (IT+EN) sono fittizi; vanno sostituiti dal CMS.

> Pagina Contatti: su richiesta del cliente rimossi il **form preventivo** e il
> canale **email**; restano i canali WhatsApp · Facebook · Instagram.

---

## Prossime tappe (non in questa)
- Decisione Escursioni (vedi sopra); eventuale pagina dedicata.
- SEO/deploy: sitemap, robots, OG reali, sostituzione segnaposto; deploy + Worker OAuth.
