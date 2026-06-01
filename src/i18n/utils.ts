/**
 * Helper i18n del sito.
 *
 * - `languages`      : elenco lingue supportate (etichetta nativa).
 * - `defaultLang`    : lingua di default (deve combaciare con astro.config.mjs).
 * - `getLangFromUrl` : ricava la lingua dal prefisso di rotta (/it, /en).
 * - `useTranslations`: ritorna una funzione `t('a.b.c')` che legge la stringa
 *                      dal dizionario della lingua (con fallback alla chiave).
 * - `localizePath`   : antepone il prefisso lingua a un path interno.
 * - `switchLangPath` : stessa pagina corrente, ma nell'altra lingua
 *                      (usato da LangSwitcher per non perdere la pagina).
 */
import it from './it.json';
import en from './en.json';

export const languages = {
  it: 'Italiano',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'it';

const dictionaries: Record<Lang, Record<string, unknown>> = { it, en };

/** True se la stringa è una lingua supportata. */
export function isLang(value: string): value is Lang {
  return value === 'it' || value === 'en';
}

/** Ricava la lingua dal primo segmento del path (/it/... , /en/...). */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  return isLang(maybeLang) ? maybeLang : defaultLang;
}

/** Ritorna la funzione di traduzione `t` legata a una lingua. */
export function useTranslations(lang: Lang) {
  const dict = dictionaries[lang];
  return function t(key: string): string {
    const value = key
      .split('.')
      .reduce<unknown>((acc, part) => (acc != null ? (acc as Record<string, unknown>)[part] : undefined), dict);
    return typeof value === 'string' ? value : key;
  };
}

/** Path interno senza prefisso lingua (es. "/it/contatti" → "/contatti"). */
export function unlocalizePath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && isLang(parts[0])) parts.shift();
  return '/' + parts.join('/');
}

/** Antepone il prefisso lingua a un path interno ("/contatti" → "/it/contatti"). */
export function localizePath(path: string, lang: Lang): string {
  const clean = unlocalizePath(path);
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

/** La pagina corrente nell'altra lingua (mantiene la rotta). */
export function switchLangPath(url: URL, lang: Lang): string {
  return localizePath(url.pathname, lang);
}
