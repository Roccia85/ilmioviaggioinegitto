## ADDED Requirements

### Requirement: Bilingual single article pages
Il sistema SHALL generare staticamente una pagina di dettaglio per ogni articolo
non-bozza, per entrambe le lingue, alle route `/it/articoli/<slug>` ed
`/en/journal/<slug>`, con il layout portato da `articolo.html`.

#### Scenario: Pagina di dettaglio generata
- **WHEN** esiste un articolo IT con `slug: "mongolfiera-alba-luxor"`
- **THEN** è raggiungibile su `/it/articoli/mongolfiera-alba-luxor`

#### Scenario: Bozza non genera pagina
- **WHEN** un articolo ha `draft: true`
- **THEN** non viene generata alcuna pagina di dettaglio in produzione

### Requirement: Markdown body rendering
La pagina SHALL renderizzare il corpo **Markdown** dell'articolo con gli stili
tipografici del design (lede, paragrafi, `h2`, citazioni `pull`, `figure`/`figcaption`,
liste `tick`), e mostrare data e autore nell'hero.

#### Scenario: Corpo formattato
- **WHEN** il Markdown contiene titoli, liste e immagini
- **THEN** vengono resi con gli stili `.article` del design

### Requirement: Share and related content
La pagina SHALL includere il blocco di condivisione (Facebook, Instagram, WhatsApp,
email), il callout storie Instagram e una sezione "altri articoli" (fino a 3, stessa
lingua, escluso il corrente).

#### Scenario: Blocco condivisione e correlati
- **WHEN** si apre un articolo
- **THEN** sono presenti i pulsanti di condivisione reali e fino a 3 articoli correlati
  della stessa lingua

### Requirement: Cross-language alternates
La pagina SHALL impostare gli `alternates` hreflang verso la versione nell'altra lingua
quando esiste lo stesso `slug`; altrimenti fallback alla lista dell'altra lingua.

#### Scenario: Traduzione disponibile
- **WHEN** esiste lo stesso `slug` in IT ed EN
- **THEN** hreflang e LangSwitcher puntano alla pagina tradotta corrispondente

#### Scenario: Traduzione mancante
- **WHEN** l'altra lingua non ha quello `slug`
- **THEN** il LangSwitcher rimanda alla lista articoli dell'altra lingua
