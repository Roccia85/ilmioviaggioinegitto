/**
 * Costanti del sito non traducibili (contatti, social, dominio).
 * Centralizzate qui così le tappe successive (pagine, SEO, CMS) le riusano.
 */
export const SITE = {
  domain: 'ilmioviaggioinegitto.com',
  url: 'https://ilmioviaggioinegitto.com',
  email: 'info@ilmioviaggioinegitto.com',
  /** Numero di contatto/WhatsApp (formato leggibile). */
  phoneDisplay: '+20 101 009 0109',
  /** Numero in formato wa.me (solo cifre, prefisso internazionale incluso). */
  whatsapp: '201010090109',
  social: {
    facebook: 'https://www.facebook.com/ilmioviaggoinEgitto/',
    instagram: 'https://www.instagram.com/il_mio_viaggo_in_egitto',
  },
} as const;

/** Link WhatsApp pronto all'uso (CTA, float, contatti). */
export const waLink = `https://wa.me/${SITE.whatsapp}`;
