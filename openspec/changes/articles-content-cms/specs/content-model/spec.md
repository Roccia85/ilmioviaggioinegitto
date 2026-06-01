## ADDED Requirements

### Requirement: Article frontmatter schema
Il sistema SHALL definire la content collection `articles` in `src/content/config.ts`
con i campi e i tipi del contratto di `project.md`: `title` (string, req), `slug`
(string, req), `lang` (`'it'|'en'`, req), `date` (date solo-data, req), `excerpt`
(string, req), `cover` (string/image, req), `gallery` (string[], opt), `category`
(enum opt), `draft` (boolean default false), `author` (string default "Abdelrahim").

#### Scenario: Articolo valido passa la validazione
- **WHEN** un file Markdown in `src/content/articles/it/` contiene tutti i campi
  obbligatori con i tipi corretti
- **THEN** la build lo accetta e l'entry è disponibile via `getCollection('articles')`

#### Scenario: Campo obbligatorio mancante fallisce
- **WHEN** un articolo non ha `date` o `title`
- **THEN** `npm run build` segnala un errore di validazione dello schema

### Requirement: Bilingual articles linked by slug
Il sistema SHALL rappresentare ogni storia con un file per lingua
(`articles/it/<slug>.md`, `articles/en/<slug>.md`) collegati dallo **stesso `slug`**.

#### Scenario: Recupero della versione nell'altra lingua
- **WHEN** si conosce lo `slug` e la lingua corrente
- **THEN** è possibile trovare la versione nell'altra lingua filtrando per `slug` + `lang`

### Requirement: Draft articles excluded from production
Gli articoli con `draft: true` SHALL essere esclusi dalla build di produzione.

#### Scenario: Bozza non pubblicata
- **WHEN** un articolo ha `draft: true`
- **THEN** non compare nella lista né genera una pagina di dettaglio in produzione

### Requirement: Seed articles
La change SHALL includere almeno due storie seed con versione IT ed EN, coerenti coi
contenuti del design (es. "mongolfiera all'alba", "Karnak").

#### Scenario: Seed presenti per testare le pagine
- **WHEN** la build viene eseguita dopo questa change
- **THEN** esistono articoli IT+EN che `articles-pages` può elencare e renderizzare
