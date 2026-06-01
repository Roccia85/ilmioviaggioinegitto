/**
 * Helper di accesso agli articoli — pronti per la Tappa 3 (pagine).
 *
 * Convenzione id (vedi src/content.config.ts): "<lang>/<slug>".
 *
 * Firme esportate:
 *  - articleLang(entry): Lang                              → lingua dall'id
 *  - articleSlug(entry): string                            → slug dall'id (senza lingua)
 *  - getPublishedArticles(lang): Promise<Articolo[]>       → pubblicati di una lingua,
 *                                                            ordinati per data desc, no draft
 *  - getArticle(slug, lang): Promise<Articolo | undefined> → singolo articolo per slug+lingua
 *  - getPublishedSlugs(lang): Promise<string[]>            → slug pubblicati (per getStaticPaths)
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/utils';

export type Articolo = CollectionEntry<'articoli'>;

/** Lingua dell'articolo: primo segmento dell'id ("it/slug" → "it"). */
export function articleLang(entry: Articolo): Lang {
  return entry.id.split('/')[0] as Lang;
}

/** Slug dell'articolo senza prefisso lingua ("it/slug" → "slug"). */
export function articleSlug(entry: Articolo): string {
  return entry.id.split('/').slice(1).join('/');
}

/**
 * Tutti gli articoli PUBBLICATI di una lingua, ordinati per data decrescente.
 * Esclude i draft.
 */
export async function getPublishedArticles(lang: Lang): Promise<Articolo[]> {
  const entries = await getCollection(
    'articoli',
    ({ id, data }) => id.startsWith(`${lang}/`) && data.draft === false,
  );
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Singolo articolo per slug + lingua.
 * Ritorna `undefined` se non esiste (incluso il caso di sola altra lingua).
 */
export async function getArticle(slug: string, lang: Lang): Promise<Articolo | undefined> {
  return await getEntry('articoli', `${lang}/${slug}`);
}

/** Slug degli articoli pubblicati di una lingua (comodo per getStaticPaths). */
export async function getPublishedSlugs(lang: Lang): Promise<string[]> {
  const entries = await getPublishedArticles(lang);
  return entries.map(articleSlug);
}

/**
 * Altri articoli pubblicati della stessa lingua (per la sezione "Altri articoli"),
 * escluso quello corrente, ordinati per data desc, limitati a `limit`.
 */
export async function getRelatedArticles(
  slug: string,
  lang: Lang,
  limit = 3,
): Promise<Articolo[]> {
  const entries = await getPublishedArticles(lang);
  return entries.filter((a) => articleSlug(a) !== slug).slice(0, limit);
}

/** Tempo di lettura stimato in minuti (≈200 parole/min, minimo 1). */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
