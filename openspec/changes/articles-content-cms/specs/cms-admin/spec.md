## ADDED Requirements

### Requirement: Sveltia CMS served at /admin
Il sistema SHALL servire Sveltia CMS da `public/admin/` (raggiungibile su `/admin`),
con versione della libreria pinnata.

#### Scenario: Admin raggiungibile
- **WHEN** un utente apre `/admin` sul sito buildato
- **THEN** viene caricata l'interfaccia di Sveltia CMS

### Requirement: Articles collection in CMS config
Il `config.yml` SHALL definire una collection "Articoli" con i campi del design: titolo,
estratto, corpo **markdown**, **data** (datetime solo data), **categoria** (enum dei
valori del design), **lingua** IT/EN, **copertina** (image) e **galleria** (lista di
image), più lo stato bozza/pubblicato; i file salvati SHALL corrispondere allo schema
`content-model` e finire in `src/content/articles/{it,en}/`.

#### Scenario: Creazione articolo dall'admin
- **WHEN** Abdelrahim crea un articolo IT compilando i campi e pubblica
- **THEN** Sveltia committa un file Markdown valido in `src/content/articles/it/`
  con il frontmatter corretto

#### Scenario: Upload immagini nella cartella media
- **WHEN** carica una copertina o immagini di galleria
- **THEN** i file finiscono in `public/uploads/` e i campi referenziano `/uploads/...`

### Requirement: GitHub OAuth login
Il CMS SHALL autenticarsi tramite **GitHub OAuth** (`backend: github`, repo + branch),
così che solo utenti autorizzati possano pubblicare; la procedura di setup SHALL essere
documentata.

#### Scenario: Login amministratore
- **WHEN** l'amministratore apre `/admin` e accede con GitHub
- **THEN** ottiene accesso in scrittura ai contenuti del repo tramite il flusso OAuth

#### Scenario: Setup documentato
- **WHEN** si prepara il deploy
- **THEN** esiste documentazione passo-passo per creare l'app OAuth GitHub e
  configurare i segreti sull'host (dettagli finali in `deploy-seo`)
