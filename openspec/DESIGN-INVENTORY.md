# Inventario design → mapping change

Fonte: bundle di handoff esportato da Claude Design, copiato in questo repo sotto
[`design-reference/`](../design-reference/). I file HTML/CSS/JS sono la **fonte di
verità visiva**: gli agenti devono portarne markup e stile in componenti Astro,
aggiungendo i18n e contenuto dinamico — **non ridisegnare da zero**.

> Leggere prima i transcript: `design-reference/chats/chat1.md` (prima
> generazione) e `design-reference/chats/chat2.md` (iterazione: **rimozione
> Escursioni** + aggiunta storie Instagram). L'intento del cliente vive lì.

## 1. Inventario completo dei file di design

### Pagine pubbliche (HTML)
| File | Schermata | Note di implementazione |
|---|---|---|
| `project/home.html` | Home | Hero, trust band (3 punti), box guida Abdelrahim, preview 3 articoli, CTA band, footer |
| `project/chi-siamo.html` | Chi siamo | `page-hero`, box guida, griglia 3 "valori", CTA |
| `project/articoli.html` | Lista articoli | `page-hero`, featured `art-card wide`, griglia `art-card`, paginazione, sezione storie Instagram (`ig-rail`) |
| `project/articolo.html` | Singolo articolo | `page-hero` con data/autore, corpo formattato (`lede`/`pull`/`figure`/`tick`), callout storie IG, share, CTA, "altri articoli" |
| `project/contatti.html` | Contatti | `page-hero`, 4 `contact-card` (WhatsApp/Email/Facebook/Instagram), form preventivo, orari |

### Area admin (HTML) — riferimento per la config CMS, **non** da reimplementare
| File | Schermata | Uso nel piano |
|---|---|---|
| `project/admin-login.html` | Login | Sostituito da login GitHub OAuth di Sveltia CMS. Riferimento testuale/UX. |
| `project/admin-dashboard.html` | Dashboard / lista articoli | Definisce le **colonne/stati** della collection: Titolo, Lingua (IT/EN), Data, Stato (Pubblicato/Bozza), categoria |
| `project/admin-editor.html` | Editor articolo | Definisce i **campi della collection**: titolo, estratto, corpo (markdown), data, categoria, lingua IT/EN, copertina, galleria, stato bozza/pubblicato |

### Asset condivisi
| File | Contenuto | Mapping |
|---|---|---|
| `project/assets/site.css` | Design system completo: token `:root`, reset, header/hero/footer, card, bottoni, responsive | → token + CSS globale in `scaffolding-foundation` |
| `project/assets/site.js` | Toggle lingua (default IT, `localStorage`), drawer mobile, header sticky, reveal-on-scroll | → comportamento ripartito tra routing i18n (Astro) e isole/JS minime |
| `project/assets/admin.css` | Stile dell'area admin mockata | Non portato (Sveltia ha UI propria). Solo riferimento. |
| `project/Mockups.html` | Galleria che mostra tutte le schermate desktop+mobile | Deliverable di design, non una pagina del sito |
| `project/screenshots/*.png` | Screenshot di lavorazione | Riferimento visivo, non asset di produzione |

### Identità visiva (estratta da `site.css`, vedi `project.md`)
- Palette Nilo/oro/sabbia, serif *Cormorant Garamond* + sans *Mulish*.
- Wordmark testuale "Il Mio Viaggio / in Egitto · Luxor" con marchio SVG inline.
- Social reali: Facebook `ilmioviaggoinEgitto`, Instagram `il_mio_viaggo_in_egitto`.
- Placeholder da sostituire: telefono/WhatsApp `+20 100 000 0000` → `wa.me/201000000000`; foto della guida (riquadro segnaposto); email `info@ilmioviaggioinegitto.com`.

## 2. Mapping "file di design → change che lo implementa"

| File di design | Change | Componente/Pagina Astro prodotto |
|---|---|---|
| `assets/site.css` (token + chrome + tutte le classi) | **scaffolding-foundation** | `tokens.css`/`global.css`, stile di Header/Footer/Layout |
| `assets/site.js` (lingua, drawer, sticky, reveal) | **scaffolding-foundation** | routing i18n + `LangSwitcher`, isola `Nav`/reveal |
| chrome comune di tutte le pagine (header/nav/lang/social, footer, drawer, wa-float) | **scaffolding-foundation** | `Layout.astro`, `Header.astro`, `Footer.astro`, `LangSwitcher.astro`, `SEOHead.astro` |
| `admin-editor.html` + `admin-dashboard.html` (campi e stati) | **articles-content-cms** | `public/admin/config.yml` (Sveltia), schema frontmatter, content collection |
| `admin-login.html` | **articles-content-cms** | login GitHub OAuth (Sveltia), documentato nel README |
| `articoli.html` (griglia, featured, paginazione, `ig-rail`) | **articles-pages** | `pages/[lang]/articoli` list, `ArticleCard.astro`, sezione storie IG |
| `articolo.html` (corpo, share, related, callout IG) | **articles-pages** | `pages/[lang]/articoli/[slug]`, render Markdown |
| `home.html` | **static-pages** | `pages/[lang]/index.astro` (Home) |
| `chi-siamo.html` | **static-pages** | pagina Chi siamo |
| `contatti.html` | **static-pages** | pagina Contatti |
| meta/`<head>`/hreflang/OG di tutte le pagine | **deploy-seo** | `SEOHead` consumato + sitemap, robots, config deploy |

## 3. Discrepanze segnalate (DA RIVEDERE)

1. **Escursioni/Servizi — pagina prevista dal brief ma ASSENTE nel design.**
   Il brief del progetto elenca "Escursioni/Servizi" tra le pagine. La seconda
   chat (`chat2.md`) mostra che il cliente ha **esplicitamente rimosso** la pagina
   `escursioni.html` e la relativa sezione in home, sostituendole con il rimando
   alle **storie Instagram**. Il menu finale è: **Home · Chi siamo · Articoli ·
   Contatti** (nessuna voce Escursioni).
   - **Decisione adottata nel piano**: si segue il design (fonte di verità visiva)
     → `static-pages` **non** include una pagina Escursioni standalone.
   - Il CSS conserva ancora le classi `.exc-card`/`.exc-row`/`.exc-list-card`
     (non più usate): pronte se il cliente volesse reintrodurla.
   - **Open question per il cliente**: reintrodurre una pagina Escursioni/Servizi?
     Se sì, va aggiunta una change dedicata `excursions-page` (il design andrebbe
     rigenerato o ricostruito dalle classi esistenti).

2. **Area admin mockata ≠ admin reale.** Le 3 schermate admin del design sono
   mockup; l'admin reale è **Sveltia CMS** (UI propria). I mockup servono solo a
   ricavare i campi della collection e l'UX attesa, non vanno reimplementati.

3. **Stati "categoria" e "estratto".** L'editor mostra `Categoria` (Esperienze,
   Karnak & Luxor, Consigli, Curiosità, Guide) ed `Estratto`: inclusi nello schema
   frontmatter (vedi `project.md`).

4. **Placeholder da sostituire prima del go-live**: numero WhatsApp/telefono, foto
   reale della guida. Tracciati come task in `deploy-seo` (checklist pre-lancio).

5. **Pagine del design senza pagina-route dedicata**: nessuna. Tutte le pagine
   pubbliche del design hanno una route nel piano. `Mockups.html` è solo galleria.
