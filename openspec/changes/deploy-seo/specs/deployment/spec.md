## ADDED Requirements

### Requirement: Free static hosting with automatic builds
Il sito SHALL essere deployabile su hosting **gratuito** (Cloudflare Pages o Netlify) con
**build automatica a ogni commit** su `main` (comando `astro build`, output `dist/`).

#### Scenario: Build automatica al push
- **WHEN** un commit (incluso quello del CMS) arriva su `main`
- **THEN** l'host esegue automaticamente la build e pubblica il sito aggiornato

#### Scenario: Configurazione host presente
- **WHEN** si ispeziona il repo
- **THEN** esiste la configurazione di deploy per l'host scelto (build command, output,
  eventuali `_redirects`/`_headers` o Pages Function)

### Requirement: GitHub OAuth endpoint for CMS
Il deploy SHALL fornire l'endpoint OAuth GitHub usato da Sveltia CMS, con i segreti
gestiti come variabili d'ambiente dell'host (mai nel repo).

#### Scenario: Login CMS in produzione
- **WHEN** Abdelrahim apre `/admin` sul sito in produzione e accede con GitHub
- **THEN** il flusso OAuth completa e ottiene accesso in scrittura ai contenuti

### Requirement: Italian operational README
Il repo SHALL includere un `README.md` in **italiano** con: avvio locale, deploy e build
automatica, **procedura passo-passo per pubblicare un articolo da `/admin`**, e una
**checklist pre-lancio** (sostituire numero WhatsApp e foto reali della guida).

#### Scenario: README operativo
- **WHEN** il cliente legge il README
- **THEN** trova le istruzioni per avviare in locale, fare deploy e pubblicare dal CMS

#### Scenario: Checklist placeholder
- **WHEN** si consulta la checklist pre-lancio
- **THEN** include la sostituzione di `wa.me/201000000000` e della foto segnaposto della guida
