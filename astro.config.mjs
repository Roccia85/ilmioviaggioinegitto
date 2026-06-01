// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio di produzione — usato per canonical / hreflang / sitemap.
  site: 'https://ilmioviaggioinegitto.com',

  // i18n nativo Astro: IT lingua di default, EN secondaria.
  // prefixDefaultLocale: true → anche l'italiano è servito sotto /it
  // (routing coerente /it e /en). La root "/" reindirizza a "/it".
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  redirects: {
    '/': '/it',
  },

  integrations: [
    sitemap({
      // hreflang nel sitemap (it default, en alternativa).
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it-IT', en: 'en-US' },
      },
      // Escludi l'area admin (noindex) e l'eventuale 404 dal sitemap.
      filter: (page) => !page.includes('/admin') && !page.includes('/404'),
    }),
  ],
});