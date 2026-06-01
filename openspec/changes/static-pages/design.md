## Context

Le pagine vetrina riusano interamente la chrome e gli stili dello scaffolding; il
contenuto è in gran parte statico bilingue (stringhe via `src/i18n/ui.ts` o testo locale
della pagina), tranne la **preview articoli** in home che legge la collection.

Dipende solo da `scaffolding-foundation`. Pienamente parallelizzabile con
`articles-content-cms` e `deploy-seo`. Tocca solo i propri file di pagina.

### File di design da implementare
- `design-reference/project/home.html` → Home: `hero` (header variante transparent),
  `trust` band, `guide` box Abdelrahim, preview articoli (`articles` + `art-card`),
  `cta-band`.
- `design-reference/project/chi-siamo.html` → Chi siamo: `page-hero`, `guide` box,
  griglia "valori", CTA.
- `design-reference/project/contatti.html` → Contatti: `page-hero`, `contact-grid`
  (4 card), `form-card` (form preventivo), orari/luogo.

## Goals / Non-Goals

**Goals:**
- 3 pagine × 2 lingue, fedeli al design e con header nella variante corretta
  (transparent per la home con hero, solid per Chi siamo/Contatti).
- Home: preview dei 3 articoli più recenti della lingua corrente, link "tutti gli articoli".
- Contatti: canali reali (FB/IG) + placeholder WhatsApp/email evidenziati come tali.
- Messaggi di fiducia in evidenza (governo, guida certificata, italiano).

**Non-Goals:**
- Pagina Escursioni/Servizi (non nel design — vedi proposal e DESIGN-INVENTORY).
- Logica di invio del form (resta `onsubmit return false`/placeholder; nessun backend).
- SEO globale/sitemap (→ `deploy-seo`): qui solo props a `SEOHead`.

## Decisions

- **Form contatti senza backend**: il sito è statico; il form resta dimostrativo e
  spinge verso WhatsApp/email (come nel design). _Alternativa_: servizio form esterno —
  fuori scope, eventualmente in una change futura.
- **Preview articoli in home**: query collection per lingua, ordina per data desc, prendi
  3. Se non ci sono articoli (es. prima del CMS), degradare a una griglia vuota/nascosta
  senza rompere la build.
- **Header variant**: home usa `headerVariant="transparent"` (hero a tutta altezza),
  Chi siamo/Contatti usano `solid`.
- **Placeholder evidenziati**: WhatsApp `wa.me/201000000000` ed email restano segnaposto;
  marcati come "da sostituire" (checklist pre-lancio in `deploy-seo`).

## Risks / Trade-offs

- [Dipendenza dalla collection per la home prima del CMS] → guardia: se `getCollection`
  è vuota, la sezione preview si nasconde; nessun errore di build.
- [Duplicazione testi lunghi IT/EN] → testi di pagina lunghi possono stare inline nella
  pagina (con blocchi per lingua) o in `ui.ts`; preferire `ui.ts` per stringhe corte
  ricorrenti e contenuto locale per i paragrafi specifici.
- [Coerenza header transparent/solid] → seguire il contratto `headerVariant` dello
  scaffolding; non reimplementare l'header.

## Migration Plan

1. Branch `change/static-pages` da `main` (post-scaffolding).
2. Home IT/EN (con preview articoli guardata).
3. Chi siamo IT/EN.
4. Contatti IT/EN.
5. `npm run build` verde; verifica responsive e cambio lingua; merge su `main`.
