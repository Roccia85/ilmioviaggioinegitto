# Articoli blog Egitto

_Started 2026-06-01 18:30 UTC_

---

## User

rimuovi le escursioni, negli articoli fai anche riferimento alle storie di instagram https://www.instagram.com/il_mio_viaggo_in_egitto

## Assistant

_[tool: list_files]_

_[tool: grep]_

_[tool: update_todos]_

This is a multi-page site. Let me set up a plan and read the key files.

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

Let me check the footer CSS grid and remaining pages.

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

Now let me check chi-siamo.html and the admin files for escursioni references.

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: run_script]_

All references mapped. Now applying all edits in one script.

_[tool: run_script]_

Now the article pages with Instagram stories content.Now the admin pages and Mockups, then delete escursioni.html.

_[tool: run_script]_

_[tool: delete_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: update_todos]_

Let me verify the article pages render cleanly.

_[tool: done]_

_[tool: fork_verifier_agent]_

Fatto. Ecco cosa ho cambiato:

**Escursioni rimosse ovunque**
- Eliminata la pagina `escursioni.html` e tutti i link (menu, menu mobile, footer) in home, chi siamo, articoli, articolo e contatti.
- Tolta la sezione "Escursioni" dalla home (e adattati titolo/sottotitolo e secondo pulsante hero → "Scopri chi siamo").
- Puliti la sidebar admin e l'indice in `Mockups.html` (schermate rinumerate).

**Storie Instagram negli articoli**
- In `articoli.html`: nuova sezione con il classico carosello di "storie" (cerchi col contorno sfumato Instagram) e invito a seguire `@il_mio_viaggo_in_egitto`.
- In `articolo.html`: riquadro dedicato che rimanda alle storie con il volo in mongolfiera in diretta.
- Sostituita la colonna "Escursioni" del footer con una colonna "Seguici" che rimanda alle storie su tutte le pagine.

Tutto bilingue IT/EN come il resto del sito.

