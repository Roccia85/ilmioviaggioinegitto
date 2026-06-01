## ADDED Requirements

### Requirement: Static Astro project builds
Il progetto SHALL essere un'app Astro con output **statico** (`output: 'static'`),
buildabile con `npm run build` senza server né database, su Node ≥ 20.

#### Scenario: Build produce HTML statico
- **WHEN** un agente esegue `npm install && npm run build`
- **THEN** la build termina senza errori e produce file statici in `dist/`

#### Scenario: Nessuna dipendenza da runtime server
- **WHEN** si ispeziona la configurazione e le dipendenze
- **THEN** non è presente alcun adapter SSR/server e nessun database

### Requirement: Repository folder structure
Il progetto SHALL adottare la struttura cartelle definita in `openspec/project.md`
(`src/components`, `src/content`, `src/i18n`, `src/pages`, `src/styles`, `public/admin`,
`public/uploads`, `design-reference/` read-only).

#### Scenario: Cartelle condivise presenti
- **WHEN** lo scaffolding è completo
- **THEN** esistono `src/components/`, `src/i18n/`, `src/styles/`, `src/pages/` e gli
  stub necessari, secondo la matrice file di `project.md`

### Requirement: Articles collection stub
Lo scaffolding SHALL fornire uno stub valido di content collection `articles` in
`src/content/config.ts` con almeno i campi `title`, `slug`, `lang`, `date`, `excerpt`,
`cover`, così che la build non fallisca prima che `articles-content-cms` definisca lo
schema completo.

#### Scenario: Build verde senza articoli
- **WHEN** non esiste ancora alcun file Markdown in `src/content/articles/`
- **THEN** `npm run build` completa correttamente usando lo stub
