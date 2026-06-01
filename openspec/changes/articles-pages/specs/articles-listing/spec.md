## ADDED Requirements

### Requirement: Bilingual article list pages
Il sistema SHALL fornire la lista articoli per entrambe le lingue alle route
`/it/articoli` ed `/en/journal`, mostrando solo articoli della lingua corrispondente e
non-bozza, con la chrome e gli stili portati da `articoli.html`.

#### Scenario: Lista italiana
- **WHEN** un visitatore apre `/it/articoli`
- **THEN** vede gli articoli con `lang: 'it'` (esclusi i draft) usando `ArticleCard`

#### Scenario: Lista inglese
- **WHEN** un visitatore apre `/en/journal`
- **THEN** vede gli articoli con `lang: 'en'` (esclusi i draft)

### Requirement: Sorted by date descending with featured
La lista SHALL essere ordinata per `date` **decrescente**; l'articolo più recente SHALL
essere mostrato come featured con `ArticleCard variant="wide"`.

#### Scenario: Ordine e featured
- **WHEN** ci sono più articoli
- **THEN** il primo (più recente) è il featured wide e i successivi seguono in ordine di
  data decrescente

### Requirement: Pagination
La lista SHALL paginare i risultati (impaginazione statica) e nascondere i controlli
quando esiste una sola pagina.

#### Scenario: Più pagine
- **WHEN** gli articoli superano la dimensione di pagina
- **THEN** vengono generate più pagine statiche con i controlli di navigazione del design

### Requirement: Instagram stories section
La lista SHALL includere la sezione storie Instagram (`ig-rail`) portata dal design, con
link reali all'account `instagram.com/il_mio_viaggo_in_egitto`.

#### Scenario: Sezione storie presente
- **WHEN** si visualizza la lista
- **THEN** è presente la rail di storie con i link all'account Instagram reale
