## Why

Abdelrahim deve poter pubblicare articoli **da solo, senza toccare codice né database**.
Serve un admin su `/admin` (login GitHub) che salva articoli in **Markdown nel repo**,
così ogni pubblicazione è un commit che innesca la build statica. Questa change definisce
lo **schema dei contenuti** (frontmatter) e configura **Sveltia CMS**.

## What Changes

- **Schema definitivo** della content collection `articles` (`src/content/config.ts`),
  sostituendo lo stub dello scaffolding: campi `title, slug, lang, date, excerpt, cover,
  gallery, category, draft, author` (tipi nel contratto di `project.md`).
- **Sveltia CMS** in `public/admin/` (`index.html` + `config.yml`): collection "Articoli"
  con i campi del design (datetime solo data, image per cover/gallery, markdown per body),
  separazione **IT/EN**, cartella media `public/uploads/`.
- **Login via GitHub OAuth** documentato (provider OAuth + app GitHub).
- Articoli **seed** di esempio (IT+EN) per validare lista e dettaglio.

## Capabilities

### New Capabilities
- `content-model`: schema frontmatter e content collection degli articoli.
- `cms-admin`: Sveltia CMS su `/admin`, collection, media, autenticazione GitHub OAuth.

### Modified Capabilities
<!-- Lo schema collection è uno stub creato da scaffolding-foundation, ma resta within
     questa change in termini di requisiti definitivi: nessuna spec esistente da modificare. -->

## Impact

- Crea: `public/admin/index.html`, `public/admin/config.yml`, articoli seed in
  `src/content/articles/{it,en}/`, `public/uploads/.gitkeep`.
- Modifica: `src/content/config.ts` (da stub a schema definitivo).
- Dipendenze esterne: Sveltia CMS (via CDN nello `index.html` dell'admin), un provider
  **GitHub OAuth** per il backend git-gateway-less (es. OAuth app + worker/funzione, o
  l'OAuth integrato di Cloudflare/Netlify). Documentato per il deploy.
- Fonte di design: `design-reference/project/admin-editor.html` e `admin-dashboard.html`
  (campi/stati), `admin-login.html` (UX login).
