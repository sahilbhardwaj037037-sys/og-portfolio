// These are Shopify Draft-preview captures, not the separate Next.js SIX&7 build.
export const sixSeven = {
  id: 'six-and-seven',
  repository: 'https://github.com/sahilbhardwaj037037-sys/six7-shopify-store',
  storefront: 'https://sixseven-practice.myshopify.com/',
  revision: '0d3c1ad98d849135906743a5e57b8e63edcffdc0',
  captured: '17 October 2026',
  // The next passage is deliberately absent until that chapter is approved.
  exit: { id: 'six7-closing', next: null },
  images: [
    { id: 'storefront', label: 'Storefront', file: 'desktop-home-hero.webp', width: 1440, height: 900, alt: 'Genuine SIX&7 Shopify Draft-preview homepage, with EVERY MOVE typography and a sneaker hero' },
    { id: 'collection', label: 'Collection', file: 'desktop-collection.webp', width: 1440, height: 1000, alt: 'Genuine SIX&7 Shopify Men collection showing product cards, captured availability and native filter controls' },
    { id: 'product', label: 'Product', file: 'desktop-product.webp', width: 1440, height: 1000, alt: 'Genuine SIX&7 Shopify Axis product page with product photography, variant selections and native purchase controls' },
    { id: 'mobile-home', label: 'Mobile home', file: 'mobile-home.webp', width: 390, height: 844, alt: 'Genuine 390-pixel SIX&7 Shopify mobile homepage from the earlier Cream Motion Lab preview' },
    { id: 'mobile-collection', label: 'Mobile collection', file: 'mobile-collection.webp', width: 390, height: 844, alt: 'Genuine SIX&7 Shopify mobile collection with a two-column footwear grid' },
    { id: 'mobile-product', label: 'Mobile product', file: 'mobile-product.webp', width: 390, height: 844, alt: 'Genuine SIX&7 Shopify mobile product view showing imagery and size choices' },
  ],
} as const;
export const sixImage = (index: number) => `/media/six7/${sixSeven.images[index].file}`;

// Original bounded captures from the fictional restaurant frontend, unchanged.
export const emberOak = {
  id: 'ember-and-oak',
  repository: 'https://github.com/sahilbhardwaj037037-sys/Ember-Oak',
  demo: 'https://sahilbhardwaj037037-sys.github.io/Ember-Oak/',
  revision: 'bf30d00a95273e9177f06fef3da0b9415467de24',
  fullCapture: 'https://github.com/sahilbhardwaj037037-sys/Ember-Oak/blob/bf30d00a95273e9177f06fef3da0b9415467de24/docs/screenshots/desktop-full-homepage.jpg',
  exit: { id: 'ember-closing', next: null },
  images: [
    { id: 'hero', label: 'Desktop opening', file: 'desktop-hero.jpg', width: 1440, height: 900, alt: 'Original Ember & Oak concept homepage, with Where Fire Meets Flavor serif heading over food photography' },
    { id: 'atmosphere', label: 'Desktop gallery', file: 'desktop-gallery.jpg', width: 1440, height: 923, alt: 'Original restaurant concept gallery with an asymmetric arrangement of interiors, food and terrace photographs' },
    { id: 'menu', label: 'Desktop menu', file: 'desktop-menu.jpg', width: 1440, height: 959, alt: 'Ember & Oak desktop Mains menu with four category controls and illustrative dish descriptions and prices' },
    { id: 'request', label: 'Desktop request form', file: 'desktop-reservation.jpg', width: 1440, height: 814, alt: 'Original desktop reservation-request interface with labeled fields; delivery and bookings are unverified' },
    { id: 'tablet', label: 'Tablet opening', file: 'tablet-homepage.jpg', width: 768, height: 1024, alt: 'Genuine 768-pixel tablet homepage with collapsed navigation and centered restaurant concept heading' },
    { id: 'mobile', label: 'Mobile opening', file: 'mobile-homepage.jpg', width: 390, height: 844, alt: 'Genuine 390-pixel mobile restaurant homepage with vertically arranged calls to action' },
    { id: 'mobile-menu', label: 'Mobile menu', file: 'mobile-menu.jpg', width: 390, height: 1070, alt: 'Original mobile Mains menu showing wrapped descriptions and illustrative prices' },
    { id: 'navigation', label: 'Mobile navigation', file: 'mobile-navigation.jpg', width: 390, height: 844, alt: 'Expanded mobile navigation from the restaurant concept with visible section links' },
    { id: 'mobile-request', label: 'Mobile request form', file: 'mobile-reservation.jpg', width: 390, height: 1059, alt: 'Original mobile reservation-request interface with stacked labeled fields; no verified booking service' },
    { id: 'compact', label: '320px opening', file: 'mobile-320-homepage.jpg', width: 320, height: 844, alt: 'Original compact 320-pixel Ember & Oak concept homepage' },
  ],
} as const;
export const emberImage = (index: number) => `/media/ember-oak/${emberOak.images[index].file}`;
