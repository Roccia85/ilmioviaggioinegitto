## ADDED Requirements

### Requirement: Bilingual contact page
Il sistema SHALL fornire la pagina "Contatti" alle route `/it/contatti` ed `/en/contact`,
fedele a `contatti.html`, con `page-hero`, griglia di canali e form preventivo, in header
variante **solid**.

#### Scenario: Contatti IT
- **WHEN** un visitatore apre `/it/contatti`
- **THEN** vede i canali di contatto e il form in italiano

#### Scenario: Contact EN
- **WHEN** un visitatore apre `/en/contact`
- **THEN** vede gli stessi contenuti in inglese

### Requirement: Real social channels and placeholders
La pagina SHALL mostrare 4 contact-card: **WhatsApp** ed **email** (segnaposto, marcati
da sostituire), **Facebook** e **Instagram** con i link reali.

#### Scenario: Canali reali e segnaposto
- **WHEN** si visualizza la sezione contatti
- **THEN** Facebook/Instagram puntano agli account reali; WhatsApp/email sono placeholder
  evidenziati (`wa.me/201000000000`, `info@ilmioviaggioinegitto.com`)

### Requirement: Quote request form without backend
La pagina SHALL includere il form "richiedi preventivo" del design; essendo il sito
statico, il form NON invia a un backend e SHALL invitare al contatto diretto via WhatsApp.

#### Scenario: Form dimostrativo
- **WHEN** l'utente invia il form
- **THEN** non avviene alcuna chiamata server e l'utente è invitato a scrivere su WhatsApp
