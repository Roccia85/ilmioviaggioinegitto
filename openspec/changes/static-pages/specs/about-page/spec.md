## ADDED Requirements

### Requirement: Bilingual about page
Il sistema SHALL fornire la pagina "Chi siamo" alle route `/it/chi-siamo` ed `/en/about`,
fedele a `chi-siamo.html`, con `page-hero`, box guida Abdelrahim, griglia dei "valori" e
CTA finale, in header variante **solid**.

#### Scenario: Chi siamo IT
- **WHEN** un visitatore apre `/it/chi-siamo`
- **THEN** vede la storia dell'agenzia/guida e la griglia valori in italiano

#### Scenario: About EN
- **WHEN** un visitatore apre `/en/about`
- **THEN** vede gli stessi contenuti in inglese

### Requirement: Trust values highlighted
La pagina SHALL evidenziare i valori del design (autorizzati e sicuri · assistenza in
italiano · su misura) e la certificazione della guida.

#### Scenario: Valori presenti
- **WHEN** si carica la pagina
- **THEN** sono presenti le 3 card valori e il badge "guida certificata · egittologo"
