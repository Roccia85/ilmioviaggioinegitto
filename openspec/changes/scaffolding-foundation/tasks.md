# Tasks — scaffolding-foundation

> **Coordinamento parallelo**
> - **Dipendenze**: nessuna. È la **fase 0 BLOCCANTE**.
> - **Parallelizzabile dopo lo scaffolding**: N/A (è lo scaffolding). Va completata e
>   mergiata su `main` **prima** di tutte le altre change.
> - **File/cartelle toccati (esclusivi)**: `package.json`, `astro.config.mjs`,
>   `tsconfig.json`, `src/styles/`, `src/components/`, `src/i18n/`,
>   `src/pages/index.astro`, `src/content/config.ts` (stub), `public/favicon.svg`,
>   `.gitignore`.
> - **File di design da implementare**: `design-reference/project/assets/site.css`,
>   `design-reference/project/assets/site.js`, chrome comune di tutte le pagine HTML.
> - **Contratto esposto**: struttura cartelle, token CSS, interfacce di
>   `Layout/Header/Footer/LangSwitcher/SEOHead/ArticleCard/WhatsAppFloat`, routing i18n,
>   stub collection `articles`. **Consuma**: solo `design-reference/`.

## 1. Bootstrap progetto Astro

- [ ] 1.1 Inizializzare Astro statico (template minimo) con TypeScript strict e npm
- [ ] 1.2 Configurare `astro.config.mjs` con `output: 'static'` e blocco `i18n`
      (`defaultLocale: 'it'`, `locales: ['it','en']`, `prefixDefaultLocale: true`)
- [ ] 1.3 Creare la struttura cartelle di `project.md` (incl. `public/uploads/.gitkeep`)
- [ ] 1.4 Aggiungere `.gitignore` (node_modules, dist, .astro) e verificare `npm run build`

## 2. Design system

- [ ] 2.1 Creare `src/styles/tokens.css` con `:root` verbatim da `site.css`
- [ ] 2.2 Creare `src/styles/global.css` con reset + classi condivise portate dal design
- [ ] 2.3 Verificare breakpoint responsive `900px` e `560px`
- [ ] 2.4 Caricare i font (Cormorant Garamond + Mulish) con `preconnect`

## 3. i18n e routing

- [ ] 3.1 Creare `src/i18n/ui.ts` (oggetto `ui` IT/EN + helper `t(lang, key)`) con tutte
      le stringhe di chrome/nav/CTA estratte dal design
- [ ] 3.2 Creare `src/i18n/utils.ts` (`getLangFromUrl`, `localizePath`, `getAlternates`)
      con la mappa `routes` degli slug localizzati
- [ ] 3.3 Creare `src/pages/index.astro` che reindirizza `/` → `/it/`

## 4. Componenti condivisi (interfacce da `project.md`)

- [ ] 4.1 `SEOHead.astro` (title, description, canonical, OG, hreflang IT/EN + x-default, font)
- [ ] 4.2 `LangSwitcher.astro` (toggle IT/EN che naviga a `alternatePath`)
- [ ] 4.3 `Header.astro` (wordmark, menu, LangSwitcher, social, burger, varianti transparent/solid)
- [ ] 4.4 `Footer.astro` (4 colonne + barra "autorizzata dal governo", social reali)
- [ ] 4.5 `WhatsAppFloat.astro` (pulsante flottante)
- [ ] 4.6 `ArticleCard.astro` (`.art-card` + variante `.wide`)
- [ ] 4.7 `Layout.astro` (head via SEOHead, Header, slot, Footer, WhatsAppFloat, drawer,
      `<script>` minimo per drawer/sticky/reveal portato da `site.js`)

## 5. Stub contenuti e verifica

- [ ] 5.1 Creare stub `src/content/config.ts` con collection `articles` minima valida
      (`title, slug, lang, date, excerpt, cover`)
- [ ] 5.2 Creare una pagina di prova `/it/` temporanea per validare Layout/Header/Footer
      (sarà sostituita da `static-pages`) — oppure verificare via componente isolato
- [ ] 5.3 `npm run build` verde; `openspec validate scaffolding-foundation --strict` verde
- [ ] 5.4 Merge su `main` e comunicare agli altri agenti che i contratti sono disponibili
