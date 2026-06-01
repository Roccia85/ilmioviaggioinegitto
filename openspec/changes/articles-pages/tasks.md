# Tasks — articles-pages

> **Coordinamento parallelo**
> - **Dipendenze**: `scaffolding-foundation` (componenti) **+** schema di
>   `articles-content-cms`. Può iniziare in parallelo contro lo schema-contratto di
>   `project.md`, ma **mergiare DOPO** `articles-content-cms`.
> - **Parallelizzabile dopo lo scaffolding**: **Sì** per sviluppo; merge sequenziale
>   rispetto a `articles-content-cms`.
> - **File/cartelle toccati (esclusivi)**: `src/pages/it/articoli/` (index + `[slug]`),
>   `src/pages/en/journal/` (index + `[slug]`), eventuali partial nuovi in
>   `src/components/` (es. `IgStories.astro`) — additivi, non modificano i componenti
>   condivisi esistenti.
> - **File di design da implementare**: `articoli.html` (lista) e `articolo.html` (dettaglio).
> - **Contratto**: **consuma** `ArticleCard`, `Layout`, `SEOHead` e lo schema collection
>   `articles`. **Non espone** contratti ad altre change.

## 1. Lista articoli

- [ ] 1.1 `src/pages/it/articoli/index.astro`: query collection `lang: 'it'`, escludi draft,
      ordina per `date` desc
- [ ] 1.2 Featured (più recente) come `ArticleCard variant="wide"` + griglia delle restanti
- [ ] 1.3 Paginazione statica con `paginate()`; nascondi i controlli se una sola pagina
- [ ] 1.4 Partial `IgStories.astro` (sezione `ig-rail`) e inserimento nella lista
- [ ] 1.5 Replica per EN in `src/pages/en/journal/index.astro` (`lang: 'en'`)
- [ ] 1.6 Passare `SEOHead` con title/description e alternates lista IT↔EN

## 2. Singolo articolo

- [ ] 2.1 `src/pages/it/articoli/[slug].astro` con `getStaticPaths` (IT, non-draft)
- [ ] 2.2 Rendering Markdown del corpo con stili `.article` (lede/pull/figure/tick/h2)
- [ ] 2.3 Hero con data e autore; copertina dell'articolo
- [ ] 2.4 Blocco share (FB/IG/WhatsApp/email) + callout storie Instagram
- [ ] 2.5 Sezione "altri articoli" (fino a 3, stessa lingua, escluso il corrente)
- [ ] 2.6 Replica per EN in `src/pages/en/journal/[slug].astro`
- [ ] 2.7 Alternates hreflang per `slug` tradotto, con fallback alla lista altra lingua

## 3. Verifica

- [ ] 3.1 `npm run build` verde con gli articoli seed; route IT/EN generate correttamente
- [ ] 3.2 Verifica ordinamento per data, featured, paginazione e cambio lingua
- [ ] 3.3 `openspec validate articles-pages --strict` verde; merge su `main` dopo il CMS
