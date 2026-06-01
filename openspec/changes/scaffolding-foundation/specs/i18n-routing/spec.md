## ADDED Requirements

### Requirement: Italian default with IT/EN routing
Il sistema SHALL servire i contenuti in italiano e inglese con prefisso di lingua
esplicito (`/it/...`, `/en/...`), con **italiano come lingua di default**, e SHALL
reindirizzare `/` a `/it/`.

#### Scenario: Root reindirizza alla lingua di default
- **WHEN** un visitatore apre `/`
- **THEN** viene servita/reindirizzata la home italiana `/it/`

#### Scenario: Route localizzate coerenti
- **WHEN** si genera la mappa delle pagine
- **THEN** gli slug di sezione seguono la tabella di `project.md`
  (`chi-siamo`/`about`, `articoli`/`journal`, `contatti`/`contact`)

### Requirement: Centralized UI translations
Il sistema SHALL centralizzare le stringhe UI in `src/i18n/ui.ts` (oggetto `ui` per
lingua + helper `t(lang, key)`), evitando la duplicazione `data-it`/`data-en` in pagina.

#### Scenario: Stringa tradotta per lingua
- **WHEN** una pagina italiana richiede `t('it', 'nav.home')` e una inglese `t('en','nav.home')`
- **THEN** ottiene rispettivamente la stringa IT e quella EN

### Requirement: Routing helpers
Il sistema SHALL fornire in `src/i18n/utils.ts` gli helper `getLangFromUrl(url)`,
`localizePath(path, lang)` e `getAlternates(path)` per costruire URL localizzati e le
alternate hreflang.

#### Scenario: LangSwitcher punta alla pagina equivalente
- **WHEN** si è su `/it/chi-siamo` e si seleziona EN
- **THEN** `getAlternates`/`localizePath` forniscono `/en/about` come destinazione
