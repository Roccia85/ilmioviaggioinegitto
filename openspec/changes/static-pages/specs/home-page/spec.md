## ADDED Requirements

### Requirement: Bilingual home page
Il sistema SHALL fornire la home alle route `/it/` ed `/en/`, fedele a `home.html`, con
header in variante **transparent** (hero a tutta pagina), hero con headline e CTA
WhatsApp, e footer condiviso.

#### Scenario: Home italiana
- **WHEN** un visitatore apre `/it/`
- **THEN** vede l'hero, le CTA e la chrome in italiano con header transparent

#### Scenario: Home inglese
- **WHEN** un visitatore apre `/en/`
- **THEN** vede gli stessi contenuti in inglese

### Requirement: Trust band and guide box
La home SHALL mostrare la trust band con i 3 messaggi (autorizzata dal governo · guida
certificata · assistenza in italiano) e il box guida Abdelrahim, come nel design.

#### Scenario: Messaggi di fiducia in evidenza
- **WHEN** si carica la home
- **THEN** sono visibili i 3 punti di fiducia e il box della guida

### Requirement: Latest articles preview
La home SHALL mostrare un'anteprima dei 3 articoli più recenti della lingua corrente
(via `ArticleCard`) con link alla lista; se non ci sono articoli, la sezione SHALL
degradare senza errori di build.

#### Scenario: Preview con articoli
- **WHEN** esistono articoli nella lingua corrente
- **THEN** vengono mostrati i 3 più recenti con link alla lista articoli

#### Scenario: Nessun articolo
- **WHEN** la collection è vuota
- **THEN** la build non fallisce e la sezione preview è nascosta/vuota
