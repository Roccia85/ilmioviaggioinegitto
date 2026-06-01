## ADDED Requirements

### Requirement: Site metadata and Open Graph
Ogni pagina SHALL emettere title, meta description, canonical e tag **Open Graph**
(title, description, image, type), tramite `SEOHead`, con un'immagine OG di default e
immagini OG per-articolo quando disponibili.

#### Scenario: Open Graph presente
- **WHEN** si ispeziona l'`<head>` di una pagina
- **THEN** sono presenti canonical e i tag `og:*` con valori coerenti alla pagina

### Requirement: hreflang IT/EN
Ogni pagina SHALL emettere i link `hreflang` per **it** ed **en** più `x-default`
(→ italiano), basati sulle alternate della pagina corrente.

#### Scenario: Alternate linguistiche
- **WHEN** una pagina ha versioni IT ed EN
- **THEN** l'`<head>` contiene `hreflang="it"`, `hreflang="en"` e `x-default`

### Requirement: Sitemap and robots
Il sito SHALL generare una **sitemap** (con alternate i18n) tramite `@astrojs/sitemap` e
fornire un `robots.txt` che la referenzia; `site` SHALL essere
`https://ilmioviaggioinegitto.com`.

#### Scenario: Sitemap in build
- **WHEN** si esegue `npm run build`
- **THEN** `dist/` contiene la sitemap e `robots.txt` la referenzia

#### Scenario: Admin escluso dall'indicizzazione
- **WHEN** si genera `robots.txt`
- **THEN** `/admin` è escluso dall'indicizzazione dei motori
