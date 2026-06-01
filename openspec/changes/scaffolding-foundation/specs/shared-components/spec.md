## ADDED Requirements

### Requirement: Layout component
Il sistema SHALL fornire `Layout.astro` che avvolge ogni pagina con `<html lang>`,
`<head>` via `SEOHead`, `Header`, `<slot/>`, `Footer`, `WhatsAppFloat` e drawer mobile,
con le props del contratto (`lang`, `seo`, `headerVariant`, `activeNav`).

#### Scenario: Pagina avvolta dal layout
- **WHEN** una pagina usa `<Layout lang="it" seo={...}>`
- **THEN** rende header, footer, wa-float e contenuto con `lang="it"` sull'`<html>`

### Requirement: Header with language switcher and socials
Il sistema SHALL fornire `Header.astro` con wordmark, menu (Home/Chi siamo/Articoli/
Contatti), `LangSwitcher`, icone social reali e burger mobile, supportando le varianti
`transparent` (hero a tutta pagina) e `solid` (pagine interne).

#### Scenario: Variante solida nelle pagine interne
- **WHEN** `variant="solid"` (default)
- **THEN** l'header è opaco con bordo inferiore (classe `always-solid`)

#### Scenario: Social reali collegati
- **WHEN** si rendono le icone social
- **THEN** puntano a `facebook.com/ilmioviaggoinEgitto/` e
  `instagram.com/il_mio_viaggo_in_egitto`

### Requirement: LangSwitcher navigates to equivalent page
Il sistema SHALL fornire `LangSwitcher.astro` che mostra il toggle IT/EN e naviga
all'URL equivalente nell'altra lingua tramite `alternatePath`.

#### Scenario: Cambio lingua mantiene la pagina
- **WHEN** l'utente su `/it/contatti` seleziona EN
- **THEN** viene portato a `/en/contact`

### Requirement: Footer with socials and government badge
Il sistema SHALL fornire `Footer.astro` con le 4 colonne del design (brand+social,
Naviga, Seguici/Instagram, Contatti) e la barra "agenzia autorizzata dal governo".

#### Scenario: Footer rende messaggi di fiducia
- **WHEN** il footer è renderizzato
- **THEN** include il sigillo "autorizzata dal governo egiziano" e i contatti

### Requirement: SEOHead component
Il sistema SHALL fornire `SEOHead.astro` che emette title, meta description, canonical,
Open Graph, hreflang IT/EN + x-default e i font, con le props del contratto `SEOProps`.

#### Scenario: hreflang per entrambe le lingue
- **WHEN** una pagina passa `alternates: { it, en }`
- **THEN** vengono emessi i link `hreflang="it"`, `hreflang="en"` e `x-default`

### Requirement: ArticleCard component
Il sistema SHALL fornire `ArticleCard.astro` (classe `.art-card`, variante `.wide`) che
rende titolo, estratto, data, copertina e link localizzato, secondo le props del
contratto.

#### Scenario: Card con variante wide
- **WHEN** `variant="wide"`
- **THEN** la card usa il layout orizzontale del featured come nel design
