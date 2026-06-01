## Context

Il sito è statico e senza database: i contenuti vivono come Markdown nel repo Git. Il
design mocka un'area admin (login/dashboard/editor) che **non** va reimplementata: l'admin
reale è **Sveltia CMS** (fork moderno di Decap/Netlify CMS, UI propria) servito da
`/admin`. I mockup servono solo a ricavare **quali campi** servono e l'UX attesa.

Questa change dipende da `scaffolding-foundation` (struttura cartelle, stub collection).
`articles-pages` consuma lo schema qui definito.

### File di design da implementare
- `design-reference/project/admin-editor.html` → campi della collection: titolo,
  estratto, corpo (markdown), data di pubblicazione, categoria
  (Esperienze/Karnak & Luxor/Consigli/Curiosità/Guide), lingua IT/EN, copertina,
  galleria, stato bozza/pubblicato.
- `design-reference/project/admin-dashboard.html` → colonne/stati lista: Titolo, Lingua,
  Data, Stato (Pubblicato/Bozza).
- `design-reference/project/admin-login.html` → UX di login (sostituito da GitHub OAuth).

## Goals / Non-Goals

**Goals:**
- Schema `articles` tipizzato (Zod) coerente col contratto di `project.md`.
- Sveltia CMS funzionante su `/admin` con collection bilingue e upload media.
- Pubblicazione = commit Markdown nel repo → build automatica.
- Login via GitHub OAuth documentato e riproducibile.
- Articoli seed (almeno 2 storie con versione IT+EN) per testare le pagine.

**Non-Goals:**
- Reimplementare graficamente le schermate admin mockate.
- Rendering delle pagine articoli (→ `articles-pages`).
- Configurazione hosting/deploy e segreti OAuth in produzione (→ documentati qui,
  applicati in `deploy-seo`).

## Decisions

- **Sveltia CMS** invece di Decap: stesso formato di config, UI più veloce, supporto
  nativo GitHub OAuth, mantenuto. _Alternativa scartata_: Decap CMS (più lento, meno
  manutenuto); TinaCMS (richiede servizi esterni → contro il vincolo "zero server").
- **Una lingua per file Markdown**, file IT in `articles/it/<slug>.md` ed EN in
  `articles/en/<slug>.md`, collegati dallo **stesso `slug`**. _Alternativa scartata_:
  i18n "campi multipli nello stesso file" — complica il rendering per-route e il
  diffing dei contenuti. La separazione per cartella è più semplice e statica.
- **Categoria come enum** con i valori del design; **`draft: boolean`** mappa lo stato
  Bozza/Pubblicato della dashboard (gli articoli `draft` sono esclusi dalla build prod).
- **Data solo-data** (no orario), come da editor; in frontmatter `date: YYYY-MM-DD`.
- **Media in `public/uploads/`** referenziati come `/uploads/...` (path assoluto),
  compatibile con `<Image>`/`<img>` statico.
- **Backend GitHub OAuth**: `backend: { name: github, repo, branch: main }`. Il flusso
  OAuth richiede un endpoint di autorizzazione: documentare l'uso di un OAuth proxy
  (Cloudflare Pages Function/Worker o Netlify) — scelta finale presa in `deploy-seo`
  in base all'host.

## Risks / Trade-offs

- [Config OAuth complessa per un non-tecnico] → README passo-passo in italiano in
  `deploy-seo`; valori segreti gestiti dall'host, non nel repo.
- [Sveltia da CDN può cambiare] → pinnare una versione specifica nel `index.html`.
- [Disallineamento schema CMS ↔ Zod] → i campi di `config.yml` e di `config.ts` derivano
  entrambi dalla **stessa tabella** in `project.md`; un task verifica la corrispondenza.
- [Slug IT/EN fuori sincrono] → convenzione: stesso `slug`; un task di verifica che ogni
  storia abbia (idealmente) entrambe le lingue, con fallback documentato.

## Migration Plan

1. Branch `change/articles-content-cms` da `main` (post-scaffolding).
2. Definire schema Zod in `src/content/config.ts` (sostituendo lo stub).
3. Creare `public/admin/index.html` (carica Sveltia da CDN pinnata) e `config.yml`.
4. Creare 2 articoli seed IT+EN; `npm run build` verde.
5. Documentare il setup OAuth (rimando a `deploy-seo` per i segreti host).
6. Merge su `main` **prima** di mergiare `articles-pages`.
