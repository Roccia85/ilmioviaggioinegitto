/**
 * Costanti del sito non traducibili (contatti, social, dominio).
 * Centralizzate qui così le tappe successive (pagine, SEO, CMS) le riusano.
 *
 * NOTA: i valori marcati "placeholder" vanno sostituiti prima del go-live
 * (telefono/WhatsApp reali, vedi openspec/DESIGN-INVENTORY.md).
 */
export const SITE = {
  domain: 'ilmioviaggioinegitto.com',
  url: 'https://ilmioviaggioinegitto.com',
  email: 'info@ilmioviaggioinegitto.com',
  /** placeholder — da sostituire prima del go-live */
  phoneDisplay: '+20 100 000 0000',
  /** placeholder — numero in formato wa.me (solo cifre, prefisso incluso) */
  whatsapp: '201000000000',
  social: {
    facebook: 'https://www.facebook.com/ilmioviaggoinEgitto/',
    instagram: 'https://www.instagram.com/il_mio_viaggo_in_egitto',
  },
} as const;

/** Link WhatsApp pronto all'uso (CTA, float, contatti). */
export const waLink = `https://wa.me/${SITE.whatsapp}`;
