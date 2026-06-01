# Tasks — articles-content-cms

> **Coordinamento parallelo**
> - **Dipendenze**: `scaffolding-foundation` (struttura cartelle, stub collection).
> - **Parallelizzabile dopo lo scaffolding**: **Sì** (con `static-pages` e `deploy-seo`).
>   Va però **mergiata prima** di `articles-pages` (che consuma lo schema).
> - **File/cartelle toccati (esclusivi)**: `public/admin/index.html`,
>   `public/admin/config.yml`, `public/uploads/`, `src/content/config.ts` (da stub a
>   definitivo), `src/content/articles/{it,en}/**` (seed).
> - **File di design da implementare**: `admin-editor.html`, `admin-dashboard.html`
>   (campi/stati), `admin-login.html` (UX login).
> - **Contratto**: **espone** lo schema `articles` definitivo (consumato da
>   `articles-pages`). **Consuma** struttura cartelle e convenzioni dello scaffolding.
>   Tocca `src/content/config.ts` in modo esclusivo — nessun'altra change lo modifica.

## 1. Schema contenuti

- [ ] 1.1 Sostituire lo stub `src/content/config.ts` con lo schema Zod definitivo
      (`title, slug, lang, date, excerpt, cover, gallery, category, draft, author`)
- [ ] 1.2 Definire l'enum `category` con i valori del design
      (Esperienze, Karnak & Luxor, Consigli, Curiosità, Guide)
- [ ] 1.3 Verificare che `draft: true` escluda l'articolo dalla build di produzione

## 2. Sveltia CMS

- [ ] 2.1 Creare `public/admin/index.html` che carica Sveltia da CDN (versione pinnata)
- [ ] 2.2 Creare `public/admin/config.yml`: `backend: github` (repo + branch `main`),
      `media_folder: public/uploads`, `public_folder: /uploads`
- [ ] 2.3 Definire la collection "Articoli" con i campi del design e i widget corretti
      (string, text per estratto, markdown per body, datetime solo-data, select per
      categoria, image per cover, list/image per gallery, boolean per draft)
- [ ] 2.4 Configurare la separazione IT/EN (collection o filtro per cartella `it`/`en`)
      con path file `src/content/articles/{{locale}}/{{slug}}.md`
- [ ] 2.5 Creare `public/uploads/.gitkeep`

## 3. GitHub OAuth (documentazione setup)

- [ ] 3.1 Documentare la creazione dell'app OAuth GitHub e i campi `backend` necessari
- [ ] 3.2 Annotare i segreti/variabili richiesti dall'host (rimando a `deploy-seo`)

## 4. Seed e verifica

- [ ] 4.1 Creare 2 storie seed con versione IT+EN (es. mongolfiera, Karnak) con cover/gallery
- [ ] 4.2 `npm run build` verde con gli articoli seed
- [ ] 4.3 Verificare la corrispondenza campo-per-campo tra `config.yml` e `config.ts`
- [ ] 4.4 `openspec validate articles-content-cms --strict` verde; merge su `main`
