# Tasks — static-pages

> **Coordinamento parallelo**
> - **Dipendenze**: `scaffolding-foundation` (componenti, i18n, token).
> - **Parallelizzabile dopo lo scaffolding**: **Sì** (con `articles-content-cms` e
>   `deploy-seo`). Indipendente da `articles-pages`.
> - **File/cartelle toccati (esclusivi)**: `src/pages/it/index.astro`,
>   `src/pages/en/index.astro`, `src/pages/it/chi-siamo.astro`,
>   `src/pages/en/about.astro`, `src/pages/it/contatti.astro`,
>   `src/pages/en/contact.astro`. (Eventuale rimozione della pagina di prova `/it/`
>   creata dallo scaffolding.)
> - **File di design da implementare**: `home.html`, `chi-siamo.html`, `contatti.html`.
> - **Contratto**: **consuma** `Layout`/`Header`/`Footer`/`SEOHead`/`ArticleCard` e la
>   collection `articles` (sola lettura per la preview home). **Non espone** contratti.
> - **Nota di scope**: nessuna pagina Escursioni/Servizi (assente dal design — vedi
>   `openspec/DESIGN-INVENTORY.md`).

## 1. Home

- [ ] 1.1 `src/pages/it/index.astro`: Layout con `headerVariant="transparent"`, hero + CTA
- [ ] 1.2 Trust band (3 messaggi) e box guida Abdelrahim (foto segnaposto)
- [ ] 1.3 Preview 3 articoli più recenti (collection `lang: 'it'`, guardia se vuota) + CTA band
- [ ] 1.4 Replica EN in `src/pages/en/index.astro`
- [ ] 1.5 `SEOHead` con alternates home IT↔EN

## 2. Chi siamo

- [ ] 2.1 `src/pages/it/chi-siamo.astro`: `page-hero`, box guida, griglia 3 valori, CTA
- [ ] 2.2 Replica EN in `src/pages/en/about.astro`
- [ ] 2.3 `SEOHead` con alternates

## 3. Contatti

- [ ] 3.1 `src/pages/it/contatti.astro`: `page-hero`, 4 contact-card, form preventivo, orari
- [ ] 3.2 Link reali FB/IG; WhatsApp/email come placeholder evidenziati
- [ ] 3.3 Replica EN in `src/pages/en/contact.astro`
- [ ] 3.4 `SEOHead` con alternates

## 4. Verifica

- [ ] 4.1 `npm run build` verde; route IT/EN generate; rimuovere la pagina di prova dello scaffolding
- [ ] 4.2 Verifica responsive (900/560), header transparent/solid, cambio lingua
- [ ] 4.3 `openspec validate static-pages --strict` verde; merge su `main`
