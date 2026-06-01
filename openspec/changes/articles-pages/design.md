## Context

Gli articoli sono Markdown nella collection `articles` (schema in `articles-content-cms`).
Questa change rende lista e dettaglio per IT ed EN, riusando `ArticleCard`, `Layout` e
`SEOHead` dello scaffolding. Il markup/stile va portato da `articoli.html` e
`articolo.html`; il contenuto dinamico arriva dalla collection.

Dipende da `scaffolding-foundation` (componenti) e dallo **schema** di
`articles-content-cms`. Può essere sviluppata in parallelo usando lo schema-contratto di
`project.md`, ma va **mergiata dopo** `articles-content-cms`.

### File di design da implementare
- `design-reference/project/articoli.html` → lista: `page-hero`, featured `art-card wide`,
  griglia `art-card`, paginazione, sezione `ig-rail` (storie Instagram).
- `design-reference/project/articolo.html` → dettaglio: `page-hero` (data/autore),
  corpo (`.article` con `lede`/`pull`/`figure`/`tick`/`h2`), callout storie IG aside,
  blocco `share`, CTA contatto, sezione "altri articoli".

## Goals / Non-Goals

**Goals:**
- Lista per lingua, ordinata per `date` desc, con featured = articolo più recente.
- Paginazione statica (come da design, 3 "pagine" di esempio → usare `paginate()`).
- Rendering del corpo Markdown con gli stili tipografici del dettaglio.
- Sezione storie Instagram fedele al design, link reali all'account IG.
- Share + CTA WhatsApp/email; sezione "altri articoli" (stessa lingua, esclusa la corrente).
- hreflang corretto tra `/it/articoli/<slug>` e `/en/journal/<slug>` quando esiste la
  traduzione.

**Non-Goals:**
- Definire lo schema collection (→ `articles-content-cms`).
- Modificare componenti condivisi (solo consumo). Eventuali partial nuovi sono additivi.
- SEO globale/sitemap (→ `deploy-seo`); qui si passano solo le props a `SEOHead`.

## Decisions

- **`getStaticPaths` per lingua**: ogni route filtra la collection per `lang` e genera le
  pagine; le bozze sono escluse. _Alternativa scartata_: un'unica route `[lang]` — gli
  slug di sezione differiscono (`articoli`/`journal`), quindi cartelle separate.
- **Ordinamento**: `entries.sort((a,b) => b.data.date - a.data.date)`; il primo è il
  featured (`variant="wide"`).
- **Sezione storie IG** estratta in un partial `IgStories.astro` (riuso lista/dettaglio).
  È contenuto semi-statico (immagini segnaposto + link IG), non dalla collection.
- **"Altri articoli"**: prendere fino a 3 articoli della stessa lingua diversi dal corrente,
  ordinati per data.
- **Alternate hreflang per articolo**: se esiste lo stesso `slug` nell'altra lingua,
  `alternates` punta alla sua route; altrimenti fallback alla lista di quella lingua.

## Risks / Trade-offs

- [Articolo senza traduzione] → LangSwitcher/hreflang fanno fallback alla lista dell'altra
  lingua (documentato), evitando link rotti.
- [Markdown con HTML del design (figure/pull/tick)] → usare classi del global CSS;
  contenuti ricchi resi via componenti Markdown o classi su elementi standard.
- [Parte in parallelo prima del merge dello schema] → sviluppare contro lo schema-contratto
  di `project.md`; **non** mergiare prima di `articles-content-cms`.
- [Paginazione vs pochi articoli] → con < 1 pagina di contenuti, nascondere i controlli.

## Migration Plan

1. Branch `change/articles-pages` da `main` (post-scaffolding); attendere merge schema.
2. Implementare lista IT/EN + partial `IgStories`.
3. Implementare dettaglio IT/EN + rendering Markdown + share + related.
4. `npm run build` verde con gli articoli seed; verifica route, ordinamento, lingue.
5. Merge su `main` **dopo** `articles-content-cms`.
