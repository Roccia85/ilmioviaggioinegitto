# Il Mio Viaggio in Egitto

Sito **bilingue (IT/EN)**, **statico**, dell'agenzia di viaggi locale a Luxor.
Costruito con **Astro**. I contenuti (articoli) sono **file Markdown nel repo**,
modificabili dal pannello **Sveltia CMS** su `/admin` — **nessun database**.
Hosting di produzione: **Cloudflare Workers** (solo asset statici).
Dominio: **ilmioviaggioinegitto.com**.

> Avanzamento per tappa e dettagli tecnici: vedi **[PROGRESS.md](./PROGRESS.md)**.

---

## Prerequisiti

- **Node.js 20+** e **npm** (sviluppato con Node 22).
- **Git** e un account **GitHub** (il repo è `Roccia85/ilmioviaggioinegitto`).
- Per pubblicare: un account **Cloudflare** (il dominio è su **Cloudflare Registrar**).
- Per il CMS online: una **GitHub OAuth App** + il worker **sveltia-cms-auth**
  (vedi *Guida OAuth*). In locale non serve nulla di tutto questo.

---

## Comandi rapidi

```bash
npm install        # dipendenze
npm run dev        # sviluppo  → http://localhost:4321  (la home è /it)
npm run build      # build statica in dist/
npm run preview    # anteprima della build (server tipo-produzione)
npx astro check    # controllo tipi (atteso: 0 errori)
```

---

## Sviluppo locale

1. `npm install` (la prima volta).
2. `npm run dev` e apri **http://localhost:4321** → reindirizza a `/it`.
3. Pagine: `/it` · `/en` · `/it/articoli` · `/it/articoli/<slug>` · `/it/chi-siamo` ·
   `/it/contatti` (e gli equivalenti `/en/...`). Il selettore lingua in alto a destra
   mantiene la pagina corrente.
4. Pannello CMS in locale: **http://localhost:4321/admin** (vedi sotto, *senza OAuth*).

---

## Modello contenuti — articoli

Collection Astro **`articoli`** (`src/content.config.ts`), frontmatter validato con zod:

| Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|
| `title` | string | ✅ | Titolo. |
| `date` | date | ✅ | Data di pubblicazione (solo data, ISO `YYYY-MM-DD`). |
| `cover` | string | ✅ | Percorso pubblico copertina, es. `/uploads/foo.jpg`. |
| `gallery` | string[] | — | Default `[]`. Percorsi pubblici. |
| `excerpt` | string | — | Frase breve per le card. |
| `draft` | boolean | — | Default `false`. Se `true`, escluso dal sito. |
| *corpo* | Markdown | ✅ | È il **contenuto del file** (non un campo frontmatter). |

### Struttura cartelle dei contenuti (i18n)

Una **cartella per lingua**, **stesso slug** nelle due lingue:

```
src/content/articoli/
├─ it/<slug>.md
└─ en/<slug>.md        # id entry = "<lang>/<slug>"
```

### Media
- Upload del CMS → **`public/uploads/`** (`media_folder`).
- URL pubblico → **`/uploads/...`** (`public_folder`), servito staticamente da Astro.

---

## Come Abdelrahim pubblica un articolo (da `/admin`)

### Online (modo normale, dopo il setup OAuth)
1. Vai su **https://ilmioviaggioinegitto.com/admin** e premi **Login with GitHub**.
2. Collezione **Articoli** → **New Articolo** (o apri un articolo esistente).
3. In alto puoi passare tra **🇮🇹 Italiano** e **🇬🇧 English**: compila i campi in
   entrambe le lingue (Titolo, Estratto, Contenuto). Data e copertina si impostano una volta.
4. Carica la **Copertina** (e la **Galleria** se vuoi): le immagini vanno in `public/uploads/`.
5. Lascia **Bozza** attiva finché non è pronto; togli la spunta per pubblicare.
6. **Publish** → Sveltia fa un commit su GitHub (branch `main`). Cloudflare ricostruisce
   il sito e in ~1–2 minuti l'articolo è online in `/it/articoli` e `/en/articoli`.

> Un articolo con **Bozza** attiva non compare sul sito. Se è pubblicato solo in una
> lingua, appare solo in quella lingua; il selettore lingua, dall'articolo, rimanda
> alla lista nell'altra lingua (nessun link rotto).

### In locale, SENZA OAuth (per provare)
`public/admin/config.yml` ha `local_backend: true`. Con **Chrome o Edge**:
1. `npm run dev` → apri **http://localhost:4321/admin**
2. Clicca **Work with Local Repository** e **seleziona la cartella radice del repo**.
3. Modifichi gli articoli sui file locali, senza GitHub né OAuth.
   *(Nessun comando aggiuntivo: Sveltia usa la File System Access API del browser.)*

---

## Deploy su Cloudflare (Workers, asset statici)

Il sito è **statico**: nessun adapter SSR. Si pubblica come **asset statici** su un
Worker, configurato in **`wrangler.jsonc`**:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "ilmioviaggioinegitto",
  "compatibility_date": "2026-06-01",
  "assets": { "directory": "./dist" }   // niente SPA: sito multi-pagina
}
```

### Deploy manuale (dalla tua macchina)
```bash
npx wrangler login     # una volta: autorizza Cloudflare nel browser
npm run build          # genera dist/
npx wrangler deploy    # pubblica dist/ → https://ilmioviaggioinegitto.<sottodominio>.workers.dev
```

### Deploy automatico a ogni push (consigliato)
Sulla dashboard Cloudflare: **Workers & Pages → Create → Workers → Connect to Git**,
seleziona il repo `Roccia85/ilmioviaggioinegitto` e imposta:
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

Da qui ogni `git push` su `main` ricostruisce e ripubblica il sito (è anche ciò che
rende effettivi gli articoli pubblicati da `/admin`).

> Esiste una **pagina 404** (`src/pages/404.astro`) coerente col design: con asset
> statici Cloudflare la serve per i percorsi inesistenti. **Non** è impostato
> `not_found_handling: single-page-application` (corretto: il sito è multi-pagina).

---

## Collegamento del dominio (Cloudflare Registrar)

Il dominio `ilmioviaggioinegitto.com` è registrato su Cloudflare, quindi il DNS è già
gestito da Cloudflare e i record vengono creati automaticamente:

1. **Workers & Pages** → apri il Worker **`ilmioviaggioinegitto`**.
2. **Settings → Domains & Routes → Add → Custom Domain**.
3. Inserisci **`ilmioviaggioinegitto.com`** e conferma. (Ripeti per
   **`www.ilmioviaggioinegitto.com`** se vuoi anche il www.)
4. Cloudflare aggiunge i record DNS e il certificato TLS in automatico; in pochi minuti
   il sito risponde sul dominio.

Dopo aver collegato il dominio, aggiungilo a `ALLOWED_DOMAINS` del worker OAuth (sotto).

---

## Guida OAuth una-tantum (login `/admin` in produzione)

In produzione Sveltia salva i contenuti facendo commit su GitHub. Serve un piccolo
handler OAuth: il worker ufficiale **`sveltia-cms-auth`** su Cloudflare.
**Nessun segreto va nel repo**: il client secret vive solo nel worker.
Procedura ufficiale: <https://github.com/sveltia/sveltia-cms-auth>.

**a) Crea una GitHub OAuth App** — <https://github.com/settings/applications/new>
| Campo | Valore |
|---|---|
| Application name | `Il Mio Viaggio in Egitto — CMS` |
| Homepage URL | `https://ilmioviaggioinegitto.com` |
| Authorization callback URL | `https://sveltia-cms-auth.<SOTTODOMINIO>.workers.dev/callback` |

Premi *Register*, poi **Generate a new client secret**. Annota **Client ID** e
**Client Secret** (il secret si vede una sola volta). *(Il dominio del worker lo
conosci dopo il passo b: in caso, aggiorna la callback subito dopo.)*

**b) Deploya il worker `sveltia-cms-auth`** — dal repo ufficiale, con il pulsante
*Deploy to Cloudflare Workers* oppure `wrangler deploy`. Otterrai un URL del tipo
`https://sveltia-cms-auth.<SOTTODOMINIO>.workers.dev`.

**c) Imposta i SECRET del worker** (dashboard del worker → *Settings → Variables and
Secrets*), **non** nel repo:
| Nome | Valore |
|---|---|
| `GITHUB_CLIENT_ID` | il Client ID del passo (a) |
| `GITHUB_CLIENT_SECRET` | il Client Secret del passo (a) — come *Secret* cifrato |
| `ALLOWED_DOMAINS` | `ilmioviaggioinegitto.com` (aggiungi `*.workers.dev` per i test) |

**d) Collega il worker al CMS** — in **`public/admin/config.yml`** sostituisci il
placeholder con l'URL reale del worker:
```yaml
backend:
  name: github
  repo: Roccia85/ilmioviaggioinegitto
  branch: main
  base_url: https://sveltia-cms-auth.<SOTTODOMINIO>.workers.dev
```
Fai commit/deploy: su `/admin` il pulsante **Login with GitHub** ora funziona.

**e) Aggiungi Abdelrahim come collaboratore** — Repo GitHub → *Settings → Collaborators
→ Add people* → il suo username GitHub, ruolo **Write**. Lui accetta l'invito via email,
poi entra da `/admin` con **Login with GitHub**.

---

## SEO

- **Sitemap**: generata da `@astrojs/sitemap` → `/sitemap-index.xml` (con hreflang
  it-IT/en-US). `robots.txt` la referenzia e blocca `/admin`.
- **Canonical assoluti** e **hreflang IT/EN** (più `x-default`) su tutte le pagine,
  via `SEOHead.astro`. Sul dettaglio articolo l'hreflang include l'altra lingua solo
  se la traduzione esiste.
- **Open Graph / Twitter**: title e description per pagina e lingua (dai file i18n);
  immagine di default `public/og-default.jpg` (1200×630), sostituita dalla cover sugli
  articoli. → *vedi [DA COMPLETARE] in PROGRESS.md per una OG immagine fotografica.*

---

## Helper contenuti (`src/lib/articles.ts`)

Usati dalle pagine articoli:

```ts
type Articolo = CollectionEntry<'articoli'>;

articleLang(entry): Lang                                 // "it/slug" → "it"
articleSlug(entry): string                               // "it/slug" → "slug"
getPublishedArticles(lang): Promise<Articolo[]>          // pubblicati, data desc, no draft
getArticle(slug, lang): Promise<Articolo | undefined>
getPublishedSlugs(lang): Promise<string[]>               // per getStaticPaths
getRelatedArticles(slug, lang, limit=3): Promise<Articolo[]>
readingTime(body): number                                // minuti stimati
```

---

## Manutenzione

- **Contenuti**: si gestiscono solo da `/admin` (o modificando i `.md` in
  `src/content/articoli/`). Niente database, niente backend applicativo.
- **Dipendenze**: `npm outdated` / `npm update` ogni tanto; ricontrolla con
  `npm run build` e `npx astro check`.
- **OAuth**: il worker `sveltia-cms-auth` è una-tantum; va rigenerato il
  `GITHUB_CLIENT_SECRET` solo se compromesso. In futuro GitHub potrebbe supportare il
  PKCE e rendere il worker non necessario.
- **Immagini**: caricarle già ottimizzate (web, larghezza ragionevole). Stanno in
  `public/uploads/` e vengono servite così come sono.
- **Lingue**: ogni stringa d'interfaccia sta in `src/i18n/{it,en}.json`; i contenuti
  degli articoli sono bilingui nel CMS.
