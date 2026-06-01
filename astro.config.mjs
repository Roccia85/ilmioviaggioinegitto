// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

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

  adapter: cloudflare(),
});