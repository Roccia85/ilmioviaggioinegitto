## ADDED Requirements

### Requirement: Design tokens from design source
Il sistema SHALL definire i design token (palette Nilo/oro/sabbia, tipografia, raggi,
ombre, container, easing) in `src/styles/tokens.css` dentro `:root`, con valori
**identici** a `design-reference/project/assets/site.css`.

#### Scenario: Token disponibili globalmente
- **WHEN** una pagina o un componente usa `var(--nile-800)`, `var(--gold-500)`,
  `var(--serif)` o un altro token del contratto
- **THEN** il valore risolve esattamente a quello del design

#### Scenario: Nessun valore hardcoded
- **WHEN** si revisiona il CSS dei componenti condivisi
- **THEN** i colori/tipi/spaziature usano `var(--*)` e non valori grezzi duplicati

### Requirement: Global stylesheet ported from design
Il sistema SHALL fornire `src/styles/global.css` con reset e classi condivise portate
dal design (`.container`, `.btn*`, `.site-header`, `.hero`, `.trust`, `.art-*`,
`.guide`, `.cta-band`, `.site-footer`, `.wa-float`, `.drawer`, `.page-hero`, `.reveal`)
e i breakpoint responsive `900px`/`560px`.

#### Scenario: Chrome visivamente fedele
- **WHEN** si renderizza una pagina che usa header/footer/bottoni condivisi
- **THEN** layout, spaziature e stati hover corrispondono al design

#### Scenario: Mobile-first responsive
- **WHEN** la viewport è ≤ 900px
- **THEN** il menu desktop lascia posto al burger e le griglie passano a colonna singola
  come definito nel design

### Requirement: Brand fonts loaded
Il sistema SHALL caricare i font `Cormorant Garamond` e `Mulish` con i pesi usati dal
design, con `preconnect` verso Google Fonts.

#### Scenario: Font corretti applicati
- **WHEN** la pagina viene caricata
- **THEN** i titoli usano la serif e il testo la sans definite nei token
