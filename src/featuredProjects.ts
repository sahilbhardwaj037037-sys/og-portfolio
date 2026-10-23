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
