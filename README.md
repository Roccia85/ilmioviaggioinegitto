# Il Mio Viaggio in Egitto

Sito **bilingue (IT/EN)**, **statico**, dell'agenzia di viaggi locale a Luxor.
Costruito con **Astro**. I contenuti (articoli) sono **file Markdown nel repo**,
modificabili dal pannello **Sveltia CMS** su `/admin` — **nessun database**.

> Stato di avanzamento e dettagli tecnici per tappa: vedi **[PROGRESS.md](./PROGRESS.md)**.

---

## Comandi

```bash
npm install        # dipendenze
npm run dev        # sviluppo  → http://localhost:4321  (home: /it)
npm run build      # build statica in dist/
npm run preview    # anteprima della build (server tipo-produzione)
npx astro check    # type-check (0 errori)
```

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

> Le immagini sono **stringhe** (percorsi pubblici scritti dal CMS), non asset
> importati dal pipeline di Astro: scelta voluta per semplicità di manutenzione
> col CMS. Vedi *Media* sotto e le note in PROGRESS.md.

### Struttura cartelle dei contenuti (i18n)

Una **cartella per lingua**, **stesso slug** nelle due lingue (coerente col routing
`/it` · `/en` e con la modalità `multiple_folders` di Sveltia):

```
src/content/articoli/
├─ it/
│  ├─ volo-in-mongolfiera-allalba.md
│  └─ karnak-5-cose-che-non-sai.md
└─ en/
   ├─ volo-in-mongolfiera-allalba.md
   └─ karnak-5-cose-che-non-sai.md
```

L'id della entry è `<lang>/<slug>` (es. `it/karnak-5-cose-che-non-sai`).

### Media

- Upload del CMS → **`public/uploads/`** (`media_folder`).
- URL pubblico → **`/uploads/...`** (`public_folder`), servito staticamente da Astro.

---

## Pannello CMS (Sveltia) — `/admin`

- Si raggiunge su **`/admin`** (o `/admin/`), in dev e in produzione.
- Implementazione: rotta Astro `src/pages/admin/index.astro` (carica Sveltia da CDN
  con script classico) + config statico `public/admin/config.yml`, indicato
  esplicitamente dal `<link rel="cms-config-url">`.
- Backend: **GitHub** (`Roccia85/ilmioviaggioinegitto`, branch `main`).
- i18n CMS attivo: gestisce le versioni **IT/EN dello stesso articolo**.

### Test in locale senza OAuth

`config.yml` ha `local_backend: true`. Con **Chrome/Edge**:

1. `npm run dev` → apri `http://localhost:4321/admin`
2. Sveltia chiede di **selezionare la cartella del repo** (File System Access API)
3. Modifichi gli articoli in locale, senza GitHub né OAuth.

---

## Setup OAuth GitHub (UNA TANTUM) — per pubblicare online

In produzione Sveltia salva i contenuti committando su GitHub. Serve un piccolo
handler OAuth: il modo consigliato è il Worker **`sveltia-cms-auth`** su Cloudflare.
**Nessun segreto finisce nel repo** — il client secret vive solo nel Worker.

### 1. Crea una GitHub OAuth App
GitHub → *Settings* → *Developer settings* → *OAuth Apps* → **New OAuth App**:

| Campo | Valore |
|---|---|
| Application name | `Il Mio Viaggio in Egitto — CMS` |
| Homepage URL | `https://ilmioviaggioinegitto.com` |
| Authorization callback URL | `https://<TUO-WORKER>.workers.dev/callback` |

Premi *Register*, poi **Generate a new client secret**. Annota **Client ID** e
**Client Secret** (il secret si vede una volta sola).

### 2. Deploya il Worker `sveltia-cms-auth`
Repo: <https://github.com/sveltia/sveltia-cms-auth> (deploy su Cloudflare Workers).
Imposta queste **variabili/segreti** del Worker:

| Variabile | Valore |
|---|---|
| `GITHUB_CLIENT_ID` | il Client ID del passo 1 |
| `GITHUB_CLIENT_SECRET` | il Client Secret del passo 1 (segreto) |
| `ALLOWED_DOMAINS` | `ilmioviaggioinegitto.com` (aggiungi i domini di preview, es. `*.pages.dev`) |

Il Worker risponde su un URL tipo `https://<TUO-WORKER>.workers.dev`.
La callback dell'OAuth App (passo 1) deve puntare a `…/callback` di questo URL.

### 3. Collega il Worker al CMS
In **`public/admin/config.yml`** imposta:

```yaml
backend:
  name: github
  repo: Roccia85/ilmioviaggioinegitto
  branch: main
  base_url: https://<TUO-WORKER>.workers.dev   # ← URL del Worker
```

Fai commit/deploy: ora su `/admin/` il bottone **"Login with GitHub"** funziona.

### 4. Aggiungi Abdelrahim come collaboratore
1. Abdelrahim crea un account su <https://github.com> (gratuito).
2. Repo GitHub → *Settings* → *Collaborators* → **Add people** → il suo username,
   ruolo **Write**.
3. Lui accetta l'invito via email, poi va su `https://ilmioviaggioinegitto.com/admin/`,
   fa **Login with GitHub** e autorizza l'app. Da qui crea/modifica articoli IT/EN,
   carica immagini e pubblica (= commit sul branch `main`).

---

## Helper contenuti (`src/lib/articles.ts`)

Pronti per le pagine della Tappa 3:

```ts
type Articolo = CollectionEntry<'articoli'>;

articleLang(entry: Articolo): Lang                       // "it/slug" → "it"
articleSlug(entry: Articolo): string                     // "it/slug" → "slug"
getPublishedArticles(lang: Lang): Promise<Articolo[]>    // pubblicati, data desc, no draft
getArticle(slug: string, lang: Lang): Promise<Articolo | undefined>
getPublishedSlugs(lang: Lang): Promise<string[]>         // per getStaticPaths
```
