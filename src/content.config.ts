import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Collection "articoli" — diario di viaggio, bilingue IT/EN.
 *
 * Gestione i18n dei contenuti: UNA cartella per lingua sotto la collection,
 * stesso slug nelle due lingue (coerente con il routing /it · /en della Tappa 1
 * e con la struttura `multiple_folders` di Sveltia CMS):
 *
 *   src/content/articoli/
 *     ├─ it/<slug>.md
 *     └─ en/<slug>.md
 *
 * Il glob loader genera quindi id del tipo "it/<slug>" / "en/<slug>":
 * il primo segmento è la lingua, il resto è lo slug (vedi src/lib/articles.ts).
 *
 * Le immagini (cover/gallery) sono STRINGHE: percorsi pubblici scritti dal CMS
 * (es. "/uploads/foo.jpg"), serviti staticamente da Astro. Niente import del
 * pipeline asset → massima semplicità di manutenzione lato CMS. Vedi README.
 */
const articoli = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articoli' }),
  schema: z.object({
    /** Titolo dell'articolo. */
    title: z.string(),
    /** Data di pubblicazione (solo data). */
    date: z.coerce.date(),
    /** Immagine di copertina: percorso pubblico (es. "/uploads/cover.jpg"). */
    cover: z.string(),
    /** Galleria opzionale: array di percorsi pubblici. */
    gallery: z.array(z.string()).default([]),
    /** Estratto breve per le card di anteprima (opzionale). */
    excerpt: z.string().optional(),
    /** Bozza: se true l'articolo è escluso dalle pagine pubblicate. */
    draft: z.boolean().default(false),
    // NB: il corpo Markdown è il contenuto del file (entry.body / render()),
    // non un campo del frontmatter.
  }),
});

export const collections = { articoli };
